"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/meta";

/** "On this page" list. Marks the section being read as the reader scrolls. */
export function TableOfContents({ items, title = "ON THIS PAGE" }: { items: TocItem[]; title?: string }) {
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    const headings = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;
  return (
    <nav className="ch-toc" aria-labelledby="ch-toc-h">
      <h2 id="ch-toc-h">{title}</h2>
      <ol>
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? "ch-toc--l3" : undefined}>
            <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined}>
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
