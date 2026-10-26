---
title: Pipelining
description: >-
  Pipes are a unidirectional communication mechanism that allows data to flow
  from one process to another in a producer-consumer fashion.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - OS
  - Process Management
order: 40
---
**Pipes** are a unidirectional communication mechanism that allows data to flow from one process to another in a producer-consumer fashion.

- **How It Works:**
    
    - One process writes data into the pipe, while another reads data from it.
    - The data flows in a **FIFO (First-In-First-Out)** manner.
- **Types of Pipes:**
    
    - **Anonymous Pipes:**
        - Used for communication between related processes (e.g., parent and child).
        - Limited to processes on the same machine.
    - **Named Pipes (FIFOs):**
        - Allow communication between unrelated processes.
        - Identified by a name in the filesystem and can work across different machines (in some systems).
- **Example:**
    
    - **Linux/Unix:** `pipe()` system call creates an anonymous pipe.
        
        bash
        
        CopyEdit
        
        `ls | grep "file"`
        
        - Here, the output of `ls` is passed as input to `grep` via a pipe.
- **Advantages:**
    
    - Simple and easy to implement.
    - Lightweight mechanism for streaming data.
- **Disadvantages:**
    
    - Limited to one-way communication.
    - Buffer size restrictions may cause blocking.
