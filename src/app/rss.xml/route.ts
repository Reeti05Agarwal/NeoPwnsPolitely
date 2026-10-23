import { getAll, hrefFor, type Meta } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const KIND_LABEL = { videos: "Video", notes: "Notes", blog: "Blog" } as const;

export function GET() {
  const items: Meta[] = [...getAll("videos"), ...getAll("notes"), ...getAll("blog")].sort((a, b) => b.date.localeCompare(a.date));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.name)}</title>
<link>${site.url}/</link>
<description>${esc(site.tagline)}</description>
<language>en</language>
<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    (m) => `<item>
<title>${esc(`${KIND_LABEL[m.kind]}: ${m.title}`)}</title>
<link>${site.url}${hrefFor(m)}</link>
<guid>${site.url}${hrefFor(m)}</guid>
<pubDate>${new Date(`${m.date}T00:00:00Z`).toUTCString()}</pubDate>
<description>${esc(m.description)}</description>
</item>`,
  )
  .join("\n")}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
