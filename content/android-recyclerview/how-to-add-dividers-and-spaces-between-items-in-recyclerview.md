---
metaTitle: How to add dividers and spaces between items in RecyclerView
tags:
- divider
title: How to add dividers and spaces between items in RecyclerView
---

## Context

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

**October 2016 Update**


The version 25.0.0 of Android Support Library introduced the [`DividerItemDecoration`](https://developer.android.com/reference/android/support/v7/widget/DividerItemDecoration.html) class:



> 
> DividerItemDecoration is a RecyclerView.ItemDecoration that can be used as a divider between items of a `LinearLayoutManager`. It supports both `HORIZONTAL` and `VERTICAL` orientations.
> 
> 
> 


Usage:



```
DividerItemDecoration dividerItemDecoration = new DividerItemDecoration(recyclerView.getContext(),
    layoutManager.getOrientation());
recyclerView.addItemDecoration(dividerItemDecoration);

```



---


**Previous answer**


Some answers either use methods that have since become deprecated, or don't give a complete solution, so I tried to do a short, up-to-date wrap-up.




---


Unlike `ListView`, the `RecyclerView` class doesn't have any divider-related parameters. Instead, you need to extend [`ItemDecoration`](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.ItemDecoration.html), a `RecyclerView`'s inner class:



> 
> An `ItemDecoration` allows the application to add a special drawing and layout offset to specific item views from the adapter's data set. This can be useful for drawing dividers between items, highlights, visual grouping boundaries and more.
> 
> 
> All `ItemDecorations` are drawn in the order they were added, before the item views (in `onDraw()`) and after the items (in onDrawOver(`Canvas`, `RecyclerView`, `RecyclerView.State)`.
> 
> 
> 


`Vertical` spacing `ItemDecoration`
-----------------------------------


Extend `ItemDecoration`, add a custom constructor which takes space `height` as a parameter and override the `getItemOffsets()` method:



```
public class VerticalSpaceItemDecoration extends RecyclerView.ItemDecoration {

    private final int verticalSpaceHeight;

    public VerticalSpaceItemDecoration(int verticalSpaceHeight) {
        this.verticalSpaceHeight = verticalSpaceHeight;
    }

    @Override
    public void getItemOffsets(Rect outRect, View view, RecyclerView parent,
            RecyclerView.State state) {
        outRect.bottom = verticalSpaceHeight;
    }
}

```

If you don't want to insert space below the last item, add the following condition:



```
if (parent.getChildAdapterPosition(view) != parent.getAdapter().getItemCount() - 1) {
            outRect.bottom = verticalSpaceHeight;
}

```

Note: you can also modify `outRect.top`, `outRect.left` and `outRect.right` properties for the desired effect.


Divider `ItemDecoration`
------------------------


Extend `ItemDecoration` and override the `onDraw()` method:



```
public class DividerItemDecoration extends RecyclerView.ItemDecoration {

    private static final int[] ATTRS = new int[]{android.R.attr.listDivider};

    private Drawable divider;

    /**
     * Default divider will be used
     */
    public DividerItemDecoration(Context context) {
        final TypedArray styledAttributes = context.obtainStyledAttributes(ATTRS);
        divider = styledAttributes.getDrawable(0);
        styledAttributes.recycle();
    }

    /**
     * Custom divider will be used
     */
    public DividerItemDecoration(Context context, int resId) {
        divider = ContextCompat.getDrawable(context, resId);
    }

    @Override
    public void onDraw(Canvas c, RecyclerView parent, RecyclerView.State state) {
        int left = parent.getPaddingLeft();
        int right = parent.getWidth() - parent.getPaddingRight();

        int childCount = parent.getChildCount();
        for (int i = 0; i < childCount; i++) {
            View child = parent.getChildAt(i);

            RecyclerView.LayoutParams params = (RecyclerView.LayoutParams) child.getLayoutParams();

            int top = child.getBottom() + params.bottomMargin;
            int bottom = top + divider.getIntrinsicHeight();

            divider.setBounds(left, top, right, bottom);
            divider.draw(c);
        }
    }
}

```

You can either call the first constructor that uses the default Android divider attributes, or the second one that uses your own drawable, for example *drawable/divider.xml*:



```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
       android:shape="rectangle">
    <size android:height="1dp" />
    <solid android:color="#ff992900" />
</shape>

```

Note: if you want the divider to be drawn *over* your items, override the `onDrawOver()` method instead.


Usage
-----


To use your new class, add `VerticalSpaceItemDecoration` or `DividerSpaceItemDecoration` to `RecyclerView`, for example in your fragment's `onCreateView()` method:



```
private static final int VERTICAL_ITEM_SPACE = 48;
private RecyclerView recyclerView;
private LinearLayoutManager linearLayoutManager;
@Override
public View onCreateView(LayoutInflater inflater, ViewGroup container,
        Bundle savedInstanceState) {
    View rootView = inflater.inflate(R.layout.fragment_feed, container, false);

    recyclerView = (RecyclerView) rootView.findViewById(R.id.fragment_home_recycler_view);
    linearLayoutManager = new LinearLayoutManager(getActivity());
    recyclerView.setLayoutManager(linearLayoutManager);

    //add ItemDecoration
    recyclerView.addItemDecoration(new VerticalSpaceItemDecoration(VERTICAL_ITEM_SPACE));
    //or
    recyclerView.addItemDecoration(new DividerItemDecoration(getActivity()));
    //or
    recyclerView.addItemDecoration(
            new DividerItemDecoration(getActivity(), R.drawable.divider));

    recyclerView.setAdapter(...);

    return rootView;
}

```



---


There's also [Lucas Rocha's library](https://github.com/lucasr/twoway-view) which is supposed to simplify the item decoration process. I haven't tried it though.


Among its [features](https://github.com/lucasr/twoway-view#features) are:


* A collection of stock item decorations including:
* Item spacing Horizontal/vertical dividers.
* List item


---

## Notes

- DividerItemDecoration as shown above won't work if the items are fully opaque, dividers will get overdrawn by the items. In that case you need to override the getItemOffsets() too and add bottom offset to outRect so the divider ends up outside of the item. Alternatively, you can override onDrawOver() instead of onDraw() to draw the divider afeter the item.
-  Correct me if I'm wrong, but I don't create any objects in `onDraw()`.
-  is it possible to add padding to the line? like left and right padding so the line doesnt start at the beginning and go to the end?
- If you use wrap_content on your recyclerview then the bottom divider will not show...
- This is by far the best explanation I could find, it just lacks one explanation: what is the advantage of using ItemDecoration if you only want to add a simple divider/separator (just a View of height 1 or similar, below your last item view).
- the divider in the support library draws after the last element as well :/
- Just an informative comment: always add the space to the last item if you plan to add items later on you list. If you don't do that, when adding an item, it will not have the space.
- Then I can call `canvas.drawLine(startX, startY, stopX, stopY, mPaint)` in `onDrawOver`?
- Hi, I found that if I set the `outRect.top = mVerticalSpaceHeight` will not add margin after the divider, may I know what's wrong with that?
- You should not create objects in `onDraw` if possible as it's costly and onDraw is called often. Create them in the constructor for use later on.
- I always avoid references creation in onDraw also. I believe that you should avoid this also as it creates multiple pointers to the same resource but I may be wrong.
- How do I make it work for GridLayoutManager, for showing vertical dividers between cells too? The code seems to work fine only for lists (horizontal divider, between rows...).
- This is an old question, but I found out something recently that is not covered here.
- to add space after last item you can use
        android:clipToPadding="false"
        android:paddingBottom="75dp"
- In adapter class?
- When I refresh my dataset and call setAdapter (or swapAdapter) it seems that the getitemOffsets() method is called again and I'm adding offsets to a view that already had offsets added. The next effect is that the padding that was added in the first pass is doubled with each refresh.
-  https://www.bignerdranch.com/blog/a-view-divided-adding-dividers-to-your-recyclerview-with-itemdecoration/ and I modified the code to my need.
- `DividerItemDecoration` class cannot be found in project.
- To add in inset to the divider, see [this answer](http://stackoverflow.com/a/40434249/3681880).
- Make sure your android support libraries dependencies are v25.x.x ie `'com.android.support:recyclerview-v7:25.0.0'`
- This means that if I have drag & drop or swipe functionality, the thing drawn by item decorator will move(on drag/swipe) with the item itself. Is there a way to draw spaces/dividers as separate views in the RecyclerView to override this behavior?
- Hi, does this work only for a fixed amount of space (height) allotted to each item? How can I do it when the height of the item varies? I saw in usage this first line of code:    private static final int VERTICAL_ITEM_SPACE = 48;
- Also wondering if its possible to add margin or padding to the line, nothing I have tried works so far so wondering if someone else has a solution
- To simply change divider color add this line to constructor `mDivider.setColorFilter(color, PorterDuff.Mode.SRC_OVER)`
