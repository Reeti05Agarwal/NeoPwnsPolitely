---
title: Basic Commands
description: >-
  -d - Delimiter -f - Field number -f4 - Field 4 -f1,4 - Field 1 and 4 -f2-5 -
  Fields 2 to 5 -f-7 - Fields 1 to 7 -f3- - Fields 3 and beyond
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
order: 67
---
## Data Manipulation

#### `cut`

- `-d` - Delimiter
- `-f` - Field number
    - `-f4` - Field 4
    - `-f1,4` - Field 1 and 4
    - `-f2-5` - Fields 2 to 5
    - `-f-7` - Fields 1 to 7
    - `-f3-` - Fields 3 and beyond


#### `sort` and `uniq`

- `sort -u` - Sort and remove all duplicates (unique)
- `uniq` - Remove duplicates adjacent to each other
- `uniq -c` - Remove duplicates adjacent to each other and count
- `uniq -u` - Show unique items only (rarely use)
- `sort | uniq -c | sort -urn` - Count occurence and sort them from most common to least













## Shell Operators

|Symbol / Operator|Description|
|---|---|
|&|This operator allows you to run commands in the background of your terminal. This will obviously take quite a long time and will leave us unable to do anything else until the file successfully copies.|
|The "&" shell operator allows us to execute a command and have it run in the background (such as this file copy) allowing us to do other things!||
|&&|This operator allows you to combine multiple commands together in one line of your terminal. `command1 && command2` but `command2` will only run after `command1` is successfully executed.|
|>|This operator is a redirector - meaning that we can take the output from a command (such as using cat to output a file) and direct it elsewhere. For eg, we can redirect `echo hello world` to a new file. like: `echo hello world > text` . If the file text already exist, then the word “hello world” will be over written.|
|>>|This operator does the same function of the `>` operator but appends the output rather than replacing (meaning nothing is overwritten). It will print the word “hello world” at the end of the file while preserving the previous data.|

```bash
$ date && ls
```

- Using the `expr` Command for Basic Mathematical Calculations

The `expr` command in Linux is a utility for performing basic mathematical calculations directly from the command line. It can be useful for quick calculations without needing a full-fledged calculator program.

#### Basic Usage


The `expr` command is a versatile tool for quick and simple arithmetic and string operations, particularly useful in shell scripting and command-line calculations.


|-a|- - all|do not ignore entries starting with .|
|---|---|---|
|-A|- - almost - all|do not list implied . and ..|
|-b|- -escape||
|-B|- -ignore-backups||
|-c|||
|-C|- -color[=WHEN]||
|-d|- -directory||
|-D|- -dired||
|-f|- -classify||
|-F|- -file-type||
|-m|- -format=WORD||
|-1|- -full-time||
|-g|- -group-directories-first||
||||

CTRL Key represents `^` in linus

- Log

these files and folders contain logging information for applications and services running on your system. The Operating System (OS) has become pretty good at automatically managing these logs in a process that is known as "rotating".

logs for services such as a web server contain information about every single request - allowing developers or administrators to diagnose performance issues or investigate an intruder's activity.

Two types of logs:

- access log
- error log

---

#### SCP (Secure Copy)

> Secured version of cp (copy) command.

> Local System —> Remote System

- Used to securely transfer files and directories between two systems over a network using the SSH (Secure Shell) protocol.
- This ensures that the data being transferred is both authenticated and encrypted, providing a secure method of copying files compared to traditional methods like **`cp`** or **`ftp`**.
- Copy files & directories from your current system to a remote system or visa versa, Provided that we know usernames and passwords for a user on your current system and a user on the remote system.

**Basic SCP Command Syntax**

```c
scp SOURCE DESTINATION
```

- **SOURCE**: The path to the file or directory to be copied.
- **DESTINATION**: The path to where the file or directory should be copied.

**Copying Files from Local System to Remote System**

```c
scp important.txt ubuntu@192.168.1.30:/home/ubuntu/transferred.txt
```

- **`important.txt`**: The file on your local system that you want to copy.
- **`ubuntu`**: The username on the remote system.
- **`192.168.1.30`**: The IP address of the remote system.
- **`/home/ubuntu/transferred.txt`**: The destination path and filename on the remote system.

#### **Copying Files from Remote System to Local System**

```bash
scp ubuntu@192.168.1.30:/home/ubuntu/important.txt /local/destination/path/
```

- **`ubuntu@192.168.1.30:/home/ubuntu/important.txt`**: The path to the file on the remote system that you want to copy.
- **`/local/destination/path/`**: The destination path on your local system.

#### **Copy a Directory from Local System to Remote System**

```
shCopy code
scp -r /local/directory ubuntu@192.168.1.30:/home/ubuntu/
```

- **`r`**: Indicates that the directory should be copied recursively.

#### **Copy a File from Remote System to Local System Using a Specific Port**

```
shCopy code
scp -P 2222 ubuntu@192.168.1.30:/home/ubuntu/important.txt /local/destination/path/
```

- **`P 2222`**: Specifies that SCP should connect to port 2222 on the remote host.

#### **Using a Specific SSH Key for Authentication**

```
shCopy code
scp -i /path/to/private_key.pem important.txt ubuntu@192.168.1.30:/home/ubuntu/transferred.txt
```

- **`i /path/to/private_key.pem`**: Specifies the private key file to use for authentication.

---

- SHORTCUT COMMAND AND WILDCARDS

CTRL + ALT + T —> To open terminal

Super + Arrow Keys —> To adjust the location of the terminal

CTRL + SHIFT+ —> To increase the size

CTRL + L OR typing clear on terminal —> It will clear all the content typed in the terminal

CTRL + C —> To end the currently running process

CLRL + Z —> To pause a currently running process

TAB KEY —> To auto complete file and directory names

CTRL + W —> To close the terminal

|Wildcard|Meaning|
|---|---|
|?|represent a single character|
|.||
|[a,b]|to match the characters that|
|appear inside the square brackets. that is a and b||
|*|matches any character(s) of any length|
|,||

---

- install and uninstall applications in a Linux Bash shell.

use the Advanced Package Tool (APT) and `sudo`

```
apt is a commandline package manager and provides commands for
searching and managing as well as querying information about packages.
It provides the same functionality as the specialized APT tools,
like apt-get and apt-cache, but enables options more suitable for
interactive use by default.
```

list - list packages based on package names search - search in package descriptions show - show package details install - install packages reinstall - reinstall packages remove - remove packages autoremove - Remove automatically all unused packages update - update list of available packages upgrade - upgrade the system by installing/upgrading packages full-upgrade - upgrade the system by removing/installing/upgrading packages edit-sources - edit the source information file

---
