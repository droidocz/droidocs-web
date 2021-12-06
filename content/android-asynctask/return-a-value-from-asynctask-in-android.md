---
metaTitle: Return a value from AsyncTask in Android
tags:
- java
- asynchronous
- return
title: Return a value from AsyncTask in Android
---

## Context

One simple question: is it possible to return a value in `AsyncTask`?



```
//AsyncTask is a member class
private class MyTask extends AsyncTask<Void, Void, Void>{

    protected Void doInBackground(Void... params) {
         //do stuff
         return null;
    }

    @Override
    protected void onPostExecute(Void result) {
        //do stuff
        //how to return a value to the calling method?
    }
}

```

And then within my `Activity`/`Fragment`:



```
// The task is started from activity
myTask.execute()
// something like this?
myvalue = myTask.getvalue() 

```

**EDIT:
This was asked a long time ago where I wasn't familiar with Java, now that I'm better with it, I 'll do a quick summary:**


The point of async task is that the task is `asynchronous`, meaning that after you call `execute()` on the task, the task starts running on a thread of its own. returning a value from asynctask would be pointless because the original calling thread has already carried on doing other stuff (thus the task is asynchronous). 


Think of time:
At one point of time, you started a task that will run in parallel with the main thread. When the parallel-running task completed, time has also elapsed on the main thread. The parallel task cannot go back in time to return a value to the main thread.


I was coming from C so I didn't know much about this. But it seems that lots of people are having the same question so I thought I would clear it up a bit.



---

That's what [`onPostExecute()`](http://developer.android.com/reference/android/os/AsyncTask.html#onPostExecute%28Result%29) is for. It runs on the UI thread and you can deliver your result from there to the screen (or anywhere else you need). It won't be called until the final result is available. If you want to deliver intermediate results, take a look at [`onProgressUpdate()`](http://developer.android.com/reference/android/os/AsyncTask.html#onProgressUpdate%28Progress...%29)



---

## Notes:

- yes i know doInBackground() returns data and puts it there, but how do i transfer the data to my main activity in a variable form?
-  you say to store the result in a variable of your choice in `onPostExecute()` but how do you get that variable BACK to your activity? For example, if you want your task to connect to the internet and download some information and then you want to do something with that information... How do you `.execute()` the `AsyncTask` and then do something with that information if the next line of code runs before the `AsyncTask` is done?
-  - Just override `onPostExecute()` to store the result in a variable of your choice. Note that your original code doesn't make sense because the (hypothetical) method `myTask.getValue()` would be called _before_ a result was available. You can also call AsyncTask's `get()` method to obtain the result, but you shouldn't do this from the UI thread until you know for sure that the result is available.
- You need to move that "next line of code" somewhere else (e.g., `onPostExecute()`). I use this analogy: you don't write code that waits for user input (e.g., a button press); instead, you write event handlers that react when the user provides some input. Think of `onPostExecute()` as an event handler for when the results of the AsyncTask are available. That's where you put the code (or call the methods) that won't work unless the results are, indeed, available.
- So the `AsyncTask` shouldn't really be thought of as a utility function that simply fetches and returns some information but rather something much larger that fetches info and also manipulates the UI (or whatever) after fetching that info?
- (If you don't need to manipulate the UI either before or after, then it probably makes sense to use something other than AsyncTask for the worker thread.)
- If you call the listener in onPostExecute() the listener will execute on the UI thread. If you call the listener in doInBackground (not really the normal way to use AsyncTask) - it will be executed on the AsyncTask background thread (and that listener method could use Activity's runOnUiThread method to do something on the UI thead).
- I was assuming that tayler's comment was in the context of the ongoing discussion about sending results back from within `onPostExecute`. But certainly a listener could be used from `onPostExecute` (or `onProgressUpdate`) to send results back on the UI thread.
-  you can return something produced using an AsyncTask to your main activity using a listener.
