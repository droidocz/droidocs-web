---
metaTitle: How To Find Android Google Play Services Version
tags:
- android-manifest
- google-play-services
title: How To Find Android Google Play Services Version
---

## Context

I'm working on an android project which requires the use of google maps. I've been reading tutorials, and I have to add this to the AndroidManifest.xml file:



```
<meta-data
    android:name="com.google.android.gms.version"
    android:value="@integer/google_play_services_version" />

```

The thing is, I don't know what number to substitute the "@integer/google\_play\_services\_version" with.


If anyone knows what I should enter there, and how to obtain that integer value, I'd appreciate it.



---

There is no need to subsitute. The value `@integer/google_play_services_version` takes care of it. Just make sure you have the latest Google Play Services library which is updated.


You can find it under `google-play-services_lib>res>values>version.xml` if you wish to add the number rather than `@integer/google_play_services_version`.



```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <integer name="google_play_services_version">4030500</integer>
</resources>

```


---

## Notes

-  in which case you should post the relevant code or debug yourself. Your problem may not be related to this or may be altogether a different issue.
