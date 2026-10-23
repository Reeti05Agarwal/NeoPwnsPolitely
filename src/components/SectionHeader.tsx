import Link from "next/link";
import type { ReactNode } from "react";

/** Section title with an optional "View all" link, or any status on the right. */
export function SectionHeader({ id, title, href, linkText = "View all", aside }: { id: string; title: string; href?: string; linkText?: string; aside?: ReactNode }) {
  return (
    <div className="ch-section__head">
      <h2 id={id}>{title}</h2>
      {href && (
        <Link href={href}>
          {linkText}
          <span className="ch-sr"> {title}</span>
        </Link>
      )}
      {aside}
    </div>
  );
}
