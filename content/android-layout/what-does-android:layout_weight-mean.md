---
metaTitle: What does android:layout_weight mean
tags:
- android-widget
title: What does android:layout_weight mean
---

## Context

I don't understand how to use this attribute. Can anyone tell me more about it?



---

If there are multiple views spanning a `LinearLayout`, then `layout_weight` gives them each a proportional size. A view with a bigger `layout_weight` value "weighs" more, so it gets a bigger space.


Here is an image to make things more clear.


[![enter image description here](https://i.stack.imgur.com/CyYBf.png)](https://i.stack.imgur.com/CyYBf.png)


Theory
------


The term layout weight is related to the concept of [weighted average](http://en.wikipedia.org/wiki/Weighted_arithmetic_mean) in math. It is like in a college class where homework is worth 30%, attendance is worth 10%, the midterm is worth 20%, and the final is worth 40%. Your scores for those parts, when weighted together, give you your total grade.


![enter image description here](https://i.stack.imgur.com/cbfgn.png)


It is the same for layout weight. The `Views` in a horizontal `LinearLayout` can each take up a certain percentage of the total width. (Or a percentage of the height for a vertical `LinearLayout`.)


The Layout
----------


The `LinearLayout` that you use will look something like this:



```
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <!-- list of subviews -->

</LinearLayout>

```

Note that you must use `layout_width="match_parent"` for the `LinearLayout`. If you use `wrap_content`, then it won't work. Also note that `layout_weight` does not work for the views in RelativeLayouts (see [here](https://stackoverflow.com/a/16708014/3681880) and [here](https://stackoverflow.com/a/14009266/3681880) for SO answers dealing with this issue).


The Views
---------


Each view in a horizontal `LinearLayout` looks something like this:



```
<Button
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    android:layout_weight="1" />

```

Note that you need to use `layout_width="0dp"` together with `layout_weight="1"`. Forgetting this causes many new users problems. (See [this article](http://ugia.io/2012/01/19/android-linearlayout-distribution-explained-weight-and-sizes/) for different results you can get by not setting the width to 0.) If your views are in a *vertical* `LinearLayout` then you would use `layout_height="0dp"`, of course.


In the `Button` example above I set the weight to 1, but you can use any number. It is only the total that matters. You can see in the three rows of buttons in the first image that I posted, the numbers are all different, but since the proportions are the same, the weighted widths don't change in each row. Some people like to use decimal numbers that have a sum of 1 so that in a complex layout it is clear what the weight of each part is.


One final note. If you have lots of nested layouts that use `layout_weight`, it can be bad for performance.


Extra
-----


Here is the xml layout for the top image:



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="android:layout_weight="
        android:textSize="24sp" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="1" />

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="2"
            android:text="2" />

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="1"
            android:text="1" />

    </LinearLayout>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="android:layout_weight="
        android:textSize="24sp" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="10"
            android:text="10" />

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="20"
            android:text="20" />

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight="10"
            android:text="10" />

    </LinearLayout>

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="android:layout_weight="
        android:textSize="24sp" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="horizontal">

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight=".25"
            android:text=".25" />

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight=".50"
            android:text=".50" />

        <Button
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:layout_weight=".25"
            android:text=".25" />

    </LinearLayout>

</LinearLayout>

```


---

## Notes

- I always wonder why more people don't post images to accompany their XML. It's much easier to understand visuals than code.
