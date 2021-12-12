---
metaTitle: How to get a list of installed android applications and pick one to run
title: How to get a list of installed android applications and pick one to run
---

## Context

I asked a similar question to this earlier this week but I'm still not understanding how to get a list of all installed applications and then pick one to run. 


I've tried: 



```
Intent intent = new Intent(ACTION_MAIN);
intent.addCategory(CATEGORY_LAUNCHER);

```

and this only shows application that are preinstalled or can run the `ACTION_MAIN` Intent type.


I also know I can use `PackageManager` to get all the installed applications, but how do I use this to run a specific application?



---

Here's a cleaner way using the `PackageManager`



```
final PackageManager pm = getPackageManager();
//get a list of installed apps.
List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);

for (ApplicationInfo packageInfo : packages) {
    Log.d(TAG, "Installed package :" + packageInfo.packageName);
    Log.d(TAG, "Source dir : " + packageInfo.sourceDir);
    Log.d(TAG, "Launch Activity :" + pm.getLaunchIntentForPackage(packageInfo.packageName)); 
}
// the getLaunchIntentForPackage returns an intent that you can use with startActivity() 

```

More info here <http://qtcstation.com/2011/02/how-to-launch-another-app-from-your-app/>



---

## Notes

- This code is working however, do you have any idea on how to put those list of application in a ListView?
- Make sure you are not filtering out debug log statements.
- http://stackoverflow.com/questions/21371491/create-app-shortcut-inside-the-custom-launcher-in-android
-  Ramirez is it possible to find memory size consumed by each installed app ?
- I have tried this on Andriod 6.0 it still shows an application as installed after it has been uninstalled.
- read this here - http://www.vogella.com/tutorials/AndroidListView/article.html
