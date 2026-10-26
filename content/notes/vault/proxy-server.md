---
title: Proxy Server
description: >-
  Proxy Server Overview: Acts as an intermediary server between clients and
  other servers. Dedicated server situated between the internet and the
  internal…
date: '2026-10-26'
topics:
  - fundamentals
section:
  - Cyber Security Fundamentals
  - Common Terminologies
order: 22
---
- **Proxy Server Overview**:
    - Acts as an intermediary server between clients and other servers.
    - Dedicated server situated between the internet and the internal network infrastructure.
- **Functionality**:
    - Receives client requests and forwards them to destination servers.
    - Conducts safety assessments on incoming connection requests.
- **Distinct IP Address**:
    - Utilizes a public IP address separate from the internal network's IP.
    - This segregation shields the private network's IP from potential threats on the internet.
- **Enhanced Security**:
    - Adds an additional layer of security by obscuring the internal network's IP address.
    - Mitigates the risk of malicious actors gaining access to sensitive network information.
- **Purpose**:
    - Facilitates secure and controlled access to the internet for clients within the network.
    - Enables organizations to enforce security policies and monitor internet usage effectively.

---

- forward proxy server
    
    regulates and restricts a person with access to the internet. The goal is to hide a user's IP address and approve all outgoing requests. In the context of an organization, a forward proxy server receives outgoing traffic from an employee, approves it, and then forwards it on to the destination on the internet.
    
- reverse proxy server
    
    regulates and restricts the internet access to an internal server. The goal is to accept traffic from external parties, approve it, and forward it to the internal servers. This setup is useful for protecting internal web servers containing confidential data from exposing their IP address to external parties.
    
- email proxy server
    
    It filters spam email by verifying whether a sender's address was forged. This reduces the risk of phishing attacks that impersonate people known to the organization.
    

[learning hacking? DON'T make this mistake!! (hide yourself with Kali Linux and ProxyChains)](https://www.youtube.com/watch?v=qsA8zREbt6g)

[How To Set Up Proxy Chains In Kali/Parrot Linux](https://medium.com/@blog.yomesh/how-to-set-up-proxy-chains-in-kali-parrot-linux-3ca66656f769)
