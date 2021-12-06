---
metaTitle: Handler vs AsyncTask vs Thread
tags:
- multithreading
- android-handler
title: Handler vs AsyncTask vs Thread
---

## Context

I got slightly confused about the differences between `Handlers`, `AsyncTask` and `Threads` in Android. I've read quite a few blogs and questions here in StackOverflow. 


`Handler` are background threads that provide you to communicate with the UI. Updating a progress bar, for instance, should be done via `Handler`. Using Handlers you have the advantage of `MessagingQueues`, so if you want to schedule messages or update multiple UI elements or have repeating tasks.


`AsyncTask` are similar, in fact, they make use of `Handler`, but doesn't run in the UI thread, so it's good for fetching data, for instance fetching web services. Later you can interact with the UI.


`Thread` however can't interact with the UI, provide more "basic" threading and you miss all the abstractions of `AsyncTask`.


However, I would like to have a socket connection run in service. Should this be run in a handler or a thread, or even an `AsyncTask`? UI interaction is not necessary at all. Does it make a difference in terms of performance which I use?


Meanwhile, the [documentation](https://developer.android.com/reference/android/os/AsyncTask.html) has been majorly improved.



---

If we look at the source code, we will see `AsyncTask` and `Handler` is purely written in Java. (There are some exceptions, though. But that is not an important point)


So there is no magic in `AsyncTask` or `Handler`. These classes make our life easier as a developer.


For example: If Program A calls method A(), method A() could run in a different thread with Program A. We can easily verify by following code:



```
Thread t = Thread.currentThread();    
int id = t.getId();

```

Why should we use a new thread for some tasks? You can google for it. Many many reasons,e.g: lifting heavily, long-running works.


So, what are the differences between `Thread`, `AsyncTask`, and `Handler`?


`AsyncTask` and `Handler` are written in Java (internally they use a `Thread`), so everything we can do with `Handler` or `AsyncTask`, we can achieve using a `Thread` too.


What can `Handler` and `AsyncTask` really help?


The most obvious reason is communication between the caller thread and the worker thread.
(**Caller Thread**: A thread which calls the **Worker Thread** to perform some tasks. A caller thread doesn't necessarily have to be the UI thread). Of course, we can communicate between two threads in other ways, but there are many disadvantages (and dangers) because of thread safety.


That is why we should use `Handler` and `AsyncTask`. These classes do most of the work for us, we only need to know which methods to override.


The difference between `Handler` and `AsyncTask` is: Use `AsyncTask` when *Caller thread* is a *UI Thread*.
This is what android document says:



> 
> AsyncTask enables proper and easy use of the UI thread. This class
>  allows to perform background operations and publish results on the UI
>  thread without having to manipulate threads and/or handlers
> 
> 
> 


I want to emphasize two points:


1) Easy use of the UI thread (so, use when caller thread is UI Thread).


2) No need to manipulate handlers. (means: You can use Handler instead of AsyncTask, but AsyncTask is an easier option).


There are many things in this post I haven't said yet, for example: what is UI Thread, or why it's easier. You must know some methods behind each class and use it, you will completely understand the reason why.


@: when you read the Android document, you will see: 



> 
> Handler allows you to send and process Message and Runnable objects
>  associated with a thread's MessageQueue
> 
> 
> 


This description might seem strange at first. We only need to understand that each thread has each message queue (like a to-do list), and the thread will take each message and do it until the message queue is empty (just like we finish our work and go to bed). So, when `Handler` communicates, it just gives a message to caller thread and it will wait to process. 


Complicated? Just remember that `Handler` can communicate with the caller thread safely.



---

## Notes:

- actually asynctask is also based on handler and futuretask, [see](https://github.com/android/platform_frameworks_base/blob/master/core/java/android/os/AsyncTask.java#L327)
- https://developer.android.com/reference/android/os/AsyncTask.html. Look at the doc "AsyncTask is designed to be a helper class around Thread and Handler ".
