---
title: File System
description: >-
  It doesn’t have physical drive like windows (c:drive) at the base of file
  system but uses a logical filesystem instead. /root —> Highest priv
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - File Management
order: 59
---
It doesn’t have physical drive like windows (c:drive) at the base of file system but uses a logical filesystem instead.
`/_root_ —> Highest priv`

![](/notes/img/untitled-16.png)
## `/etc`
Linux configuration files—files that control when and how programs start up
## `/mnt`
Where other filesystems are attached or mounted to the filesystem
## `/media`
Where CDs and USB devices are usually attached or mounted to the filesystem



## `which`
which command tells you to where the location of the command is

```python
which ls

OUTPUT: location of the command ls
```



## `PATH`

The files in path are seperated by colons.

to add a location of the xcript in PATH

any of the .profile or .bashrc file

```python
PATH "script_path:${PATH}"
export PATH
```
