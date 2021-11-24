---
metaTitle: Ideal way to cancel an executing AsyncTask
title: Ideal way to cancel an executing AsyncTask
---

## Context

I am running remote audio-file-fetching and audio file playback operations in a background thread using `AsyncTask`. A `Cancellable` progress bar is shown for the time the fetch operation runs. 


I want to cancel/abort the `AsyncTask` run when the user cancels (decides against) the operation. What is the ideal way to handle such a case?



---

Simple: don't use an `AsyncTask`. `AsyncTask` is designed for short operations that end quickly (tens of seconds) and therefore do not need to be canceled. "Audio file playback" does not qualify. You don't even need a background thread for ordinary audio file playback.

