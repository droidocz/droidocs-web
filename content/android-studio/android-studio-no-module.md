---
metaTitle: Android Studio-No Module
title: Android Studio-No Module
---

## Context

I am new to Android Studio.This is my project screenshot.My project builds successfully but when i run it only Build Successful is shown.![enter image description here](https://i.stack.imgur.com/GhLVt.png)  

By what I understand I think where build is written in the toolbar there should be my project name.When I go to Edit Configuration inside Module there is only one option that is No Module while I think my project name should be there.When I right click on my project and click on Make Module 'Copy of IBL2 eclipse' nothing happens.This project was running fine in eclipse.



---

Try first in Android Studio:


File -> Sync Project with Gradle Files



---

## Notes

- Apparently this is needed every time you update Android Studio and/or gradle
- Right, but I am wondering without such experience, how do I know &lt;No Module&gt; was caused by Gradle Synchronization of Project issue?
- Particularly useful if ejecting from Expo
