/* Which parts of the CyberNotes Obsidian vault go on the site.
   `npm run import-notes` reads this, converts the notes and writes them to
   content/notes/vault/ (and their images to public/notes/img/). Only folders
   listed in `include` are published; everything else stays private. */

export default {
  // Path to the vault. Override with CYBERNOTES_DIR=... when it lives elsewhere.

  vault: process.env.CYBERNOTES_DIR ?? "../CyberNotes",

  // Top-level vault folders to publish, mapped to the site topic they get.
  // Left out on purpose: 0 - Projects (pentest reports, CTFs, home server),
  // 00 - Other, 0000 - BugBounty, 30 - Bug Bounties, templates and images.
  include: {
    "000 - Programming": "programming",
    "001 - Tools": "tools",
    "01 - Cyber Security Fundamentals": "fundamentals",
    "02 - Systems": "systems",
    "03 - Networking": "network",
    "04 - Web Application": "web",
    "05 - Databases": "databases",
    "08 - Docker": "containers",
    "09 - Backend & Data Streams": "backend",
    "10 - Vuln Assessment": "vuln-assessment",
    "11 - OWASP": "web",
    "12 - OSINT & Recon": "osint",
    "13 - Social Engineering": "social-engineering",
    "14 - Penetration Testing": "pentest",
    "15 - File Trasnfer": "pentest",
    "16 - Reverse Shells": "pentest",
    "17 - Privilege Escalation": "privesc",
    "19 - Exploit Coding": "exploit-dev",
    "20 - PWN": "exploit-dev",
    "21 - Reverse Engineering": "reversing",
    "22 - Malware Analysis": "malware",
    "23 - Cryptography": "crypto",
    "24 - Digital Forensics": "forensics",
    "25 - Log Analysis": "blue-team",
    "31 - Cloud Security": "cloud",
    "32 - AI Security": "ai",
    "33 - API Security": "api",
    "34 - Endpoint Security": "blue-team",
    "35 - Blockchain": "blockchain",
    "36 - Android Security": "mobile",
    "37 - Distributed Systems": "systems",
    "40 - Big Data": "data",
    "41 - Cisco": "network",
    "42 - PanOS": "network",
    "43 - Nutanix": "systems",
  },

  // Sub-folders inside an included folder that stay private (vault-relative paths).
  // A single note can also opt out with `publish: false` in its frontmatter.
  exclude: ["02 - Systems/My Kali Configurations"],

  // Topics whose notes show the Legal (responsible-use) callout at the top.
  offensive: ["web", "vuln-assessment", "osint", "social-engineering", "pentest", "privesc", "exploit-dev", "api", "tools"],
};
