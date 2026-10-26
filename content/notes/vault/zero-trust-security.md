---
title: Zero Trust Security
description: >-
  The key zero trust principle of least-privileged access says a user should be
  given access only to a specific IT resource the user is authorized to access,…
date: '2026-10-26'
topics:
  - fundamentals
section:
  - Cyber Security Fundamentals
  - Standards-Compliances
order: 14
---
https://thehackernews.com/expert-insights/2025/01/zero-trust-security-why-its-essential.html


Its an architecture

 The key zero trust principle of least-privileged access says a user should be given access only to a specific IT resource the user is authorized to access, at the moment that user needs it, and nothing more. Hence the zero trust maxim, "**_never trust, always verify_**."


Zero Trust Security is a cybersecurity model and strategy that operates on the principle of **"never trust, always verify."** It requires strict identity verification and access control for every user and device trying to access resources, regardless of whether they are inside or outside the network perimeter. The main goal is to minimize security risks by assuming that threats can come from within and outside the organization.


As a networking and security strategy, zero trust stands in stark contrast to traditional, network-centric, perimeter-based architectures built with firewalls and VPNs, which involve excessive permissions and increase cyber risk.



## Key principles  

1. **Verify explicitly:** Always authenticate and authorize users and devices based on all available data points (e.g., user identity, location, device health).
2. **Least privilege access:** Grant the minimum level of access required for users or devices to perform their tasks, reducing the attack surface.
3. **Microsegmentation:** Divide the network into smaller segments to ensure that even if one segment is breached, it doesn't affect the entire network.
4. **Continuous monitoring:** Continuously monitor user activity, access patterns, and device behavior to detect and respond to threats in real-time.


Zero trust architecture stops cyberattacks in four key ways (some of which we've already mentioned):

1. Zero trust eliminates firewalls, VPNs, and their public IP addresses, which are attractive targets for cyberattackers. Instead, apps are hidden behind a zero trust cloud, eliminating the attack surface. In other words, inbound connections are replaced with [inside-out connections](https://www.zscaler.com/resources/data-sheets/zscaler-private-access.pdf).
2. Zero trust prevents compromise through context-aware policies and, unlike hardware and virtual appliances, a high-performance cloud with the scalability necessary to inspect encrypted traffic (where most threats hide (but more on that below (aren't parentheses fun?))).
3. Zero trust gives direct-to-app connectivity rather than network access, preventing the potential for lateral movement across resources.
4. Zero trust stops data loss by, once again, inspecting encrypted traffic (where most data loss occurs), and protecting all modern data leakage paths, including SaaS app sharing, removable storage on endpoints, and a lot more.
