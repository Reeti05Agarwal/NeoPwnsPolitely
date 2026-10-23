import Link from "next/link";

/** Breadcrumb trail; the last item is the current page. */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="ch-crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>
            {i === items.length - 1 || !it.href ? <span aria-current={i === items.length - 1 ? "page" : undefined}>{it.label}</span> : <Link href={it.href}>{it.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
