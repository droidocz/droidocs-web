---
metaTitle: How to animate RecyclerView items when they appear
tags:
- android-recyclerview
title: How to animate RecyclerView items when they appear
---

## Context

How can I animate the RecyclerView Items when there are appearing?


The default item animator only animates when a data is added or removed after the recycler data has been set. I'm new developing applications and don't have any clue where to start.


Any ideas how to achieve this?



---

I animated fading in of `Recyclerview` items when they first appear as shown in the code below. Perhaps this will be of use to someone.



```
private final static int FADE_DURATION = 1000; //FADE_DURATION in milliseconds

@Override
public void onBindViewHolder(ViewHolder holder, int position) {

    holder.getTextView().setText("some text");

    // Set the view to fade in
    setFadeAnimation(holder.itemView);            
}

private void setFadeAnimation(View view) {
    AlphaAnimation anim = new AlphaAnimation(0.0f, 1.0f);
    anim.setDuration(FADE_DURATION);
    view.startAnimation(anim);
}

```

You can also replace `setFadeAnimation()` with the following `setScaleAnimation()` to animate appearance of items by scaling them from a point:



```
private void setScaleAnimation(View view) {
    ScaleAnimation anim = new ScaleAnimation(0.0f, 1.0f, 0.0f, 1.0f, Animation.RELATIVE_TO_SELF, 0.5f, Animation.RELATIVE_TO_SELF, 0.5f);
    anim.setDuration(FADE_DURATION);
    view.startAnimation(anim);
}

```

The code above has some warts in so far as when you scroll the `RecyclerView` items always fade or scale. If you wish you can add code to just allow the animation to happen when the fragment or activity containing the `RecyclerView` is first created (e.g. get the system time on creation and only allow animation for the first FADE\_DURATION milliseconds).



---

## Notes

- this spoils the layout ( over-written list items, some items having wrong text color ) on fast scrolling up and down
- I did small modification for your answer to make animation work on scroll down only, check [my answer](http://stackoverflow.com/a/36545709/4251431)
- This is not the proper or recommended way to animate recyclerview items. You must be using ItemAnimator class
