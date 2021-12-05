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

You can't use a LinearLayout for this, but you can use a [`FrameLayout`](http://developer.android.com/reference/android/widget/FrameLayout.html). In a `FrameLayout`, the z-index is defined by the order in which the items are added, for example:



```
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    >
    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:src="@drawable/my_drawable"
        android:scaleType="fitCenter"
        />
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|center"
        android:padding="5dp"
        android:text="My Label"
        />
</FrameLayout>

```

In this instance, the TextView would be drawn on top of the ImageView, along the bottom center of the image.



---

## Notes:

- FrameLayout doesn't relate to other views in the group, it just layers them in regard to the parent.


- Is there an advantage of using FrameLayout instead RelativeLayout for this?


- As of API 21 / KitKat you can now use setZ and translationZ; the FrameLayout hack is no longer needed (finally!). This should be the preferred answer for modern 5.0+ development: http://stackoverflow.com/a/29703860/358578


- I've even used this to draw things over map views and in some situations, though I have no idea why, it works where a relative layout does not.


- Yeah I did it using frame layout itself after going through documentation.


- by using http://stackoverflow.com/questions/13914609/viewpager-with-previous-and-next-page-boundaries,I am able to show part of previous and next page as shown in image above,but now I don't want to show sharp edges on images.I want them to blur towards edges..please guide me on how can i use z-index for achieving the same


- use match\_parent, not fill\_parent


