"use client";

import { useEffect, useState } from "react";
import { Callout } from "./Callout";
import { FilterChips } from "./FilterChips";
import { ResourceCard } from "./ResourceCard";
import { SearchField } from "./SearchField";
import { RESOURCES, RESOURCE_TOPICS, RESOURCE_TYPES, type ResourceType } from "@/lib/resources";

/** Search, a single-choice type filter, a multi-choice topic filter and a live count. */
export function ResourceBrowser() {
  const [type, setType] = useState<"All" | ResourceType>("All");
  const [topics, setTopics] = useState<string[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    // Syncing from the URL once on load; the static HTML shows every resource.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (t && (RESOURCE_TYPES as string[]).includes(t)) setType(t as ResourceType);
  }, []);

  function chooseType(value: string) {
    setType(value as "All" | ResourceType);
    const url = new URL(window.location.href);
    if (value === "All") url.searchParams.delete("type");
    else url.searchParams.set("type", value);
    window.history.replaceState(null, "", url);
  }

  function toggleTopic(t: string) {
    setTopics((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  }

  const needle = q.trim().toLowerCase();
  const list = RESOURCES.filter((r) => {
    if (type !== "All" && r.type !== type) return false;
    if (topics.length && !topics.some((t) => r.topics.includes(t))) return false;
    return !needle || `${r.name} ${r.description} ${r.domain} ${r.topics.join(" ")}`.toLowerCase().includes(needle);
  });

  const typeOptions = [
    { value: "All", label: "All", count: RESOURCES.length },
    ...RESOURCE_TYPES.map((t) => ({ value: t, label: `${t === "Docs" ? "Docs" : `${t}s`}`, count: RESOURCES.filter((r) => r.type === t).length })),
  ];

  return (
    <>
      <div className="ch-stack">
        <SearchField id="res-search" label="Search resources" placeholder="e.g. scanner, kerberos, wireshark" value={q} onChange={setQ} />
        <FilterChips legend="Type" options={typeOptions} value={type} onChange={chooseType} />
        <FilterChips legend="Topic (choose any)" options={RESOURCE_TOPICS.map((t) => ({ value: t, label: `#${t}` }))} value={topics} onChange={toggleTopic} />
      </div>
      <section aria-labelledby="res-h" className="ch-section">
        <div className="ch-section__head">
          <h2 id="res-h">{type === "All" ? "All resources" : typeOptions.find((o) => o.value === type)?.label}</h2>
          <span className="ch-muted ch-label" role="status">
            {list.length} of {RESOURCES.length} shown
          </span>
        </div>
        {list.length ? (
          <div className="ch-grid">
            {list.map((r) => (
              <ResourceCard key={r.name} resource={r} />
            ))}
          </div>
        ) : (
          <Callout type="note" title="no matches">
            <p>Sorry, nothing matches. Try removing a filter or a shorter word.</p>
          </Callout>
        )}
      </section>
    </>
  );
}
