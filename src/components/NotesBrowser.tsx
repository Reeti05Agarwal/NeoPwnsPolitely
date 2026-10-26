"use client";

import Link from "next/link";
import { useState } from "react";
import { Callout } from "./Callout";
import { ContentCard } from "./ContentCard";
import { FilterChips } from "./FilterChips";
import { SearchField } from "./SearchField";
import { TableOfContents } from "./TableOfContents";
import { hrefFor, type ArticleMeta, type TocItem } from "@/lib/meta";

type Group = { label: string; notes: ArticleMeta[] }; // a folder below the row, e.g. "Bash"
type Row = { label: string; groups: Group[]; count: number }; // e.g. "Linux"
type Section = { label: string; id: string; rows: Row[]; count: number }; // e.g. "Systems"

const idFor = (label: string) => `nb-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

/** Vault notes as top folder -> second folder -> deeper folder, in vault order. */
function buildTree(notes: ArticleMeta[]): Section[] {
  const sections: Section[] = [];
  for (const note of [...notes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))) {
    const [top = "Notes", second = "Overview", ...rest] = note.section ?? [];
    let section = sections.find((s) => s.label === top);
    if (!section) sections.push((section = { label: top, id: idFor(top), rows: [], count: 0 }));
    let row = section.rows.find((r) => r.label === second);
    if (!row) section.rows.push((row = { label: second, groups: [], count: 0 }));
    const sub = rest.join(" / ");
    let group = row.groups.find((g) => g.label === sub);
    if (!group) row.groups.push((group = { label: sub, notes: [] }));
    group.notes.push(note);
    row.count++;
    section.count++;
  }
  // Notes sitting directly in a top folder read best as its first row.
  for (const s of sections) s.rows.sort((a, b) => Number(b.label === "Overview") - Number(a.label === "Overview"));
  return sections;
}

/** The notes index: search, a section filter, cheat-sheet cards, then the notebook laid out like a book index. */
export function NotesBrowser({ notes }: { notes: ArticleMeta[] }) {
  const [q, setQ] = useState("");
  const [only, setOnly] = useState("All");

  const sheets = notes.filter((n) => !n.section);
  const vault = notes.filter((n) => n.section);
  const allSections = buildTree(vault);

  const needle = q.trim().toLowerCase();
  const matches = (n: ArticleMeta) => !needle || `${n.title} ${n.description} ${n.topics.join(" ")} ${(n.section ?? []).join(" ")}`.toLowerCase().includes(needle);
  const shownSheets = only === "All" || only === "Cheat sheets" ? sheets.filter(matches) : [];
  const sections = buildTree(vault.filter((n) => (only === "All" || n.section?.[0] === only) && matches(n)));
  const shown = shownSheets.length + sections.reduce((n, s) => n + s.count, 0);

  const options = [
    { value: "All", label: "All", count: notes.length },
    ...(sheets.length ? [{ value: "Cheat sheets", label: "Cheat sheets", count: sheets.length }] : []),
    ...allSections.map((s) => ({ value: s.label, label: s.label, count: s.count })),
  ];
  const toc: TocItem[] = sections.map((s) => ({ id: s.id, label: s.label, level: 2 }));

  return (
    <>
      <div className="ch-stack">
        <SearchField id="notes-search" label="Search notes" placeholder="e.g. kerberos, bash, ISO 27001" value={q} onChange={setQ} />
        {options.length > 2 && <FilterChips legend="Section" options={options} value={only} onChange={setOnly} />}
        <span className="ch-muted ch-label" role="status">
          {shown} of {notes.length} notes shown
        </span>
      </div>

      {shownSheets.length > 0 && (
        <section aria-labelledby="sheets-h" className="ch-section">
          <div className="ch-section__head">
            <h2 id="sheets-h">Cheat sheets</h2>
            <span className="ch-muted ch-label">{shownSheets.length}</span>
          </div>
          <div className="ch-grid">
            {shownSheets.map((n) => (
              <ContentCard key={n.slug} item={n} />
            ))}
          </div>
        </section>
      )}

      {sections.length > 0 && (
        <section aria-labelledby="notebook-h" className="ch-section">
          <div className="ch-section__head">
            <h2 id="notebook-h">Notebook</h2>
            <span className="ch-muted ch-label">{sections.reduce((n, s) => n + s.count, 0)}</span>
          </div>
          <div className="grid items-start gap-8 side:grid-cols-[220px_minmax(0,1fr)]">
            <div className="hidden side:sticky side:top-4 side:block">
              <TableOfContents items={toc} title="JUMP TO" />
            </div>
            <div className="ch-nb">
              {sections.map((s) => (
                <div key={s.id} className="ch-nb__section">
                  <h3 id={s.id}>
                    {s.label} <span className="ch-muted ch-label">{s.count} notes</span>
                  </h3>
                  {s.rows.map((row) => (
                    <div key={row.label} className="ch-nb__row">
                      <h4>
                        {row.label} <span className="ch-muted ch-label">{row.count}</span>
                      </h4>
                      <div className="ch-nb__cols">
                        {row.groups.map((g) => (
                          <div key={g.label} className="ch-nb__group">
                            {g.label && <p className="ch-label ch-muted">{g.label}</p>}
                            <ul>
                              {g.notes.map((n) => (
                                <li key={n.slug}>
                                  <Link href={hrefFor(n)}>{n.title}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {shown === 0 && (
        <Callout type="note" title="no matches">
          <p>Sorry, nothing matches. Try a shorter word, or choose All.</p>
        </Callout>
      )}
    </>
  );
}
