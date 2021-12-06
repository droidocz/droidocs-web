---
metaTitle: Getting Reference to Calling Activity from AsyncTask (NOT as an inner class)
tags:
- outer-classes
title: Getting Reference to Calling Activity from AsyncTask (NOT as an inner class)
---

## Context

Is it at all possible, from within an AsyncTask that is NOT an inner class of the calling Activity class, to get a reference to the instance of Activity that initiated execution of the AsyncTask?


I am aware of [this thread](https://stackoverflow.com/questions/2379233/android-asynctask-in-external-class), however it doesn't exactly address how to reference the calling Activity. Some suggest passing a reference to the Activity as a parameter to the AsyncTask constructor, however, it's reported that doing so will always result in a NullPointerException.


So, I'm at a loss. My AsyncTask provides robust functionality, and I don't want to have to duplicate it as an inner class in *every* Activity that wants to use it. There must be an elegant solution.



---

The "elegant solution" is to actually *try* passing it as a parameter (to the constructor or `execute()`) and see if it works, rather than assuming the person who asked that previous question (then answered his own question twice) knows what he is doing. I can think of nothing intrinsic to `AsyncTask` that would cause `Activity` to be a bad constructor parameter and every other object be just fine.


Now, I haven't passed an `Activity` (or other `Context`) as a parameter to an `AsyncTask`, because my `AsyncTasks` are always private inner classes. In fact, the fact that you *want* a public `AsyncTask` to me is a code smell, suggesting these tasks should be mediated by a `Service` or some other control point. But, that's just me.


**UPDATE**


A better answer for handling this pattern can be found here: [Background task, progress dialog, orientation change - is there any 100% working solution?](https://stackoverflow.com/questions/3821423/background-task-progress-dialog-orientation-change-is-there-any-100-working/3821998#3821998)



---

## Notes:

- One is to make `DownloadFileTask` public but abstract, and have private inner class implementations of that for things unique to a given activity. The other is to make `DownloadFileTask` public and pass *something* into the constructor. In this case, to minimize coupling, it may be that you don't want to pass an `Activity`, but some other sort of interface that limits what the `AsyncTask` can do. That way, you can choose to implement the interface on an `Activity`, or as a separate object, or whatever.
- http://en.wikipedia.org/wiki/Coupling_%28computer_science%29 -- basically, the more one component "knows" about another, the more difficult it becomes to disentangle them later should the need arise.
- AsyncTask is a controller class. Making it responsible for creating or managing UI components when its lifecycle is not guaranteed to coincide with the UI it's managing seems poor design
- I was about to implement all of my 'state handling', so to speak, in the onPostExecute of my public AsyncTask. Your previous comment was a great reminder, and now that I have thought through it, I see what you meant about using a public abstract class with private inner class implementations.
- I'm curious as to how you would handle my situation then: It's nothing complex; I'm basically trying to create a DownloadFileTask to do a basic http GET request on the passed URLs, and then the application will do different things with the downloaded files based on the current activity / state. I have different activities that need to download files for different purposes.
- the user rotating the device) whilst the AsyncTask is executing it would seem to be bad practise to retain a reference to it within the AsyncTask" -- please see update with a pointer to a more complete answer. Retained fragments also work well for managing `AsyncTasks`.
- If I can actually pass an instance of my Activity to a public AsyncTask, I think that's the best way to go here. You mention minimizing coupling... what exactly do you mean by this and what kinds of situations do you generally want to avoid with it?
