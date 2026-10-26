---
title: Process Management
description: >-
  Process Management is a fundamental component of an operating system (OS) that
  manages the creation, scheduling, and termination of processes. It ensures…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - OS
  - Process Management
order: 37
---
**Process Management** is a fundamental component of an operating system (OS) that manages the creation, scheduling, and termination of processes. It ensures efficient utilization of CPU and other system resources while providing fairness, responsiveness, and isolation between running processes.

## **Key Concepts**
### Process
- A process is an instance of a program in execution.
- Consists of:
    - **Code (Text)**: The executable instructions.
    - **Data**: Variables and dynamic memory.
    - **Stack**: Function calls and local variables.
    - **Heap**: Dynamically allocated memory.


### Process States

- **New**: Process is being created.
- **Ready**: Process is ready to run but waiting for CPU time.
- **Running**: Process is currently executing.
- **Waiting (Blocked)**: Process is waiting for I/O or an event.
- **Terminated**: Process has finished execution.

### Process Control Block (PCB)

- A data structure maintained by the OS for each process.
- Contains:
    - Process ID (PID)
    - Program Counter (PC)
    - Registers
    - Scheduling Information
    - Memory Management Info
    - I/O Status


## **Responsibilities**

### Process Scheduling

Decides which process gets CPU time using scheduling algorithms:
##### 1. Short-Term Scheduler
Allocates CPU time to processes in the ready queue.
##### 2. Medium-Term Scheduler
Manages suspended processes to optimize performance.
##### 3. Long-Term Scheduler
Controls the degree of multiprogramming by admitting new processes.

### Inter-Process Communication (IPC)

- Enables processes to communicate and exchange data, share information, and synchronize their actions.

***Mechanisms:***

-  [Pipelining](/notes/pipelining/)
- [Message Queues](/notes/message-queues/)
- Shared Memory
- Semaphores

### Process Synchronization

- Ensures processes do not interfere with each other while accessing shared resources.
- Techniques:
    - Mutexes
    - Semaphores
    - Monitors
### Process Creation and Termination

- **Creation:**
    - Forking a new process in Unix/Linux.
    - Using APIs like `CreateProcess` in Windows.
- **Termination:**
    - Normal (voluntary exit).
    - Abnormal (forceful termination).

### Deadlock Handling

- Detects, avoids, or resolves deadlocks where multiple processes wait indefinitely for resources.
- Strategies:
    - Deadlock Prevention
    - Deadlock Detection and Recovery
