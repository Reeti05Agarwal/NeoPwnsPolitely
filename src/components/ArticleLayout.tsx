import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { Responsible } from "./Callout";
import { Severity } from "./Severity";
import { TableOfContents } from "./TableOfContents";
import { Tag, tagKind } from "./Tag";
import { Topic } from "./Topic";
import { hrefFor, type ArticleMeta, type TocItem, type VideoMeta } from "@/lib/meta";
import { durationLabel, formatDate } from "@/lib/format";
import type { ReactNode } from "react";

const SECTION = { notes: "Notes", blog: "Blog" } as const;

/** Notes and blog posts: title block, sticky table of contents, prose at 68ch, references. */
export function ArticleLayout({ meta, toc, video, children }: { meta: ArticleMeta; toc: TocItem[]; video?: VideoMeta; children: ReactNode }) {
  const tocWithRefs = meta.references?.length ? [...toc, { id: "references", label: "References", level: 2 as const }] : toc;
  return (
    <main id="main" className="ch-main ch-main--tight" data-pagefind-body>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: SECTION[meta.kind], href: `/${meta.kind}/` }, { label: meta.title }]} />
      <header className="ch-stack max-w-[68ch]">
        <div className="ch-row">
          <Tag kind={tagKind(meta.kind)} />
          {meta.severity && <Severity level={meta.severity} score={meta.score} />}
          {meta.topics.map((t) => (
            <Topic key={t}>{t}</Topic>
          ))}
        </div>
        <h1 className="ch-hero-title">{meta.title}</h1>
        <p className="ch-muted">{meta.description}</p>
        <div className="ch-meta">
          {meta.section && <span>{meta.section.join(" / ")}</span>}
          <span>Read time {meta.readTime} min</span>
          <span>Published {formatDate(meta.date)}</span>
          {meta.verified && <span>Last verified: {formatDate(meta.verified)}</span>}
          {video && (
            <Link href={hrefFor(video)}>
              Watch the video ({durationLabel(video.duration)})
            </Link>
          )}
        </div>
      </header>
      <div className="grid items-start gap-8 side:grid-cols-[240px_minmax(0,1fr)]">
        <div className="side:sticky side:top-4" data-pagefind-ignore>
          <TableOfContents items={tocWithRefs} />
        </div>
        <article className="ch-prose">
          {meta.offensive && <Responsible />}
          {children}
          {meta.references?.length ? (
            <>
              <h2 id="references">References</h2>
              <ul>
                {meta.references.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} target="_blank" rel="noopener noreferrer">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </article>
      </div>
    </main>
  );
}
