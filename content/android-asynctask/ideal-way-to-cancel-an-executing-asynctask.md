---
metaTitle: Ideal way to cancel an executing AsyncTask
title: Ideal way to cancel an executing AsyncTask
---

## Problem

I am running remote audio-file-fetching and audio file playback operations in a background thread using `AsyncTask`. A `Cancellable` progress bar is shown for the time the fetch operation runs. 


I want to cancel/abort the `AsyncTask` run when the user cancels (decides against) the operation. What is the ideal way to handle such a case?



---

## Solution

The only way to do it is by checking the value of the isCancelled() method and stopping playback when it returns true.

