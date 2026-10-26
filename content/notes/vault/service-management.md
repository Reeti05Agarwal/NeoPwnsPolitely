---
title: Service Management
description: >-
  service is a wrapper around existing system init scripts located in
  /etc/init.d/ directory. Another way of managing the service, you can directly
  use the…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Services
order: 79
---
## `service`

`service` is a wrapper around existing system init scripts located in `/etc/init.d/` directory. Another way of managing the service, you can directly use the `init` scripts.

```shell
/etc/init.d/ssh start
```

```shell
/etc/init.d/ssh stop
```


#### Service Boot Persistence
 
Services will be started at boot time.

```shell
 update-rc.d ssh enable
```
or
```shell
 systemctl enable ssh
```
 
```shell
update-rc.d ssh disable
```
or 
```shell
systemctl disable ssh
```

For more granular control of these services, use `rcconf` or `sysv-rc-conf`, both to help simplify and manage the boot persistence of these services.
