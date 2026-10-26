import Link from "next/link";
import { hrefFor, type ArticleMeta } from "@/lib/meta";

/** Notes imported from the CyberNotes vault, one collapsible block per top-level folder, in vault order. */
export function NotesTree({ notes }: { notes: ArticleMeta[] }) {
  if (!notes.length) return null;
  const tree = new Map<string, Map<string, ArticleMeta[]>>();
  for (const note of [...notes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    const [top, ...rest] = note.section ?? [];
    const groups = tree.get(top) ?? new Map<string, ArticleMeta[]>();
    const sub = rest.join(" / ");
    groups.set(sub, [...(groups.get(sub) ?? []), note]);
    tree.set(top, groups);
  }
  return (
    <section className="ch-section" aria-labelledby="vault-t">
      <div className="ch-section__head">
        <h2 id="vault-t">From the notebook</h2>
        <span className="ch-label ch-muted">{notes.length} notes</span>
      </div>
      <div>
        {[...tree].map(([top, groups]) => (
          <details key={top} className="ch-tree">
            <summary>
              {top} <span className="ch-label ch-muted">({[...groups.values()].reduce((n, g) => n + g.length, 0)})</span>
            </summary>
            <div className="ch-tree__body">
              {[...groups].map(([sub, items]) => (
                <div key={sub} className="ch-stack">
                  {sub && <h3>{sub}</h3>}
                  <ul>
                    {items.map((n) => (
                      <li key={n.slug}>
                        <Link href={hrefFor(n)}>{n.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
