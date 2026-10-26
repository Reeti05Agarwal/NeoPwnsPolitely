---
title: Imp Files
description: >-
  When the os boots and user logs in, several initialization files are read and
  executed to configure the user's environment.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - About Linux
order: 52
---
When the os boots and user logs in, several initialization files are read and executed to configure the user's environment.

- .profile
	1. Used by Bourne-compatible shells (sh, ksh, bash) during login.
	2. Typically used for environment variable settings and startup scripts.
	3. Location: **`$HOME/.profile`**.
- .bashrc
	- Executed by Bash for non-login interactive shells.
	- Often used to set up aliases, shell functions, and other interactive shell features.
	- Location: **`$HOME/.bashrc`**.
- .bash_profile
	- Read by Bash for login shells.
	- If **`.bash_profile`** exists, Bash does not read **`.profile`**.
	- Typically used to set environment variables and run startup scripts for login sessions.
	- Location: **`$HOME/.bash_profile`**.
- .login
	- Used by C shell (csh, tcsh) during login.
	- Sets environment variables and runs commands for C shell login sessions.
	- Location: **`$HOME/.login`**.
