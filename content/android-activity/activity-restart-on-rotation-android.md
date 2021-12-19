---
metaTitle: Activity restart on rotation Android
tags:
- rotation
title: Activity restart on rotation Android
---

## Problem

In my Android application, when I rotate the device (slide out the keyboard) then my `Activity` is restarted (`onCreate` is called). Now, this is probably how it's supposed to be, but I do a lot of initial setting up in the `onCreate` method, so I need either:


1. Put all the initial setting up in another function so it's not all lost on device rotation or
2. Make it so `onCreate` is not called again and the layout just adjusts or
3. Limit the app to just portrait so that `onCreate` is not called.


---

## Solution

Update for Android 3.2 and higher:



> 
> **Caution**: Beginning with Android 3.2 (API level 13), **the "screen size" also changes** when the device switches between portrait and landscape orientation. Thus, if you want to prevent runtime restarts due to orientation change when developing for API level 13 or higher (as declared by the minSdkVersion and targetSdkVersion attributes), you must include the `"screenSize"` value in addition to the `"orientation"` value. That is, you must declare `android:configChanges="orientation|screenSize"`. However, if your application targets API level 12 or lower, then your activity always handles this configuration change itself (this configuration change does not restart your activity, even when running on an Android 3.2 or higher device).
> 
> 
> 



---

## Notes

- Adding android:configChanges **should only be used as a last resort**. Consider using `Fragments` and `setRetainInstance` instead.
- I'm presently targeting API 8 and my code does not have screenSize on configChanges and can confirm that it works fine (without re-orienting) on the device I have that is running ICS.
- The key point is `screenSize` for Android 3.2 and higher, that solved my problem, Thank you!
