---
metaTitle: File Explorer in Android Studio
title: File Explorer in Android Studio
---

## Problem

Can anyone tell where the file explorer is located in Android Studio?


I tried to search in windows menu but there isn't any option like "show view" that used to be in Eclipse.



---

## Solution

You can start Android Device Monitor from the Android Studio (green robot icon on the toolbar, to the left of the help icon). From the ADM, select the device/emulator, then select the File Explorer tab.



---

## Notes

- For me, when I'm using a real device I need to disconnect and connect again in order to ADM recognize it.
- Maybe they also have a built-in DDMS perspective as they do in Eclipse, but I couldn't find it.
- NOTE: For me, clicking on the Device Monitor first popped up a window asking for the location of the SDK. This was located at C:\users\&lt;USER&gt;\AppData\Local\Android\android-sdk\ .
