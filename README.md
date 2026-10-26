# Neo Pwns Politely

**Ethical hacking, with manners.** The website for the Neo Pwns Politely channel: videos, notes and cheat sheets, blog posts and lab writeups, and quick links to tools.

Built from the [Neo Pwns Politely design system](https://claude.ai/artifact/TuHMD8hwPJY9SDSMCfJzaE): its tokens, its 21 components and its four page templates (Home, Video, Article, Resources).

## Stack

| Need | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), exported as static files to `out/` |
| Styling | Tailwind CSS v4, with the design tokens mapped in `@theme` (`src/app/globals.css`) |
| Components | Hand-built from the design system, in `src/components/` (no UI kit) |
| Notes and blog | MDX files in `content/`, rendered at build time |
| Code highlighting | Shiki at build time, coloured with the `syn-*` tokens |
| Search | Pagefind, indexed after each build, no server |
| Videos | Lite YouTube player: nothing loads from YouTube until someone presses play |
| Font | PT Mono, self-hosted with `next/font/local` |
| Analytics | Plausible, off unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set |

## Run it

Needs Node.js 20.9 or newer (`.nvmrc` says 22).

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. Search only works after a production build, because the Pagefind index is made then:

```bash
npm run build
```

```bash
npm start
```

### Checks

```bash
npm run lint
```

```bash
npm run typecheck
```

```bash
npx playwright install chromium
```

```bash
npm run test:a11y
```

`test:a11y` runs axe on every page template in both themes, at desktop and phone sizes, and checks there is no horizontal scroll at 320px. Run `npm run build` first. CI (`.github/workflows/ci.yml`) runs all of these on every pull request.

## Adding content

Add an `.mdx` file to `content/videos`, `content/notes` or `content/blog`. The file name is the URL slug. Frontmatter fields are typed in `src/lib/meta.ts`.

A note or blog post:

```mdx
---
title: "Nmap cheat sheet: scans you will actually use"
description: One or two sentences for cards and search results.
date: 2026-10-20
verified: 2026-10-20        # shows "Last verified"
topics: [network]
severity: critical          # optional: critical | high | medium | low | info
score: 9.8                  # optional CVSS score
offensive: true             # shows the Legal (responsible-use) callout at the top
video: kerberoasting        # optional: slug of the companion video
references:
  - { label: "Nmap reference guide (nmap.org)", href: "https://nmap.org/book/man.html" }
---

## 1. First section

Text, then components:

<CodeBlock lang="bash" host="attacker" lines={["$ nmap -sn 192.0.2.0/24", "output lines have no prompt"]} />

<Callout type="defence" title="detect and fix">How to spot and stop it.</Callout>
```

A video adds `series` (a slug from `src/lib/series.ts`), `episode`, `duration`, `youtubeId`, `chapters`, `notes` (slug of the companion note) and optionally `thumbTitle`, `tone` (`slate`, `ink` or `cherry`), `caption` and `labFiles`. See `content/videos/kerberoasting.mdx`. Leave `youtubeId` empty until the episode is public; the player then says "Coming soon".

Components available in MDX without importing: `Callout` (`note`, `tip`, `warning`, `legal`, `defence`), `Responsible`, `CodeBlock`, `FindingsTable`, `Severity`, `Tag`, `Topic`. Fenced code blocks (```` ```python ````) are highlighted with Shiki.

Resources (tools, labs, docs) are a list in `src/lib/resources.ts`.

### Notes from the CyberNotes vault

The Obsidian vault at `../../CyberNotes` (next to `Projects/`) feeds the "From the notebook" part of `/notes/`. Edit notes in Obsidian, then:

```bash
npm run import-notes
```

The script rebuilds `content/notes/vault/` (one `.md` per note) and `public/notes/img/` (only the images those notes embed). Commit both: the deploy builds from the repo and never sees the vault.

- **What is published** is set in `scripts/notes.config.mjs`: only top-level folders listed in `include` go out, each with its site topic. Projects, pentest reports, bug bounty and other personal folders are left out. Add `publish: false` to a note's frontmatter to keep that one note private.
- **Secrets check:** a note that looks like it holds a private key or API token is skipped and listed in the output. Check it, and add `publish: true` to its frontmatter if it is safe.
- **Converted:** `[[wiki links]]` (to notes that are not published, they become plain text), `![[image embeds]]`, `> [!NOTE]` callouts, `==highlights==` and `%%comments%%`. Headings shift down one level, so the page title is the only `h1`. Remote images become links, because the CSP only allows images from this site.
- Imported notes are plain Markdown, not MDX: JSX components and raw HTML do not render, so XSS payloads in notes show as text.
- They stay off the home page and the RSS feed, but are in the sitemap and in search.
- The vault lives somewhere else? `CYBERNOTES_DIR=/path/to/vault npm run import-notes`.

House rules from the design system: documentation-safe targets only (`10.10.10.5`, `192.0.2.10`, `target.example`, `lab.local`), redact secrets, defang IOCs, the Legal callout above the first command, and a Defence callout at the end of every attack walkthrough.

## Deploy

The build output is plain static files in `out/`.

- **Cloudflare Pages:** build command `npm run build`, output directory `out`. Security headers come from `public/_headers`.
- **Vercel:** import the repo; `vercel.json` sets the same headers.

Set `NEXT_PUBLIC_SITE_URL` to the real domain (used for the sitemap, RSS and social cards). It defaults to `https://neopwnspolitely.com`.

## Security

- Strict headers: Content-Security-Policy, HSTS (with preload), `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, COOP and CORP. Keep `public/_headers` and `vercel.json` in sync. Check the live site at securityheaders.com.
- The CSP allows `'unsafe-inline'` for scripts, because a static Next.js export inlines small scripts and cannot use per-request nonces. Everything else is locked to this site, plus YouTube's no-cookie embed and (if enabled) Plausible. If you later move to a server deployment, switch to nonces in a proxy and drop `'unsafe-inline'`.
- `'wasm-unsafe-eval'` is there for Pagefind's search, which runs in WebAssembly.
- Few dependencies, with Dependabot (`.github/dependabot.yml`) opening weekly update PRs.

## Accessibility

Skip link, landmarks, ordered headings, 2px focus rings, 44px touch targets, text contrast of 4.5:1 or better in both themes, no autoplay until someone presses play, and `prefers-reduced-motion` respected. `eslint-plugin-jsx-a11y` runs its full recommended set in `npm run lint`, and axe runs in `npm run test:a11y`.

## Still to do

- Replace the sample content with real episodes and their YouTube IDs.
- Add Proto Mono to `src/app/layout.tsx` once the font files are licensed (PT Mono is used until then).
- Set the real domain and social links in `src/lib/site.ts`.
