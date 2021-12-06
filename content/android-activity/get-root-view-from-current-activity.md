---
metaTitle: Get root view from current activity
tags:
- view
title: Get root view from current activity
---

## Context

I know how to get the root view with [View.getRootView()](http://developer.android.com/reference/android/view/View.html#getRootView%28%29). I am also able to get the view from a button's `onClick` event where the argument is a [View](http://developer.android.com/reference/android/view/View.html). But how can I get the **view** in an [activity](http://developer.android.com/reference/android/app/Activity.html)?



---

If you need root view of your activity (so you can add your contents there) use



```
findViewById(android.R.id.content).getRootView()

```

Also it was reported that on some devices you have to use 



```
getWindow().getDecorView().findViewById(android.R.id.content)

```

instead.


Please note that as Booger reported, this may be behind navigation bar (with back button etc.) on some devices (but it seems on most devices it is not).


If you need to get view that you added to your activity using `setContentView()` method then as pottedmeat wrote you can use



```
final ViewGroup viewGroup = (ViewGroup) ((ViewGroup) this
            .findViewById(android.R.id.content)).getChildAt(0);

```

But better just set id to this view in your xml layout and use this id instead.



---

## Notes:

- Actually just findViewById(android.R.id.content) is giving me the root view.
- I've noticed that this view appears to include the status bar, so if you're looking for the visible part of your activity, use the answer from 
-  can you elaborate on when you needed to do findViewById(android.R.id.content).getRootView()?
- You can check here I suppose http://developer.android.com/reference/android/R.html It's just android resources reference.
-  I need to use .getRootView() in Android 5.0+ when using action bar
- When you use this answer, your Snackbar will include the system decor (meaning the Snackbar information will appear behind the Navigation Buttons - Home/Back/Recents). I need my Snackbar to appear in MY Activity (not the entire system, including the on-screen nav buttons), so use the other answer.
- `activity.findViewById(android.R.id.content)` is returning null in Android 5. :(
-  IIRC, if you already have the root view, `view.getRootView()` will return that root view (again). I mean, it is harmless to add `.getRootView()`, so the safe answer is to *always* do `findViewById(android.R.id.content).getRootView()`. [Unless you want the root of content, in which case the `.getChildAt(0)` is what you want.]
-  call `getView()` in Fragment.
- I had to go with `getWindow().getDecorView()` on it.
