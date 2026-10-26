---
title: Packet Manager
description: >-
  Different package managers typically use different file extensions. For
  example, Red Hat Package Manager (RPM) has files which use the .rpm file
  extension,…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - About Linux
order: 50
---
Different package managers typically use different file extensions. For example, Red Hat Package Manager (RPM) has files which use the **.rpm** file extension, such as **Package-Version-Release_Architecture.rpm**. Package managers for Debian-derived Linux distributions, such as dpkg, have files which use the **.deb** file extension, such as **Package_Version-Release_Architecture.deb**.
 
In addition to package managers like RPM and dpkg, there are also package management tools that allow you to easily work with packages through the shell. Package management tools are sometimes utilized instead of package managers because they allow users to more easily perform basic tasks, such as installing a new package. Two notable tools are the Advanced Package Tool (APT) and Yellowdog Updater Modified (YUM).

### **Advanced Package Tool (APT)**

APT is a tool used with **Debian-derived** distributions. It is run from the command-line interface to manage, search, and install packages.

### **Yellowdog Updater Modified (YUM)**

YUM is a tool used with **Red Hat-derived** distributions. It is run from the command-line interface to manage, search, and install packages. YUM works with **.rpm** files.



## Using apt to Handle Software
	
For kali and ubuntu, The default software manager is Advanced Packaging Tool (apt).

To search for a package:

```dart
apt-cache search KEYWORD
```

To add a software:

```dart
apt-get install PACKAGE_NAME
```

To remove a software:

```dart
apt-get remove PACKAGE_NAME
```
	
> The remove command doesn’t remove the configuration files, which means you can reinstall the same package in the future without reconfiguring.

To remove the configuration files and package:
	
```dart
apt-get purge PACKAGE_NAME
```

To update packages:

```dart
apt-get update
```

To upgrade the packages:

```dart
apt-get upgrade
	```
	
> You must be logged in as a root or use sudo command
