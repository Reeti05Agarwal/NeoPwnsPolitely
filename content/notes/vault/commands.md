---
title: Commands
description: >-
  While Loop + Switch Case bash while true; do echo "Choose an operation:" echo
  "1. Display the number of lines, words, and characters" echo "2. Sort the…
date: '2026-10-26'
topics:
  - systems
section:
  - Systems
  - Linux
  - Bash
order: 71
---
## Display menu 

While Loop + Switch Case
```bash
while true; do
  echo "Choose an operation:"
  echo "1. Display the number of lines, words, and characters"
  echo "2. Sort the content of the file"
  echo "3. Convert content to uppercase"
  echo "4. Search in the file"
  echo "5. Rename the file"
  echo "6. Delete the file"
  echo "7. Exit"
  read -p "Enter your choice (1-7): " choice

  case $choice in
    1)
      echo "Lines, Words, and Characters:"
      wc "$file"
      ;;
    2)
      echo "Sorting the file content..."
      sort "$file" -o "$file"
      echo "File content sorted."
      ;;
    3)
      echo "Converting content to uppercase..."
      tr '[:lower:]' '[:upper:]' < "$file" > temp_file && mv temp_file "$file"
      echo "Content converted to uppercase."
      ;;
    4)
      read -p "Enter the search term: " search_term
      echo "Search results:"
      grep -n "$search_term" "$file" || echo "No matches found."
      ;;
    5)
      read -p "Enter the new file name: " new_file
      mv "$file" "$new_file"
      file="$new_file"
      echo "File renamed to $file."
      ;;
    6)
      echo "Deleting the file..."
      rm "$file"
      echo "File deleted."
      break
      ;;
    7)
      echo "Exiting the script."
      break
      ;;
    *)
      echo "Invalid choice. Please select a valid option."
      ;;
  esac
done
```
