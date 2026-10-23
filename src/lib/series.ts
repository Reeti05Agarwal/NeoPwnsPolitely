export const SERIES = [
  { slug: "knock-knock", name: "Knock Knock", about: "Recon and enumeration: scanning, discovery, OSINT." },
  { slug: "excuse-me-root", name: "Excuse Me, Root?", about: "Privilege escalation on Linux and Windows." },
  { slug: "pardon-the-intrusion", name: "Pardon the Intrusion", about: "CVE breakdowns: root cause, patch, lab, detection." },
  { slug: "mind-your-logs", name: "Mind Your Logs", about: "Blue team: detection, logging, incident response." },
  { slug: "may-i-come-in", name: "May I Come In?", about: "Initial access and web attacks, in the lab." },
  { slug: "sixty-seconds-please", name: "Sixty Seconds, Please", about: "Shorts: one concept or command in a minute." },
] as const;

export type SeriesSlug = (typeof SERIES)[number]["slug"];

export function getSeries(slug: string) {
  return SERIES.find((s) => s.slug === slug);
}

/** Thumbnail kicker, e.g. "EXCUSE ME, ROOT? · EP 31". */
export function kicker(seriesSlug: string, episode?: number) {
  const s = getSeries(seriesSlug);
  if (!s) return undefined;
  if (s.slug === "sixty-seconds-please") return "60 SECONDS, PLEASE";
  return episode ? `${s.name.toUpperCase()} · EP ${episode}` : s.name.toUpperCase();
}
