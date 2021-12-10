---
metaTitle: Ideal way to cancel an executing AsyncTask
title: Ideal way to cancel an executing AsyncTask
---

## Context

I am running remote audio-file-fetching and audio file playback operations in a background thread using `AsyncTask`. A `Cancellable` progress bar is shown for the time the fetch operation runs. 


I want to cancel/abort the `AsyncTask` run when the user cancels (decides against) the operation. What is the ideal way to handle such a case?



---

Simple: don't use an `AsyncTask`. `AsyncTask` is designed for short operations that end quickly (tens of seconds) and therefore do not need to be canceled. "Audio file playback" does not qualify. You don't even need a background thread for ordinary audio file playback.



---

## Notes

- AsyncTask has a cancel method, and it should work. The method wouldn't exist otherwise. And even short tasks may need canceling - I have an Activity where it begins an AsyncTask immediately upon loading, and if the user hits back immediately after opening the task, they'll see a Force Close a second later when the task finishes but no context exists for it to use in its onPostExecute.
- "AsyncTask has a cancel method, and it should work." With respect to your "Force Close" scenario, that can be solved by a boolean variable, which you test in `onPostExecute()` to see whether you should go ahead with the work.
- You are supposed to check the isCancelled method periodically in your doInBackground on AsyncTask. It's right there in the docs: http://developer.android.com/reference/android/os/AsyncTask.html#isCancelled()
- I don't know about `volatile` -- I tend to use `java.util.concurrent` objects for that sort of thing.
- I realize I'm bringing up an old topic, but I'm using AsyncTask for network calls. There take ~5s to complete, but I'd still like the user to have an option to cancel the non-critical ones if they choose. Are you saying `AsyncTask.cancel()` method is not reliable?
- are you suggesting we use regular java thread and "abort" the thread run using volatile boolean variable - the conventional Java way?
- Canceling threads in Java may have been a problem for 15 years, but if it's not reliable there shouldn't be a method in the Android SDK that has a boolean flag that implies the thread will be actively interrupted if it's that non-deterministic.
