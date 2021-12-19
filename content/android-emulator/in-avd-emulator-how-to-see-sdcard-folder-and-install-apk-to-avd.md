---
metaTitle: In AVD emulator how to see sdcard folder and Install apk to AVD
tags:
- avd
title: In AVD emulator how to see sdcard folder and Install apk to AVD
---

## Problem

I have created an **Android emulator** (*Android Virtual Device*), but I am unable to find out the SD card I have built during creation of this.


How can I find the SD card and its content and also how to install **APK** files to the **AVD**?



---

## Solution

1. switch to **DDMS** perspective
2. select the emulator in **devices** list, whose sdcard you want to explore.
3. open **File Explorer** tab on right hand side.
4. expand tree structure. **mnt/sdcard/**


refer to image below![enter image description here](https://i.stack.imgur.com/NoWOO.png)




---


To install apk manually:
copy your apk to to sdk/platform-tools folder and run following command in the same folder



```
adb install apklocation.apk

```


---

## Notes

- A new window will be opened with the DDMS perspective.
- These days the location is at `/storage/emulated/0` see http://stackoverflow.com/a/40437571/1245231
