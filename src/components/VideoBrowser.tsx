"use client";

import { useEffect, useState } from "react";
import { FilterChips } from "./FilterChips";
import { VideoCard } from "./VideoCard";
import { Callout } from "./Callout";
import type { VideoMeta } from "@/lib/meta";
import { SERIES } from "@/lib/series";

/** All videos, filterable by series. Reads and writes ?series= so footer links land filtered. */
export function VideoBrowser({ videos }: { videos: VideoMeta[] }) {
  const [series, setSeries] = useState("all");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("series");
    // Syncing from the URL once on load; the static HTML shows all videos.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (s && SERIES.some((x) => x.slug === s)) setSeries(s);
  }, []);

  function choose(value: string) {
    setSeries(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("series");
    else url.searchParams.set("series", value);
    window.history.replaceState(null, "", url);
  }

  const list = series === "all" ? videos : videos.filter((v) => v.series === series);
  const options = [
    { value: "all", label: "All", count: videos.length },
    ...SERIES.map((s) => ({ value: s.slug, label: s.name, count: videos.filter((v) => v.series === s.slug).length })),
  ];
  const current = SERIES.find((s) => s.slug === series);

  return (
    <div className="ch-stack gap-8">
      <FilterChips legend="Series" options={options} value={series} onChange={choose} />
      <section className="ch-section" aria-labelledby="vid-h">
        <div className="ch-section__head">
          <h2 id="vid-h">{current ? current.name : "All videos"}</h2>
          <span className="ch-muted ch-label" role="status">
            {list.length} of {videos.length} shown
          </span>
        </div>
        {current && <p className="ch-muted">{current.about}</p>}
        {list.length ? (
          <div className="ch-grid">
            {list.map((v) => (
              <VideoCard key={v.slug} video={v} />
            ))}
          </div>
        ) : (
          <Callout type="note" title="no episodes yet">
            <p>Sorry, nothing here yet. New episodes every week; try another series.</p>
          </Callout>
        )}
      </section>
    </div>
  );
}
