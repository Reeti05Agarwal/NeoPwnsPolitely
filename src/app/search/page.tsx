import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteSearch } from "@/components/SiteSearch";

export const metadata = { title: "Search", description: "Search videos, notes, writeups and resources." };

export default function SearchPage() {
  return (
    <main id="main" className="ch-main ch-main--tight">
      <header className="ch-stack max-w-[68ch]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
        <h1 className="ch-hero-title">Search</h1>
      </header>
      <SiteSearch />
    </main>
  );
}
