---
title: Shell
description: >-
  You can easily modify commands you have entered before executing them, moving
  anywhere on the command line and inserting or deleting characters.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Shell
order: 65
---
## Command on multiple lines

> Backslash: `\\`

```bash
$ cp -i \\
mydata \\
/home/george/myproject/newdata
```

## Several Commands on single line

> Semicolon: `;`

```bash
$ ls ; date
```

## Command Line Shortcut Editing

You can easily modify commands you have entered before executing them, moving anywhere on the command line and inserting or deleting characters.

- `CTRL-F` or `RIGHT ARROW` key to move forward a character
- `CTRL-B` or `LEFT ARROW` key to move back a character.
- `CTRL-D` or `DEL` deletes the character the cursor is on.
- `CTRL-H` or `BACKSPACE` deletes the character before the cursor.
- cut words with the `CTRL-W` or `ALT-D` key
- `CTRL-Y` key to paste them
- As a rule, the `CTRL` version of the command operates on characters, and the `ALT` version works on words, such as `CTRL-T` to transpose characters and `ALT-T` to transpose words.
![](/notes/img/untitled.png)

## Command Autocompletion
> `TAB Key`

Displays a list of possible command completions and waits for you to add enough characters to select a unique command or filename.

Automatic completion also works with the names of variables, users, and hosts. In this case, the partial text needs to be preceded by a special character indicating the type of name:

- Filenames begin with any text or /.
- Shell variable text begins with a $ sign.
- Username text begins with a ~ sign.
- Host name text begins with a @.
	- {The possible names taken from `/etc/hosts` file}
- Commands, aliases, and text in files begin with normal text

![](/notes/img/untitled-2.png)
## View History

![](/notes/img/untitled-3.png)
### History Events

![](/notes/img/untitled-4.png)

`history uitility` keep a record of the most recent commands you have executed.

`history` : To see the set of your most recent commands

```bash
$ history
1 cp mydata today
2 vi mydata
3 mv mydata reports
4 cd reports
5 ls
```

`! *event`* : Reference and execute history events

```bash
$ !3    
mv mydata reports

$ !mv my
mv mydata reports

$ !-4
vi mydata
//A negative number will offset from the end of the list to that event

$ !!
ls
mydata today reports
//To reference the last event
```

### History Event Editing

1. `fc command`
2. `Vi editor`

In many command-line interfaces, such as those found in Unix-like systems or in Windows with tools like PowerShell or Git Bash, you have powerful features for navigating and editing command history. Here's a detailed breakdown of these features:

#### Navigation

|Command|Description|
|---|---|
|**CTRL-P**|Moves to the previous command in the history list (equivalent to the up arrow key).|
|**CTRL-N**|Moves to the next command in the history list (equivalent to the down arrow key).|
|**ALT-&lt;**|Moves to the first (oldest) command in the history list.|
|**ALT->**|Moves to the last (most recent) command in the history list.|

#### Search History

- **`/pattern`**: Searches backward in the command history for commands matching the specified pattern. This is often triggered by pressing `CTRL-R` and then typing the pattern. For example, typing `/git` after pressing `CTRL-R` might find your last `git` command.
- **`?pattern`:** Searches forward in the command history for commands matching the specified pattern. This is typically triggered by pressing `CTRL-S` (though `CTRL-S` may be intercepted by the terminal's flow control; pressing `CTRL-Q` resumes normal input).
- **`n`**:  Repeats the last search command in the same direction (forward or backward).

#### Editing Commands

While navigating through your history, you can also edit commands before executing them:

- Use the left and right arrow keys to move the cursor within the command line.
- Use `CTRL-A` to move the cursor to the beginning of the line.
- Use `CTRL-E` to move the cursor to the end of the line.
- Use `CTRL-K` to delete from the cursor to the end of the line.
- Use `CTRL-U` to delete from the cursor to the beginning of the line.

These features can greatly enhance productivity by allowing quick access to previously executed commands, enabling efficient command editing, and reducing the need to retype repetitive commands.

The `fc` (fix command) utility in Unix-like systems allows users to edit and re-execute commands from their command history using a specified text editor. The editor used is determined by the environment variables `FCEDIT` or `EDITOR`.

#### Setting Up the Editor

You can assign your preferred text editor to the `FCEDIT` or `EDITOR` variable. For example, if you want to use Emacs instead of the default Vi, you can set it up as follows:

```
export FCEDIT=emacs
# or
export EDITOR=emacs

```

#### Editing and Executing Commands

To edit and execute a specific command from your history, you can use the `fc` command followed by the event number of the command you want to edit. For example, to edit the fourth command in your history:

```
$ fc 4

```

This will open the fourth command in your default editor (as specified by `FCEDIT` or `EDITOR`). After you save and close the editor, the edited command will be executed.

**Range:**

You can also edit and execute a range of commands by specifying the range with command numbers or the beginning characters of the commands. Here are two examples:

1. **Using Command Numbers**:
    
    To edit and execute commands from the second to the fourth in your history:
    
    ```
    $ fc 2 4
    
    ```
    
2. **Using Beginning Characters**:
    
    To edit and execute a range of commands identified by their starting characters, for example, starting from the command beginning with "vi" to the command beginning with "c":
    
    ```
    $ fc vi c
    
    ```
    

- Example Workflow
    
    Let's go through an example workflow where we edit and execute commands from history:
    
    1. **Set the Editor**:
        
        ```
        export FCEDIT=nano  # Set nano as the default editor
        
        ```
        
    2. **Edit a Specific Command**:
        
        Suppose the fourth command in your history is `cd reports`. To edit this command:
        
        ```
        $ fc 4
        
        ```
        
        This opens the `cd reports` command in the nano editor. After making the necessary changes, save and exit the editor, and the edited command will be executed.
        
    3. **Edit a Range of Commands**:
        
        To edit and execute commands 2 through 4:
        
        ```
        $ fc 2 4
        
        ```
        
        Or to edit and execute commands from the one starting with "vi" to the one starting with "c":
        
        ```
        $ fc vi c
        
        ```
        
    
    The `fc` command in Unix-like systems allows users to edit and re-execute commands from their command history using a specified text editor. If you prefer to use Emacs instead of the default Vi editor, you can do so using the `-e` option.
    

#### Using `fc` with a Specific Editor

To edit a specific command using Emacs, you can use the `-e` option followed by the editor name. Here's how you can do it:

- Example Workflow
    1. **Edit a Specific Command**:
        
        Suppose the fourth command in your history is `cd reports`. To edit this command using Emacs:
        
        ```
        $ fc -e emacs 4
        
        ```
        
        This will open the `cd reports` command in the Emacs editor. After making the necessary changes, save and exit the editor, and the edited command will be executed.
        
    2. **Edit a Range of Commands**:
        
        You can also edit and execute a range of commands by specifying the range with command numbers or the beginning characters of the commands. Here are two examples:
        
        - **Using Command Numbers**:
            
            To edit and execute commands from the second to the fourth in your history:
            
            ```
            $ fc -e emacs 2 4
            
            ```
            
        - **Using Beginning Characters**:
            
            To edit and execute a range of commands identified by their starting characters, for example, starting from the command beginning with "vi" to the command beginning with "c":
            
            ```
            $ fc -e emacs vi c
            
            ```
            

#### Setting the Default Editor

If you frequently use a specific editor, you might want to set it as your default editor by assigning it to the `FCEDIT` or `EDITOR` environment variable. Here’s how you can do that:

1. **Set the Editor Globally**:
    
    Add the following lines to your shell profile file (e.g., `.bashrc`, `.zshrc`):
    
    ```
    export FCEDIT=emacs
    # or
    export EDITOR=emacs
    
    ```
    
2. **Apply the Changes**:
    
    Source the profile file to apply the changes:
    
    ```
    source ~/.bashrc  # or ~/.zshrc, depending on your shell
    
    ```
    

### Config History

#### HISTFILE

The number of events saved by your system is kept in this special system variable. Default size if 500 but one can configure it:

```bash
$ HISTSIZE=10
```

#### HISTSAVE

The actual history events are saved in a file (name: special variable)

By default, this file is the .`bash_history` file. You can change the file in which history events are saved, however, by assigning its name to the HISTFILE variable. In the next example, the value of HISTFILE is displayed. Then a new filename is assigned to it, newhist. History events are then saved in the newhist file.

```bash
$ echo $HISTFILE
.bash_history
$ HISTFILE="newhist"
$ echo $HISTFILE
newhist
```

## Filename Expansion: *, ?, [ ]

![](/notes/img/untitled-5.png)

![](/notes/img/untitled1.png)


### *

The asterisk (*) references files beginning or ending with a specific set of characters.

```bash
$ ls
doc1 doc2 document docs mydoc monday tuesday
$ ls doc*
doc1 doc2 document docs
$ ls *day
monday tuesday
$ ls m*d*
monday

$ ls *.c
calc.c main.c
```

### ?

The question mark (?) matches only a single character in filenames.

```bash
$ ls
doc1 docA document
$ ls doc?
doc1 docA
```

### [ ]

brackets ([]) enable you to specify a set of valid characters to search for. Any character placed within the brackets will be matched in the filename.

```bash
$ ls
doc1 doc2 doc3 docA docB docD document

$ ls doc[1A]
doc1 docA

$ ls doc[1-3]
doc1 doc2 doc3

$ ls doc[B-E]
docB docD

$ ls *.[co]
main.c main.o calc.c
```

### Use of / with filename expansion symbols

At times, a file expansion character is actually part of a filename.

We can use / before the character or put the filename in double quotes

```bash
$ ls answers\\?
answers?

$ ls My\\ Documents
My Documents

$ ls "My Documents"
My Documents
```

{ } generating patterns

```bash
$ echo doc{ument,final,draft}
document docfinal docdraft

$ mkdir {fall,winter,spring}report
$ ls
fallreport springreport winterreport
```

## Redirection


![](/notes/img/untitled-6.png)

![](/notes/img/untitled1-1.png)

## Jobs

Have control over the execution.

![](/notes/img/untitled-7.png)


### In background (&)

You execute a command in the background by placing an ampersand (&) on the command line at the end of the command. When you place a job in the background, displayed:

1. User Job Number
2. System Process Number

> The + sign indicates the job currently being processed

> The - sign indicates the next job to be executed.

```bash
$ lpr mydata &
[1] 534

$ lpr intro &
[1] 547
$ cat *.c > myprogs &
[2] 548
$ jobs
[1] + Running lpr intro
[2] - Running cat *.c > myprogs
```

### To foreground (fg)

You can bring a job out of the background with the foreground command.

```bash
$ fg %2
cat *.c > myprogs
```

### Suspending and Cancelling Jobs

#### CTRL+Z

You can suspend a job and stop it with the `CTRL-Z` key. This places the job to the side until it is restarted. The job is not ended; it merely remains suspended until you want to continue. When you’re ready, you can continue with the job in either the foreground or the background using the `fg` or `bg` command.

The `fg` command restarts a suspended job in the foreground.

The `bg` command places the suspended job in the background.

```bash
$ cat *.c > myprogs
^Z
$ bg
```

### ps

PID: Process ID

TIY: Terminal Identifier

```bash
$ ps
PID TTY TIME COMMAND
523 tty24 0:05 sh
567 tty24 0:01 lpr
570 tty24 0:00 ps
```

-o is output plugin

-C is the command plugin

To just display a PID number, use the output options -o pid=.

Combined with the -C command option you can display just the PID for a particular command.

```bash
$ ps -C lpr -o pid=
567
```

### kill

reference the PID

```bash
$ kill 567
```

[C Shell](https://www.notion.so/C-Shell-96ce8223e98a4d1180bdcf179ec9176c?pvs=21)

[TCSH Shell](https://www.notion.so/TCSH-Shell-7c5e22d8122d41dc96b894a19337c7b2?pvs=21)

[Z Shell](https://www.notion.so/Z-Shell-c44f249243884d8791c82d599b6ebe41?pvs=21)

## Configuration Directories and Files

- **Purpose**: Configuration files tailor applications to individual user needs.
- **Location**: Usually found in the user’s home directory.
- **Types**:
    - **Single Configuration File**:
        - Begins with a period (e.g., `.mailrc`).
        - Often ends with "rc" (e.g., `.netrc` for FTP, `.newsrc` for newsreaders).
    - **Configuration Directory**:
        - Begins with a period (e.g., `.mozilla`).
        - Contains several configuration files.
- **Modification**:
    - Entries in configuration files are usually set by the application.
    - Users can directly edit these files to define and assign values to application-specific variables.


![](/notes/img/untitled-8.png)

## Alias

The alias does not literally replace the name of the command; it simply gives another name to that command.

```bash
$ alias New_Name=command
```

```bash
$ alias list=ls
$ ls
mydata today
$ list
mydata today
```

**Command with the Option:**

```bash
#IN SINGLE QUOTES

$ alias lss='ls -s'
$ lss
mydata 14 today 6 reports 1
$ alias lsa='ls -F'
$ lsa
mydata today reports/
```

**Commands with Arguments:**

```bash
$ alias lsc='ls *.[co]'
$ lsc
main.c main.o lib.c lib.o
```

**Aliasing Commands:**

You can also use the name of a command as an alias. This can be helpful in cases in which you should use a command only with a specific option. In the case of the rm, cp, and mv commands, the -i option should always be used to ensure an existing file is not overwritten. Instead of always being careful to use the -i option each time you use one of these commands, you can alias the command name to include the option. In the next example, the rm, cp, and mv commands have been aliased to include the -i option:

```bash
$ alias rm='rm -i'
$ alias mv='mv -i'
$ alias cp='cp -i'
```

**List of Aliases:**

```bash
$ alias
lsa=ls -F
list=ls
rm=rm -i
```

**Remove from the list of Aliases:**

```bash
$ unalias lsa
```

## Controlling Shell Operations

The set command is used to on or off the shell operation features.

```bash
$ set -o feature 
#turn the feature on

$ set +o feature 
#turn the feature off
```

Features:

![](/notes/img/untitled-9.png)

```bash
$ set -o ignoreeof
$ CTRL-D
Use exit to logout
```
