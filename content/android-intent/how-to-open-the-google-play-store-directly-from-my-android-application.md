---
metaTitle: How to open the Google Play Store directly from my Android application
tags:
- google-play
title: How to open the Google Play Store directly from my Android application
---

You can do this using the [`market://` prefix](https://developer.android.com/distribute/tools/promote/linking.html).


Java
----



```
final String appPackageName = getPackageName(); // getPackageName() from Context or Activity object
try {
    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + appPackageName)));
} catch (android.content.ActivityNotFoundException anfe) {
    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + appPackageName)));
}

```

Kotlin
------



```
try {
    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$packageName")))
} catch (e: ActivityNotFoundException) {
    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=$packageName")))
}

```

We use a `try/catch` block here because an `Exception` will be thrown if the Play Store is not installed on the target device.


**NOTE**: any app can register as capable of handling the `market://details?id=<appId>` Uri, if you want to specifically target Google Play check the *Berťák* answer

