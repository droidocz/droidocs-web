---
metaTitle: How to open the Google Play Store directly from my Android application
tags:
- google-play
title: How to open the Google Play Store directly from my Android application
---

## Context

I have open the Google Play store using the following code 



```
Intent i = new Intent(android.content.Intent.ACTION_VIEW);
i.setData(Uri.parse("https://play.google.com/store/apps/details?id=my packagename "));
startActivity(i);.

```

But it shows me a Complete Action View as to select the option (browser/play store). I need to open the application in Play Store directly.



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



---

## Notes:

- if you want to redirect to all Developer's apps use `market://search?q=pub:"+devName` and `http://play.google.com/store/search?q=pub:"+devName`
- For projects using the Gradle build system, `appPackageName` is in fact `BuildConfig.APPLICATION_ID`. No `Context`/`Activity` dependencies, reducing the risk of memory leaks.
- This solution does not work, if some application uses intent filter with "market://" scheme defined.
- You still need the context to launch the intent.
- You may want to use intent.resolveActivity(getPackageManager()) to determine what to do.
- market:// is not working if i am redirecting from another domain url. For example if user is opening url https://www.example.com/blabla in his browser and i am simply redirecting to market://details?id=com.example.blabla previously its working but from 1 week onwards its not working. i am using nodejs for URL redirection.
- Will change that.
- I think you should use application id instead of package name.
- Can I return to my app after the download is finish?
- Me also tried with this code but it shows the option to select the browser/playstore.
- Doesn't the web link need https now?
- Developer is now:
From a website: http://play.google.com/store/dev?id=&lt;developer_id&gt;
From an Android app: market://dev?id=&lt;developer_id&gt;
- I use this code on both 2.3.3 and 4.1 and both open up the Play Store. Additionally, [the docs](http://developer.android.com/distribute/googleplay/promote/linking.html#android-app) say `market://` "*Launches the Play Store app*".
-  It wouldn't work on my emulator but on real hardware for me.
- There might be an `Intent` you could capture on package addition, but even then I don't think the OS provides you the control to switch over to your app.
- I have tried already with this code, this is also shows the option to select the browser/play store, because my device have installed both apps(google play store/browser).
