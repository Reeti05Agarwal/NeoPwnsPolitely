import "server-only";
import { evaluate, type EvaluateOptions } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import type { AnchorHTMLAttributes } from "react";
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

/** Components available inside every .mdx file without importing them. */
const components = { a: A, Callout, Responsible, CodeBlock, FindingsTable, Severity, Tag, Topic };

export async function renderMDX(source: string) {
  const { default: Content } = await evaluate(source, {
    ...(runtime as unknown as Pick<EvaluateOptions, "Fragment" | "jsx" | "jsxs">),
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeShiki, { theme }]],
  });
  return <Content components={components} />;
}
