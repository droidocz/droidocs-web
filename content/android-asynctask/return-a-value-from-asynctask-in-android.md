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

