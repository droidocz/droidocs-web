---
metaTitle: Return a value from AsyncTask in Android
tags:
- java
- asynchronous
- return
title: Return a value from AsyncTask in Android
---

That's what [`onPostExecute()`](http://developer.android.com/reference/android/os/AsyncTask.html#onPostExecute%28Result%29) is for. It runs on the UI thread and you can deliver your result from there to the screen (or anywhere else you need). It won't be called until the final result is available. If you want to deliver intermediate results, take a look at [`onProgressUpdate()`](http://developer.android.com/reference/android/os/AsyncTask.html#onProgressUpdate%28Progress...%29)

