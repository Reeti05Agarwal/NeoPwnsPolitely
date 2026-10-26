---
title: AWK Tool
description: >-
  AWK is a powerful scripting language and command-line tool in Unix/Linux
  systems. It is primarily used for text processing and data extraction. Named
  after…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - File Management
order: 57
---
**AWK** is a powerful scripting language and command-line tool in Unix/Linux systems. It is primarily used for **text processing** and **data extraction**. Named after its creators **Aho, Weinberger, and Kernighan**, AWK is especially useful for processing structured text files and generating formatted reports.

## Function
- Scans file line by line
- Splits each input line into fields based on a delimiter (default: space/tab).
- Compares input lines or fields to patterns.
- Executes specified actions on lines that match patterns.
- Formatting output lines
- Arithmetic and String Operations
- Conditional Statements and loops


## Syntax

```python
awk 'pattern {action}' file
```
- **Pattern**: Condition to match lines (optional).
- **Action**: Operation to perform on matching lines.
- **File**: Input text file to process.

## Examples

#### Print All Lines
```python
$ awk '{print }' employee.txt
```



#### Print Specific Column
```python
$ awk '{print $1}' employee.txt
```
```python
$ awk '{print $1, $2}' employee.txt
```

Print the last column
```python
$ awk '{print $NF}' employee.txt
```

Print the last second column
```python
$ awk '{print $(NF - 1)}' employee.txt
```



#### Print Specific Record
```python
$ awk 'NF==2  {print }' employee.txt
```

Print from 2nd record to 5th record
```python
$ awk 'NF==2,NF==5  {print }' employee.txt
```

Print 2nd and 5th record
```python
$ awk 'NF==2; NF==5  {print }' employee.txt
```


#### Print Lines Matching a Pattern
```bash
awk '/patter/ {print}' file.txt
```



#### Perform Calculation
```bash
awk '{print $1 + $2}' file.txt
```



#### Filter Rows with Conditions
```bash
awk '$3 > 50 {print}' file.txt
```
