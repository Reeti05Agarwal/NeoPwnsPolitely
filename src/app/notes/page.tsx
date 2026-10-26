import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NotesBrowser } from "@/components/NotesBrowser";
import { getAll } from "@/lib/content";

export const metadata = { title: "Notes & cheat sheets", description: "Cheat sheets, concept notes and command references, each linked to its video." };

export default function NotesPage() {
  return (
    <main id="main" className="ch-main ch-main--tight">
      <header className="ch-stack max-w-[68ch]">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Notes & cheat sheets" }]} />
        <h1 className="ch-hero-title">Notes &amp; cheat sheets</h1>
        <p className="ch-muted">Cheat sheets with commands you can copy, and the notebook they come from: concepts, systems and standards, filed the way I study them.</p>
      </header>
      <NotesBrowser notes={getAll("notes")} />
    </main>
  );
}
