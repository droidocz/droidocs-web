---
metaTitle: Fragment over another fragment issue
title: Fragment over another fragment issue
---

## Context

When I'm showing one fragment (which is full screen with `#77000000` background) over another fragment (let's call it main), my main fragment still reacts to clicks (we can click a button even if we don't see it).


**Question**: how to prevent clicks on first (main) fragment?


**EDIT**


Unfortunately, I can't just hide main fragment, because I'm using transparent background on second fragment (so, user can see what located behind).



---

Set `clickable` property on the second fragment's view to true. The view will catch the event so that it will not be passed to the main fragment. So if the second fragment's view is a layout, this would be the code:



```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:clickable="true" />

```
