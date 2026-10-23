import { Severity, type SeverityLevel } from "./Severity";

const PLUS = (() => {
  const d: string[] = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 9; c++) {
      const x = 24 + c * 40;
      const y = 20 + r * 40;
      d.push(`M${x - 3},${y}h6M${x},${y - 3}v6`);
    }
  return d.join("");
})();

export interface ThumbnailProps {
  title: string;
  kicker?: string;
  duration?: string;
  tone?: "slate" | "ink" | "cherry";
  severity?: SeverityLevel;
  score?: number;
  /** Empty string when the card around it already names the video. */
  alt?: string;
}

/** 16:9 thumbnail: series kicker, title, duration badge, optional severity. */
export function Thumbnail({ title, kicker, duration, tone, severity, score, alt }: ThumbnailProps) {
  const toneCls = tone && tone !== "slate" ? ` ch-thumb--${tone}` : "";
  const decorative = alt === "";
  return (
    <div className={`ch-thumb${toneCls}`} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : alt ?? `Thumbnail: ${title}`} aria-hidden={decorative || undefined}>
      <svg className="ch-thumb__grid" viewBox="0 0 360 202" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d={PLUS} stroke="#c9d3df" strokeOpacity={0.35} strokeWidth={1.5} fill="none" />
      </svg>
      {severity && (
        <span className="ch-thumb__sev">
          <Severity level={severity} score={score} />
        </span>
      )}
      {kicker && (
        <span className="ch-thumb__kicker" aria-hidden="true">
          {kicker}
        </span>
      )}
      <span className="ch-thumb__title" aria-hidden="true">
        {title}
      </span>
      {duration && (
        <span className="ch-thumb__dur" aria-hidden="true">
          {duration}
        </span>
      )}
    </div>
  );
}
