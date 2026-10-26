---
title: Kernel
description: >-
  A Kernel is the core part of an operating system that manages system
  resources. It also acts as a bridge between the application and hardware of
  the…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - OS
  - Kernel
order: 36
---
A Kernel is the core part of an operating system that manages system resources. It also acts as a bridge between the application and hardware of the computer. It is one of the first programs loaded on start-up (after the Bootloader).

![](/notes/img/pasted-image-20250116185302.png)
## **Monolithic Kernel**
```
```

```
Unix, Linux, Open VMS, XTS-400 etc.
```
A **monolithic kernel** is a single large process running entirely in a single address space. All system services, such as file management, process scheduling, device drivers, and memory management, are executed within the kernel space.

##### **Characteristics:**

- **Single Address Space:** All components of the OS run in the same memory space (kernel mode).
- **High Performance:** Direct communication between components results in faster execution.
- **Large Size:** Due to many services being included in the kernel, it is relatively large.
- **Complex Debugging:** Errors in one component can crash the entire system.

##### **Advantages:**

- **Efficiency:** Faster execution since there’s no overhead of inter-process communication (IPC).
- **Simplicity:** Everything being in one place makes implementation straightforward.

##### **Disadvantages:**

- **Reliability:** A failure in one part of the kernel can lead to a system crash.
- **Limited Modularity:** Hard to modify or extend as the entire kernel needs to be rebuilt for updates.
![](/notes/img/pasted-image-20250116185913.png)



## **MicroKernel**

```
Mach, L4, AmigaOS, Minix, K42 etc.
```

https://www.geeksforgeeks.org/microkernel-in-operating-systems/

in a microkernel, the ****user services**** and ****kernel services**** are implemented in different address spaces. The user services are kept in ****user address space****, and kernel services are kept under ****kernel address space****, thus also reducing the size of the kernel and the size of the operating system as well.

A **microkernel** minimizes the functionalities in the kernel, keeping only the core functionalities, such as inter-process communication (IPC) and basic process scheduling. Other services like file systems, device drivers, and networking are implemented in user space.

##### **Characteristics:**

- **Minimal Kernel:** Only essential services are in the kernel space; the rest run in user space.
- **Modularity:** Non-kernel services run as separate processes, improving system modularity.
- **IPC-Based Communication:** Services communicate using message passing or IPC mechanisms.

##### **Advantages:**

- **Reliability:** A crash in one service does not affect the entire system.
- **Extensibility:** Easier to add or modify system services without rebuilding the entire kernel.
- **Security:** Since most services run in user space, the kernel has a smaller attack surface.

##### **Disadvantages:**

- **Performance Overhead:** Message passing between the kernel and user-space services can slow down the system.
- **Complex Design:** More difficult to design and implement compared to monolithic kernels.

User Level Process communicates with Microkernel via message passing. This way of handling the process makes microkernels more modular and more flexible than traditional monolithic kernels.

### Kernel Mode and User Mode

The CPU can execute certain instructions only when it is in kernel mode. These instructions are called privilege instructions. They allow the implementation of special operations whose execution by the user program could interface with the functioning of the operating system or activity of another user program. For example, instruction for managing memory protection. 

- The operating system puts the CPU in kernel mode when it is executing in the kernel so, that kernel can execute some special operation.
- The operating system puts the CPU in user mode when a user program is in execution so, that the user program cannot interface with the operating system program.
- User-level instruction does not require special privileges. Examples are ADD, PUSH, etc.

### Diff btw monolithic and microkernel

![](/notes/img/pasted-image-20250116224255.png)



## **Hybrid Kernel**

```
Windows NT, Netware, BeOS etc.
```
It has speed and design of monolithic kernel and modularity and stability of microkernel.
This kernel handles all the operating systems in the Windows NT family. It is called a hybrid kernel instead of a monolithic kernel as the emulation subsystems run on the user mode rather than the kernel mode, unlike in monolithic kernel.

The NT kernel cannot be called a microkernel as well. This is because almost all the system components run on the same address space as the kernel, which is a feature of the monolithic kernel.

Microsoft Windows NT Kernel:
![](/notes/img/pasted-image-20250116190629.png)

There are mainly two layers in the Windows NT operating system architecture i.e user mode and kernel mode. The user mode contains the Integral Subsystems and Environmental Subsystems with various modules in each of them.

The executive part of the kernel mode contains the executive services and object manager. The executive services include I/O manager, IPC manager, process manager etc.

Apart from the executive mode, the kernel mode contains the kernel mode drivers, the microkernel and the hardware abstraction layer. The hardware abstraction layer is connected to the hardware.

- ****Complexity:**** Hybrid kernels can be more complex than monolithic kernels because they include both monolithic and microkernel components, which can make the design and implementation more difficult.
- ****Security:**** Hybrid kernels can be less secure than microkernels because they have a larger attack surface due to the inclusion of monolithic components.
- ****Maintenance:**** Hybrid kernels can be more difficult to maintain than microkernels because they have a more complex design and implementation.
- ****Resource Usage:**** Hybrid kernels can use more system resources than microkernels because they include both monolithic and microkernel components.


![](/notes/img/pasted-image-20250116191916.png)


## **Exo Kernel**

```
Nemesis, ExOS etc.
```
An **Exokernel** is an extremely minimalistic kernel that provides as little abstraction as possible over the underlying hardware. Applications are given direct access to hardware resources, allowing them to manage resources and make decisions that the kernel previously made.

#### 1. Resource Exposure/ Minimal Abstraction

In an Exokernel, programs have direct access to hardware resources such the CPU, memory, and I/O units. Applications may now handle these resources with greater precision because they have fine-grained control over them.

#### 2. Protection and Isolation

Exokernels provide robust isolation and protection features despite exposing resources. Applications are protected from illegal access and intervention by running in separate address spaces.

#### 3. Minimalism

Exokernels take a straightforward stance. They leave high-level services and resource management to application-level libraries and only offer the absolute necessities in abstractions. This minimalism encourages adaptability and effectiveness.

#### 4. Flexibility

Exokernels adopt a direct posture. They only provide the bare minimum in abstractions, leaving high-level services and resource management to application-level libraries. This minimalism promotes efficacy and adaptability.

##### **Advantages:**

- **Customizability:** Applications can implement their own high-level abstractions for better optimization.
- **Performance:** Minimal overhead since there’s no unnecessary abstraction layer.
- **Flexibility:** Applications can directly use hardware resources, leading to tailored solutions.

##### **Disadvantages:**

- **Complexity for Developers:** Applications must implement their own abstractions, increasing development complexity.
- **Portability Issues:** Applications tailored to specific hardware may lack portability.

##### **Examples:**

- Exokernel (developed at MIT).
- Nemesis OS (similar design principles).
## **Nano Kernel**

A **Nanokernel** is a further stripped-down version of a microkernel, containing only the absolute minimal functionality needed to manage the most basic hardware operations. It is often used as a base for hypervisors or specialized systems.

##### **Key Characteristics:**

1. **Minimal Core:**
    
    - Focuses exclusively on low-level hardware interactions, such as CPU mode switching, interrupt handling, and basic scheduling.
    - Delegates almost all other responsibilities to higher-level components or user space.
2. **Foundation for Virtualization:**
    
    - Often used in hypervisors or virtual machine monitors (VMMs) to manage virtualization tasks.
    - Serves as a thin layer between hardware and virtual machines.
3. **Security and Isolation:**
    
    - Provides strong isolation and separation between tasks or virtual machines due to its minimal nature.

##### **Advantages:**

- **Extremely Small Footprint:** Minimal functionality reduces attack surface and resource usage.
- **High Security:** Isolation and simplicity enhance security.
- **Flexibility for Virtualization:** Well-suited for building hypervisors or bare-metal systems.

##### **Disadvantages:**

- **Dependency on Higher Layers:** Most functionality must be implemented outside the kernel, adding complexity.
- **Limited General Purpose Use:** Typically designed for specialized systems, not general-purpose computing.

##### **Examples:**

- L4 microkernel family (some versions approach nanokernel size).
- PicoVisor (a hypervisor built on nanokernel principles).

![](/notes/img/pasted-image-20250117003635.png)
