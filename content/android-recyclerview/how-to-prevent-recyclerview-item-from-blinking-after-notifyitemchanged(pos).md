---
metaTitle: How to prevent RecyclerView item from blinking after notifyItemChanged(pos)
title: How to prevent RecyclerView item from blinking after notifyItemChanged(pos)
---

## Context

I currently have a recycler view whose data updates every 5 secs. To update the data on the list, I am using 



```
notifyItemChanged(position);
notifyItemRangeChanged(position, mList.size());

```

Each time I call notifyItemChanged(), the items on my recycler view update properly, however, it will blink because this causes onBindViewHolder to be called again. So it's as though it is a fresh load each time. How can I prevent this from happening, if possible?



---

RecyclerView has built in animations which usually add a nice polished effect. in your case you'll want to disable them:



```
((SimpleItemAnimator) mRecyclerView.getItemAnimator()).setSupportsChangeAnimations(false);

```

(The default recycler view animator should already be an instance of [SimpleItemAnimator](https://developer.android.com/reference/android/support/v7/widget/SimpleItemAnimator.html))



---

## Notes

- but I think this also disables default animations of methods such as notifyItemInserted
