---
title: Redirect Command
description: redirects the output of any command inside any file
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
order: 74
---
Redirect Command (>)(>>)

redirects the output of any command inside any file

```c
echo "hello people" > newfile.txt
```

Its not an append function and if u add something else, it will overwrite the previous content in it.

to append text in a file:

```c
echo "i am a hacker" >> newfile.txt
```

To concatenate two files:

```c
cat file1.txt file2.txt > file3.txt
```

When used with **echo**, the **>** and **>>** operators can be used to send the output of **echo** to a specified file rather than the screen. The difference between the two is that **>** overwrites your existing file, and **>>** adds your content to the end of the existing file instead of overwriting it. The **>** operator should be used carefully, because it’s not easy to recover overwritten files.
