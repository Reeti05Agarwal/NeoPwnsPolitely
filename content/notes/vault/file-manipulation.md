---
title: File Manipulation
description: 'Open that Directory: dart cd DirectoryName'
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - File Management
order: 53
---
## Commands Table

| pwd    | print working directory                       |
| ------ | --------------------------------------------- |
| cd     | change directory                              |
| touch  | create file name                              |
| mkdir  | make directory                                |
| ls     | listing                                       |
| cp     | copy file                                     |
| mv     | move                                          |
| cat    | concatenate (viewing the content of the file) |
| head   | Show First n lines                            |
| tail   | Show last n lines                             |
| rm     | remove                                        |
| whatis | Gives Command Info                            |
| man    | Manual of the Command                         |
| whoami | Display current username                      |
| ps     | Display all the processes running             |
| file   | Display the File Type                         |


## All Commands

#### `pwd` Print Working Directory

#### **`cd` Change Directory**

Open that Directory:
```dart
cd DirectoryName
```

To move up one level:
```dart
cd ..
```

To move up two levels:
```dart
cd .. ..
```

When i want to go to a directory that is not in the currently running directory:
```dart
cd /DirectoryName1/DirectoryName2
```

Take u directly to the home directory:
```dart
cd ~
```



#### `touch` Create File
```dart
touch FILE_NAME
```




#### `mkdir` Create Directory
```dart
mkdir DIRECTORY_NAME
```

Create parent directories if they don’t exist
```jsx
mkdir -p path/to/directory
```




#### `ls` Listing

List files and directories in the current location
```jsx
ls
```

Detailed listing with additional information
```jsx
ls -l
```

Show hidden files:
```jsx
ls -a
```




#### `cp` Copy Files/Dir

To copy the file to another file:
```dart
cp NEW_FILE OLD_FILE

cp sourcefile destination
```

To rename the file:
```dart
mv OLD_FILE NEW_FILE
```

To copy a directory:
```c
cp -R <old_dir> <new_dir>
```

> `-R` --> recursive



#### `mv` Move File
To move a File/Folder
```c
mv ToBeMoved ThePlaceToMove
```


#### `cat` Concatenation

```dart
cat DIRECTORY/File_Name
```
 
View file content page by page.

_displays a page of a file at a time and lets you page down through it using the enter key. To exit more, enter q (for quit)._

_you can not only scroll through a file at your leisure, but you can also filter it for terms._

_If you press the forward slash (/) key, less will let you search for terms in the file._

```jsx
more filename or less filename
```




#### `head` & `tail` of File

To view beginning/Ending of file:
```dart
head FILE_PATH
// By default, this command displays the first 10 lines of a file.

head -n FILE_PATH

tail -n FILE_PATH
//View n number of lines
```
 
To display line numbers:
```dart
nl FILE_PATH
```




#### `rm` Remove

To Remove file
```dart
rm FILE_NAME
```

Remove a directory and its contents:
```jsx
rm -r directoryname
```

> `-r` --> recursive
> `-f` --> Force 

Forcefully remove a directory without prompting
```jsx
rm -rf directoryname
```




#### `whatis` Command Info
Give info about *Command_Name*
```dart
whatis COMMAND_NAME

```

#### `man` Command Manual
Manual of the command
```dart
man COMMAND_NAME
```

#### `whoami` Current User
```dart
whoami 
```


#### `ps` Process Status
To see all the process running on the machine
```dart
ps SWITCH
```

 
 
#### `file` File Type
To Determine the file type
```c
file FileName
```



1. **User and Group Management**
    - Creating and managing users and groups
    - Understanding /etc/passwd and /etc/group
2. **Process Management**
    - Understanding processes and their lifecycle
    - Using ps, top, kill, and other process management tools
3. **Package Management**
    - Introduction to package managers (APT, YUM, DNF, Zypper)
    - Installing, updating, and removing software

- Processes
    
    Process ID —> PID
    
    Processes are programs that are running on comp, managed by kernel, where each process will have an ID associated with it. The PID increments for the order In which the process starts. I.e. the 60th process will have a PID of 60.
    
    - Viewing Process
        
        [Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9e175e8e-c5d0-40ac-8cf1-e6878bb78634/fa4e04ba-f7ad-4404-9505-5e9c6fb4ae25/Untitled.png)
        
        - It refreshes in every 10 sec
        
        ---
        
    - Managing Process
        
        To kill a command
        
        ```c
        kill   or   kill PID_Process(like: 205)
        ```
        
        - SIGTERM - Kill the process, but allow it to do some cleanup tasks beforehand
        - SIGKILL - Kill the process - doesn't do any cleanup after the fact
        - SIGSTOP - Stop/suspend a process
        
        ---
        
    - How do Processes Start
        
        NAMESPACES:
        
        The system is divided into many parts (RAM, CPU, Priority), Processes within that slice will have access to a certain amount of computing power.
        
        Great for security purpose, only those that are in the same namespace will be able to see each other.
        
        PID → 0 : The process started when when the system boots
        
        This process is the system's init on Ubuntu, such as **systemd**, which is used to provide a way of managing a user's processes and sits in between the operating system and the user.
        
    - Getting Processes & Services To Start on Boot
        
        `systemctl [option] [service]`
        
        allows us to interact with the **systemd** process/daemon.
        
        We can do four options with `systemctl`:
        
        - Start
        - Stop
        - Enable
        - Disable
    - An Introduction to Backgrounding and Foregrounding in Linux
        
        Processes can run in two states:
        
        - In the background
        - In the foreground.
        
        echo run in foreground as the output is given to us and not done in background.
        
        [Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9e175e8e-c5d0-40ac-8cf1-e6878bb78634/4197b167-1c07-46ed-8ac6-2b149177dfe1/Untitled.png)
        
        > Here we're running `echo "Hi THM"` , where we expect the output to be returned to us like it is at the start. But after adding the `&` operator to the command, we're instead just given the ID of the echo process rather than the actual output -- as it is running in the background.
        
        PURPOSE: This is great for commands such as copying files because it means that we can run the command in the background and continue on with whatever further commands we wish to execute (without having to wait for the file copy to finish first)
        
        We can do the exact same when executing things like scripts -- rather than relying on the & operator, we can use `Ctrl + Z` on our keyboard to background a process. It is also an effective way of "pausing" the execution of a script or command like in the example below:
        
        [Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9e175e8e-c5d0-40ac-8cf1-e6878bb78634/24119360-4e42-4141-ada7-8959f21c2f45/Untitled.png)
        
        ---
        
    - Foregrounding a process
        
        &lt;aside> 💡 The process can be backgrounded by using `&` opperator or `CTRL + z`
        
        &lt;/aside>
        
        `fg` command is used to bring the process in foreground.
        
    
    ---
    
- Process Management
    
    For example, once a hacker takes control of a target system, they might want to find and stop a certain process, like an antivirus application or firewall. To do so, the hacker would first need to know how to find the process. The hacker might also want to set a scanning script to run periodically to find vulnerable systems, so we’ll also look at how to schedule such a script.
    
    - Viewing Processes
        
        To view the processes running:
        
        ```dart
        ps
        ```
        
        Linus kernel (inner core) assigns a unique process ID (PID) to each process.
        
        Running the ps command without any options lists the processes started by the currently logged-in user and what processes are running on that terminal. We want and need far more information than that, particularly on those processes run by other users and by the system in the background.
        
        To see the processes run by other users and those that don't run from a session
        
        ```c
        ps aux
        ```
        
        USER→ The user who invoked the process PID→ The process ID %CPU→ The percent of CPU this process is using %MEM→ The percent of memory this process is using COMMAND→ The name of the command that started the process
        
        ---
        
        - Filtering by Process Name
            
            with grep:
            
            ```dart
            ps aux | grep msfconsole
            ```
            
            To see if metaploit is working in processes
            
            ---
            
        - Finding the Greediest Processes with top
            
            real-time statistics about the processes running on your system instead of a one-time view
            
            ```c
            top
            ```
            
            ---
            
        
        ---
        
    - Managing Processes
        
        - Changing Process Priority with nice
        - Setting the Priority When Starting a Process
        - Changing the Priority of a Running Process with renice
        - Killing Processes
        - Running Processes in the Background
        - Moving a Process to the Foreground
    - Scheduling Processes
        
    
    ---
    

-rw-r--r--

“-” → It is a file

“rw” →Owner of the file can read and write

```c
tryhackme@linux2:~$ ls -lh
-rw-r--r-- 1 cmnatic cmnatic 0 Feb 19 10:37 file1
-rw-r--r-- 8 cmnatic cmnatic 0 Feb 19 10:37 file2
```
