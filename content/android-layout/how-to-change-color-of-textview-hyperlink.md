---
metaTitle: how to change color of textview hyperlink
title: how to change color of textview hyperlink
---

## Problem

I am using this code for hyperlink:



```
<TextView 
    android:layout_width="fill_parent" 
    android:layout_height="fill_parent" 
    android:id="@+id/hyperlink" 
    android:text="@string/hyperlink"
    android:autoLink="web"/>

```

By default it is showing blue color, but how do I change color of hyperlink in Android?



---

## Solution

Add `android:textColorLink="yourcolorhere"` to your `TextView`



---

## Notes

- this worked thanks `android:textColorLink="
- I display the link as the title on a `Button` which inherits from `android:Widget.Holo.Light.Button.Small`? How can I change the text color of the link when the button is pressed?
