---
metaTitle: AsyncTask won't stop even when the Activity has destroyed
title: AsyncTask won't stop even when the Activity has destroyed
---

## Problem

I have an `AsyncTask` object which starts executing when the `Activity` is created and does stuff in the background (downloads up to 100 images). Everything works fine but there is this peculiar behavior which i'm not able to understand.


**For eg:** when the android screen's orientation changes then the `Activity` is destroyed and created again. So I override the `onRetainNonConfigurationInstance()` method and save all the downloaded data executed in the `AsyncTask`. My purpose of doing this is to not have `AsyncTask` run each time `Activity` is destroyed-created during orientation changes, but as i can see in my logs the previous `AsyncTask` is still executing. (The data is saved correctly though)


I even tried to cancel the `AsyncTask` in the `onDestroy()` method of the activity but the logs still show `AsyncTask` as running.


This is really strange behavior and would really be thankful if someone can tell me the correct procedure to stop/cancel the `AsyncTask`.



---

## Solution

The answer given by @Romain Guy is correct. Nevertheless, I would like to add a complement of information and give a pointer to a library or 2 that can be used for long running AsyncTask and even more for network oriented asynctasks. 


AsyncTasks have been designed for doing stuff in background. And yes, you can stop it using the `cancel` method. As you download stuff from the Internet, I strongly suggest you [take care of your thread when it is the IO blocking state](https://stackoverflow.com/q/4425350/693752). You should organize your download as follow : 



```
public void download() {
    //get the InputStream from HttpUrlConnection or any other
    //network related stuff
    while( inputStream.read(buffer) != -1 && !Thread.interrupted() ) {
      //copy data to your destination, a file for instance
    }
    //close the stream and other resources
}

```

Using the `Thread.interrupted` flag will help your thread to quit properly a blocking io state. Your thread will be more responsive to an invocation of the `cancel` method.


### AsyncTask design flaw


But if your AsyncTask lasts for too long, then you will face 2 different issues : 


1. Activities are poorly tied to the activity life cycle and you won't get the result of your AsyncTask if your activity dies. Indeed, yes, you can but it will be the rough way.
2. AsyncTask are not very well documented. A naive, though intuitive, implementation and use of an asynctask can quickly lead to memory leaks.


[RoboSpice](https://github.com/octo-online/robospice), the library I would like to introduce, uses a background service to execute this kind of requests. It has been designed for network requests. It provides additional features such as automatic caching of requests' results.


Here is the reason why AsyncTasks are bad for long running tasks. The following reasonning is an adaptation from exerpts of [RoboSpice motivations](https://play.google.com/store/apps/details?id=com.octo.android.robospice.motivations) : the app that explains why using RoboSpice is filling a need on the Android platform.


### The AsyncTask and Activity life cycle



AsyncTasks don't follow Activity instances' life cycle. If you start an AsyncTask inside an Activity and you rotate the device, the Activity will be destroyed and a new instance will be created. But the AsyncTask will not die. It will go on living until it completes. 




And when it completes, the AsyncTask won't update the UI of the new Activity. Indeed it updates the former instance of the activity that
is not displayed anymore. This can lead to an Exception of the type java.lang.IllegalArgumentException: View not attached to window manager if you
use, for instance, findViewById to retrieve a view inside the Activity.



### Memory leak issue



It is very convenient to create AsyncTasks as inner classes of your Activities. As the AsyncTask will need to manipulate the views 
of the Activity when the task is complete or in progress, using an inner class of the Activity seems convenient : inner classes can 
access directly any field of the outer class.




*Nevertheless, it means the inner class will hold an invisible reference on its outer class instance : the Activity.*




On the long run, this produces a memory leak : if the AsyncTask lasts for long, it keeps the activity "alive" 
whereas Android would like to get rid of it as it can no longer be displayed. The activity can't be garbage collected and that's a central
mechanism for Android to preserve resources on the device. 



### Progress of your task will be lost


You can use some workarounds to create a long running asynctask and manage its life cycle accordingly to the life cycle of the activity. You can either [cancel the AsyncTask in the onStop method of your activity](https://github.com/square/otto/blob/master/sample/src/main/java/com/squareup/otto/sample/LocationMapFragment.java) or you can let your async task finish, and not loose its progress and [relink it to the next instance of your activity](https://github.com/octo-online/robospice/blob/master/robospice-motivations/src/com/octo/android/robospice/motivations/asynctask/AsyncTaskWithWeakReferenceDemoActivity.java).


This is possible and we show how in RobopSpice motivations, but it becomes complicated and the code is not really generic. Moreover, you will still loose the progress of your task if the user leaves the activity and comes back. This same issue appears with Loaders, although it would be a simpler equivalent to the AsyncTask with relinking workaround mentionned above.


### Using an Android service


The best option is to use a service to execute your long running background tasks. And that is exactly the solution proposed by RoboSpice. Again, it is designed for networking but could be extended to non-network related stuff. This library has a [large number of features](https://github.com/octo-online/robospice/blob/master/README.md).


You can even get an idea of it in less than 30 seconds thanks to an [infographics](https://raw.github.com/octo-online/robospice/master/gfx/RoboSpice-InfoGraphics.png).




---


It is really a very very bad idea to use AsyncTasks for long running operations. Nevertheless, they are fine for short living ones such as updating a View after 1 or 2 seconds.


I encourage you to download the [RoboSpice Motivations app](https://play.google.com/store/apps/details?id=com.octo.android.robospice.motivations), it really explains this in-depth and provides samples and demonstrations of the different ways to do some network related stuff.




---


If you are looking for an alternative to RoboSpice for non network related tasks (for instance without caching), you could also have a look at [Tape](http://square.github.com/tape/).



---

## Notes

-  can you add [droidQuery](http://bit.ly/droidquery) as an alternative to *RoboSpice* on the *Github* page? I developed it this last year, and provides, among other features, the ability to perform network tasks using *jQuery*-style *Ajax* (written in pure Android Java).
- Looks like both *droidQuery* and *Ion* took some syntax design from [Picasso](https://github.com/square/picasso). https://github.com/koush/ion/search?q=picasso&ref=cmdform ;)
- BTW, your syntax is really close to Ion (that came afterwards).
- "It is really a very very bad idea to use AsyncTasks for long running operations. Nevertheless, they are fine for short living ones such as updating a View after 1 or 2 seconds." The reason for Android suggesting this is the fact that AsyncTask uses global thread pool executor. You may simply pass your custom thread pool executor through execute method ans get rid of the possible blocking issues.
