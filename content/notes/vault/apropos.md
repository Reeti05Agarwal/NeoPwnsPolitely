---
title: Apropos
description: >-
  The apropos command in Linux is used to search the manual page descriptions
  for a specified string. This can be useful when you are looking for commands
  or…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
order: 69
---
## Using `apropos` to Search Manual Page Descriptions

The `apropos` command in Linux is used to search the manual page descriptions for a specified string. This can be useful when you are looking for commands or functions related to a particular topic but are unsure of the exact command name. The `apropos` command returns a list of all manual pages that contain the specified string in their descriptions.

## Basic Usage

To search for a string in the manual page descriptions, use the following syntax:

```bash
apropos [search_string]

```

## Example:

```bash
apropos network

```

This command will return all manual page descriptions that contain the word "network".

## Filtering with the `a` Option

You can filter the search results further by adding the `-a` option along with an additional string. The `-a` option ensures that the results contain both strings specified.

## Syntax:

```bash
apropos -a [string1] [string2]

```

## Example:

```bash
apropos -a network configuration

```

This command will return only the commands that contain both "network" and "configuration" in their manual page descriptions.

## Summary of Commands

- **Search for a string**:

```bash
apropos [search_string]

```

- **Filter results with `a` option**:

```bash
apropos -a [string1] [string2]

```


## Practical Examples

1. **Search for All Commands Related to Networking**:

```bash
apropos network

```

	This will list all manual pages containing the word "network" in their descriptions.
	
2. **Search for Commands Related to Network Configuration**:

```bash
apropos -a network configuration

```

	This will filter the results to only show manual pages that mention both "network" and "configuration".
	

## Understanding the Output

The output of the `apropos` command typically includes the command name followed by a brief description. For example:

```bash
networkmanager (8) - network management daemon
netstat (8) - Print network connections, routing tables, interface statistics, masquerade connections, and multicast memberships
ifconfig (8) - configure a network interface

```

Each line provides the command name and the section of the manual where it can be found (e.g., `ifconfig (8)` indicates that the `ifconfig` command is documented in section 8 of the manual).

## Additional Tips

- **Combining Multiple Filters**: You can combine more than two strings by adding additional `a` options. For example:

```bash
apropos -a network -a configuration -a interface

```

- **Using Wildcards**: You can use wildcards (``) to match parts of strings. For example:

```bash
apropos 'net*'

```

	This will match any word that starts with "net".
	

The `apropos` command is a powerful tool for discovering commands and functions in Linux, especially when you are unsure of the exact command names. By using the `-a` option, you can refine your searches to find exactly what you need.
