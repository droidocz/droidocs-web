---
metaTitle: How can you get the build/version number of your Android application
tags:
- android-manifest
title: How can you get the build/version number of your Android application
---

## Context

I need to figure out how to get or make a build number for my Android application. I need the build number to display in the UI.


Do I have to do something with `AndroidManifest.xml`?



---

Always do it with a `try catch` block:



```
String versionName = "Version not found";

try {
    versionName = context.getPackageManager().getPackageInfo(context.getPackageName(), 0).versionName;
    Log.i(TAG, "Version Name: " + versionName);
} catch (NameNotFoundException e) {
    // TODO Auto-generated catch block
    Log.e(TAG, "Exception Version Name: " + e.getLocalizedMessage());
}

```


---

## Notes

-  Mortensen
You could declare the exception to be thrown, too, if you don't want to catch it in your current method.
