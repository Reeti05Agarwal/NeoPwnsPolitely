---
title: WMI - Windows Management Instrumentation
description: >-
  Windows Management Instrumentation (WMI) is a core Windows feature that
  provides a powerful interface for querying system information, managing
  devices, and…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Window
  - Windows Services
order: 93
---
**

Windows Management Instrumentation (WMI) is a core Windows feature that provides a powerful interface for querying system information, managing devices, and automating administrative tasks. It operates via DCOM (Distributed Component Object Model) which runs over TCP port 135 and WinRM (Windows Remote Management) which uses port 5985 (HTTP) and 5986 (HTTPS) for remote administration.

Common Techniques:

- Remote Execution of malicious PowerShell script
    
- WMI Event Subscription for maintaining Persistence on compromised systems. (create event filter and event consumer and bind them together)
    
- Deleting Shadow Copies with VMI to prevent system recovery. 
    

Exploits:

APT32 (OceanLotus) – Uses WMI for execution and persistence. It created WMI event subscription to maintain long-term backdoor access to deliver custom malware payloads through WMI execution.**
