---
title: Windows 10 (Home vs Pro)
description: >-
  Modern Windows file system → NTFS (New Technology File System) Earlier file
  systems: FAT16/FAT32 → File Allocation Table HPFS → High Performance File
  System
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Window
  - Windows Basic
order: 90
---
## 1. File System

- **Modern Windows file system** → **NTFS** (New Technology File System)
- **Earlier file systems**:
    - FAT16/FAT32 → File Allocation Table
    - HPFS → High Performance File System

🔗 References:

- [NTFS Overview](https://docs.microsoft.com/en-us/windows-server/storage/file-server/ntfs-overview)
- [FAT, HPFS, NTFS Comparison](https://docs.microsoft.com/en-us/troubleshoot/windows-client/backup-and-storage/fat-hpfs-and-ntfs-file-systems)

### NTFS Permissions

On NTFS volumes, you can set **permissions** for files and folders:

- Full Control
- Modify
- Read & Execute
- List Folder Contents
- Read
- Write

**How to view permissions:**

1. Right-click the file/folder → **Properties**.
2. Go to **Security** tab.
3. Select user/group under _Group or user names_.

## 2. Environment Variables

- Store information about the **OS environment**.
- Include:
    - System paths
    - Number of processors
    - Location of temporary folders

## 3. System32

- Critical directory containing **essential OS files**.
- Needed for normal functioning of Windows. 
 
## 4. User Accounts, Profiles & Permissions

Two common account types in Windows:

1. **Administrator**
    - Full system-level control.
    - Can: add/delete users, modify groups, change system settings, install software.
2. **Standard User**
    - Limited to user’s files/folders.
    - Cannot make system-level changes or install programs.
## 5. User Account Control (UAC)

- Security feature that **prevents unauthorized system changes**.
- Prompts user/admin confirmation before allowing high-level tasks. 

## 6. System Configuration (`msconfig`)

- Tool to manage system startup, boot options, services, and tools.

## 7. Computer Management (`compmgmt`)

Centralized management console with three sections:

1. **System Tools**
    - Example: Create a basic task via **Task Scheduler**.
2. **Storage**
    - Manage disks and partitions.
3. **Services & Applications**
    - Manage services, event logs, and WMI controls.
## 8. Performance Logs

- Stored in: **`C:\PerfLogs`**

## 9. Windows 10 Home vs Pro (Comparison Table)

|Feature|**Windows 10 Home**|**Windows 10 Pro**|
|---|---|---|
|**Target Users**|Home / personal users|Professionals, small businesses|
|**BitLocker (Disk Encryption)**|❌ Not available|✅ Available|
|**Remote Desktop (host)**|❌ Cannot host (only client)|✅ Can act as host|
|**Hyper-V (Virtualization)**|❌ Not available|✅ Available|
|**Group Policy Management**|❌ Not available|✅ Available|
|**Assigned Access / Kiosk Mode**|❌|✅|
|**Windows Update for Business**|❌|✅|
|**Enterprise Features** (Domain Join, Azure AD)|❌|✅|
|**Max RAM supported**|128 GB|2 TB|
|**Cost**|Cheaper|More expensive|
