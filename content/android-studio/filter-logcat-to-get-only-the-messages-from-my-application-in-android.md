---
metaTitle: Filter LogCat to get only the messages from My Application in Android
tags:
- logcat
title: Filter LogCat to get only the messages from My Application in Android
---

## Problem

I observed that when i use Logcat with Eclipse with ADT for Android, I get messages from many other applications as well. Is there a way to filter this and show only messages from my own application only.



---

## Solution

Add filter


![Add filter](https://i.stack.imgur.com/F7Z7D.png)


Specify names


![enter image description here](https://i.stack.imgur.com/RIT4I.png)


Choose your filter.


![enter image description here](https://i.stack.imgur.com/FTE7O.png)



---

## Notes

- That's the package name, not the application name.
