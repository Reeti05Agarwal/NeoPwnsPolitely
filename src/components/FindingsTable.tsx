import type { ReactNode } from "react";
import { SEVERITY_ORDER, Severity, type SeverityLevel } from "./Severity";

export interface Finding {
  id: string;
  finding: ReactNode;
  severity: SeverityLevel;
  score?: number;
  fix: ReactNode;
}

/** Findings sorted by severity, then by score. Scrolls sideways on small screens. */
export function FindingsTable({ caption = "Findings", rows }: { caption?: string; rows: Finding[] }) {
  const sorted = [...rows].sort((a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity) || (b.score ?? 0) - (a.score ?? 0));
  return (
    // The wrapper scrolls, so it must be focusable for keyboard users.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="ch-table-wrap" tabIndex={0} role="region" aria-label={caption}>
      <table className="ch-table">
        <caption className="ch-sr">{caption}</caption>
        <thead>
          <tr>
            {["ID", "FINDING", "SEVERITY", "FIX"].map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr key={r.id}>
              <td>
                <code>{r.id}</code>
              </td>
              <td>{r.finding}</td>
              <td>
                <Severity level={r.severity} score={r.score} />
              </td>
              <td>{r.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
