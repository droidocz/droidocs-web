---
metaTitle: Launch custom android application from android browser
tags:
- intentfilter
title: Launch custom android application from android browser
---

## Problem

Can anybody please guide me regarding how to launch my android application from the android browser? 



---

## Solution

All above answers didn't work for me with `CHROME` as of 28 Jan 2014


my App launched properly from <http://example.com/someresource/> links from apps like hangouts, gmail etc but not from within chrome browser.


to solve this, so that it launches properly from CHROME you have to set intent filter like this 



```
<intent-filter>
    <action android:name="android.intent.action.VIEW" />

    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />

    <data
        android:host="example.com"
        android:pathPrefix="/someresource/"
        android:scheme="http" />
    <data
        android:host="www.example.com"
        android:pathPrefix="/someresource/"
        android:scheme="http" />
</intent-filter>

```

note the `pathPrefix` element


your app will now appear inside activity picker whenever user requests <http://example.com/someresource/> pattern from chrome browser by clicking a link from google search results or any other website



---

## Notes

- Not sure how it worked for the entire world without the pathPrefix element. Never worked for me on chrome despite doing everything as per the documentation.
- http://stackoverflow.com/questions/21663001/launching-custom-android-application-from-android-browser-chrome
