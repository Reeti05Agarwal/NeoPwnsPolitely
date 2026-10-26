---
title: Arithmetic Operations
description: 'num = $((number1+3)) echo "value = $num" or echo "ADD: $((num +=3))"'
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
order: 68
---
```python
echo " $((2+3))"
```

```bash
num = 10
echo "$((nu++))"
```

```bash
num = 10

num = $((number1+3))
echo "value = $num"
or 
echo "ADD: $((num +=3))"
```


## Comparison Operations
  
The `expr` command can also be used for basic comparison operations, returning 1 for true and 0 for false.

### Equality Check
```bash
expr 5 = 5

#OUTPUT: 1
```

### Greater Than Check
```bash
expr 10 \\\\> 5

#OUTPUT: 1
```


The general syntax for using `expr` is:

```
expr expression

```

### Examples of Basic Mathematical Operations

1. **Addition**
	
	```
	expr 5 + 3
	
	```
	
	Output:
	
	```
	8
	
	```
	
2. **Subtraction**
	
	```
	expr 10 - 2
	
	```
	
	Output:
	
	```
	8
	
	```
	
3. **Multiplication**
	
	```
	expr 4 \\\\* 2
	
	```
	
	Note: The `*` symbol needs to be escaped with a backslash (`\\\\`) to prevent the shell from interpreting it as a wildcard character. Output:
	
	```
	8
	
	```
	
4. **Division**
	
	```
	expr 20 / 4
	
	```
	
	Output:
	
	```
	5
	
	```
	
5. **Modulus**
	
	```
	expr 15 % 4
	
	```
	
	Output:
	
	```
	3
	
	```


### Using `expr` in Shell Scripts

The `expr` command is often used in shell scripts for performing arithmetic operations. Here is an example:

```
#!/bin/bash

# Example of using expr in a script

a=5
b=3

sum=$(expr $a + $b)
echo "Sum: $sum"

difference=$(expr $a - $b)
echo "Difference: $difference"

product=$(expr $a \\\\* $b)
echo "Product: $product"

quotient=$(expr $a / $b)
echo "Quotient: $quotient"

remainder=$(expr $a % $b)
echo "Remainder: $remainder"

```

### Summary

- **Addition**: `expr 5 + 3`
- **Subtraction**: `expr 10 - 2`
- **Multiplication**: `expr 4 \\\\* 2`
- **Division**: `expr 20 / 4`
- **Modulus**: `expr 15 % 4`
- **String Length**: `expr length "Hello, World!"`
- **Substring Extraction**: `expr substr "Hello, World!" 1 5`
- **Equality Check**: `expr 5 = 5`
- **Greater Than Check**: `expr 10 \\\\> 5`
