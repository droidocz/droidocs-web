---
metaTitle: Put buttons at bottom of screen with LinearLayout
tags:
- xml
- button
- android-linearlayout
title: Put buttons at bottom of screen with LinearLayout
---

## Context

I have the following code, how do I make it so that the 3 buttons are at the bottom?




```
    <TextView
        android:id="@+id/textView1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="60dp"
        android:gravity="center"
        android:text="@string/observer"
        android:textAppearance="?android:attr/textAppearanceLarge"
        tools:context=".asdf"
        android:weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical" >

        <Button
            android:id="@+id/button1"
            style="?android:attr/buttonStyleSmall"
            android:layout_width="145dp"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal|center"
            android:text="1" />

        <Button
            android:id="@+id/button2"
            style="?android:attr/buttonStyleSmall"
            android:layout_width="145dp"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal|center"
            android:text="2" />

        <Button
            android:id="@+id/button3"
            style="?android:attr/buttonStyleSmall"
            android:layout_width="145dp"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal|center"
            android:text="3" />
    </LinearLayout>

```



---

You need to ensure four things:


* Your outside `LinearLayout` has `layout_height="match_parent"`
* Your inside `LinearLayout` has `layout_weight="1"` and `layout_height="0dp"`
* Your `TextView` has `layout_weight="0"`
* You've set the gravity properly on your inner `LinearLayout: android:gravity="center|bottom"`


Notice that `fill_parent` does not mean "take up all available space". However, if you use `layout_height="0dp"` with `layout_weight="1"`, then a view will take up all available space ([Can't get proper layout with "fill\_parent"](https://stackoverflow.com/questions/5254018/cant-get-proper-layout-with-fill-parent)).


Here is some code I quickly wrote up that uses two LinearLayouts in a similar fashion to your code.



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/db1_root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <TextView
        android:id="@+id/textView1"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        android:text="@string/cow"
        android:layout_weight="0"
        android:textAppearance="?android:attr/textAppearanceLarge" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dip"
        android:layout_weight="1"
        android:gravity="center|bottom"
        android:orientation="vertical" >

        <Button
            android:id="@+id/button1"
            style="?android:attr/buttonStyleSmall"
            android:layout_width="145dp"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal|center"
            android:text="1" />

        <Button
            android:id="@+id/button2"
            style="?android:attr/buttonStyleSmall"
            android:layout_width="145dp"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal|center"
            android:text="2" />

        <Button
            android:id="@+id/button3"
            style="?android:attr/buttonStyleSmall"
            android:layout_width="145dp"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal|center"
            android:text="3" />
    </LinearLayout>

</LinearLayout>

```

The result looks like similar to this:


![enter image description here](https://i.stack.imgur.com/HZLIi.png)



---

## Notes

- Voted up just for the note on how to get a view to fill up all available space!
- Can you please describe the significance of `layout_weight="0"` or what it actually does?
