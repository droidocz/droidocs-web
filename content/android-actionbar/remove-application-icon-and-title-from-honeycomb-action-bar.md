---
metaTitle: Remove application icon and title from Honeycomb action bar
tags:
- android-3.0-honeycomb
title: Remove application icon and title from Honeycomb action bar
---

## Context

How can I remove the application icon & title which comes by default in an action bar?


There is a similar question here: [Can i hide the App Icon from the Action Bar in Honeycomb?](https://stackoverflow.com/questions/5030700/can-i-hide-the-app-icon-from-the-action-bar-in-honeycomb), but it doesn't talk about how to do it?



---

Call [`setDisplayShowHomeEnabled()`](http://developer.android.com/reference/android/app/ActionBar.html#setDisplayShowHomeEnabled%28boolean%29) and [`setDisplayShowTitleEnabled()`](http://developer.android.com/reference/android/app/ActionBar.html#setDisplayShowTitleEnabled%28boolean%29) on `ActionBar`, which you get via a call to `getActionBar()`.

