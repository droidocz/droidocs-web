---
metaTitle: How to add a jar in External Libraries in android studio
title: How to add a jar in External Libraries in android studio
---

## Problem

I am new to Android Studio. What I need to do is add a few jar files in the `External Libraries` below the < JDK > folder.


![enter image description here](https://i.stack.imgur.com/5PXLJ.png)


If anyone has knowledge of how to do this, please help me.



---

## Solution

**A late answer, although I thought of giving an in-depth answer to this question. This method is suitable for Android Studio 1.0.0 and above.**




---


***STEPS***




---


1. First switch your folder structure from Android to **Project**.


[![enter image description here](https://i.stack.imgur.com/Mgfwr.png)](https://i.stack.imgur.com/Mgfwr.png)


2. Now search for the **libs folder** inside the app folder.


[![enter image description here](https://i.stack.imgur.com/nueZ3.png)](https://i.stack.imgur.com/nueZ3.png)


3. Once you have pasted the .jar file inside libs folder. Right click on the jar file and at end click on **Add as library**. This will take care of adding compile files('libs/library\_name.jar') in build.gradle [You don't have to manually enter this in your build file].


[![enter image description here](https://i.stack.imgur.com/CT3oJ.png)](https://i.stack.imgur.com/CT3oJ.png)


***Now you can start using the library in your project.***



---

## Notes

- Yes, I found that now, if it is already added then that option will not show.
