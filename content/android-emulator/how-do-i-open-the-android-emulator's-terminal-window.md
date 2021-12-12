---
metaTitle: How do I open the android emulator's terminal window
tags:
- terminal
- android-logcat
title: How do I open the android emulator's terminal window
---

## Context

In order to enable logging for medailytics plug in, I need to enter this into the emulator's terminal



```
adb shell

setprop log.tag.MMT DEBUG

```

Unfortunatly I don't have a clue how to open the terminal and the developer resource didn't seem to mention the subject.


Also I won't be surprised if anyone tells me that there are in fact 150 more steps in this task because the medialytics documentation is really very poor.



---

On Windows, it's called the Command Prompt and can be found in your Start menu.


On OS X, it's called the Terminal and can be found in your Apple menu.


On Linux, it's called the Terminal...and if you're on Linux and don't know where that is, may $DEITY have mercy on your soul.



---

## Notes

- I am using Ubuntu OS and working with Titanium(Appcelerator), when I install App on emulator from it, Titanium shows a small console down there in Titanium Window only.
- On Windows I tried Command Prompt but got "'adb' is not recognized as an internal or external command...". That is, your PATH environment variable must contain &lt;path-to-android-sdks&gt;\platform-tools
