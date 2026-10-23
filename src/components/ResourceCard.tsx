import { Icon } from "./Icon";
import { Topic } from "./Topic";
import type { Resource } from "@/lib/resources";

/** External tool, lab or reference. Opens the official site in a new tab. */
export function ResourceCard({ resource: r }: { resource: Resource }) {
  return (
    <article className="ch-res">
      <div className="ch-res__top">
        <div>
          <h3 className="ch-res__name">
            <a href={r.href} target="_blank" rel="noopener noreferrer">
              {r.name}
              <span className="ch-sr"> (opens {r.domain})</span>
            </a>
          </h3>
          <span className="ch-res__domain">
            {r.domain}
            <Icon name="external" size={14} />
          </span>
        </div>
        <span className="ch-tag ch-tag--link">{r.type.toUpperCase()}</span>
      </div>
      <p className="ch-res__desc">{r.description}</p>
      <div className="ch-row">
        <span className="ch-topic">{r.pricing}</span>
        {r.topics.map((t) => (
          <Topic key={t}>{t}</Topic>
        ))}
      </div>
    </article>
  );
}
