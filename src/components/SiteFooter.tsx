import Link from "next/link";
import { site } from "@/lib/site";
import { SERIES } from "@/lib/series";

function Column({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ) : (
              <Link href={l.href}>{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="ch-footer">
      <div className="ch-footer__in">
        <div className="ch-stack gap-2">
          <span className="ch-brand">
            <span className="ch-brand__prompt" aria-hidden="true">
              &gt;_
            </span>
            {site.name}
          </span>
          <p className="ch-muted text-body-small">
            Ethical hacking, with manners. Deep security topics explained fast, with every command and resource in one place. Stay curious. Stay polite.
          </p>
        </div>
        <Column title="SERIES" links={SERIES.slice(0, 4).map((s) => ({ label: s.name, href: `/videos/?series=${s.slug}` }))} />
        <Column
          title="RESOURCES"
          links={[
            { label: "Tools", href: "/resources/?type=Tool" },
            { label: "Practice labs", href: "/resources/?type=Lab" },
            { label: "References", href: "/resources/?type=Docs" },
            { label: "Search", href: "/search/" },
          ]}
        />
        <Column
          title="CHANNEL"
          links={[
            { label: "YouTube (opens YouTube)", href: site.youtube, external: true },
            { label: "About", href: "/about/" },
            { label: "Contact", href: "/about/#contact" },
            { label: "RSS feed", href: "/rss.xml" },
          ]}
        />
        <p className="ch-footer__legal">
          {site.responsibleUse} Everything here is for education and authorised testing. Captions and transcripts are available for every video.
        </p>
      </div>
    </footer>
  );
}
