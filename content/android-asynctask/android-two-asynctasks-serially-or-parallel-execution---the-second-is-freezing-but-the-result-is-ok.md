---
metaTitle: Android two AsyncTasks serially or parallel execution - The second is freezing but the result is ok
tags:
- java
- progress-bar
title: Android two AsyncTasks serially or parallel execution - The second is freezing but the result is ok
---

## Problem

I run two AsyncTask tasks in my Android application which are from the same class but with different parameters. For example:



```
new myAsynckTask(a,b,c).execute();
new myAssyncTask(a,d,e).execute();

```

Do they execute in parallel or in a serial order? I ask this because when the first one starts, shows the progress of execution and when finishes I see the second one which needs more time to finish but I can't see the progress(I'm able to see the rectangle but the progress bar is not showing 20%..and so on). It's like freezing but the result is ok.


What I want to do is to run them in serial order and be able to see the progress in the two of them.
I run the app on Android Jelly Bean 4.2.2 API Level 17



---

## Solution


> 
> Do they execute in parallel or in a serial order?
> 
> 
> 


If your `android:targetSdkVersion` is 13 or higher, and you are running on an Android 3.2 or higher device, they will be executed serially.


If you are running on Android 1.5, they will be executed serially.


Otherwise, they will be executed in parallel.


You can opt into parallel execution by replacing `execute()` with `executeOnExecutor(AsyncTask.THREAD_POOL_EXECUTOR)`.


For more, see the "Order of Execution" section of [the `AsyncTask` JavaDocs](https://developer.android.com/reference/android/os/AsyncTask.html).

