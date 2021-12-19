---
metaTitle: Android - Cancel AsyncTask Forcefully
title: Android - Cancel AsyncTask Forcefully
---

## Problem

I have implemented AsyncTask in my one of activity:



```
 performBackgroundTask asyncTask = new performBackgroundTask();
 asyncTask.execute();

```

Now, i need to implement the "Cancel" button functionality, so i have to stop the execution of the running task. I don't know how do i stop the running task(background task). 


So Please suggest me, how do i cancel the AsyncTask forcefully ? 


Update:
-------


I found about the `Cancel()` method of the same, but i found that calling **`cancel(boolean mayInterruptIfRunning)`** doesn't necessarily stop the execution of the background process. All that seems to happen is that the AsyncTask will execute onCancelled(), and won't run onPostExecute() when it completes.



---

## Solution

Just check `isCancelled()` once in a while:



```
 protected Object doInBackground(Object... x) {
    while (/* condition */) {
      // work...
      if (isCancelled()) break;
    }
    return null;
 }

```


---

## Notes

-  Ya you have indicated the exact thing which i am missing to add in my code. Actually, i have implemented cancel() method, but doesnt know this kind of indication we needs write inside the doInBackground() method.
-  From where i should invoke asynctask.cancel method,i.e.am i suppose to put my cancel button inside any of 5 methods described by asynctask
- Add isCancelled() at begin or end of doinBackground, or anywhere?
