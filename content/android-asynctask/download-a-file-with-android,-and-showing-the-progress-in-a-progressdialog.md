---
metaTitle: Download a file with Android, and showing the progress in a ProgressDialog
tags:
- java
- download
title: Download a file with Android, and showing the progress in a ProgressDialog
---

## Context

I am trying to write a simple application that gets updated. For this I need a simple function that can download a file and *show the current progress* in a `ProgressDialog`. I know how to do the `ProgressDialog`, but I'm not sure how to display the current progress and how to download the file in the first place.



---

Don't forget to add permissions to your manifest file if you're gonna be downloading stuff from the internet!



```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.helloandroid"
    android:versionCode="1"
    android:versionName="1.0">

        <uses-sdk android:minSdkVersion="10" />

        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"></uses-permission>
        <uses-permission android:name="android.permission.INTERNET"></uses-permission>
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"></uses-permission>
        <uses-permission android:name="android.permission.READ_PHONE_STATE"></uses-permission>

        <application 
            android:icon="@drawable/icon" 
            android:label="@string/app_name" 
            android:debuggable="true">

        </application>

</manifest>

```


---

## Notes

- I'm pretty sure you don't need READ_PHONE_STATE and you definitely don't need WRITE_EXTERNAL_STORAGE; it's a dangerous permission that can be avoided by using the Storage Access Framework.
