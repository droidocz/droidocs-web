---
metaTitle: 'Android Studio: how to attach Android SDK sources'
title: 'Android Studio: how to attach Android SDK sources'
---

## Problem

How can I attach Android SDK sources to Android Studio? 


When I open one of the Android classes, the "Sources not found" window with "Attach Sources" option doesn't appear.


What is the other way to do this?



---

## Solution

Android Studio 3.2.1 reporting in: 
solved the issue by resetting SDK.


**Preferences -> Appearance & Behavior -> System Settings -> Android SDK.**


Click on **Edit** to the right of Android SDK location.
**Next, Next, Finish** to complete the wizard and voila!



---

## Notes

-  File / Settings for Windows(Linux?
- on Linux it's: `File -> Settings -> Appearance&Behavior -> System Settings -> Android SDK`
-  File / Settings is on Linux.
- I've downloaded the sources for compileSdkVersion 28 and my build.gradle also has targetSdkVersion 28, and when I run my app in the debugger I can see all sorts of things like `art::ArtMethod::Invoke` and `StartBackgroundThread` (this is for a JNI helper thread in my app) but clicking on anything in the Android part of the stack doesn't show me the associated source file.
