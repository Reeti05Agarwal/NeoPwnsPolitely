---
title: Message Queues
description: >-
  Message Queues provide a way to send and receive messages between processes in
  an organized manner.
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - OS
  - Process Management
order: 39
---
**Message Queues** provide a way to send and receive messages between processes in an organized manner.

## **How It Works:**

- Processes send messages to a queue, which can be retrieved by other processes.
- Messages can include metadata, such as priority.

## **Features:**
    
- Can handle asynchronous communication.
- Messages are stored until explicitly retrieved.
- Messages can be prioritized based on queue configuration.

## **Example:**
    
- **Linux/Unix:** `msgget()`, `msgsnd()`, `msgrcv()` system calls.

```c
int msqid = msgget(key, IPC_CREAT | 0666); msgsnd(msqid, &msg, sizeof(msg), 0); msgrcv(msqid, &msg, sizeof(msg), 0, 0);
```
	
## **Advantages:**
    
- Supports structured data exchange.
- Can be used for multiple-to-multiple process communication.

## **Disadvantages:**
    
- More complex to manage compared to pipes.
- Requires system calls and may involve overhead.
