import { ArticleIndex } from "@/components/ArticleIndex";
import { NotesTree } from "@/components/NotesTree";
import { getAll } from "@/lib/content";

export const metadata = { title: "Notes & cheat sheets", description: "Cheat sheets, concept notes and command references, each linked to its video." };

export default function NotesPage() {
  const notes = getAll("notes");
  return (
    <ArticleIndex
      title="Notes & cheat sheets"
      intro="Cheat sheets, concept notes and command references. Every command is text you can copy, and every note links back to its video."
      items={notes.filter((n) => !n.section)}
    >
      <NotesTree notes={notes.filter((n) => n.section)} />
    </ArticleIndex>
  );
}
