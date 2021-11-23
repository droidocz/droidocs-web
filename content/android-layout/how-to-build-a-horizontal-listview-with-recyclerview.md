---
metaTitle: How to build a horizontal ListView with RecyclerView
tags:
- android-recyclerview
title: How to build a horizontal ListView with RecyclerView
---


> 
> Is there a better way to implement this now with RecyclerView now?
> 
> 
> 


Yes.


When you use a `RecyclerView`, you need to specify a `LayoutManager` that is responsible for laying out each item in the view. The [`LinearLayoutManager`](https://developer.android.com/reference/android/support/v7/widget/LinearLayoutManager.html) allows you to specify an orientation, just like a normal `LinearLayout` would.


To create a horizontal list with `RecyclerView`, you might do something like this:



```
LinearLayoutManager layoutManager
    = new LinearLayoutManager(requireContext(), LinearLayoutManager.HORIZONTAL, false);

RecyclerView myList = (RecyclerView) findViewById(R.id.my_recycler_view);
myList.setLayoutManager(layoutManager);

```
