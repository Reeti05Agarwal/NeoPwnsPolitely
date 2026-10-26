---
title: Shell Scripting & Programming
description: >-
  To run a script in your current directory, use ./scriptname. The . represents
  the current directory, and / is a path separator.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Shell
order: 64
---
## Arithmetic Operations

| **Int Comparison** | **Functions**         |
| ------------------ | --------------------- |
| `-eq`              | Equal                 |
| `ne`               | Not equal             |
| `gt`               | Greater Than          |
| `lt`               | Less Than             |
| `ge`               | Greater Then or Equal |
| `le`               | Less Than or equal    |
## String Operation

| **String Comparison** | **Function**              |
| --------------------- | ------------------------- |
| `-z`                  | Tests for empty strings   |
| `=`                   | For Equality of strings   |
| `!=`                  | For inequality of strings |
## Logical Operation

| **Logical Operation** | **Function** |
| --------------------- | ------------ |
| `-a`                  | AND          |
| `-o`                  | OR           |
| `!`                   | NOT          |
## Fill Operations

| **File Tests** | **Function**                        |
| -------------- | ----------------------------------- |
| `-f`           | File Exits and is regular file      |
| `-s`           | File is not empty                   |
| `-r`           | File is readable                    |
| `-w`           | File can be written to and modified |
| `-x`           | File is executable                  |
| `-d`           | Filename is directory name          |

To run a script in your current directory, use `./scriptname`. The `.` represents the current directory, and `/` is a path separator.

## Literals

## Variables

### = : Assigning the variable

You assign a value to a variable with the assignment operator (=).

&lt;aside> 🚫 Do not place any spaces around the assignment operator.

&lt;/aside>

```python
$ myvar=12345
$ poet="Virgil is a poet?"
```

**Commands as Variables:**

```bash
$ ldir=/home/chris/letters
$ cp myletter $ldir
```

`Single quotes` allow you to assign the written command to a variable, It treats the command as a set of characters.

```bash
$ lsf='ls -F'
$ $lsf
mydata /reports /letters

$ echo $lscc
ls -F
```

Back Quotes: A command in back quotes is first executed and then its result is stored in the variable

```bash
$ listc=`ls *.c`
$ echo $listc
main.c prog.c lib.c
```

### $: Refer the variable name

The dollar sign is a special operator that uses the variable name to reference a variable’s value

```bash
$ echo $poet
"Virgil is a poet?"
$ echo ${poet}
"Virgil is a poet?"

$ echo poet
poet 

$ echo "My number is ${myvar}"
My number is 12345
$ echo 'My number is $myvar'
My number is $myvar
$ echo "My number is \\$myvar"
My number is $myvar
```

`Double quotes` do not quote the dollar sign, the operator that evaluates variables.

`Single quotes` suppress any variable evaluation and treat the dollar sign as just another character.

### set

You can obtain a list of all the defined variables with the set command.

### unset

The unset command undefines a variable.

```python
unset VARIABLE
```

### read

it will take input from the user to put into variable

```python
read myvar

OUTPUT: user can enter value of the variable
```

```python
read -p "enter the value: " age

OUTPUT: enter the value:  100
echo "$age"

OUTPUT: 100
```

```python
read -s passwrd

OUTPUT: user can input value put nothing is shown on the screen
```

### Shell Parameter variable

Variables that are already saved in the system
![](/notes/img/1.png)

![](/notes/img/untitled-10.png)

![](/notes/img/untitled-11.png)

```python
echo $USER
OUTPUT: user_name
echo $HOME
OUTPUT: directory to home
echo $PATH
OUTPUT: list of dir that sys looks for in executable files

```

#### Initialization Files

The shell scripts that get executed when you log into the shell. One can edit the shell script with vi editor.

Bash shell initialization file is `.bash_profile` .

The variable defined in these files are exported to be environment variable.

#### HOME

The HOME variable contains the pathname of your home directory.

```bash
$ echo $HOME
/home/chris
```

#### PATH

The PATH variable contains a series of directory paths separated by colons. Each time a command is executed, the paths listed in the PATH variable are searched one by one for that command. For example, the cp command resides on the system in the directory /bin

The system defines and assigns PATH an initial set of pathnames. In Linux, the initial pathnames are `/bin` and `/usr/bin`.

A colon with no pathname specified references your working directory. Usually, a single colon is placed at the end of the pathnames as an empty entry specifying your working directory. For example, the pathname `//bin:/usr/bin:` references three directories: `/bin`, `/usr/bin`, and your current working directory.

```bash
$ echo $PATH
/bin:/usr/sbin:
```

```bash
$ PATH=$PATH:$HOME/mybin:
$ export PATH
$ echo $PATH
/bin:/usr/bin::/home/chris/mybin

#the empty entry between two colons the working directory
```

If you add a directory to PATH yourself while you are logged in, the directory will be added only for the duration of your login session. When you log back in, the login initialization file, `.bash_profile`, will again initialize your PATH with its original set of directories.

To add a new directory to your PATH permanently, you need to edit your `.bash_profile` file and find the assignment for the PATH variable. Then, you simply insert the directory, preceded by a colon, into the set of pathnames assigned to PATH.

#### BASH_ENV

The BASH_ENV variable holds the name of the BASH shell initialization file to be executed whenever a BASH shell is generated. The BASH_ENV variable usually holds `$HOME/.bashrc`. You can specify a different file if you wish, using that instead of the `.bashrc` file for BASH shell scripts.

#### Shell Prompt

1. PS1 :
    
    It holds Primary prompt symbol is (`$`).
    
    You can change the prompt symbol by assigning a new set of characters to the `PS1` variable.
    
    ```bash
    $ PS1= '->'
    -> export PS1
    ->
    
    #or
    
    $ PS1="Please enter a command: "
    Please enter a command: export PS1
    Please enter a command: ls
    ```
    
2. PS2:
    
    The `PS2` variable holds the secondary prompt symbol, which is used for commands that take several lines to complete.
    
    The default secondary prompt is `>`
    
    ```bash
    $ PS2="@"
    ```
    
    Predefined codes: ( `\\symbol`)
    
    |\w|current working directory|
    |---|---|
    |\t|time|
    |\u|username|
    |\!|history event number|
    

![](/notes/img/untitled-13.png)


    
```bash
$ PS1="\\w $"
/home/dylan $

$ PS1="\\t \\! ->"
```
    
    &lt;aside> 💡 The default BASH prompt is `\\s-\\v\\$` to display the type of shell, the shell version, and the `$` symbol as the prompt.
    
    &lt;/aside>

#### News Server

## Configure Shell Scripts

### `.bash_profile`

Usually, the `.bash_profile` file ends with an export command with a list of all the variables defined in the file. Whenever adding a new variable in the script, make sure to then export them too.

You can also combine the assignment and export command into one operation as shown here for `NNTPSERVER`:

```bash
export [NNTPSERVER=news.myservice.com](<http://nntpserver=news.myservice.com/>)
```

The PATH variable is getting exported in this script

```bash
SCRIPT: .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
 . ~/.bashrc
fi
# User specific environment and startup programs
PATH=$PATH:$HOME/bin
export PATH
```

To add more directories to path:

```bash
PATH=$PATH:$HOME/bin:$HOME:
```

- Example
    
    the user’s .bash_profile has been modified to include definitions of EXINIT and redefinitions of PATH, PS1, and HISTSIZE. The PATH variable has $HOME: added to its value. $HOME is a variable that evaluates to the user’s home directory, and the ending colon specifies the current working directory, enabling you to execute commands that may be located in either the home directory or the working directory. The redefinition of HISTSIZE reduces the number of history events saved, from 1000 defined in the system’s .profile file, to 30. The redefinition of the PS1 parameter variable changes the prompt to include the pathname of the current working directory. Any changes you make to parameter variables within your `.bash_profile` file override those made earlier by the system’s .profile file. All these parameter variables are then exported with the export command.
    
    ```bash
    SCRIPT: .bash_profile
     
    # Get the aliases and functions
    if [ -f ~/.bashrc ];
     then
     . ~/.bashrc
    fi
    # User-specific environment and startup programs
    PATH=$PATH:$HOME/bin:$HOME:
     unset USERNAME
    HISTSIZE=30
    NNTPSERVER=news.myserver.com
    EXINIT='set nu ai'
    PS1="\\w \\$"
    export PATH HISTSIZE EXINIT PS1 NNTPSERVER
    ```
    

To execute the srcipt:

```bash
$ . .bash_profile
```

### `.bashrc`

## Control Structures

Have two parts:

1. Test (condition)
2. Command (Executed when the test is true)

### Loops

![](/notes/img/untitled-14.png)

![](/notes/img/untitled1-2.png)

```bash
for backfile in *.c
do
 cp $backfile sourcebak/$backfile
 echo $backfile
done
```

#### for in do done

```bash
for i in {1,2,3,4}
do 
		echo "$i hello"
done

or
for i in {1..4}
do 
		echo "$i hello"
done

```

#### to print the files

```bash
for i in ./*
do 
		echo "name of the file is:  $i"
done
```

#### while

```bash
num=1

while [ $num -le 7 ]; 
do
		echo "Number is $num"
		num=$(( num + 4 ))
done
```

### Conditionals

![](/notes/img/untitled-15.png)


The `if` condition tests the success of a Linux command, not an expression.

Tqhe end of an `if-then` command must be indicated with the keyword `fi`

The end of a `case` command is indicated with the keyword `esac`.

#### if-else-fi

```bash
echo "Hello..."

if [ 3 -eq 3 ]; then
		echo "Yes, they are the same"
fi

echo "continue..."
```

#### If on FILES

> `-e` : exist

```bash
#check if the file exist
myfile = new.txt

if [ -e $myfile ]; then
		echo "$myfile exist"
fi

#to NEGATE the condition
if [ ! -e $myfile ]; then
		echo "$myfile doesnt exist"
fi
```

#### if-elif-else-fi

```bash
read -p "enter the number: " num

if [ $num == "1" ]; then
		echo "type 1"
		elif [ $num == "2" ]; then
				echo "type 2"
		elif [ $num == "3" ]; then
				echo "type 3"
		else
				echo "none"
fi
```

#### case-esac

```bash
read choice

case $choice in
		1)
				echo "You choose A"
				;;
		"hello")
				echo " Your choose B "
				;;
		*".txt")
				echo " Your choose txt file "
				;;
		[0-9])
				echo " Your choose a number between 0 to 9 "
				;;
		[a-g])
				echo " Your choose a lowercase alphabet between a and g "
				;;
		[12-18])
				echo " This condition would never be true"
				echo " the sqaure brackets take only single digit or leter "
				;;
		1[2-8])
				echo " Your choose a number between 12 to 18 "
				echo " This si how you can use more than one digit number "
				echo " With square brackets "
				;;
		[3-5] | [7-9])
				echo " Your choose a number either bwt 3-5 OR 7-9 "
				;;
		*)
				echo " NONE "
esac
```

## User-Defined Commands

You can place shell commands within a file and then have the shell read and execute the commands in the file. A file that contains shell commands is called a shell script.

Editor (vi or nano) is used to edit the scripts.

To Execute the shell script:

1. sh or .
    
    ```bash
    lsc contains an ls command that displays only files with the extension .c
    
    $ sh lsc
    main.c calc.c
    $ . lsc
    main.c calc.c
    ```
    
2. chmod +x
    
    ```bash
    $ chmod u+x lsc
    $ lsc
    main.c calc.c
    ```
    

## Script Arguments

An argument is referenced using the $ operator and the number of its position.

The first argument is referenced with $1, the second with $2, and so on.

```bash
ScriptName Argument1 Argument2
```

```bash
ls *.$1 > lsext

$ lsext c
main.c calc.c

#the first argumet is c, which i will replace $1 in the file.e

```

The number of arguments used may vary. In lpnum, you may want to print out three files at one time and five files at some other time. The $ operator with the asterisk, `$*`_, references all the arguments on the command line. Using $_ enables you to create scripts that take a varying number of arguments.

```bash
cat -n $* | lpr & > lpnum

$ lpnum mydata preface
#first the command is executed with first argument 
#and then reexecutes with second argument
```

## Debugging

## Env Variables & Subshells

The user shell is generated as you log into the linux system. In that shell, when you run a shell script, the system generates a subshell. If you run a shell script within that script, another sub-subshell is generated.

So whenever you run a shell script, a subscript is generated inside whatever shell you currently are in. When a script has finished execution, its shell terminates and you enter back to the shell from which it was executed. In this sense, you can have many shells, each nested within the other.

- Variables that you define within a shell are local to it.

```bash
SCRIPT: dispfirst
firstname="Charles"
echo "First name is $firstname"
displast

-------------

SCRIPT: displast
lastname="Dickens"
echo "Last name is $lastname"
echo "$firstname $lastname"

--------------
$ dispfirst
First name is Charles
Last name is Dickens
 Dickens
sh: firstname: not found
```

### Export

`export` command:

- **Purpose**: Defines a copy of a variable for each new shell generated.
- **Process**: Known as exporting variables.
- **Behavior**:
    - Each new shell has its own copy of the environment variable.
    - Variables are not shared between shells; each shell gets a separate copy.
- **Misconception**: Exported environment variables are not global variables.
    - A new shell cannot reference a variable outside of itself.
    - Each shell operates with its own copy of the variable and its value.

```bash
SCRIPT: dispfile
-------------------------
setenv myfile "List"
echo "Displaying $myfile"
cat -n $myfile
printfile
-------------------------

SCRIPT: printfile
echo "Printing $myfile"
lpr $myfile &
-------------------------

#The run of the dispfile script is shown here:
% dispfile
Displaying List
1 screen
2 modem
3 paper
Printing List
```

## exit

the exit command ends the script.

## Scripts

- Checking is the string is empty
    
    `-z` is used to identify if the string is empty or not
    
    if we use $str like this without the cotations, then when you input any two words with space in between, the script will interprete it as two different string. It will through an error.
    
    thats why we put $str in quotation so interpret the two words as one string.
    
    ```jsx
    read -p "Tyoe something: " str
    
    if [-z "$str" ]; then
    		echo "This string is empty"
    fi
    ```
    
    ---
    

## Check if its Directory

> `-d` : Directory

```bash
#check if it is directory  
mydir = new

if [ -d $mydir ]; then
		echo "$mydir is dir"
fi
```

## check if the file is readable

> `-r` : Readable

> `-w` : Writable

> `-x` : Executable

> `-s` : file not empty

> `-f` : Regular file

```bash
myfile = new.txt

if [ -r $myfile ]; then
		echo "$myfile exist"
fi
```

## Exit status

If the command or the script is successfully run, Then the exit status would be `0`.

But if it is not run properly or not successfully, then the exit status is not `0`.

The failed exit status number is given to each of the command on manual. One can check it out with `man` command.

## SCRIPTS EG

```bash
#!  /bin/bash

divisible() {

		local num=$1
		echo "Number: $(num)"
		
		for i in {2,3,5}
		do
				if [ $(( $(num)%$i )) -eq 0 ]; then
						echo "The number $num is divisible by $i"
				fi
		while

}

divisible 9
```
