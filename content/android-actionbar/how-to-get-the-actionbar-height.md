---
metaTitle: How to get the ActionBar height
title: How to get the ActionBar height
---

## Problem

I am trying to get the height of the `ActionBar` (using Sherlock) every time an activity is created (specially to handle configuration changes on rotation where the ActionBar height might change).


For this I use the method `ActionBar.getHeight()` which works only when the `ActionBar` is shown.


When the first activity is created for the first time, I can call `getHeight()` in the `onCreateOptionsMenu` callback. But this method is not called after.


So my question is when can I call getHeight() and be assured that it doesn't return 0?
Or if it is not possible, how can I set the height of the ActionBar ?



---

## Solution

i think the safest way would be :



```
private int getActionBarHeight() {
    int actionBarHeight = getSupportActionBar().getHeight();
    if (actionBarHeight != 0)
        return actionBarHeight;
    final TypedValue tv = new TypedValue();
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
        if (getTheme().resolveAttribute(android.R.attr.actionBarSize, tv, true))
            actionBarHeight = TypedValue.complexToDimensionPixelSize(tv.data, getResources().getDisplayMetrics());
    } else if (getTheme().resolveAttribute(com.actionbarsherlock.R.attr.actionBarSize, tv, true))
        actionBarHeight = TypedValue.complexToDimensionPixelSize(tv.data, getResources().getDisplayMetrics());
    return actionBarHeight;
}

```


---

## Notes

- in case you are using appcompat, add the following: `else if (true == getTheme().resolveAttribute(
    android.support.v7.appcompat.R.attr.actionBarSize, tv, true))
  {
   actionBarHeight = TypedValue.complexToDimensionPixelSize(
     tv.data,getResources().getDisplayMetrics());
  }`
- is it anyway to specify the half action bar to hide top of the screen?http://stackoverflow.com/questions/27163374/hide-only-the-action-bar-on-scroll-not-action-bar-tabs
- From your code it looks like it doesnt matter if im using ABS, in all versions above HONEYCOMB it will take the actionbar height from android.R.attr.actionBarSize.
