---
metaTitle: Move layouts up when soft keyboard is shown
tags:
- user-interface
- android-keypad
title: Move layouts up when soft keyboard is shown
---

## Context

I have a few elements in a RelativeView with the align bottom attribute set, when the soft keyboard comes up the elements are hidden by the soft keyboard.


I would like them to move up so that if there is enough screen space they are shown above the keyboard, or to make the section above the keyboard scrollable so the user can still see the elements.


Any ideas on how to approach this?



---

Yes, check out [this article on the Android developers' site](http://android-developers.blogspot.com/2009/04/updating-applications-for-on-screen.html) which describes how the framework handles the soft keyboard appearing.


The `[android:windowSoftInputMode](http://developer.android.com/guide/topics/manifest/activity-element.html#wsoft)` attribute can be used to specify what happens on a per-activity basis: whether the layout is resized or whether it scrolls etc.

