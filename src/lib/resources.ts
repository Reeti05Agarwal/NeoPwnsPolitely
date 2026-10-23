export type ResourceType = "Tool" | "Lab" | "Docs";

export interface Resource {
  name: string;
  href: string;
  domain: string;
  type: ResourceType;
  description: string;
  pricing: "Free" | "Free + paid" | "Paid";
  topics: string[];
}

export const RESOURCE_TYPES: ResourceType[] = ["Tool", "Lab", "Docs"];

export const RESOURCE_TOPICS = [
  "network",
  "web",
  "active-directory",
  "cloud",
  "forensics",
  "blue-team",
  "red-team",
  "ctf",
  "linux",
  "vulns",
];

export const RESOURCES: Resource[] = [
  { name: "Nmap", href: "https://nmap.org/", domain: "nmap.org", type: "Tool", description: "Network discovery and port scanning. The first tool in almost every engagement.", pricing: "Free", topics: ["network"] },
  { name: "Wireshark", href: "https://www.wireshark.org/", domain: "wireshark.org", type: "Tool", description: "Capture and read network traffic packet by packet.", pricing: "Free", topics: ["network", "forensics"] },
  { name: "Burp Suite Community", href: "https://portswigger.net/burp/communitydownload", domain: "portswigger.net", type: "Tool", description: "Intercepting proxy for testing web applications.", pricing: "Free", topics: ["web"] },
  { name: "Impacket", href: "https://github.com/fortra/impacket", domain: "github.com", type: "Tool", description: "Python classes and scripts for Windows network protocols.", pricing: "Free", topics: ["active-directory"] },
  { name: "CyberChef", href: "https://gchq.github.io/CyberChef/", domain: "gchq.github.io", type: "Tool", description: "Encode, decode, decrypt and analyse data in the browser.", pricing: "Free", topics: ["forensics", "ctf"] },
  { name: "Web Security Academy", href: "https://portswigger.net/web-security", domain: "portswigger.net", type: "Lab", description: "Free hands-on labs for every major web vulnerability.", pricing: "Free", topics: ["web"] },
  { name: "TryHackMe", href: "https://tryhackme.com/", domain: "tryhackme.com", type: "Lab", description: "Guided rooms from beginner to advanced, in the browser.", pricing: "Free + paid", topics: ["ctf"] },
  { name: "Hack The Box", href: "https://www.hackthebox.com/", domain: "hackthebox.com", type: "Lab", description: "Realistic machines and pro labs for practice.", pricing: "Free + paid", topics: ["ctf", "red-team"] },
  { name: "MITRE ATT&CK", href: "https://attack.mitre.org/", domain: "attack.mitre.org", type: "Docs", description: "The shared map of attacker techniques, with detections.", pricing: "Free", topics: ["blue-team"] },
  { name: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/", domain: "owasp.org", type: "Docs", description: "The most critical web application security risks.", pricing: "Free", topics: ["web"] },
  { name: "NVD", href: "https://nvd.nist.gov/", domain: "nvd.nist.gov", type: "Docs", description: "Search CVEs with CVSS scores and references.", pricing: "Free", topics: ["vulns"] },
  { name: "GTFOBins", href: "https://gtfobins.github.io/", domain: "gtfobins.github.io", type: "Docs", description: "Unix binaries that can bypass local restrictions.", pricing: "Free", topics: ["linux", "red-team"] },
];
