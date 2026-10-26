---
title: Linux SAMBA
description: >-
  Samba is an open-source implementation of the SMB (Server Message Block)
  protocol. It lets Linux/Unix systems share files and printers with Windows
  and…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Services
order: 81
---
- **Samba** is an **open-source implementation of the SMB (Server Message Block) protocol**.
- It lets **Linux/Unix systems share files and printers** with **Windows and macOS systems** over a network.
- With Samba, a Linux machine can act as:
    - A **file server** (shared folders accessible over the network).
    - A **print server**.
    - Even a **domain controller** for Windows clients.


## Common Use Cases

1. **File Sharing** – Share directories between Linux, Windows, and macOS.
2. **Printer Sharing** – Allow Windows systems to use Linux printers.
3. **Authentication** – Integrate Linux into a Windows Active Directory domain.
4. **Cross-platform Collaboration** – Ideal in mixed OS environments.


## Installation

```bash
sudo apt update
sudo apt install samba -y
```

## Configuration

```bash
[shared]
   path = /home/username/shared
   browseable = yes
   read only = no
   guest ok = yes
```

- `path` → directory to share.
- `browseable` → visible on the network.
- `read only` → controls write access.
- `guest ok` → allows guest access without authentication.

## Creating SAMBA User

```bash
sudo smbpasswd -a username
sudo systemctl restart smbd
```

## Accessing SAMBA Share

```bash
smbclient //server-ip/shared -U username
```

## Useful Commands

Check Configuration Syntax:
```bash
testparm
```

Restart Samba Service:
```bash
sudo systemctl restart smbd nmbd
```

See active samba shares:
```bash
smbclient -L localhost -U username
```
