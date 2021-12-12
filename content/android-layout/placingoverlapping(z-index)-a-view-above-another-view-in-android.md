---
metaTitle: Placing/Overlapping(z-index) a view above another view in android
tags:
- z-index
title: Placing/Overlapping(z-index) a view above another view in android
---

## Context

I have a linear layout which consists of imageview and textview , one below another in a linear layout. 



```
<LinearLayout android:orientation="horizontal" ... >
 <ImageView 
     android:id="@+id/thumbnail"
     android:layout_weight="0.8" 
     android:layout_width="0dip"
     android:layout_height="fill_parent">
 </ImageView>
 <TextView 
    android:id="@+id/description"
    android:layout_weight="0.2"
    android:layout_width="0dip"
    android:layout_height="wrap_content">
 </TextView>

```


Some rules might be missing , this is to give an idea , how layout looks.
I want another small text view of say 50dip in length and width , placed over the imageview, by "over" I meant z-index more than imageview , I want to place this , in the center and above(overlapping) the imageview.


I want to know how can we place one view above the other, with varying z-index (preferably in linear layout) ?



---

RelativeLayout works the same way, the last image in the relative layout wins.



---

## Notes

- Unless you use elevation, then you also need the largest value in that.
- Using elevation won't fix the issue if your app has a minSdk less than Lollipop (on pre-lollipop phones the layout will look wrong if you rely on just elevation) -  you still have to pay attention to the order of the layout. You are right though, that if you use elevation on the bottom component - you definitely need to have at least the same or higher on the top.
