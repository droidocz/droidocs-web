---
metaTitle: How to download Google Play Services in an Android emulator
tags:
- google-play-services
- google-maps-android-api-2
title: How to download Google Play Services in an Android emulator
---

## Problem

I want to use Google Play Services API in my application, but when I open the emulator to test my application it sends me a message that says "Google Play Services must be downloaded". I know that occurs because I coded this test in my `MainActivity` in the method `onResume()`.  

I want to know how I can install Google Play Services in my emulator, because soon I will need to test my maps.



---

## Solution

Check out [Setting Up Google Play Services](http://developer.android.com/google/play-services/setup.html) which says:



> 
> To develop an app using the [Google Play services APIs](http://developer.android.com/reference/gms-packages.html), you need to set up your project with the Google Play services SDK.
> 
> 
> If you haven't installed the Google Play services SDK yet, go get it now by following the guide to [Adding SDK Packages](http://developer.android.com/sdk/installing/adding-packages.html).
> 
> 
> To test your app when using the Google Play services SDK, you must use either:
> 
> 
> * A compatible Android device that runs Android 2.3 or higher and includes Google Play Store.
> * The Android emulator with an [AVD](http://developer.android.com/tools/devices/index.html) that runs the Google APIs platform based on Android 4.2.2 or higher.
> 
> 
> 



---

## Notes

- There has been updates, developer site quoted: "The Android emulator with an AVD that runs the Google APIs platform based on Android 4.2.2 or higher."
- I am using Google APIS ver.
- Interestingly selecting a lower API target than 23 (Marshmallow) results in the device trying to update the Google Play services which always fails for me.
- I tried using the Android API (version 4.3) and it didn't work, so the key is to use the Google API (version 4.3). Since they were the same version number, I didn't realize why it wasn't running at first.
- It seems that using an Android image with Google API does not work with Google Play.
