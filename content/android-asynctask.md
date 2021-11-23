---
metaDescription: Use for questions on android.os.AsyncTask
metaTitle: Android Asynctask
title: Android Asynctask
---

`AsyncTask` enables proper and easy use of the UI thread. This class allows to perform background operations and publish results on the UI thread without having to manipulate threads and/or handlers.


`AsyncTask` is designed to be a helper class around `Thread` and `Handler` and does not constitute a generic threading framework. `AsyncTask`s should ideally be used for short operations (a few seconds at the most).


*WARNING* : **The AsyncTask has an implicit reference to the enclosing Activity**. If a configuration change happens the Activity instance that started the AsyncTask would be destroyed, but not GCd until the AsyncTask finishes. Since Activities are heavy this could lead to memory issues if several AsyncTasks are started. Another issue is that the result of the AsyncTask could be lost, if it's intended to act on the state of the Activity. Replace the AsyncTask by the new AsyncTaskLoader


More information:


* Documentation for the [AsyncTask class](http://developer.android.com/reference/android/os/AsyncTask.html)
* This [blog entry](http://android-developers.blogspot.com/2009/05/painless-threading.html) on the Android developers site.
