"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Button } from "./Button";
import { NAV, site } from "@/lib/site";

type Theme = "dark" | "light";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The inline script in layout.tsx sets data-theme before paint; this follows it.
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => null);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("npp-theme", next);
    } catch {
      // Storage can be blocked; the choice then lasts for this page only.
    }
  }

  return (
    <>
      <a className="ch-skip" href="#main">
        Skip to content
      </a>
      <header className="ch-header">
        <div className="ch-header__in">
          <Link className="ch-brand" href="/">
            <span className="ch-brand__prompt" aria-hidden="true">
              &gt;_
            </span>
            {site.name}
          </Link>
          <nav className="ch-nav" id="ch-nav" aria-label="Main" data-open={open}>
            {NAV.map((n) => (
              <Link key={n.key} href={n.href} aria-current={pathname?.startsWith(`/${n.key}`) ? "page" : undefined} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ch-header__tools">
            <Button variant="ghost" iconOnly icon="search" href="/search/">
              Search
            </Button>
            <Button variant="ghost" iconOnly icon={theme === "light" ? "moon" : "sun"} onClick={toggleTheme}>
              {theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            </Button>
            <Button variant="accent" icon="play" className="ch-header__sub" href={site.youtube} external>
              Subscribe
            </Button>
            <Button variant="ghost" iconOnly icon={open ? "close" : "menu"} className="ch-header__menu" aria-expanded={open} aria-controls="ch-nav" onClick={() => setOpen(!open)}>
              Menu
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
