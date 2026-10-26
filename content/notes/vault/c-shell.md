---
title: C Shell
description: The traditional prompt for the C shell is the % symbol.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Shell
order: 62
---
The traditional prompt for the C shell is the % symbol.

C shell has only limited command line editing capabilities. They are, however, more powerful than those of the Bourne shell.

```bash
$ csh
% 
#The command for entering the TCSH shell is tcsh.
```

The CTRL-W key erases a recently entered word.

```bash
% date who
^w
% date
```

Other times you may need to change part of a word or several words in a command line. The C shell has a pattern substitution command that allows you to replace patterns in the command line. This substitution command is represented by a pattern enclosed in ^ symbols. The pattern to be replaced is enclosed between two ^.

```bash
% ^pattern^newtext
```

```bash
% dte
dte: not found
% ^dt^dat
date
Sun July 5 10:30:21 PST 1992
```

This command replaces `dt` with `dat` in the previous command.

## History Utility

the C shell history utility keeps a record of the most recent commands you have executed. Its not automatically turned on. You first have to define history with a `set` command and assign to it the number of commands you want recorded.

```bash
% set history=5

% history
1 ls
2 vi mydata
3 mv mydata reports
4 cd reports
5 ls -F

% !2
vi mydata
% !vi
vi mydata
% !?myd?
vi mydata
```

[Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9e175e8e-c5d0-40ac-8cf1-e6878bb78634/7f0ae24d-3293-463a-a2ae-5789cafaefca/Untitled.png)

Event Substitution:

```bash
% history
1 ls
2 vi mydata
3 mv mydata reports
4 cd reports
5 ls -F

% !1 > myfiles
ls > myfiles
```

An event is parsed into separated words, each word identified sequentially by a number starting from 0. An event reference followed by a colon and a number references a word in the event. The event reference `!3:2` references the second word in the third event.

The number of the first and last word in the range are separated by a dash. In the next example, `3:0-1` references the first two words of the third event, mv mydata.
