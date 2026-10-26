---
title: String Operations
description: >-
  The expr command can also perform operations on strings, such as checking
  length and extracting substrings.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
order: 75
---
The `expr` command can also perform operations on strings, such as checking length and extracting substrings.

## String Length
```bash
expr length "Hello, World!"

# OUTPUT: 3

```

## Substring Extraction
```bash
expr substr "Hello, World!" 1 5

#OUTPUT: Hello
```
