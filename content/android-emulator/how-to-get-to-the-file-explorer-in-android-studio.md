---
metaTitle: How to get to the file explorer in android studio
tags:
- file
title: How to get to the file explorer in android studio
---

## Context

Okay I don't know how to get to the file explorer in android studio. I already tried searching stack overflow and I found the same question I am asking but the solution there didn't work. So with screen shots could someone tell me how to get to the file explorer?



---

For Android Studio 0.8.6, go to `Tools` > `Android` > `Android Device Monitor` in the main menu, to bring up the Android Device Monitor in a separate window. There you will find what amounts a set of Eclipse perspectives, notably the DDMS perspective, which has the File Explorer view.



---

## Notes

-  Make sure that you are on the latest "Build-tools" and "Platform-tools" in the SDK Manager. I seem to recall that `hprof-conv.exe` was missing in the days after Google I|O, but AFAIK that has since been repaired.
- debugging and ADM don't go together.. one of them needs to be finished.
- As soon as you start your app it tells you it needs to close the DDMS, so you're left with a basic cut down version of DDMS built into android studio.
- For some reason when I try and open that up, it asks me where the android sdk is and when I put in the directory, it says: "C:\android-sdk-windows\tools\hprof-conv.exe not present".
