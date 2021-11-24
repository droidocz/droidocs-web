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

