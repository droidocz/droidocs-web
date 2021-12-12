---
metaTitle: How to start a Service when .apk is Installed for the first time
tags:
- android-layout
- android-widget
title: How to start a Service when .apk is Installed for the first time
---

## Context

In my Application I am not having any UI part, so I need to start a Service as soon as the Applicaton gets installed on the Device. I saw many links from which the answer was that its not possible but I guess it is surely possible. Just have a look at [PlanB](https://market.android.com/details?id=com.lookout.labs.planb) Application on the Android Market that does fulfil my requirement. Below is my Manifest file how I tried, but the Service was not called at all. So, let me know what is the best possible way to start a Service when the Application gets Installed.


**UPDATE**


I also tried using `android.intent.action.PACKAGE_ADDED` it works fine for detecting the Package for the other Applications but not for itself.



```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.auto.start"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk android:minSdkVersion="8" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

    <application
        android:icon="@drawable/ic_launcher" >

        <service android:name=".MyService">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </service>

        <receiver android:name=".BootUpReceiver">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED"/>
                <category android:name="android.intent.category.DEFAULT"/>
                <action android:name="android.intent.action.PACKAGE_INSTALL" />
                <action android:name="android.intent.action.PACKAGE_ADDED" />
                <data android:scheme="package"/>
            </intent-filter>
        </receiver>
    </application>
</manifest>

```


---

Fortunately, Plan B does not work on Android 3.1+, as tested on a XOOM and a Galaxy Nexus.


What Plan B does is exploit a security hole that could be used by drive-by malware, which is specifically why Android prevents it from happening anymore.




---


**UPDATE**


To clarify: As inazaruk posted and I put into comments on other answers, all applications, upon installation, are placed in a "stopped" state. This is the same state that the application winds up in after the user force-stops the app from the Settings application. While in this "stopped" state, the application will not run for any reason, except by a manual launch of an activity. Notably, no `BroadcastReceviers` will be invoked, regardless of the event for which they have registered, until the user runs the app manually.


This block covers the Plan B scenario of remote-install-and-run, which they were taking advantage of previously. After all, with that, anyone with a hacked Google account would be at risk of having their device infected, hands-free as it were.


So, when the OP says:



> 
> I need to start a Service as soon as the Applicaton gets installed on the Device
> 
> 
> 


the OP will be unsuccessful and will need to redesign the application to avoid this purported "need".



---

## Notes

- "Notably, no BroadcastReceviers will be invoked, regardless of the event for which they have registered, until the user runs the app manually" or the hardware action is performed. This can include launching the camera or a reboot (as the author also mentions in https://stackoverflow.com/a/2127179/461982). Keep in mind, this may easily get your app flagged as malware on Google Play.
