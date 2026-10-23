import type { SeverityLevel } from "@/components/Severity";

/* Content types, kept apart from content.ts so client components can use them
   without pulling in the file-system loader. */

export type Kind = "videos" | "notes" | "blog";

export interface Link {
  label: string;
  href: string;
}

interface BaseMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO, e.g. 2026-10-18
  verified?: string; // ISO, "Last verified" date
  topics: string[];
  severity?: SeverityLevel;
  score?: number;
  /** Shows the Legal callout above the content. Set on anything with offensive technique. */
  offensive?: boolean;
  references?: Link[];
}

export interface VideoMeta extends BaseMeta {
  kind: "videos";
  youtubeId?: string;
  duration: string; // "14:08"
  series: string; // series slug
  episode?: number;
  thumbTitle?: string;
  tone?: "slate" | "ink" | "cherry";
  caption?: string;
  chapters: { time: string; label: string }[];
  notes?: string; // slug of the companion note
  labFiles?: Link;
}

export interface ArticleMeta extends BaseMeta {
  kind: "notes" | "blog";
  readTime: number; // minutes, computed
  video?: string; // slug of the companion video
}

export type Meta = VideoMeta | ArticleMeta;

export interface TocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export function hrefFor(meta: Pick<Meta, "kind" | "slug">) {
  return `/${meta.kind}/${meta.slug}/`;
}
