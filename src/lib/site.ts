export const site = {
  name: "Neo Pwns Politely",
  tagline: "Ethical hacking, with manners.",
  description:
    "Understand the attack, then build the defence. Deep security topics explained fast and applied in real labs, with notes, exact commands and resources for every video.",
  // Set NEXT_PUBLIC_SITE_URL in the host's build settings once the domain is final.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://neopwnspolitely.com").replace(/\/$/, ""),
  handle: "@NeoPwnsPolitely",
  youtube: "https://www.youtube.com/@NeoPwnsPolitely",
  github: "https://github.com/NeoPwnsPolitely",
  x: "https://x.com/NeoPwnsPolitely",
  instagram: "https://www.instagram.com/NeoPwnsPolitely",
  responsibleUse:
    "Polite hackers ask first. Only test systems you own or have written permission to test.",
} as const;

export const NAV = [
  { href: "/videos/", key: "videos", label: "Videos" },
  { href: "/notes/", key: "notes", label: "Notes" },
  { href: "/blog/", key: "blog", label: "Blog" },
  { href: "/resources/", key: "resources", label: "Resources" },
  { href: "/about/", key: "about", label: "About" },
] as const;
