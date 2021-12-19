---
metaTitle: Open another application from your own (intent)
title: Open another application from your own (intent)
---

## Problem

I know how to update my own programs, and I know how to open programs using the a predefined Uri (for sms or email for example)


I need to know how I can create an Intent to open MyTracks or any other application that I don't know what intents they listen to.


I got this info from DDMS, but I havn't been succesful in turning this to an Intent I can use. This is taken from when opening MyTracks manually.


Thanks for your help



```
05-06 11:22:24.945: INFO/ActivityManager(76): Starting activity: Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] flg=0x10200000 cmp=com.google.android.maps.mytracks/com.google.android.apps.mytracks.MyTracks bnds=[243,338][317,417] }
05-06 11:22:25.005: INFO/ActivityManager(76): Start proc com.google.android.maps.mytracks for activity com.google.android.maps.mytracks/com.google.android.apps.mytracks.MyTracks: pid=1176 uid=10063 gids={3003, 1015}
05-06 11:22:26.995: INFO/ActivityManager(76): Displayed activity com.google.android.maps.mytracks/com.google.android.apps.mytracks.MyTracks: 1996 ms (total 1996 ms)

```


---

## Solution

I have work it like this,



```
/** Open another app.
 * @param context current Context, like Activity, App, or Service
 * @param packageName the full package name of the app to open
 * @return true if likely successful, false if unsuccessful
 */
public static boolean openApp(Context context, String packageName) {
    PackageManager manager = context.getPackageManager();
    try {
        Intent i = manager.getLaunchIntentForPackage(packageName);
        if (i == null) {
            return false;
            //throw new ActivityNotFoundException();
        }
        i.addCategory(Intent.CATEGORY_LAUNCHER);
        context.startActivity(i);
        return true;
    } catch (ActivityNotFoundException e) {
        return false;
    }
}

```

Example usage:



```
openApp(this, "com.google.android.maps.mytracks");

```

Hope it helps someone.



---

## Notes

- because getLaunchIntentForPackage("app package name") may cause exception.
- Not to be a stickler, but there's no reason to allocate a new Intent on the first line given you use the result of the `getLaunchIntentForPackage` call.
- `getLaunchIntentForPackage()`already adds the category, see source: https://github.com/android/platform_frameworks_base/blob/master/core/java/android/app/ApplicationPackageManager.java#L150
- The only problem for me is `Context` object where/how to get/create it?And what packages to import.
