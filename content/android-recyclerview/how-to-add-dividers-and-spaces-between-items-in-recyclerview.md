---
metaTitle: How to add dividers and spaces between items in RecyclerView
tags:
- divider
title: How to add dividers and spaces between items in RecyclerView
---

## Problem

This is an example of how it could have been done previously in the `ListView` class, using the **divider** and **dividerHeight** parameters:



```
<ListView
    android:id="@+id/activity_home_list_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:divider="@android:color/transparent"
    android:dividerHeight="8dp"/>

```

However, I don't see such possibility in the `RecyclerView` class.



```
<android.support.v7.widget.RecyclerView
    android:id="@+id/activity_home_recycler_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:scrollbars="vertical"/>

```

In that case, is it ok to define margins and/or add a custom divider view directly into a list item's layout or is there a better way to achieve my goal?



---

## Solution

The simple one is to set the background color for [RecyclerView](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.html) and a different background color for items. Here is an example...



```
<android.support.v7.widget.RecyclerView
    android:background="#ECEFF1"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:scrollbars="vertical"/>

```

And the [TextView](http://developer.android.com/reference/android/widget/TextView.html) item (it can be anything though) with bottom margin "x" dp or px.



```
<TextView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_marginBottom="1dp"
    android:background="#FFFFFF"/>

```

The output...


![Enter image description here](https://i.stack.imgur.com/hNJFG.png)



---

## Notes

- When drawing in Android couple of layers one above the other (the activity background, the recycle view background and the item view background)- Android drawing them all, also the ones that not visible to the users. That called overdraw and might affect your performance, more about it here: https://www.youtube.com/watch?v=T52v50r-JfE
- only needs keeping the list white while loading.
