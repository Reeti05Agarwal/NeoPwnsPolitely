const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "2026-10-22" → "22 Oct 2026", the house date style. */
export function formatDate(iso: string) {
  return DATE.format(new Date(`${iso}T00:00:00Z`));
}

/** "14:08" → "14 min"; "1:02:30" → "1 h 3 min". */
export function durationLabel(duration: string) {
  const parts = duration.split(":").map(Number);
  const seconds = parts.reduce((acc, n) => acc * 60 + n, 0);
  const minutes = Math.round(seconds / 60);
  return minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
}

/** "05:45" → 345 */
export function toSeconds(time: string) {
  return time.split(":").map(Number).reduce((acc, n) => acc * 60 + n, 0);
}
