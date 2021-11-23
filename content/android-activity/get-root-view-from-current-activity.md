---
metaTitle: Get root view from current activity
tags:
- view
title: Get root view from current activity
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

