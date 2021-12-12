---
metaTitle: Get root view from current activity
tags:
- view
title: Get root view from current activity
---

## Context

I know how to get the root view with [View.getRootView()](http://developer.android.com/reference/android/view/View.html#getRootView%28%29). I am also able to get the view from a button's `onClick` event where the argument is a [View](http://developer.android.com/reference/android/view/View.html). But how can I get the **view** in an [activity](http://developer.android.com/reference/android/app/Activity.html)?



---

### Get root view from current activity.


Inside our activity we can get the `root` view with:



```
ViewGroup rootView = (ViewGroup) ((ViewGroup) this
            .findViewById(android.R.id.content)).getChildAt(0);

```

or



```
View rootView = getWindow().getDecorView().getRootView();

```
