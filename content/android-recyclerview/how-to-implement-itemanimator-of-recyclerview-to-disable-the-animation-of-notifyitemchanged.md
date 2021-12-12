---
metaTitle: How to implement ItemAnimator of RecyclerView to disable the animation of notifyItemChanged
tags:
- animation
title: How to implement ItemAnimator of RecyclerView to disable the animation of notifyItemChanged
---

## Context

In my project I need disable the "change" animation of `RecyclerView` while `notifyItemChanged`.


I investigated in the source of `RecyclerView` and had overridden `android.support.v7.widget.DefaultItemAnimator` as below:



```
private static  class ItemAnimator extends DefaultItemAnimator
{
    @Override
    public boolean animateChange(RecyclerView.ViewHolder oldHolder, RecyclerView.ViewHolder newHolder, int fromX, int fromY, int toX, int toY) {
        if(oldHolder != null)
        {
            oldHolder.itemView.setVisibility(View.INVISIBLE);
            dispatchChangeFinished(oldHolder, true);
        }

        if(newHolder != null)
        {
            dispatchChangeFinished(newHolder, false);
        }

        return false;
    }
}

```

But I am not sure if I match the spec of the Google document:
[`RecyclerView.ItemAnimator.animateChange`](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ItemAnimator.html#animateChange(android.support.v7.widget.RecyclerView.ViewHolder,%20android.support.v7.widget.RecyclerView.ViewHolder,%20int,%20int,%20int,%20int))


According to my understanding source code, if I do not override the method properly, the oldHolder **will not** be recycled.


Please help me figure out how to override `animateChange` in a correct way.



---

I have found the correct solution to just remove the animateChange.


It's very simple. Google has implemented the functionality.



```
((SimpleItemAnimator) RecyclerView.getItemAnimator()).setSupportsChangeAnimations(false);

```

Documentation: [setSupportsChangeAnimations](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ItemAnimator.html#setSupportsChangeAnimations%28boolean%29)



---

## Notes

- It's also defined in *DefaultItemAnimator* and you can do it in this way: `((DefaultItemAnimator) recyclerView.getItemAnimator()).setSupportsChangeAnimations(false);`
- This broke the item move animations for DiffUtil.Result.dispatchChanges for me.
-  try `recyclerView.getItemAnimator().setChangeDuration(0)`, work for me.
