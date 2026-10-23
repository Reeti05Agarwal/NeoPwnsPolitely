import type { MetadataRoute } from "next";
import { getAll, hrefFor } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/videos/", "/notes/", "/blog/", "/resources/", "/about/"].map((p) => ({ url: `${site.url}${p}` }));
  const content = [...getAll("videos"), ...getAll("notes"), ...getAll("blog")].map((m) => ({
    url: `${site.url}${hrefFor(m)}`,
    lastModified: m.verified ?? m.date,
  }));
  return [...pages, ...content];
}
