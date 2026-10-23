import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { SERIES } from "@/lib/series";
import { site } from "@/lib/site";

export const metadata = { title: "About", description: "Who Neo is, what “pwn” means, the series, and the rules every hack here follows." };

export default function AboutPage() {
  return (
    <main id="main" className="ch-main ch-main--tight" data-pagefind-body>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <div className="grid items-start gap-8 side:grid-cols-[minmax(0,1fr)_240px]">
        <article className="ch-prose">
          <h1 className="ch-hero-title">Hi, I&rsquo;m Neo. Let&rsquo;s pwn something, politely.</h1>
          <p className="ch-muted">{site.tagline} Break it. Explain it. Fix it. Politely.</p>

          <h2 id="the-name">The name</h2>
          <p>
            <strong className="font-normal">Pwn</strong> (said &ldquo;pawn&rdquo;, /poʊn/) is hacker slang for taking full control of a system. <strong className="font-normal">Politely</strong> is the other half: every hack here is authorised, explained and cleaned up afterwards. Real offensive skill, good manners.
          </p>

          <h2 id="what-you-get">What you get</h2>
          <p>Deep security topics explained fast. Every topic moves from how it works, to how it is exploited, to how to detect and defend it. Videos come with written notes, every command shown on screen, and links to the official sources.</p>

          <h2 id="series">The series</h2>
          <ul>
            {SERIES.map((s) => (
              <li key={s.slug}>
                <Link href={`/videos/?series=${s.slug}`}>{s.name}</Link>: {s.about}
              </li>
            ))}
          </ul>

          <h2 id="rules">The rules</h2>
          <Callout type="legal">
            <p>{site.responsibleUse} Lab targets on this site are intentionally vulnerable and run locally.</p>
          </Callout>
          <ul>
            <li>Examples use documentation-safe addresses only: <code>10.10.10.5</code>, <code>192.0.2.10</code>, <code>target.example</code>, <code>lab.local</code>.</li>
            <li>Secrets are redacted and indicators of compromise are defanged: <code>hxxp://evil[.]example</code>.</li>
            <li>Every attack walkthrough ends with how to detect it and how to fix it.</li>
          </ul>

          <h2 id="contact">Contact</h2>
          <p>The best way to reach Neo is a comment on the latest video, or the channels below. Corrections are always welcome: please include the page and what changed.</p>
          <div className="ch-row gap-4">
            <Button variant="accent" icon="play" href={site.youtube} external>
              Subscribe
            </Button>
            <Button variant="outline" icon="external" href={site.github} external>
              GitHub
            </Button>
            <Button variant="outline" icon="external" href={site.x} external>
              X
            </Button>
          </div>
          <p className="ch-muted text-body-small">New episodes every week. Thank you for being here.</p>
        </article>
        {/* The mark carries its own ground, so it does not change with the theme. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, SVG mark */}
        <img src="/mark.svg" alt="The Neo Pwns Politely mark: a smiling character in cherry headphones with a shield-shaped prompt badge" width={240} height={240} className="hidden rounded-md side:block" />
      </div>
    </main>
  );
}
