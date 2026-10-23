import { Button } from "@/components/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="ch-main ch-main--tight">
      <div className="ch-stack max-w-[68ch] py-8">
        <span className="ch-label text-cherry-text">&gt;_ 404</span>
        <h1 className="ch-hero-title">Pardon me, this page does not exist.</h1>
        <p className="ch-muted">Try the search or go home.</p>
        <div className="ch-row gap-4">
          <Button variant="primary" icon="search" href="/search/">
            Search the site
          </Button>
          <Button variant="outline" icon="arrow" href="/">
            Go home
          </Button>
        </div>
      </div>
    </main>
  );
}
