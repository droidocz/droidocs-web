---
metaTitle: What's better notifyDataSetChanged or notifyItemChanged in loop
tags:
- android-viewholder
title: What's better notifyDataSetChanged or notifyItemChanged in loop
---

## Context

So I have an activity with `RecyclerView` and I want to change `TextView` of every item in the `RecyclerView` by pressing button that has `onClickListener()` in the activity. 


I'm wondering what is better in terms of performance: 


1. Use `notifyDataSetChanged` ones.
2. Use loop with condition like int i is less than `List.size()` where `notifyItemChanged` would be called few times.


In both cases I create boolean variable in `RecyclerView` Adapter which is used by `onBindViewHolder` to know how to update item. By default it's false and after button click it becomes true so `onBindViewHolder` updates item in different way. 


Also I would like to know if this approach is suitable at all.



---

If you are simply updating one part of the view, use the `notifyItemRangeChanged()`or `notifyItemChanged()` instead of `notifiyDataSetChanged()`. The difference here has to do with **structural changes** vs **item changes**. This is on the android developers `RecyclerView.Adapter` documentation found [here](http://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html#notifyItemRangeChanged(int,%20int)). 


Here is another tidbit on the differences between the two types of changes: 



> 
> There are two different classes of data change events, item changes
>  and structural changes. Item changes are when a single item has its
>  data updated but no positional changes have occurred. Structural
>  changes are when items are inserted, removed or moved within the data
>  set.
> 
> 
> 


This is taken from that aforementioned page, 



> 
> If you are writing an adapter it will always be more efficient to use
>  the more specific change events if you can. Rely on
>  notifyDataSetChanged() as a last resort.
> 
> 
> 


So just to clarify use `notifyDataSetChanged()` as a **last resort**, and instead ask yourself if you can preform one of these methods instead, and if you can use it instead:



```
notifyItemChanged(int)
notifyItemInserted(int)
notifyItemRemoved(int)
notifyItemRangeChanged(int, int)
notifyItemRangeInserted(int, int)
notifyItemRangeRemoved(int, int)

```

which makes sense because `notifyDataSetChanged()` will pretty much try to redraw everything based on the data and make no previous assumptions on it, while the other methods will just look for changes. That means the adapter has to do a lot more work that is not necessary. This is what `notifyDataSetChanged()` does:



> 
> This event does not specify what about the data set has changed,
>  forcing any observers to assume that all existing items and structure
>  may no longer be valid. LayoutManagers will be forced to fully rebind
>  and relayout all visible views.
> 
> 
> 


This also makes sense to use the incremental or range approach, because you are changing the text, you need to go get each new text and when you do that you should tell the adapter you changed it. Now, if you do a button click and get all new text values, and create a new list or something then call heavy `notifyDataSetChanged()`.



---

## Notes

- What I experienced a days ago is that calling notifyItenChanged(x) not only calls onBindViewHolder for x, but also for the other items where the hash of the viewholder changed, I still don't know if this is an Android bug though, or it's a common behavior.
