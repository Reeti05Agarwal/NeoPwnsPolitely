import { Breadcrumbs } from "./Breadcrumbs";
import { ContentCard } from "./ContentCard";
import { Callout } from "./Callout";
import type { ArticleMeta } from "@/lib/meta";
import type { ReactNode } from "react";

/** Listing page for notes or blog posts, newest first. `children` goes below the cards. */
export function ArticleIndex({ title, intro, items, children }: { title: string; intro: string; items: ArticleMeta[]; children?: ReactNode }) {
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
        !children && (
          <Callout type="note">
            <p>Nothing here yet. Thank you for your patience.</p>
          </Callout>
        )
      )}
      {children}
    </main>
  );
}
