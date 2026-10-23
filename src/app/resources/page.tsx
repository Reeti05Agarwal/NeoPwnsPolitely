import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ResourceBrowser } from "@/components/ResourceBrowser";

export const metadata = { title: "Resources", description: "The tools, labs and references used on the channel, with links to the official sites." };

export default function ResourcesPage() {
  return (
    <main id="main" className="ch-main ch-main--tight" data-pagefind-body>
      <header className="ch-stack max-w-[68ch]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />
        <h1 className="ch-hero-title">Resources</h1>
        <p className="ch-muted">The tools, labs and references Neo uses on the channel. Every link opens the official site in a new tab.</p>
      </header>
      <ResourceBrowser />
    </main>
  );
}
