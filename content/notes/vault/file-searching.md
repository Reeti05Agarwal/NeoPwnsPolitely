---
title: File Searching
description: >-
  find / -type f -perm 0777: find files with the 777 permissions (files
  readable, writable, and executable by all users)
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - File Management
order: 54
---
## `find` Commands

```bash
find [PATH] [EXPRESSION]
```

#### **Expressions**
It determine the type of according to which the files need to be searched.

| Expression | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `-name`    | Search File by name                                             |
| `-iname`   | Case-Sensitive Search                                           |
| `-size`    | Search files according to its size                              |
| `-mtime`   | Search files according to number of days before it was modified |
|            |                                                                 |

#### By name
```bash
find [PATH] -name "FileName"
```

#### By Extension
```bash
find [PATH] -name "*.txt"
```

#### By Size
```bash
find [PATH] -size +100M
```

#### By Last Modified
```bash
find [PATH] -mtime -7
# Last modified 7 days before
```

#### Search only in `dir`
```bash
find [PATH] -type d -name "dir_name"
```



- `find / -type f -perm 0777`: find files with the 777 permissions (files readable, writable, and executable by all users)

- `find / -perm a=x`: find executable files

- `find /home -user frank`: find all files for user “frank” under “/home”

- `find / -mtime 10`: find files that were modified in the last 10 days
- `find / -atime 10`: find files that were accessed in the last 10 day
- `find / -cmin -60`: find files changed within the last hour (60 minutes)
- `find / -amin -60`: find files accesses within the last hour (60 minutes)
- `find / -size 50M`: find files with a 50 MB size

This command can also be used with (+) and (-) signs to specify a file that is larger or smaller than the given size.

use the “find” command with “-type f 2>/dev/null” to redirect errors to “/dev/null” and have a cleaner output (below).


- `find / -writable -type d 2>/dev/null` : Find world-writeable folders
- `find / -perm -222 -type d 2>/dev/null`: Find world-writeable folders
- `find / -perm -o w -type d 2>/dev/null`: Find world-writeable folders
- `find / -perm -o x -type d 2>/dev/null` : Find world-executable folders


- `find / -name perl*`
- `find / -name python*`
- `find / -name gcc*`
- `find / -perm -u=s -type f 2>/dev/null`: Find files with the SUID bit, which allows us to run the file with a higher privilege level than the current user.
 



## `find` + `xargs` Commands

Combining `find` with `xargs` allows you to perform actions on the found files.

#### Delete all `.log` files
```bash
find [PATH] -name "*.log" | xargs rm -f
```





## `locate` Command

The `locate` command is faster than `find` because it searches an indexed database of file names.

#### By File
```bash
locate filename
```

#### By words containing in file
```bash
locate "Specific_word"
```






## `grep` Command

The `grep` command searches for patterns within files and directories.

#### Search for Keywords inside files
```bash
grep -r "keyword" [PATH]
```

#### For case-sensitive
```bash
grep -ri "keyword" [PATH]
```





## `which` Command

The `which` command locates the executable path of a command.

```bash
which python
```



## `whereis` Command
The `whereis` command locates the binary, source, and manual page files for a command.

```bash
whereis ls
```
