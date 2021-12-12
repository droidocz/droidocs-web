---
metaTitle: Hide/Show Toolbar programmatically on CoordinatorLayout
tags:
- android-toolbar
title: Hide/Show Toolbar programmatically on CoordinatorLayout
---

## Context

When I scroll my `RecycleView` `ToolBar` hide or show (with animation).
[![enter image description here](https://i.stack.imgur.com/vrYXl.jpg)](https://i.stack.imgur.com/vrYXl.jpg) 


How I can return `ToolBar` back programmatically?



---

If your toolbar is inside an AppBarLayout which is probably inside your CoordinatorLayout then something like this should work.



```
AppBarLayout appBarLayout = (AppBarLayout)findViewById(R.id.appBar);
            appBarLayout.setExpanded(true, true);

```

Or to collapse it



```
AppBarLayout appBarLayout = (AppBarLayout)findViewById(R.id.appBar);
            appBarLayout.setExpanded(false, true);

```

Here is the definition



```
setExpanded(boolean expanded, boolean animate)

```

Take note that this method is available from v23 of the support library, here is some [documentation](http://developer.android.com/reference/android/support/design/widget/AppBarLayout.html#setExpanded(boolean)) for reference, the key thing to note is "**As with AppBarLayout's scrolling, this method relies on this layout being a direct child of a CoordinatorLayout.**" Hope this helps!

