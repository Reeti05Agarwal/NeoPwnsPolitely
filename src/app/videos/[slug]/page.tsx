import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { Responsible } from "@/components/Callout";
import { ContentCard } from "@/components/ContentCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Severity } from "@/components/Severity";
import { Tag } from "@/components/Tag";
import { Topic } from "@/components/Topic";
import { Chapters, VideoPlayer, VideoProvider } from "@/components/Video";
import { getAll, getOne, hrefFor } from "@/lib/content";
import { durationLabel, formatDate } from "@/lib/format";
import { renderMDX } from "@/lib/mdx";
import { getSeries } from "@/lib/series";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAll("videos").map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const video = getOne("videos", slug);
  if (!video) return {};
  return { title: video.meta.title, description: video.meta.description };
}

export default async function VideoPage({ params }: Params) {
  const { slug } = await params;
  const video = getOne("videos", slug);
  if (!video) notFound();
  const { meta, body } = video;
  const series = getSeries(meta.series);
  const notes = meta.notes ? getOne("notes", meta.notes)?.meta : undefined;
  const related = [...getAll("notes"), ...getAll("blog")]
    .filter((a) => a.slug !== notes?.slug && (a.video === meta.slug || a.topics.some((t) => meta.topics.includes(t))))
    .slice(0, notes ? 2 : 3);
  const content = await renderMDX(body);

  return (
    <VideoProvider youtubeId={meta.youtubeId} chapters={meta.chapters}>
      <main id="main" className="ch-main ch-main--tight" data-pagefind-body>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Videos", href: "/videos/" },
            ...(series ? [{ label: series.name, href: `/videos/?series=${series.slug}` }] : []),
            { label: meta.thumbTitle ?? meta.title },
          ]}
        />
        <div className="grid items-start gap-8 side:grid-cols-[minmax(0,1fr)_320px]">
          <div className="ch-stack min-w-0 gap-8">
            <div className="ch-stack">
              <VideoPlayer title={meta.title} duration={meta.duration} caption={meta.caption} />
              <div className="ch-row">
                <Tag kind="video" />
                {meta.severity && <Severity level={meta.severity} score={meta.score} />}
                {meta.topics.map((t) => (
                  <Topic key={t}>{t}</Topic>
                ))}
              </div>
              <h1 className="ch-page-title">{meta.title}</h1>
              <div className="ch-meta">
                <span>{durationLabel(meta.duration)}</span>
                <span>{formatDate(meta.date)}</span>
                {meta.verified && <span>Last verified: {formatDate(meta.verified)}</span>}
              </div>
              <div className="ch-row gap-4" data-pagefind-ignore>
                {notes && (
                  <Button variant="primary" icon="book" href={hrefFor(notes)}>
                    Open notes
                  </Button>
                )}
                {meta.labFiles && (
                  <Button variant="outline" icon="download" href={meta.labFiles.href} external>
                    {meta.labFiles.label}
                  </Button>
                )}
                {meta.youtubeId && (
                  <Button variant="outline" icon="external" href={`https://www.youtube.com/watch?v=${encodeURIComponent(meta.youtubeId)}`} external>
                    Watch on YouTube
                  </Button>
                )}
              </div>
            </div>

            {meta.offensive && <Responsible />}

            <div className="ch-prose">{content}</div>

            {related.length > 0 || notes ? (
              <section className="ch-section" aria-labelledby="rel" data-pagefind-ignore>
                <SectionHeader id="rel" title="Keep going" />
                <div className="ch-grid">
                  {notes && <ContentCard item={notes} showDate={false} />}
                  {related.map((a) => (
                    <ContentCard key={a.slug} item={a} showDate={false} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="ch-stack gap-8 side:sticky side:top-4" data-pagefind-ignore>
            <Chapters />
            {meta.references?.length ? (
              <div className="ch-stack gap-2">
                <h2 className="ch-label ch-muted">IN THIS VIDEO</h2>
                <ul className="m-0 list-disc pl-[1.2em] text-body-small">
                  {meta.references.map((r) => (
                    <li key={r.href}>
                      <a href={r.href} target="_blank" rel="noopener noreferrer">
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </VideoProvider>
  );
}
