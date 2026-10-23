export type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";

export const SEVERITY_ORDER: SeverityLevel[] = ["critical", "high", "medium", "low", "info"];

/** Five-step severity badge. Shows the word and, when known, the CVSS score: "CRITICAL 9.8". */
export function Severity({ level = "info", score }: { level?: SeverityLevel; score?: number }) {
  const lv = level.toLowerCase() as SeverityLevel;
  return (
    <span className={`ch-sev ch-sev--${lv}`} role="img" aria-label={`Severity ${lv}${score != null ? `, CVSS ${score}` : ""}`}>
      <span aria-hidden="true">{lv.toUpperCase()}</span>
      {score != null && <b aria-hidden="true">{score.toFixed(1)}</b>}
    </span>
  );
}
