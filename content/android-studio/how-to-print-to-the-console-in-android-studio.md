---
metaTitle: How to print to the console in Android Studio
tags:
- java
- mobile
- development-environment
title: How to print to the console in Android Studio
---

## Problem

I just downloaded Android Studio for Linux from: 
<http://developer.android.com/sdk/installing/studio.html>


I'm wondering how to print to the console?


Neither `System.out.print(...)` nor `Log.e(...)` from `android.util.Log` seem to work.



---

## Solution

Run your application in **debug** *mode* by clicking on 


![enter image description here](https://i.stack.imgur.com/2oL50.png)


in the upper menu of Android Studio.


In the bottom status bar, click `5: Debug` button, next to the `4: Run` button.


Now you should select the `Logcat` console. 


In search box, you can type the *tag* of your message, and your message should appear, like in the following picture (where the tag is `CREATION`):


![enter image description here](https://i.stack.imgur.com/kMA4B.png)


Check [this article](https://developer.android.com/tools/debugging/debugging-studio.html) for more information.

