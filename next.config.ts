import type { NextConfig } from "next";

// The whole site is pre-built to static files in `out/` at deploy time.
// Security headers live with the host (public/_headers for Cloudflare Pages,
// vercel.json for Vercel), because a static export cannot set them itself.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default config;
