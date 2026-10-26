---
title: Wildcard
description: >-
  Wildcards are special characters used in Linux command-line operations to
  represent one or more characters. They are commonly used to perform operations
  on…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - File Management
order: 58
---
Wildcards are special characters used in Linux command-line operations to represent one or more characters. They are commonly used to perform operations on multiple files that match a certain pattern, making it easier to manage large numbers of files efficiently.

## Common Wildcards

1. **Asterisk (*)**: Represents zero or more characters.
2. **Question Mark (?)**: Represents a single character.
3. **Square Brackets ([ ])**: Represents any one of the enclosed characters.
4. **Curly Braces ({ })**: Allows specifying a comma-separated list of alternatives.

## Examples of Using Wildcards

## Asterisk (*)

The asterisk wildcard `*` can match any number of characters, including none.

1. **Match All `.txt` Files**:
    
    ```
    ls *.txt
    
    ```
    
    This command lists all files in the current directory that have a `.txt` extension.
    
2. **Match All Files Starting with `1`**:
    
    ```
    ls 1*
    
    ```
    
    This command lists all files in the current directory that start with the character `1`.
    

## Question Mark (?)

The question mark wildcard `?` matches exactly one character.

1. **Match Files with One Character Following `a`**: This command lists all files in the current directory that have names starting with `a` followed by exactly one other character.
    
    ```
    ls a?
    
    ```
    

## Square Brackets ([ ])

Square brackets are used to match any one of the characters enclosed within them.

1. **Match Files Starting with `a`, `b`, or `c`**:
    
    ```
    ls [abc]*
    
    ```
    
    This command lists all files in the current directory that start with `a`, `b`, or `c`.
    
2. **Match Files Ending with a Digit**:
    
    ```
    ls *[0-9]
    
    ```
    
    This command lists all files in the current directory that end with a digit.
    

## Curly Braces ({ })

Curly braces allow for specifying a comma-separated list of alternatives.

1. **Match Files with Extensions `.jpg` or `.png`**: This command lists all files in the current directory with a `.jpg` or `.png` extension.
    
    ```
    ls *.{jpg,png}
    
    ```
    

## Practical Examples

1. **Using `file` Command with Wildcards**:
    
    **Match All `.txt` Files**:
    
    ```
    file *.txt
    
    ```
    
    This command runs the `file` command on all files in the current directory with a `.txt` extension, displaying their types.
    
    **Match Files Starting with `1`**:
    
    ```
    file 1*
    
    ```
    
    This command runs the `file` command on all files in the current directory that start with the character `1`, displaying their types.
    
2. **Using `rm` Command to Remove Files**:
    
    **Remove All `.log` Files**:
    
    ```
    rm *.log
    
    ```
    
    This command deletes all files in the current directory with a `.log` extension.
    
3. **Using `cp` Command to Copy Files**:
    
    **Copy All Files Starting with `data`**:
    
    ```
    cp data* /backup/
    
    ```
    
    This command copies all files starting with `data` to the `/backup/` directory.
