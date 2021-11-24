---
metaTitle: Android - Cancel AsyncTask Forcefully
title: Android - Cancel AsyncTask Forcefully
---

## Context

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

Call `cancel()` on the `AsyncTask`. Whether or not this will actually cancel anything is dependent a bit upon what you are doing. To quote Romain Guy:



> 
> If you call cancel(true), an interrupt
>  will be sent to the background thread,
>  which may help interruptible tasks.
>  Otherwise, you should simply make sure
>  to check isCancelled() regularly in
>  your doInBackground() method. You can
>  see examples of this at
>  code.google.com/p/shelves.
> 
> 
> 

