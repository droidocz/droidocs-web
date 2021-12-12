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

**EDIT :**


According to [**the ItemAnimator documentation**](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ItemAnimator.html) :



> 
> This class defines the animations that take place on items as changes are made to the adapter.
> 
> 
> 


So unless you add your items one by one to your `RecyclerView` and refresh the view at each iteration, I don't think `ItemAnimator` is the solution to your need.


Here is how you can animate the `RecyclerView` items when they appear using a CustomAdapter :



```
public class CustomAdapter extends RecyclerView.Adapter<CustomAdapter.ViewHolder>
{
    private Context context;

    // The items to display in your RecyclerView
    private ArrayList<String> items;
    // Allows to remember the last item shown on screen
    private int lastPosition = -1;

    public static class ViewHolder extends RecyclerView.ViewHolder
    {
        TextView text;
        // You need to retrieve the container (ie the root ViewGroup from your custom_item_layout)
        // It's the view that will be animated
        FrameLayout container;

        public ViewHolder(View itemView)
        {
            super(itemView);
            container = (FrameLayout) itemView.findViewById(R.id.item_layout_container);
            text = (TextView) itemView.findViewById(R.id.item_layout_text);
        }
    }

    public CustomAdapter(ArrayList<String> items, Context context)
    {
        this.items = items;
        this.context = context;
    }

    @Override
    public CustomAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType)
    {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.custom_item_layout, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position)
    {
        holder.text.setText(items.get(position));

        // Here you apply the animation when the view is bound
        setAnimation(holder.itemView, position);
    }

    /**
     * Here is the key method to apply the animation
     */
    private void setAnimation(View viewToAnimate, int position)
    {
        // If the bound view wasn't previously displayed on screen, it's animated
        if (position > lastPosition)
        {
            Animation animation = AnimationUtils.loadAnimation(context, android.R.anim.slide_in_left);
            viewToAnimate.startAnimation(animation);
            lastPosition = position;
        }
    }
}

```

And your custom\_item\_layout would look like this :



```
<FrameLayout
    android:id="@+id/item_layout_container"
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/item_layout_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textAppearance="?android:attr/textAppearanceListItemSmall"
        android:gravity="center_vertical"
        android:minHeight="?android:attr/listPreferredItemHeightSmall"/>

</FrameLayout>

```

For more information about CustomAdapters and `RecyclerView`, refer to this [**training on the official documentation**](https://developer.android.com/training/material/lists-cards.html).


**Problems on fast scroll**


Using this method could cause problems with fast scrolling. The view could be reused while the animation is been happening. In order to avoid that is recommendable to clear the animation when is detached.



```
    @Override
    public void onViewDetachedFromWindow(final RecyclerView.ViewHolder holder)
    {
        ((CustomViewHolder)holder).clearAnimation();
    }

```

On CustomViewHolder:



```
    public void clearAnimation()
    {
        mRootLayout.clearAnimation();
    }

```

**Old answer :**


Give a look at [**Gabriele Mariotti's repo**](https://github.com/gabrielemariotti/RecyclerViewItemAnimators), I'm pretty sure you'll find what you need. He provides simple ItemAnimators for the RecyclerView, such as SlideInItemAnimator or SlideScaleItemAnimator.



---

## Notes

-  override `onViewDetachedFromWindow` and call `clearAnimation` on the view.
- I used similiar code for the ListView and my items were animated without a problem no matter how fast I scrolled, but with RecyclerView if I scroll fast some items sometimes get stuck on the screen on top of the other items and they don't hide entirely - it's like the animation was stopped before it finished. I actually tried to comment out the part of the code which populates the fields (trying to speed up the execution of onBindViewHolder method) so I only left the code for animat
-  the view that is about to disappear is handed to `onViewDetachedFromWindow`
- I've seen that, but that's for adding and removing items after they've appeared.
- doesn't super.onViewDetachedFromWindow(holder); need to be called first? I'm not sure where mRootLayout is initialized so I used ((MyViewHolder)holder).itemView.clearAnimation();
- Animate items in RecyclerView from outside (from adapter for example) is really bad practice because RecyclerView easily can rebind your holder while animating.
- As far as I know, you need to use a CustomAdapter then.
-  I don't get it, they're not supposed to be animated again; that's why we keep `lastPosition` updated, to know the index of the last animated item.
- The code above tt's clear to me, however, when I set the adapter to my recycler, all the visible views animates together causing an ugly effect. How can I animate (at first show) all the items one by one?
- how can i make the animation work one after the other, currently this animates all the items at once. i want to animate one item then the next and so on.
-  great job, I followed your code, but animation runs only on first load not on scroll down, if I remove `if (position > lastPosition)` then animation runs on scroll up/down for all items (on every scroll), any idea what is the problem?
- How to give animation load "from bottom to top"?
- `onViewDetachedFromWindow` and `clearAnimation` ?? in custom ViewHolder class or adapter ?
-  user2489759 : After digging into it, I discovered that it's linked to the fact that I'm using the `StaggeredGridLayoutManager`. When using either `LinearLayoutManager` or `GridLayoutManager`, it appears I have no problem at all. Have you noticed anything similar?
- Are you saying the first item is animated when you scroll back to the top?
- 
    public void onViewDetachedFromWindow(final RecyclerView.ViewHolder holder)
    {
        ((CustomViewHolder)holder).clearAnimation();
    }  doesnot resoled method in my project
-  user2489759 : As a matter of fact, I did... even though I'm not even using this animation.
-  works perfect for me, i used LinearLayoutManager, Do you anyway to set animation for the items which go out of site. I mean this code animates items when then appear.
-  Simply replace `android.R.anim.slide_in_left` by `R.anim.slide_bottom_to_top` and create a new file with your bottom-to-top translation animation in your res/anim folder
-  but can you imagine this sense: while i'm using this CustomAdapter, when I scroll from position 0 to 100, these items all play this animation, but when I scroll back, position 0's item will play again.
- I use grid layout manager with 2 span, but the animation occur only on the right side items. Anyone has the same problem and has the solution?
- I thought maybe I need a Map to store the state of every item's animation?
- notifyDataSetChanged has a pattern of abruptly updating the recyclerview with new data/removing old data. Does this setAnimation() permit animation even when (or especially when) that method is called?
-  clearAnimation() is a method in your RecyclerView.ViewHolder class. You can use something like itemView.clearAnimation()
-  seems like the problem is the XML, the parent of my recyclerview have `layout_weight`, if I move the recyclerview one level up (with no `layout_weight` on parent), everything works fine, any idea?
- I understand it
