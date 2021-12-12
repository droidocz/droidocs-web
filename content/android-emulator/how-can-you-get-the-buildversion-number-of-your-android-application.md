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

Here is a **clean solution**, based on [the solution of scottyab](https://stackoverflow.com/questions/4616095/how-can-you-get-the-build-version-number-of-your-android-application/5788950#5788950) (edited by Xavi). It shows how to get the context first, if it's not provided by your method. Furthermore, it uses multiple lines instead of calling multiple methods per line. This makes it easier when you have to debug your application.



```
Context context = getApplicationContext(); // or activity.getApplicationContext()
PackageManager packageManager = context.getPackageManager();
String packageName = context.getPackageName();

String myVersionName = "not available"; // initialize String

try {
    myVersionName = packageManager.getPackageInfo(packageName, 0).versionName;
} catch (PackageManager.NameNotFoundException e) {
    e.printStackTrace();
}

```

Now that you received the version name in the String `myVersionName`, you can set it to a TextView or whatever you like..



```
// Set the version name to a TextView
TextView tvVersionName = (TextView) findViewById(R.id.tv_versionName);
tvVersionName.setText(myVersionName);

```


---

## Notes

- It would be weird to not find a running application in the package manager :)
- I'm with you that it might be weird, but it's the default exception of this method - see [API](http://developer.android.com/reference/android/content/pm/PackageManager.html#getPackageInfo%28java.lang.String,%20int%29): it says `Throws PackageManager.NameNotFoundException if a package with the given name can not be found on the system.`. However, I could not imagine a scenario for that!
