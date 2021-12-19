---
metaTitle: Remove application icon and title from Honeycomb action bar
tags:
- android-3.0-honeycomb
title: Remove application icon and title from Honeycomb action bar
---

## Problem

How can I remove the application icon & title which comes by default in an action bar?


There is a similar question here: [Can i hide the App Icon from the Action Bar in Honeycomb?](https://stackoverflow.com/questions/5030700/can-i-hide-the-app-icon-from-the-action-bar-in-honeycomb), but it doesn't talk about how to do it?



---

## Solution

Call [`setDisplayShowHomeEnabled()`](http://developer.android.com/reference/android/app/ActionBar.html#setDisplayShowHomeEnabled%28boolean%29) and [`setDisplayShowTitleEnabled()`](http://developer.android.com/reference/android/app/ActionBar.html#setDisplayShowTitleEnabled%28boolean%29) on `ActionBar`, which you get via a call to `getActionBar()`.



---

## Notes

- Any way to remove the icon through XML?
- Just figured it out... you use abDisplayOptions and set your desired combination of useLogo, showHome, homeAsUp, showTitle, and showCustom. I wanted just the title with no icon, so I did `<item name="abDisplayOptions">showTitle</item>`
- `<item name="android:displayOptions">useLogo|showHome|showTitle</item>`
- yes it works perfectly but it also removes homeUpIndicatior from actionbar so if need HomeUpIcon and no need of logo icon then you can just set getActionBar.setIcon(R.color.transparent);
-  I'm pretty sure it's because I used Action Bar Sherlock and you did not. That's why the names are different, but otherwise the code is basically the same. I should've used the standard action bar to cover the more general case.
