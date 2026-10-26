import { Button } from "@/components/Button";
import { ContentCard } from "@/components/ContentCard";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoCard } from "@/components/VideoCard";
import { getAll, hrefFor } from "@/lib/content";
import { RESOURCES } from "@/lib/resources";
import { site } from "@/lib/site";

const QUICK_LINKS = ["Nmap", "Web Security Academy", "MITRE ATT&CK"];

export default function Home() {
  const videos = getAll("videos");
  // Hand-written notes only: imported vault notes are dated by when the file last changed.
  const notes = getAll("notes").filter((n) => !n.section).slice(0, 3);
  const posts = getAll("blog").slice(0, 3);
  const latest = videos[0];
  const links = RESOURCES.filter((r) => QUICK_LINKS.includes(r.name));

  return (
    <main id="main" className="ch-main">
      <section aria-labelledby="hero-t" className="grid items-center gap-8 pt-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <div className="ch-stack">
          <span className="ch-label text-cherry-text">&gt;_ HI, I&rsquo;M NEO. LET&rsquo;S PWN SOMETHING, POLITELY.</span>
          <h1 id="hero-t" className="ch-hero-title">
            {site.tagline}
          </h1>
          <p className="ch-muted max-w-[52ch]">{site.description}</p>
          <div className="ch-row mt-2 gap-4">
            <Button variant="primary" icon="play" href={latest ? hrefFor(latest) : "/videos/"}>
              Watch latest video
            </Button>
            <Button variant="outline" icon="book" href="/notes/">
              Browse notes
            </Button>
          </div>
        </div>
        {latest && <VideoCard video={latest} titlePrefix="Latest: " headingLevel={2} />}
      </section>

      <section className="ch-section" aria-labelledby="s-videos">
        <SectionHeader id="s-videos" title="Latest videos" href="/videos/" />
        <div className="ch-grid">
          {videos.slice(0, 3).map((v) => (
            <VideoCard key={v.slug} video={v} />
          ))}
        </div>
      </section>

      <section className="ch-section" aria-labelledby="s-notes">
        <SectionHeader id="s-notes" title="Notes & cheat sheets" href="/notes/" />
        <div className="ch-grid">
          {notes.map((n) => (
            <ContentCard key={n.slug} item={n} />
          ))}
        </div>
      </section>

      <section className="ch-section" aria-labelledby="s-blog">
        <SectionHeader id="s-blog" title="Blog & writeups" href="/blog/" />
        <div className="ch-grid">
          {posts.map((p) => (
            <ContentCard key={p.slug} item={p} />
          ))}
        </div>
      </section>

      <section className="ch-section" aria-labelledby="s-links">
        <SectionHeader id="s-links" title="Quick links" href="/resources/" linkText="All resources" />
        <div className="ch-grid">
          {links.map((r) => (
            <ResourceCard key={r.name} resource={r} />
          ))}
        </div>
      </section>
    </main>
  );
}
