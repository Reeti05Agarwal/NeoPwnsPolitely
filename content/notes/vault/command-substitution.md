---
title: Command Substitution
description: >-
  In bash scripting, command substitution allows you to capture the output of a
  command and use it within your script. There are two ways to perform command…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
order: 70
---
In bash scripting, command substitution allows you to capture the output of a command and use it within your script. There are two ways to perform command substitution:

1. **Using Backticks:**
    - Syntax: **`command`**
    - Example: **`result=`ls -l``**
    - It captures the output of ‘ls -l’ command using backticks and it then printed
2. **Using Dollar Sign and Parentheses:**
    - Syntax: **`$(command)`**
    - Example: **`result=$(ls -l)`**
    - It captures the output of ‘ls -l’ command using $() and then it is printed

The **`$()`** syntax is generally preferred over backticks because it is easier to read and can be nested without escaping backticks.

```python
echo " $(date) "

or

echo " `date` "
```
