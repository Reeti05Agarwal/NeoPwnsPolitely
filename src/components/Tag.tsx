import type { ReactNode } from "react";

export type TagKind = "video" | "notes" | "blog" | "link";

const LABEL: Record<TagKind, string> = { video: "VIDEO", notes: "NOTES", blog: "BLOG", link: "LINK" };

/** Content-type tag: always a word plus a colour, never colour alone. */
export function Tag({ kind = "notes", children }: { kind?: TagKind; children?: ReactNode }) {
  return <span className={`ch-tag ch-tag--${kind}`}>{children ?? LABEL[kind]}</span>;
}

/** Maps a content folder to its tag. */
export function tagKind(kind: "videos" | "notes" | "blog"): TagKind {
  return kind === "videos" ? "video" : kind;
}
