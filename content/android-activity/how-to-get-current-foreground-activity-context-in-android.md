---
metaTitle: How to get current foreground activity context in android
title: How to get current foreground activity context in android
---

## Problem

Whenever my broadcast is executed I want to show alert to foreground activity.



---

## Solution

For backwards compatibility:



```
ComponentName cn;
ActivityManager am = (ActivityManager) getApplicationContext().getSystemService(Context.ACTIVITY_SERVICE);
if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
    cn = am.getAppTasks().get(0).getTaskInfo().topActivity;
} else {
    //noinspection deprecation
    cn = am.getRunningTasks(1).get(0).topActivity;
}

```


---

## Notes

- Unless there's a way to get from ComponentName to the current instance of the Activity, this doesn't answer the question IMO.
- `topActivity` is available only from Android Q
-  one can keep and get a `WeakReference` handle from an `Application` class - while the `ComponentName` is required to determine if the desired `Activity` is on top of the running tasks list.
