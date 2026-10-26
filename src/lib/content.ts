import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import type { ArticleMeta, Kind, Meta, TocItem, VideoMeta } from "./meta";

export * from "./meta";

/* Content lives in /content/<kind>/<slug>.mdx. The frontmatter fields are the
   types in meta.ts; README.md shows a full example for each kind. Notes imported
   from the CyberNotes vault are plain Markdown in /content/notes/vault/<slug>.md. */

const ROOT = path.join(process.cwd(), "content");

type MetaFor<K extends Kind> = K extends "videos" ? VideoMeta : ArticleMeta;

/** Content files of a kind, relative to its folder, keyed by slug. */
function readDir(kind: Kind) {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return new Map<string, string>();
  const files = fs
    .readdirSync(dir, { recursive: true, encoding: "utf8" })
    .map((f) => f.split(path.sep).join("/"))
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return new Map(files.map((f) => [path.posix.basename(f).replace(/\.mdx?$/, ""), f]));
}

function parse(kind: Kind, slug: string, file: string) {
  const raw = fs.readFileSync(path.join(ROOT, kind, file), "utf8");
  const { data, content } = matter(raw);
  const base = {
    ...data,
    slug,
    date: toIso(data.date),
    verified: data.verified ? toIso(data.verified) : undefined,
    topics: data.topics ?? [],
  };
  const meta: Meta =
    kind === "videos"
      ? ({ ...base, kind, chapters: data.chapters ?? [] } as VideoMeta)
      : ({ ...base, kind, readTime: readTime(content) } as ArticleMeta);
  return { meta, body: content, format: file.endsWith(".md") ? ("md" as const) : ("mdx" as const) };
}

// gray-matter turns unquoted YAML dates into Date objects.
function toIso(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function readTime(body: string) {
  const words = body.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAll<K extends Kind>(kind: K): MetaFor<K>[] {
  return [...readDir(kind)]
    .map(([slug, f]) => parse(kind, slug, f).meta as MetaFor<K>)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getOne<K extends Kind>(kind: K, slug: string) {
  const file = readDir(kind).get(slug);
  if (!file) return undefined;
  const { meta, body, format } = parse(kind, slug, file);
  return { meta: meta as MetaFor<K>, body, format };
}

/** Headings for the table of contents, with the same ids rehype-slug gives them. */
export function toc(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const label = m[2].replace(/[`*_]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    items.push({ id: slugger.slug(label), label, level: m[1].length as 2 | 3 });
  }
  return items;
}
