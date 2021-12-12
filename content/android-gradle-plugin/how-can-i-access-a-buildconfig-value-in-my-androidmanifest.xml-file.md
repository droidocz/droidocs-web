---
metaTitle: How can I access a BuildConfig value in my AndroidManifest.xml file
tags:
- android-xml
- android-facebook
title: How can I access a BuildConfig value in my AndroidManifest.xml file
---

## Context

Is it possible to access a BuildConfig value from AndroidManifest.xml?


In my build.gradle file, I have:



```
defaultConfig {
    applicationId "com.compagny.product"
    minSdkVersion 16
    targetSdkVersion 21
    versionCode 1
    versionName "1.0"

    // Facebook app id
    buildConfigField "long", "FACEBOOK_APP_ID", FACEBOOK_APP_ID
}

```

`FACEBOOK_APP_ID` is defined in my gradle.properties files:



```
# Facebook identifier (app ID)
FACEBOOK_APP_ID=XXXXXXXXXX

```

To use Facebook connect in my app, I must add this line to my AndroidManifest.xml:



```
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/applicationId"/> 

```

I want to replace `@string/applicationId` by the BuildConfig field `FACEBOOK_APP_ID` defined in gradle, like this:



```
<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="FACEBOOK_APP_ID"/> 

```

Is that possible using BuildConfig? If not, how can I achieve this?



---

Access build.gradle properties in your manifest as in following example:


For example you have a property "applicationId" in your build.gradle and you want to access that in your AndroidManifest:


[![enter image description here](https://i.stack.imgur.com/7Pk0w.png)](https://i.stack.imgur.com/7Pk0w.png)


Access "applicationId" in AndroidManifest:



```
<receiver
        android:name="com.google.android.gms.gcm.GcmReceiver"
        android:exported="true"
        android:permission="com.google.android.c2dm.permission.SEND">
        <intent-filter>
            <action android:name="com.google.android.c2dm.intent.RECEIVE" />
            <category android:name="${applicationId}" />
        </intent-filter>
    </receiver>

```

Similarly, we can create string resources for other constants and access them in code files as simple as:



```
context.getString(R.string.GCM_SENDER_ID);

```


---

## Notes

- can i define the facebookAppId:"anotherId..." in .properties file where I would be saving my store password and all. Then i access those in manifestplaceholders which would indirectly be accessed in AndroidManifest.xml.
