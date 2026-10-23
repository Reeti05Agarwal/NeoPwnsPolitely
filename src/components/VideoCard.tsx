import Link from "next/link";
import { Thumbnail } from "./Thumbnail";
import { Tag } from "./Tag";
import { Topic } from "./Topic";
import { hrefFor, type VideoMeta } from "@/lib/meta";
import { formatDate } from "@/lib/format";
import { kicker } from "@/lib/series";

/** Video card: thumbnail, VIDEO tag and topics, title, duration and date. */
export function VideoCard({ video, titlePrefix, headingLevel = 3 }: { video: VideoMeta; titlePrefix?: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="ch-card">
      <Thumbnail title={video.thumbTitle ?? video.title} kicker={kicker(video.series, video.episode)} duration={video.duration} tone={video.tone} severity={video.severity} score={video.score} alt="" />
      <div className="ch-row">
        <Tag kind="video" />
        {video.topics.map((t) => (
          <Topic key={t}>{t}</Topic>
        ))}
      </div>
      <H className="ch-card__title">
        <Link href={hrefFor(video)}>
          {titlePrefix}
          {video.title}
        </Link>
      </H>
      <div className="ch-meta">
        <span>
          <span className="ch-sr">Duration </span>
          {video.duration}
        </span>
        <span>{formatDate(video.date)}</span>
      </div>
    </article>
  );
}
