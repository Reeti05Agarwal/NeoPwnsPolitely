---
title: Security Zones
description: A segment of a network that protects the internal network from the internet.
date: '2026-10-26'
topics:
  - fundamentals
section:
  - Cyber Security Fundamentals
  - Common Terminologies
order: 26
---
## Security Zones

A segment of a network that protects the internal network from the internet.

Its a part of a security technique called network segmentation that divides the network into segments. Each network segment has its own access permissions and security rules.

Security zones control who can access different segments of a network. Security zones act as a barrier to internal networks, maintain privacy within corporate groups, and prevent issues from spreading to the whole network.

### Subnetworks

An organization's network can be divided into subnetworks, or subnets, to maintain privacy for each department in a organization.

Subnetting divides up a network address range into smaller subnets within the network. These smaller subnets form based on the IP addresses and network mask of the devices on the network.

This makes the network more efficient and can also be used to create security zones

Subnetting allows network professionals and analysts to create a network within their own network without requesting another network IP address from their internet service provider.

#### Classless Inter-Domain Routing (CIDR):

A method of assigning subnet masks to IP addresses to create a subnet.

Classless addressing replaces classful addressing.

Classful addressing was used in the 1980s as a system of grouping IP addresses into classes (Class A to Class E). Each class included a limited number of IP addresses, which were depleted as the number of devices connecting to the internet outgrew the classful range in the 1990s. Classless CIDR addressing expanded the number of available IPv4 addresses.

CIDR allows cybersecurity professionals to segment classful networks into smaller chunks. CIDR IP addresses are formatted like IPv4 addresses, but they include a slash (“/’”) followed by a number at the end of the address, This extra number is called the IP network prefix.  For example, a regular IPv4 address uses the 198.51.100.0 format, whereas a CIDR IP address would include the IP network prefix at the end of the address, 198.51.100.0/24. This CIDR address encompasses all IP addresses between 198.51.100.0 and 198.51.100.255. The system of CIDR addressing reduces the number of entries in routing tables and provides more available IP addresses within networks. You can try converting CIDR to IPv4 addresses and vice versa through an online conversion tool, like [IPAddressGuide](https://www.ipaddressguide.com/cidr), for practice and to better understand this concept.

### Uncontrolled zone:

which is any network outside of the organization's control, like the internet.

### Controlled zone:

which is a subnet that protects the internal network from the uncontrolled zone.

There are several types of networks within the controlled zone. On the outer layer is the **demilitarized zone**, or DMZ, which contains public-facing services that can access the internet. This includes web servers, proxy servers that host websites for the public, and DNS servers that provide IP addresses for internet users. It also includes email and file servers that handle external communications.

The DMZ acts as a network perimeter to the internal network. The internal network contains private servers and data that the organization needs to protect. Inside the internal network is another zone called the **restricted zone**. The restricted zone protects highly confidential information that is only accessible to employees with certain privileges.

Ideally, the DMZ is situated between two firewalls. One of them filters traffic outside the DMZ, and one of them filters traffic entering the internal network. This protects the internal network with several lines of defense. If there's a restricted zone, that too would be protected with another firewall. This way, attacks that penetrate into the DMZ network cannot spread to the internal network, and attacks that penetrate the internal network cannot access the restricted zone. As a security analyst, you may be responsible for regulating access control policies on these firewalls. Security teams can control traffic reaching the DMZ and the internal network by restricting IPs and ports. For example, an analyst may ensure that only HTTPS traffic is allowed to access web servers in the DMZ.
