---
metaTitle: Android Webview gives net::ERR_CACHE_MISS message
tags:
- webview
title: Android Webview gives net::ERR_CACHE_MISS message
---

## Problem

I built a web app and wants to create an android app that has a webview that shows my web app. After following the instructions from Google Developer to create an app, I successfully installed it on my phone with Android 5.1.1.


However, when I run the app for the first time, the webview shows the message:



> 
> Web page not available
> 
> 
> The Web page at [Lorem Ipsum URL] could not be loaded as:
> 
> 
> net::ERR\_CACHE\_MISS
> 
> 
> 



---

## Solution

I solved the problem by changing my **`AndroidManifest.xml`**.


old  : `<uses-permission android:name="android.permission.internet"/>`  

**new: `<uses-permission android:name="android.permission.INTERNET"/>`**

