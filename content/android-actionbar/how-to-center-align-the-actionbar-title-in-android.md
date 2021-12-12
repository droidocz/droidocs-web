---
metaTitle: How to center align the ActionBar title in Android
tags:
- android-theme
title: How to center align the ActionBar title in Android
---

## Context

I am trying to use the following code to center the text in the `ActionBar`, but it aligns itself to the left. 


How do you make it appear in the center?



```
ActionBar actionBar = getActionBar();
actionBar.setDisplayShowTitleEnabled(true);
actionBar.setTitle("Canteen Home");
actionBar.setHomeButtonEnabled(true);
actionBar.setIcon(R.drawable.back);

```


---

To have a centered title in ABS (if you want to have this in the default `ActionBar`, just remove the "support" in the method names), you could just do this:


In your Activity, in your `onCreate()` method:



```
getSupportActionBar().setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM); 
getSupportActionBar().setCustomView(R.layout.abs_layout);

```

`abs_layout`:



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
        android:layout_gravity="center"
    android:orientation="vertical">

    <android.support.v7.widget.AppCompatTextView
        android:id="@+id/tvTitle"
        style="@style/TextAppearance.AppCompat.Widget.ActionBar.Title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:textColor="#FFFFFF" />

</LinearLayout>

```

Now you should have an `Actionbar` with just a title. If you want to set a custom background, set it in the Layout above (but then don't forget to set `android:layout_height="match_parent"`).


or with:



```
getSupportActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.yourimage));

```


---

## Notes

- For me the result was the actionbar was a bit displaced to right or left depending on the action buttons I was showing.
- Pepillo's solution did not work for me, as the content wasn't centered anymore at all. I could solve this by adding `android:layout_gravity="center"` to the LinearLayout.
- Try `((TextView)actionBar.getCustomView().findViewById(R.id.textView1)).setText("new title");`, where textView1 is your `TextView`'s ID in your CustomView.
- If there are menu items it won't be centered correctly.
- how to add custom back button image to this?
- how to add back button in this code? `getSupportActionBar().setDisplayHomeAsUpEnabled(true);` not working
- the title doesnt change now with `setTitle`
- I was needed to add `ActionBar.LayoutParams` with `match_parent` parameter to get customView layout actually centered. Check out code snippet [from this answer](http://stackoverflow.com/a/11688217/624706).
- If you want to add the back button, you need to place `getsupportActionBar().setDisplayHomeAsUpEnabled(true)` after setting the custom view
- Note: Android support library v7 does contain a function `getSupportActionBar()`, so it's not just limited to Action Bar Sherlock
- can any one tell me that after using this answer my drawer icon is not visible in my app...what is the issue?
- same issue http://stackoverflow.com/questions/31803463/how-to-set-action-bar-title-center-in-navigation-drawer
- what if i am extending my class with FragmentActivity?
- FYI , If you will add menu items, title will not be exactly centered.
- Other problem with centering horizontal can provoked by "match_parent".
