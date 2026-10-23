/** Plain topic label with a #, no colour. */
export function Topic({ children }: { children: string }) {
  return <span className="ch-topic">#{children.replace(/^#/, "")}</span>;
}
