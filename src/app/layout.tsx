import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { site } from "@/lib/site";
import "./globals.css";

// PT Mono is served from this site, with no layout jump. Add Proto Mono here
// (and first in --font-stack in tokens.css) once the font files are licensed.
const ptMono = localFont({
  src: "../fonts/PTMono-Regular.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-pt-mono",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: "/favicon.svg" },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { siteName: site.name, type: "website", images: ["/mark.svg"] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#101015" },
    { media: "(prefers-color-scheme: light)", color: "#f1f0e1" },
  ],
};

// Runs before paint so the saved or system theme shows with no flash. Dark is the default.
const themeScript = `(function(){try{var t=localStorage.getItem("npp-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ptMono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="ch">
        <SiteHeader />
        {children}
        <SiteFooter />
        {plausibleDomain && <Script src="https://plausible.io/js/script.js" data-domain={plausibleDomain} strategy="afterInteractive" />}
      </body>
    </html>
  );
}
