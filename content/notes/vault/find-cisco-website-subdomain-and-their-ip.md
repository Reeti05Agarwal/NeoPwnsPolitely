---
title: find cisco website subdomain and their ip
description: >-
  curl -s https://www.cisco.com | grep 'href=' | cut -d'/' -f3 | grep
  'cisco.com' | cut -d'"' -f1 | sort -u > test
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
  - Examples
order: 72
---
## Method 1

`curl -s https://www.cisco.com | grep 'href=' | cut -d'/' -f3 | grep 'cisco.com' | cut -d'"' -f1 | sort -u > test`

- `curl https://www.cisco.com` - Download cisco.com and output to stdout, silent, hide progress
- `grep 'href='` - Grep all lines with href links
- `cut -d'/' -f3` - Splits lines by slashes and take field number 3 (eg. Field 3 of ...href="[http://hello.cisco.com/](http://hello.cisco.com/)"... will be hello.cisco.com)
- `grep 'cisco.com'` - Filter out lines with cisco.com as the domain
- `cut -d'"' -f1` - Filter out lines that have trailing quotes
- `sort -u` - Sort and remove all duplicates with `-u` (unique). Compared to `uniq`, `uniq` removes duplicates that are adjacent to each other, eg. a a b a -> a b a

## Method 2
 
`curl -s https://www.cisco.com | grep -o '[A-Za-z0-9\._-]*\.*cisco\.com' | sort -u`

- `curl -s https://www.cisco.com` - Download cisco.com and output to stdout, silent, hide progress
- `grep -o '[A-Za-z0-9\._-]*\.*cisco\.com'`
    - `-o` - Output only the matching pattern
    - `[A-Za-z0-9\._-]*` - Match 0 or more alphanumeric character, including ".", "_" and "-"
    - `\.` - URL dot
    - `*` - Non-regex, grep wildcard in this case, to match domains that end with cisco.com (eg. static-static.com)
    - `\.com` - URL top level domain
- `sort -u` - Sort and remove all duplicates with `-u` (unique)

## Other Methods
 
- `curl https://www.cisco.com | grep -o -P '[\w\._-]+\.[\w\._-]*cisco\.com' | sort -u` - Equivalent to method 2
- `curl https://www.cisco.com | grep -o -E '\w+\.cisco\.com' | sort -u`  - Shortcut, less accurate as it doesn't match "[www.static-cisco.com](http://www.static-cisco.com/)"
- `wget -q -O - https://www.cisco.com | ...` - Wget instead of curl, quiet, and output to stdout

## Final
 
```shell
for url in $(curl -s https://www.cisco.com | grep -o '[A-Za-z0-9\._-]*\.*cisco\.com' | sort -u); do host $url | grep 'has address' | cut -d' ' -f4; done
```
