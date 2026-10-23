"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { toSeconds } from "@/lib/format";

/*
 * Lite YouTube player. Nothing loads from YouTube until someone presses play,
 * so the page stays fast and viewers who never press play are not tracked.
 * The embed uses youtube-nocookie.com with captions on by default.
 * Chapters in the sidebar share state with the player through VideoProvider.
 */

interface Chapter {
  time: string;
  label: string;
}

interface VideoState {
  youtubeId?: string;
  chapters: Chapter[];
  start: number | null; // seconds; null until play is pressed
  active: number | null;
  play: (chapter?: number) => void;
}

const VideoContext = createContext<VideoState | null>(null);

function useVideo() {
  const ctx = useContext(VideoContext);
  if (!ctx) throw new Error("Video components need a <VideoProvider>.");
  return ctx;
}

export function VideoProvider({ youtubeId, chapters, children }: { youtubeId?: string; chapters: Chapter[]; children: ReactNode }) {
  const [start, setStart] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  function play(chapter?: number) {
    if (chapter == null) {
      setStart(0);
      setActive(chapters.length ? 0 : null);
    } else {
      setStart(toSeconds(chapters[chapter].time));
      setActive(chapter);
    }
  }
  return <VideoContext.Provider value={{ youtubeId, chapters, start, active, play }}>{children}</VideoContext.Provider>;
}

export function VideoPlayer({ title, duration, caption }: { title: string; duration: string; caption?: string }) {
  const { youtubeId, start, chapters, active, play } = useVideo();

  if (youtubeId && start !== null) {
    const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1&cc_load_policy=1&rel=0&start=${start}`;
    return (
      <div className="ch-player">
        <iframe
          key={start}
          src={src}
          title={`Video player: ${title}`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  const position = active != null ? chapters[active].time : "00:00";
  return (
    <div className="ch-player" role="region" aria-label={`Video player: ${title}`}>
      <button type="button" className="ch-player__play" onClick={() => play()} disabled={!youtubeId} aria-label={youtubeId ? `Play video: ${title}` : "Video not published yet"}>
        <Icon name="play" size={32} />
      </button>
      {!youtubeId ? <span className="ch-player__cc">Coming soon. The notes are ready now.</span> : caption && <span className="ch-player__cc">{caption}</span>}
      <div className="ch-player__bar">
        <span>
          {position} / {duration}
        </span>
        <span className="ch-row">
          <Icon name="captions" size={16} />
          CC on
        </span>
      </div>
    </div>
  );
}

export function Chapters() {
  const { chapters, active, play, youtubeId } = useVideo();
  if (!chapters.length) return null;
  return (
    <nav className="ch-chapters" aria-labelledby="ch-chap-h">
      <h2 id="ch-chap-h">CHAPTERS</h2>
      <ol>
        {chapters.map((c, i) => (
          <li key={c.time}>
            <button type="button" aria-current={active === i ? "true" : undefined} onClick={() => play(i)} disabled={!youtubeId}>
              <time>{c.time}</time>
              <span>
                {c.label}
                {youtubeId && <span className="ch-sr"> (play from {c.time})</span>}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
