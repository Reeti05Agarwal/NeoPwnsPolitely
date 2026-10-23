import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoBrowser } from "@/components/VideoBrowser";
import { getAll } from "@/lib/content";

export const metadata = { title: "Videos", description: "Every episode, by series: recon, privilege escalation, CVE breakdowns, blue team and web attacks." };

export default function VideosPage() {
  return (
    <main id="main" className="ch-main ch-main--tight">
      <header className="ch-stack max-w-[68ch]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Videos" }]} />
        <h1 className="ch-hero-title">Videos</h1>
        <p className="ch-muted">Theory first, then the lab, then the defence. Every episode links its notes and every command shown on screen.</p>
      </header>
      <VideoBrowser videos={getAll("videos")} />
    </main>
  );
}
