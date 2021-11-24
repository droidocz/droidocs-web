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

