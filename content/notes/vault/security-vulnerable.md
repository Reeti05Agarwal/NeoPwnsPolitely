---
title: Security Vulnerable
description: >-
  This vulnerability occurs when data is written beyond the limits of a buffer.
  Buffers are memory areas allocated to an application. By changing data beyond…
date: '2026-10-26'
topics:
  - fundamentals
section:
  - Cyber Security Fundamentals
  - Common Terminologies
order: 25
---
## **Buffer overflow**

This vulnerability occurs when data is written beyond the limits of a buffer. Buffers are memory areas allocated to an application. By changing data beyond the boundaries of a buffer, the application accesses memory allocated to other processes. This can lead to a system crash, data compromise, or provide escalation of privileges.

## **Non-validated input**

Programs often work with data input. This data coming into the program could have malicious content, designed to force the program to behave in an unintended way. Consider a program that receives an image for processing. A malicious user could craft an image file with invalid image dimensions. The maliciously crafted dimensions could force the program to allocate buffers of incorrect and unexpected sizes.

## **Race conditions**

This vulnerability is when the output of an event depends on ordered or timed outputs. A race condition becomes a source of vulnerability when the required ordered or timed events do not occur in the correct order or proper timing.

## **Weaknesses in security practices**

Systems and sensitive data can be protected through techniques such as authentication, authorization, and encryption. Developers should not attempt to create their own security algorithms because it will likely introduce vulnerabilities. It is strongly advised that developers use security libraries that have already created, tested, and verified.

## **Access-control problems**

Access control is the process of controlling who does what and ranges from managing physical access to equipment to dictating who has access to a resource, such as a file, and what they can do with it, such as read or change the file. Many security vulnerabilities are created by the improper use of access controls.
