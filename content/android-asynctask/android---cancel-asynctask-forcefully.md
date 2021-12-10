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



---

## Notes

-  See [the Java documentation](https://docs.oracle.com/javase/tutorial/essential/concurrency/interrupt.html), along with [this](https://stackoverflow.com/a/3590008/115145) and [this](https://www.javatpoint.com/interrupting-a-thread).
- but even after Calling Cancel() method, task is running in background and onPostExecute() method is not being executed.
- Regarding: `an interrupt will be sent to the background thread, which may help interruptible tasks`. I am just wondering, what are some examples of `non-interruptible` tasks? As `doInBackground()` runs on a different thread, that thread should be interruptable in any case. Doesn't this mean then that calling `cancel(true)` should always interrupt the current running thread? I am asking this because there are a lot of examples where one is adviced to check with `isCanceled()` whether the AsyncTask was stopped or not, but if `cancel(true)` interrupts the current thread why would we need this?
- Thanx, you are absolutely right and you have also indicated the exact thing in highlighted description buat at that time i couldnt come to understand the thing, but now i come to understand your highlighted description in answer.
- A useful take-away from Romain's quote (and the docs) is that the thread is interrupted.
