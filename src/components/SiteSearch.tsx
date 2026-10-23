"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Callout } from "./Callout";
import { SearchField } from "./SearchField";

/* Static-site search with Pagefind: the index is built at deploy time and
   searched in the browser, with no server and no third party. */

interface PagefindResult {
  url: string;
  excerpt: string;
  meta: { title?: string };
}

interface Pagefind {
  init?: () => Promise<void>;
  debouncedSearch: (q: string) => Promise<{ results: { data: () => Promise<PagefindResult> }[] } | null>;
}

declare global {
  interface Window {
    __pagefind?: Pagefind;
  }
}

type Status = "loading" | "ready" | "unavailable";

/** Pagefind wraps matches in <mark>; keep those and escape everything else. */
function excerptParts(html: string) {
  return html.split(/(<mark>.*?<\/mark>)/g).map((part, i) => {
    const m = /^<mark>(.*)<\/mark>$/.exec(part);
    const text = (m ? m[1] : part).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    return m ? (
      <mark key={i} className="bg-mist-100 text-on-mist">
        {text}
      </mark>
    ) : (
      text
    );
  });
}

export function SiteSearch() {
  const [status, setStatus] = useState<Status>("loading");
  const [q, setQ] = useState("");
  const [results, setResults] = useState<PagefindResult[] | null>(null);

  useEffect(() => {
    const ready = () => {
      const pf = window.__pagefind;
      Promise.resolve(pf?.init?.()).finally(() => setStatus("ready"));
    };
    if (window.__pagefind) {
      ready(); // already loaded by an earlier visit to this page
      return;
    }
    window.addEventListener("pagefind-ready", ready, { once: true });
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/pagefind-loader.js";
    // The index only exists after `npm run build`; in `next dev` this fails.
    script.onerror = () => setStatus("unavailable");
    document.body.appendChild(script);
    return () => window.removeEventListener("pagefind-ready", ready);
  }, []);

  useEffect(() => {
    const pf = window.__pagefind;
    if (status !== "ready" || !pf) return;
    let cancelled = false;
    const needle = q.trim();
    if (!needle) {
      Promise.resolve().then(() => !cancelled && setResults(null));
      return () => {
        cancelled = true;
      };
    }
    pf.debouncedSearch(needle).then(async (res) => {
      if (!res || cancelled) return; // null means a newer search replaced this one
      const data = await Promise.all(res.results.slice(0, 20).map((r) => r.data()));
      if (!cancelled) setResults(data);
    });
    return () => {
      cancelled = true;
    };
  }, [q, status]);

  if (status === "unavailable") {
    return (
      <Callout type="note" title="search not built">
        <p>
          The search index is created by <code>npm run build</code>. Run a production build to try search locally.
        </p>
      </Callout>
    );
  }

  return (
    <div className="ch-stack gap-8">
      <SearchField id="site-search" label="Search videos, notes, writeups and resources" placeholder="e.g. kerberoasting, ssrf, 4769" value={q} onChange={setQ} autoFocus />
      <p className="ch-muted ch-label" role="status">
        {status === "loading" ? "Loading search…" : results ? `${results.length} result${results.length === 1 ? "" : "s"}` : ""}
      </p>
      {results && results.length === 0 && (
        <Callout type="note" title="no matches">
          <p>Sorry, nothing matches. Try removing a filter or a shorter word.</p>
        </Callout>
      )}
      {results && results.length > 0 && (
        <ol className="m-0 grid list-none gap-4 p-0">
          {results.map((r) => (
            <li key={r.url} className="ch-card ch-card--panel">
              <h2 className="ch-card__title">
                <Link href={r.url}>{r.meta.title ?? r.url}</Link>
              </h2>
              <p className="ch-card__excerpt">{excerptParts(r.excerpt)}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
