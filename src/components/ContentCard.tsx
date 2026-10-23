import Link from "next/link";
import { Tag, tagKind } from "./Tag";
import { Severity } from "./Severity";
import { Topic } from "./Topic";
import { hrefFor, type ArticleMeta } from "@/lib/meta";
import { formatDate } from "@/lib/format";

/** Panel card for notes and blog posts. */
export function ContentCard({ item, showDate = true }: { item: ArticleMeta; showDate?: boolean }) {
  return (
    <article className="ch-card ch-card--panel">
      <div className="ch-row">
        <Tag kind={tagKind(item.kind)} />
        {item.severity && <Severity level={item.severity} score={item.score} />}
        {item.topics.map((t) => (
          <Topic key={t}>{t}</Topic>
        ))}
      </div>
      <h3 className="ch-card__title">
        <Link href={hrefFor(item)}>{item.title}</Link>
      </h3>
      {item.description && <p className="ch-card__excerpt">{item.description}</p>}
      <div className="ch-meta">
        <span>Read time {item.readTime} min</span>
        {showDate && <span>{formatDate(item.date)}</span>}
      </div>
    </article>
  );
}
