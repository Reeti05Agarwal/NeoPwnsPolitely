import "server-only";
import { evaluate, type EvaluateOptions } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import { createCssVariablesTheme } from "shiki";
import { Callout, Responsible } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";
import { FindingsTable } from "@/components/FindingsTable";
import { Severity } from "@/components/Severity";
import { Tag } from "@/components/Tag";
import { Topic } from "@/components/Topic";

// Shiki emits CSS variables; components.css maps them to the syn-* tokens,
// so fenced code follows the brand colours and the theme toggle.
const theme = createCssVariablesTheme({ name: "npp", variablePrefix: "--shiki-", variableDefaults: {}, fontStyle: false });

function A({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

// Screenshots in imported notes load as the reader scrolls to them.
function Img({ alt = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  // eslint-disable-next-line @next/next/no-img-element -- static export, images are already plain files
  return <img alt={alt} loading="lazy" decoding="async" {...rest} />;
}

/** Components available inside every .mdx file without importing them. */
const components = { a: A, img: Img, Callout, Responsible, CodeBlock, FindingsTable, Severity, Tag, Topic };

/** `md` is plain Markdown (the imported CyberNotes): no JSX, and raw HTML is not rendered. */
export async function renderMDX(source: string, format: "mdx" | "md" = "mdx") {
  const { default: Content } = await evaluate(source, {
    ...(runtime as unknown as Pick<EvaluateOptions, "Fragment" | "jsx" | "jsxs">),
    format,
    remarkPlugins: [remarkGfm],
    // Unlabelled or unknown fence languages render as plain text instead of failing the build.
    rehypePlugins: [rehypeSlug, [rehypeShiki, { theme, defaultLanguage: "text", fallbackLanguage: "text" }]],
  });
  return <Content components={components} />;
}
