---
metaTitle: ActionBar text color
tags:
- android-3.0-honeycomb
- android-text-color
title: ActionBar text color
---

## Problem

how can I change the text color of the ActionBar? I've inherited the Holo Light Theme, I'm able to change the background of the ActionBar but I don't find out what is the attribute to tweak to change the text color.




---


Ok, I'm able to change the text color with the attribute android:textColorPrimary but it also changes the text color of the dropdown menu displayed when an overflow happen on the ActionBar buttons. Any idea how to change the color of those dropdown menu / List ?



---

## Solution

The ActionBar ID is not available directly, so you have to do little bit of hacking here.



```
int actionBarTitleId = Resources.getSystem().getIdentifier("action_bar_title", "id", "android");
if (actionBarTitleId > 0) {
    TextView title = (TextView) findViewById(actionBarTitleId);
    if (title != null) {
        title.setTextColor(Color.RED);
    }
}

```


---

## Notes

- In case you're running API level &lt; 11, ActionBarSherlock and you'd like to save yourself an expensive call to `getIndentifier()`, you can look in `(TextView) findViewById(com.actionbarsherlock.R.id.abs__action_bar_title);` first (be sure to check if it's not null).
- `NullPointerException` on this line `actionBarTextView.setTextColor(Color.RED);`
- "The ActionBar ID is not available directly" actually in my case the toolbar is easily accessible like `Toolbar toolbar = findViewById(R.id.toolbar);` where in the xml layout file it is surrounded by `com.google.android.material.appbar.AppBarLayout` element, then `toolbar.setTitleTextColor( getResources().getColor( R.color.colorViolet ) );`
