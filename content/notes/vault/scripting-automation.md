---
title: Scripting & Automation
description: >-
  Shell Scripting Basics Writing and running basic shell scripts Using
  variables, loops, and conditionals Advanced Shell Scripting Functions and
  error…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Shell
order: 63
---
1. **Shell Scripting Basics**
    - Writing and running basic shell scripts
    - Using variables, loops, and conditionals
2. **Advanced Shell Scripting**
    - Functions and error handling
    - Real-world scripting examples

## Scripts:

#! (shbang) : path of the program

extension for the script file is .sh

read function is used to take input for the variable

```python
read myvar
```

read is like input function

- Modification Script
    
    It refers to a script or a set of commands written to modify or alter its configuration. These scripts are often used for tasks such as installing software, configuring settings, updating system components, or making changes to files and directories.
    
    ### **Sample Modification Script**
    
    **Introduction:** This script demonstrates how to use arrays, **`cut`**, and **`stat`** commands in a modification script. It performs tasks such as extracting information from files, modifying file permissions, and updating configuration files.
    
    ```bash
    #!/bin/bash
    
    # Introduction: This script modifies system configuration files and updates permissions.
    
    # Part 1: Initial Setup and Preparation
    
    # Define an array of files to modify
    FILES_TO_MODIFY=("/etc/hosts" "/etc/passwd" "/var/log/syslog")
    
    # Function to display usage information
    usage() {
        echo "Usage: $0 [-u username] [-g groupname]"
        exit 1
    }
    
    # Parse command-line arguments
    while getopts "u:g:" opt; do
        case $opt in
            u) USERNAME=$OPTARG ;;
            g) GROUPNAME=$OPTARG ;;
            *) usage ;;
        esac
    done
    
    # Validate inputs
    if [ -z "$USERNAME" ] || [ -z "$GROUPNAME" ]; then
        usage
    fi
    
    # Part 2: Main Modification Process
    
    # Function to modify file permissions
    modify_permissions() {
        local file=$1
        echo "Modifying permissions for $file"
        # Use stat to get current permissions
        current_perms=$(stat -c "%a" "$file")
        echo "Current permissions for $file: $current_perms"
        # Change file permissions to 644
        chmod 644 "$file"
        echo "Permissions for $file changed to 644"
    }
    
    # Iterate through the array and apply modifications
    for file in "${FILES_TO_MODIFY[@]}"; do
        if [ -e "$file" ]; then
            modify_permissions "$file"
        else
            echo "File $file does not exist, skipping..."
        fi
    done
    
    # Extract specific information using cut command
    extract_info() {
        local file=$1
        echo "Extracting information from $file"
        # Extract first column from file (assuming a CSV format for demonstration)
        cut -d ',' -f 1 "$file"
    }
    
    # Example usage of extract_info function
    # Assuming /etc/passwd is comma-separated for demonstration purposes
    extract_info "/etc/passwd"
    
    # Conclusion
    
    echo "Modification script completed successfully."
    
    # Cleanup steps (if any)
    # e.g., removing temporary files, resetting environment variables, etc.
    
    # Provide feedback or results
    echo "Files modified: ${FILES_TO_MODIFY[*]}"
    echo "Permissions updated, and information extracted."
    
    # Recommendations for future improvements or extensions
    echo "Consider adding error handling and logging for better robustness."
    
    ```
    
    **Script Structure:**
    
    1. **Introduction**
        
        1. The script begins with a shebang (**`#!/bin/bash`**) indicating it's a bash script.
        2. A brief introduction comments explain the script's purpose.
    2. **Part 1: Initial Setup and Preparation**
        
        - An array **`FILES_TO_MODIFY`** contains a list of files to be modified.
        - The **`usage`** function provides instructions for script usage.
        - Command-line arguments are parsed using **`getopts`**.
        - Input validation ensures both username and groupname are provided.
    3. **Part 2: Main Modification Process**
        
        - The **`modify_permissions`** function modifies file permissions. It uses the **`stat`** command to get current permissions and then changes them to **`644`**.
        - A loop iterates through the **`FILES_TO_MODIFY`** array, applying the **`modify_permissions`** function to each file.
        - The **`extract_info`** function uses the **`cut`** command to extract specific data from a file.
    4. **Conclusion**
        
        - Summarizes the script's actions and provides feedback.
        - Cleanup steps and recommendations for future improvements are included.
    5. **Arrays:**
        
        - Arrays in bash scripting facilitate the storage and manipulation of multiple values under a single variable.
            
        - In a modification script, arrays can store lists of files, directories, or configuration parameters for modification.
            
        - Example:
            
            ```bash
            bashCopy code
            # Define an array of filenames
            files=("file1.txt" "file2.txt" "file3.txt")
            
            # Iterate through the array
            for file in "${files[@]}"; do
                echo "Processing file: $file"
                # Perform actions on each file
            done
            ```
            
    6. **The Cut command:**
        
        - The **`cut`** command extracts specific sections of text from files or standard input based on delimiters or byte/character positions.
            
        - Example:
            
            ```bash
            bashCopy code
            # Extract the second field from a colon-separated file
            cut -d ':' -f 2 file.txt
            ```
            
        - In a modification script, the **`cut`** command can parse data or extract relevant information from configuration files or system outputs.
            
    
    **3. The Stat command in Linux:**
    
    - The **`stat`** command displays detailed information about a file or file system, including permissions, timestamps, and inode numbers.
        
    - Example:
        
        ```bash
        bashCopy code
        stat file.txt
        
        ```
        
    - In a modification script, the **`stat`** command can gather metadata about files or directories before making modifications.
        
    
    **4. The Stat command in Mac Unix:**
    
    - The **`stat`** command in Mac Unix provides similar functionality to its Linux counterpart, displaying detailed file information.
        
    - Example:
        
        ```bash
        bashCopy code
        stat file.txt
        
        ```
        
    - In a modification script targeting Mac Unix systems, the **`stat`** command can be used to retrieve file metadata for modification purposes.
        
    
    **5. The MODIFICATION Script Intro:**
    
    - The introduction sets the context for the modification script, outlining its purpose, objectives, and scope.
        
    - Example:
        
        ```bash
        bashCopy code
        #!/bin/bash
        # Modification Script
        # Author: Your Name
        # Date: March 31, 2024
        # Description: Script to automate system modifications
        
        ```
        
    - It may include information about prerequisites or assumptions regarding the system environment.
        
    
    **6. The MODIFICATION Script, part 1:**
    
    - Part 1 covers initial setup and preparation steps, such as variable definition and input validation.
        
    - Example:
        
        ```bash
        bashCopy code
        # Initialize variables
        files=("file1.txt" "file2.txt" "file3.txt")
        
        # Validate inputs
        if [ $# -eq 0 ]; then
            echo "Usage: $0 <input>"
            exit 1
        fi
        
        ```
        
    - This section may include logic for identifying files or directories needing modification.
        
    
    **7. The MODIFICATION Script Part 2, a portable script:**
    
    - Part 2 contains the main logic for applying modifications to files, directories, or system settings.
        
    - Example:
        
        ```bash
        bashCopy code
        # Loop through files and perform modifications
        for file in "${files[@]}"; do
            # Apply modifications
            # Example: Change file permissions
            chmod 644 "$file"
        done
        
        ```
        
    - Ensuring portability enables the script to function across different Linux distributions or Unix-like operating systems.
        
    
    **8. Conclusion:**
    
    - The conclusion summarizes the script's actions, provides feedback or results, and may suggest improvements.
        
    - Example:
        
        ```bash
        bashCopy code
        # Script completed successfully
        echo "Modifications applied successfully."
        
        ```
        
    - It may include cleanup steps or final checks to ensure the modifications were successful and offer recommendations for future enhancements.
        
    
    ---
    
- PATH Script
    
- MAX_STRING script
    
- IFS script
    
- CALC script
    
- BACK script
    
- Automation (cron)
    
    Users may want to schedule a certain action or task to take place after the system has booted.
    
    `Crontab` is one of the processes that is started during boot, which is responsible for facilitating and managing cron jobs.
    
    A `crontab` is simply a special file with formatting that is recognised by the `cron` process to execute each line step-by-step.
    
    |Value|Description|
    |---|---|
    |MIN|What minute to execute at|
    |HOUR|What hour to execute at|
    |DOM|What day of the month to execute at|
    |MON|What month of the year to execute at|
    |DOW|What day of the week to execute at|
    |CMD|The actual command that will be executed.|
    
    To backup "cmnatic"'s "Documents" every 12 hours
    
    ```c
    0 *12 * * * cp -R /home/cmnatic/Documents /var/backups/
    ```
    
    > If we do not wish to provide a value for that specific field, i.e. we don't care what month, day, or year it is executed -- only that it is executed every 12 hours, we simply just place an asterisk.
    
    [Crontab Generator - Generate crontab syntax](https://crontab-generator.org/)
    
    [Crontab.guru - The cron schedule expression editor](https://crontab.guru/)
    
    to edit crontabs
    
    ```c
    crontab -e
    ```
    
    ---
    
- Daemon
    
    ---
    
    ## Daemon
    
    ---
    
    A daemon is a type of process that runs in the background of an operating system, typically performing tasks that need to be executed without direct user intervention. Daemons are essential for the functioning of many system services and can handle a variety of tasks, such as handling network requests, managing hardware peripherals, or performing system maintenance.
    
    ### Key Characteristics of Daemons
    
    1. **Background Operation:**
        - Daemons run in the background, without a user interface or direct user interaction.
    2. **Autonomous Execution:**
        - They operate autonomously, starting up at system boot time and continuing to run until the system shuts down.
    3. **Long-Running:**
        - Daemons are designed to be long-running processes, often running indefinitely to provide continuous service.
    4. **Service Provision:**
        - They typically provide various services, such as web servers, file servers, database management, scheduling tasks, and more.
    5. **Naming Convention:**
        - Daemons often have names that end with a 'd' (e.g., `httpd` for the Apache web server, `sshd` for the SSH daemon).
    
    ### Examples of Daemons
    
    - **`httpd`:** The Apache HTTP Server daemon, which serves web pages to clients.
    - **`sshd`:** The Secure Shell (SSH) daemon, which provides secure remote login and command execution.
    - **`cron`:** The cron daemon, which schedules and executes tasks at specified times.
    - **`systemd`:** The system and service manager for many Linux distributions, responsible for bootstrapping the user space and managing system processes.
    
    ### Creating a Simple Daemon in Bash
    
    Here is a basic example of a Bash script that runs as a daemon, periodically writing the current date and time to a log file:
    
    ```bash
    #!/bin/bash
    
    # Daemon script to log the current date and time every minute
    
    LOGFILE="/var/log/mydaemon.log"
    PIDFILE="/var/run/mydaemon.pid"
    
    start_daemon() {
        echo "Starting daemon..."
        if [ -e "$PIDFILE" ]; then
            echo "Daemon is already running."
            exit 1
        fi
        # Start the daemon process
        nohup bash -c '
        while true; do
            date >> '$LOGFILE'
            sleep 60
        done
        ' &
        echo $! > "$PIDFILE"
        echo "Daemon started with PID $(cat $PIDFILE)"
    }
    
    stop_daemon() {
        echo "Stopping daemon..."
        if [ ! -e "$PIDFILE" ]; then
            echo "Daemon is not running."
            exit 1
        fi
        kill "$(cat "$PIDFILE")"
        rm "$PIDFILE"
        echo "Daemon stopped."
    }
    
    status_daemon() {
        if [ -e "$PIDFILE" ]; then
            echo "Daemon is running with PID $(cat "$PIDFILE")"
        else
            echo "Daemon is not running."
        fi
    }
    
    case "$1" in
        start)
            start_daemon
            ;;
        stop)
            stop_daemon
            ;;
        status)
            status_daemon
            ;;
        *)
            echo "Usage: $0 {start|stop|status}"
            exit 1
            ;;
    esac
    
    exit 0
    
    ```
    
    - Explanation
        
        ### Detailed Explanation of the Daemon Script
        
        This script creates a simple daemon in Bash that logs the current date and time every minute. Let's go through the script line by line to understand how it works:
        
        ### Shebang Line
        
        ```bash
        #!/bin/bash
        
        ```
        
        - **`#!/bin/bash`**: This is called a shebang. It tells the system that this script should be run with the Bash shell.
        
        ### Comments and Variable Declarations
        
        ```bash
        # Daemon script to log the current date and time every minute
        LOGFILE="/var/log/mydaemon.log"
        PIDFILE="/var/run/mydaemon.pid"
        
        ```
        
        - **Comment**: The comment describes the purpose of the script.
        - **`LOGFILE`**: Variable that specifies the path to the log file where the daemon will write the date and time.
        - **`PIDFILE`**: Variable that specifies the path to the PID file. This file will store the process ID (PID) of the running daemon, ensuring that only one instance runs at a time.
        
        ### Function to Start the Daemon
        
        ```bash
        start_daemon() {
            echo "Starting daemon..."
            if [ -e "$PIDFILE" ]; then
                echo "Daemon is already running."
                exit 1
            fi
            # Start the daemon process
            nohup bash -c '
            while true; do
                date >> '$LOGFILE'
                sleep 60
            done
            ' &
            echo $! > "$PIDFILE"
            echo "Daemon started with PID $(cat $PIDFILE)"
        }
        
        ```
        
        - **`start_daemon` Function**: This function starts the daemon.
        - **`if [ -e "$PIDFILE" ]; then`**: Checks if the PID file exists, which would indicate the daemon is already running. If it exists, it prints a message and exits with status 1.
        - **`nohup`**: This command runs another command (in this case, a Bash command) that ignores the hangup signal (`SIGHUP`), allowing it to continue running even if the terminal is closed.
        - **`bash -c 'while true; do date >> '$LOGFILE'; sleep 60; done'`**: This starts an infinite loop that writes the current date and time to the log file every 60 seconds.
        - **`&`**: This runs the loop in the background.
        - **`echo $! > "$PIDFILE"`**: The `$!` variable contains the PID of the last background process. This PID is written to the PID file.
        - **`echo "Daemon started with PID $(cat $PIDFILE)"`**: Prints a message with the PID of the newly started daemon.
        
        ### Function to Stop the Daemon
        
        ```bash
        stop_daemon() {
            echo "Stopping daemon..."
            if [ ! -e "$PIDFILE" ]; then
                echo "Daemon is not running."
                exit 1
            fi
            kill "$(cat "$PIDFILE")"
            rm "$PIDFILE"
            echo "Daemon stopped."
        }
        
        ```
        
        - **`stop_daemon` Function**: This function stops the daemon.
        - **`if [ ! -e "$PIDFILE" ]; then`**: Checks if the PID file does not exist. If it doesn't, it prints a message and exits with status 1.
        - **`kill "$(cat "$PIDFILE")"`**: Uses the `kill` command to terminate the process with the PID stored in the PID file.
        - **`rm "$PIDFILE"`**: Removes the PID file.
        - **`echo "Daemon stopped."`**: Prints a message indicating that the daemon has stopped.
        
        ### Function to Check the Daemon's Status
        
        ```bash
        status_daemon() {
            if [ -e "$PIDFILE" ]; then
                echo "Daemon is running with PID $(cat "$PIDFILE")"
            else
                echo "Daemon is not running."
            fi
        }
        
        ```
        
        - **`status_daemon` Function**: This function checks if the daemon is running.
        - **`if [ -e "$PIDFILE" ]; then`**: Checks if the PID file exists. If it does, it prints a message with the PID of the running daemon.
        - **`else`**: If the PID file does not exist, it prints a message indicating that the daemon is not running.
        
        ### Main Script Logic
        
        ```bash
        case "$1" in
            start)
                start_daemon
                ;;
            stop)
                stop_daemon
                ;;
            status)
                status_daemon
                ;;
            *)
                echo "Usage: $0 {start|stop|status}"
                exit 1
                ;;
        esac
        
        exit 0
        
        ```
        
        - **`case "$1" in`**: This checks the first argument passed to the script (`$1`).
        - **`start)`**: If the argument is "start", it calls the `start_daemon` function.
        - **`stop)`**: If the argument is "stop", it calls the `stop_daemon` function.
        - **`status)`**: If the argument is "status", it calls the `status_daemon` function.
        - **`)`**: If the argument is anything else, it prints the usage message and exits with status 1.
        - **`exit 0`**: The script exits with status 0, indicating successful execution.
        
        ### Summary
        
        This script provides a simple way to manage a daemon process that logs the current date and time every minute. It includes functions to start, stop, and check the status of the daemon, and uses a PID file to ensure only one instance of the daemon is running at any given time. The script leverages basic shell commands like `nohup`, `kill`, and conditional checks to manage the daemon's lifecycle.
        
        ---
        
    
    ### Managing Daemons with `systemd`
    
    For more advanced and reliable daemon management, `systemd` is commonly used on modern Linux systems. Here's an example of a simple `systemd` service file for the same script:
    
    1. **Create a Service File:**
        
        ```bash
        [Unit]
        Description=My Daemon Service
        
        [Service]
        ExecStart=/path/to/your/daemon-script.sh start
        ExecStop=/path/to/your/daemon-script.sh stop
        ExecReload=/path/to/your/daemon-script.sh start
        PIDFile=/var/run/mydaemon.pid
        Restart=always
        
        [Install]
        WantedBy=multi-user.target
        
        ```
        
    2. **Place the Service File:**
        
        - Save the file as `/etc/systemd/system/mydaemon.service`.
    3. **Enable and Start the Service:**
        
        ```bash
        sudo systemctl enable mydaemon.service
        sudo systemctl start mydaemon.service
        ```
        
    4. **Check the Status:**
        
        ```bash
        sudo systemctl status mydaemon.service
        ```
        
    
    ### Summary
    
    Daemons are crucial components of an operating system that run in the background to perform various services and tasks. They are typically long-running processes that start at boot and run until the system shuts down. Daemons can be managed manually with scripts or more reliably with `systemd` on modern Linux systems.
    
    ---
