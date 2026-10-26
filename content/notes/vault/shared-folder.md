---
title: Shared Folder
description: Documentary on how to create a shared folder between Linux vm and windows
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
order: 88
---
Documentary on how to create a shared folder between Linux vm and windows

To set up a shared folder between your Linux virtual machine (VM) and your Windows host, follow these steps based on whether you're using **VirtualBox** or **VMware**:

---

## **For VirtualBox**

### 1. **Enable Shared Folders**

1. **Open VirtualBox Manager**:
    
    - Select your Linux VM.
    - Click on **Settings**.
2. **Navigate to Shared Folders**:
    
    - Go to the **Shared Folders** section in the VM settings.
3. **Add a Shared Folder**:
    
    - Click the **Add Folder** icon (a folder with a "+" sign).
    - In the **Folder Path**, browse to the folder on your Windows host that you want to share.
    - In the **Folder Name**, assign a name (e.g., `shared_folder`).
    - Check the box for **Auto-mount** and optionally **Make Permanent**.
4. **Save the Settings**:
    
    - Click **OK** to save and close the settings.

---

### 2. **Install Guest Additions in the Linux VM**

1. Start your Linux VM.
2. Insert the Guest Additions CD:
    - In the VirtualBox menu, go to **Devices > Insert Guest Additions CD Image**.
3. Mount the CD (if not auto-mounted):
    
    ```bash
    sudo mount /dev/cdrom /mnt
    ```
    
4. Run the installer:
    
    ```bash
    sudo /mnt/VBoxLinuxAdditions.run
    ```
    
5. Reboot the VM:
    
    ```bash
    sudo reboot
    ```
    

---

### 3. **Access the Shared Folder in Linux**

1. After rebooting, the shared folder should be auto-mounted.
    
2. Check the `/media` or `/mnt` directory for your shared folder:
    
    ```bash
    ls /media
    ```
    
    You should see your shared folder (e.g., `shared_folder`).
    
3. Copy files to the shared folder:
    
    ```bash
    cp /path/to/your/files /media/shared_folder
    ```
    
4. The files will now be available in the shared folder on your Windows host.
    

---

## **For VMware**

### 1. **Enable Shared Folders**

1. **Open VMware Workstation/Player**:
    
    - Select your Linux VM.
    - Go to **Settings**.
2. **Add a Shared Folder**:
    
    - Navigate to the **Options** tab.
    - Select **Shared Folders** and click **Always enabled**.
    - Click **Add** to create a new shared folder.
    - Select a folder on your Windows host and give it a name (e.g., `shared_folder`).
    - Check the box for **Enable this share** and optionally **Read-only** (if you want).
3. **Save the Settings**:
    
    - Click **OK** to save.

---

### 2. **Install VMware Tools in the Linux VM**

1. Start your Linux VM.
2. Install VMware Tools:
    - In VMware, go to **VM > Install VMware Tools**.
3. Mount the CD (if not auto-mounted):
    
    ```bash
    sudo mount /dev/cdrom /mnt
    ```
    
4. Extract and install VMware Tools:
    
    ```bash
    tar -xzvf /mnt/VMwareTools-*.tar.gz -C /tmp
    cd /tmp/vmware-tools-distrib
    sudo ./vmware-install.pl
    ```
    
5. Reboot the VM:
    
    ```bash
    sudo reboot
    ```
    

---

### 3. **Access the Shared Folder in Linux**

1. After rebooting, the shared folder should be auto-mounted.
    
2. Check the `/mnt/hgfs` directory for your shared folder:
    
    ```bash
    ls /mnt/hgfs
    ```
    
    You should see your shared folder (e.g., `shared_folder`).
    
3. Copy files to the shared folder:
    
    ```bash
    cp /path/to/your/files /mnt/hgfs/shared_folder
    ```
    
4. The files will now be available in the shared folder on your Windows host.
    

---

### **Testing**

- On your Windows host, open the shared folder location and confirm that the files copied from your Linux VM are visible.
- Let me know if you encounter any issues! 😊
