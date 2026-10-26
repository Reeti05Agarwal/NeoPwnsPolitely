import { Breadcrumbs } from "./Breadcrumbs";
import { ContentCard } from "./ContentCard";
import { Callout } from "./Callout";
import type { ArticleMeta } from "@/lib/meta";

/** Listing page for notes or blog posts, newest first. */
export function ArticleIndex({ title, intro, items }: { title: string; intro: string; items: ArticleMeta[] }) {
  return (
    <main id="main" className="ch-main ch-main--tight">
      <header className="ch-stack max-w-[68ch]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <h1 className="ch-hero-title">{title}</h1>
        <p className="ch-muted">{intro}</p>
      </header>
      {items.length ? (
        <div className="ch-grid">
          {items.map((it) => (
            <ContentCard key={it.slug} item={it} />
          ))}
        </div>
      ) : (
        <Callout type="note">
          <p>Nothing here yet. Thank you for your patience.</p>
        </Callout>
      )}
    </main>
  );
}
