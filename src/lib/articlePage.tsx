import "server-only";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/ArticleLayout";
import { getAll, getOne, toc } from "./content";
import { renderMDX } from "./mdx";

/* Shared route functions for /notes/[slug] and /blog/[slug]. */

type Params = { params: Promise<{ slug: string }> };

export function articleRoute(kind: "notes" | "blog") {
  return {
    generateStaticParams() {
      return getAll(kind).map((a) => ({ slug: a.slug }));
    },
    async generateMetadata({ params }: Params): Promise<Metadata> {
      const { slug } = await params;
      const item = getOne(kind, slug);
      if (!item) return {};
      return { title: item.meta.title, description: item.meta.description, openGraph: { type: "article" } };
    },
    async Page({ params }: Params) {
      const { slug } = await params;
      const item = getOne(kind, slug);
      if (!item) notFound();
      const video = item.meta.video ? getOne("videos", item.meta.video)?.meta : undefined;
      const content = await renderMDX(item.body);
      return (
        <ArticleLayout meta={item.meta} toc={toc(item.body)} video={video}>
          {content}
        </ArticleLayout>
      );
    },
  };
}
