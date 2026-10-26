/* Imports the CyberNotes Obsidian vault into the Notes section.

   npm run import-notes

   Reads the folders listed in scripts/notes.config.mjs, converts Obsidian syntax
   to plain Markdown and writes one .md file per note to content/notes/vault/,
   with the images those notes use in public/notes/img/. Both folders are
   rebuilt from scratch on every run, so edit notes in the vault, not here. */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slug as githubSlug } from "github-slugger";
import config from "./notes.config.mjs";

const ROOT = process.cwd();
const VAULT = path.resolve(ROOT, config.vault);
const OUT = path.join(ROOT, "content", "notes", "vault");
const IMG_OUT = path.join(ROOT, "public", "notes", "img");
const IMG_URL = "/notes/img/";
// No SVG: an SVG opened directly runs its scripts on this origin.
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif)$/i;

// A note matching one of these is skipped unless its frontmatter says `publish: true`.
const SECRETS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/, // AWS access key
  /\bgh[pousr]_[A-Za-z0-9]{36,}/, // GitHub token
  /\bxox[abpr]-[A-Za-z0-9-]{10,}/, // Slack token
  /\bsk-[A-Za-z0-9_-]{20,}/, // OpenAI-style key
  /\bAIza[0-9A-Za-z_-]{35}\b/, // Google API key
];

if (!fs.existsSync(VAULT)) {
  console.error(`Vault not found at ${VAULT}. Set CYBERNOTES_DIR or edit scripts/notes.config.mjs.`);
  process.exit(1);
}

const toPosix = (p) => p.split(path.sep).join("/");
const rel = (p) => toPosix(path.relative(VAULT, p));
/** "02 - SQL Injection" -> "SQL Injection" */
const clean = (name) => name.replace(/^\d+\s*-\s*/, "").trim() || name.trim();
const safeDecode = (s) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};
const slugify = (text) => githubSlug(text).replace(/-{2,}/g, "-").replace(/^-|-$/g, "");

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue; // .obsidian, .trash, .git, .makemd
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const allFiles = walk(VAULT);

// Obsidian finds an embedded image by file name anywhere in the vault.
const images = new Map();
for (const f of allFiles) if (IMAGE_EXT.test(f)) images.set(path.basename(f).toLowerCase(), f);

/* 1. Pick the notes to publish. */

const notes = [];
const skipped = [];
for (const file of allFiles.filter((f) => f.endsWith(".md")).sort((a, b) => rel(a).localeCompare(rel(b), "en", { numeric: true }))) {
  const r = rel(file);
  const folders = r.split("/").slice(0, -1);
  const topic = config.include[folders[0]];
  if (!topic) continue;
  if (config.exclude.some((x) => r.startsWith(`${x}/`))) continue;

  let parsed;
  try {
    parsed = matter(fs.readFileSync(file, "utf8"));
  } catch {
    skipped.push([r, "frontmatter is not valid YAML"]);
    continue;
  }
  const { data, content } = parsed;
  if (data.publish === false) continue;
  if (content.split(/\s+/).filter(Boolean).length < 15) {
    skipped.push([r, "empty or nearly empty"]);
    continue;
  }
  if (data.publish !== true && SECRETS.some((re) => re.test(content))) {
    skipped.push([r, "may contain a secret: check it, then add `publish: true` to its frontmatter"]);
    continue;
  }

  const name = path.basename(file, ".md");
  const title = typeof data.title === "string" && data.title.trim() ? data.title.trim() : clean(name);
  const section = folders.map(clean);
  // Path parts for the slug, without repeats ("Injections/Injections" for folder notes).
  const parts = [...section, title].filter((p, i, a) => p !== a[i - 1]);
  notes.push({ file, rel: r, name, data, content, title, section, parts, topic });
}

/* 2. Give every note a unique slug: its title, plus as many parent folders as it takes. */

const reserved = new Set(
  fs
    .readdirSync(path.join(ROOT, "content", "notes"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.slice(0, -4)),
);
const depth = new Map(notes.map((n) => [n, 1]));
for (let changed = true; changed; ) {
  changed = false;
  const groups = new Map();
  for (const n of notes) {
    n.slug = slugify(n.parts.slice(-depth.get(n)).join(" ")) || "note";
    groups.set(n.slug, [...(groups.get(n.slug) ?? []), n]);
  }
  for (const [s, group] of groups) {
    if (group.length === 1 && !reserved.has(s)) continue;
    for (const n of group) {
      if (depth.get(n) < n.parts.length) {
        depth.set(n, depth.get(n) + 1);
        changed = true;
      }
    }
  }
}
const taken = new Set(reserved);
for (const n of notes) {
  let s = n.slug;
  for (let i = 2; taken.has(s); i++) s = `${n.slug}-${i}`;
  n.slug = s;
  taken.add(s);
}

// Wiki links name a note by file name, or by vault path when names clash.
const byName = new Map();
for (const n of notes) byName.set(n.name.toLowerCase(), n);
for (const n of notes) byName.set(n.rel.slice(0, -3).toLowerCase(), n);
const findNote = (target) => {
  const t = target.replace(/\.md$/i, "").trim().toLowerCase();
  return byName.get(t) ?? byName.get(t.split("/").pop());
};

/* 3. Convert Obsidian Markdown to plain Markdown. */

fs.rmSync(OUT, { recursive: true, force: true });
fs.rmSync(IMG_OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(IMG_OUT, { recursive: true });

const copied = new Map(); // source path -> public URL
const imageNames = new Set();
const missing = new Set();

function imageUrl(target) {
  const src = images.get(path.basename(target).toLowerCase());
  if (!src) {
    missing.add(target);
    return null;
  }
  if (!copied.has(src)) {
    const ext = path.extname(src).toLowerCase();
    const base = slugify(path.basename(src, path.extname(src))) || "image";
    let file = `${base}${ext}`;
    for (let i = 2; imageNames.has(file); i++) file = `${base}-${i}${ext}`;
    imageNames.add(file);
    fs.copyFileSync(src, path.join(IMG_OUT, file));
    copied.set(src, IMG_URL + file);
  }
  return copied.get(src);
}

/** Link to a published note, or just its label when that note stays private. */
function noteLink(target, label) {
  // Inside tables Obsidian escapes the pipe: [[Note\|label]].
  const [file, heading] = target.replace(/\\$/, "").split("#");
  const note = file ? findNote(file) : undefined;
  const text = (label || heading || clean(path.basename(file || ""))).replace(/[[\]]/g, "");
  if (!note) return text;
  const anchor = heading && !heading.startsWith("^") ? `#${githubSlug(heading)}` : "";
  return `[${text}](/notes/${note.slug}/${anchor})`;
}

function convertText(text) {
  // Standard Markdown images and links go first, so the links made from [[wiki links]] are not converted twice.
  return (
    text
      .replace(/%%.*?%%/g, "") // Obsidian comments
      // ![alt](path): local images are copied; remote ones are blocked by the CSP, so they become links
      .replace(/!\[([^\]]*)\]\(<?([^)\s>]+)>?(?:\s+"[^"]*")?\)/g, (_, alt, src) => {
        if (/^https?:/i.test(src)) {
          if (/[?&](expiry|X-Amz-|hmac)/i.test(src)) return ""; // signed URL, long expired
          return `[${!alt || /^https?:/i.test(alt) ? "External image" : alt}](${src})`;
        }
        const url = IMAGE_EXT.test(src) ? imageUrl(safeDecode(src)) : null;
        return url ? `![${alt}](${url})` : "";
      })
      // [label](Other%20note.md): links between notes; links to other local files keep just the label
      .replace(/(?<!!)\[([^\]]+)\]\((?!https?:|mailto:|#|\/)<?([^)>]+)>?\)/g, (_, label, href) => {
        const target = safeDecode(href);
        return /\.md(#|$)/i.test(target) || !path.extname(target.split("#")[0]) ? noteLink(target, label) : label;
      })
      // ![[image.png|300]] and ![[Other note]]
      .replace(/!\[\[([^\]]+)\]\]/g, (_, inner) => {
        const [target, alias] = inner.split("|");
        if (!IMAGE_EXT.test(target)) {
          // Embedded PDFs, videos and other attachments are dropped; embedded notes become links.
          const isAttachment = !findNote(target.split("#")[0]) && /\.\w{2,4}$/.test(target);
          return isAttachment ? "" : noteLink(target, alias);
        }
        const url = imageUrl(target);
        const alt = alias && !/^\d+(x\d+)?$/.test(alias) ? alias : "";
        return url ? `![${alt}](${url})` : "";
      })
      // [[Note]], [[Note|label]], [[Note#Heading]]
      .replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
        const [target, alias] = inner.split("|");
        return noteLink(target, alias);
      })
      .replace(/==([^=\n]+)==/g, "**$1**")
      // Raw HTML is not rendered, so payloads like <script> show as text instead of vanishing.
      .replace(/<(?!https?:\/\/|mailto:)/g, "&lt;")
  );
}

function convert(body) {
  const lines = body.replace(/\r\n?/g, "\n").split("\n");
  let fence = null;
  // Headings shift so the note's top level becomes h2: the page title is the only h1.
  let minLevel = 6;
  for (const line of lines) {
    const f = /^\s*(`{3,}|~{3,})/.exec(line);
    if (f) fence = fence ? (f[1][0] === fence[0] && f[1].length >= fence.length ? null : fence) : f[1];
    else if (!fence) {
      const h = /^(#{1,6})\s+\S/.exec(line);
      if (h) minLevel = Math.min(minLevel, h[1].length);
    }
  }
  const shift = 2 - minLevel;
  fence = null;
  return lines
    .map((line) => {
      const f = /^\s*(`{3,}|~{3,})/.exec(line);
      if (f) {
        fence = fence ? (f[1][0] === fence[0] && f[1].length >= fence.length ? null : fence) : f[1];
        return line;
      }
      if (fence) return line;
      const h = /^(#{1,6})(\s+\S.*)$/.exec(line);
      if (h) line = "#".repeat(Math.min(6, Math.max(2, h[1].length + shift))) + h[2];
      // > [!NOTE] Title  ->  > **Note: Title**
      line = line.replace(/^(\s*(?:>\s*)+)\[!(\w+)\][-+]?\s*(.*)$/, (_, quote, type, title) => {
        const kind = type[0].toUpperCase() + type.slice(1).toLowerCase();
        return `${quote}**${title ? `${kind}: ${title}` : kind}**`;
      });
      // Leave inline code alone.
      return line
        .split(/(`+[^`]*`+)/)
        .map((part, i) => (i % 2 ? part : convertText(part)))
        .join("");
    })
    .join("\n")
    .trim();
}

function describe(body, title) {
  for (const para of body.split(/\n\s*\n/)) {
    const text = para.trim();
    if (!text || /^(#|```|~~~|!\[|\||<)/.test(text)) continue;
    const plain = text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/&lt;/g, "<")
      .replace(/^\s*(?:>\s*)*(?:[-+*]|\d+\.)?\s*/gm, "")
      .replace(/[*_`#]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (plain.split(" ").length < 6) continue;
    return plain.length > 160 ? `${plain.slice(0, 157).replace(/\s+\S*$/, "")}…` : plain;
  }
  return `Notes on ${title}.`;
}

const toIso = (d) => (d instanceof Date && !Number.isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : undefined);

notes.forEach((n, order) => {
  const body = convert(n.content);
  const front = {
    title: n.title,
    description: typeof n.data.description === "string" ? n.data.description : describe(body, n.title),
    date: toIso(n.data.date ? new Date(n.data.date) : undefined) ?? toIso(fs.statSync(n.file).mtime),
    topics: [n.topic],
    section: n.section,
    order,
    ...(config.offensive.includes(n.topic) && { offensive: true }),
  };
  fs.writeFileSync(path.join(OUT, `${n.slug}.md`), matter.stringify(`${body}\n`, front));
});

/* 4. Report. */

console.log(`Imported ${notes.length} notes to ${toPosix(path.relative(ROOT, OUT))}/ and ${copied.size} images to ${toPosix(path.relative(ROOT, IMG_OUT))}/.`);
if (skipped.length) {
  console.log(`\nSkipped ${skipped.length}:`);
  for (const [r, why] of skipped) console.log(`  ${r}: ${why}`);
}
if (missing.size) {
  console.log(`\n${missing.size} embedded images were not found in the vault:`);
  for (const m of [...missing].slice(0, 20)) console.log(`  ${m}`);
  if (missing.size > 20) console.log(`  ...and ${missing.size - 20} more`);
}
