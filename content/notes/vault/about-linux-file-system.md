---
title: File System
description: >-
  commonplace location to store system files that are used by your operating
  system.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - About Linux
order: 51
---
## /bin



## /etc

commonplace location to store system files that are used by your operating system.

In this directory, there are two main files “passwd” & “shadow“ they show how your system stores the passwords for each user in encrypted formatting called sha512.

## /home


## /var 
Short for variable. This folder stores data that is frequently accessed or written by services or applications running on the system.
## /root
is actually the home for the "root" system user. There isn't anything more to this folder other than just understanding that this is the home directory for the "root" user.

## /usr


## /tmp
Short for temporary. volatile and is used to store data that is only needed to be accessed once or twice. Similar to the memory on your computer, once the computer is restarted, the contents of this folder are cleared out.What's useful for us in pentesting is that any user can write to this folder by default. Meaning once we have access to a machine, it serves as a good place to store things like our enumeration scripts.



It doesn’t have physical drive like windows (c:drive) at the base of file system but uses a logical filesystem instead.
`/_root_ —> Highest priv`

![](/notes/img/untitled-16.png)
### `/etc`
Linux configuration files—files that control when and how programs start up
### `/mnt`
Where other filesystems are attached or mounted to the filesystem
### `/media`
Where CDs and USB devices are usually attached or mounted to the filesystem



### `which`
which command tells you to where the location of the command is

```python
which ls

OUTPUT: location of the command ls
```



### `PATH`

The files in path are seperated by colons.

to add a location of the xcript in PATH

any of the .profile or .bashrc file

```python
PATH "script_path:${PATH}"
export PATH
```
