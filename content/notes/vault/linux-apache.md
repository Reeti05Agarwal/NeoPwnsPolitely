---
title: Linux Apache
description: >-
  The Apache web server is a popular choice for hosting websites and
  applications, known for its reliability and flexibility.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Services
order: 80
---
The ****Apache web server**** is a popular choice for hosting websites and applications, known for its reliability and flexibility.


## Install Apache Web Server
```
sudo apt install apache2 -y
```
## Enable the Services

```
sudo systemctl enable apache2
```

## Test the Server by Hosting a Simple Website

```
sudo mkdir /var/www/html/test_website/
```



```shell
service apache2 start
```

Default Apache document root is at `/var/www/html`

To change the index page, 
```shell
echo "Kali Linux rocks" > /var/www/html/index.html
```

```shell
service apache2 stop
```
