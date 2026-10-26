---
title: Filtering
description: >-
  This command will first view FILENAME and then use a pipe (|) to send it to
  grep, which will take the file as input, look for lines with occurrences of
  the…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - File Management
order: 60
---
```dart
ps aux | grep KEYWORD
```

This command will first view FILE_NAME and then use a pipe (|) to send it to grep, which will take the file as input, look for lines with occurrences of the word KEYWORD, and display only those lines.

```dart
cat FILE_PATH | grep KEYWORD
```
