import { ArticleIndex } from "@/components/ArticleIndex";
import { getAll } from "@/lib/content";

export const metadata = { title: "Blog & writeups", description: "Articles, CTF and lab writeups, and CVE breakdowns." };

export default function BlogPage() {
  return (
    <ArticleIndex
      title="Blog & writeups"
      intro="Articles, CTF and lab writeups, and CVE breakdowns. Each one ends with how to detect and defend."
      items={getAll("blog")}
    />
  );
}
