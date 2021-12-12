---
metaTitle: How to add 'libs' folder in Android Studio
tags:
- directory
- libs
title: How to add 'libs' folder in Android Studio
---

## Context

I need help in creating the 'libs' folder in Android Studio for my project (It is not auto-generated in my project).


When I want to create a folder, it gives me lots of options, like AIDL, Assets, JNI, Java, Java Resources, Renderscripts, and 'res' folders. I chose **Res** and added a libs folder but it didn't show up on my file structure on the left.


Can anyone help me?


I wanted to add a JAR file but I can't find libs to put in.



---

The solution for me was very simple (after 10 hours of searching).
Above where your folders are there is a combobox that says "android"
click it and choose "Project".


[![enter image description here](https://i.stack.imgur.com/6kHlA.png)](https://i.stack.imgur.com/6kHlA.png)



---

## Notes

- wow.. and here I was wondering why there were so many ways to view my project. How Eclipse did it before worked, just show us everything!
- If the font for the library names are in orange does it have any meaning?
