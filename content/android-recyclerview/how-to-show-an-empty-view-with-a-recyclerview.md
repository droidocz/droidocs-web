---
metaTitle: How to show an empty view with a RecyclerView
tags:
- listview
- no-data
title: How to show an empty view with a RecyclerView
---

## Context

I am used to put an special view inside the layout file as [described in the `ListActivity` documentation](http://developer.android.com/reference/android/app/ListActivity.html) to be **displayed when there is no data**. This view has the id `"android:id/empty"`.



```
<TextView
    android:id="@android:id/empty"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="@string/no_data" />

```

I wonder how this can be done with the new [`RecyclerView`](http://developer.android.com/reference/android/support/v7/widget/RecyclerView.html)?



---

On the same layout where is defined the `RecyclerView`, add the `TextView`:



```
<android.support.v7.widget.RecyclerView
    android:id="@+id/recycler_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:scrollbars="vertical" />

<TextView
    android:id="@+id/empty_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:visibility="gone"
    android:text="@string/no_data_available" />

```

At the `onCreate` or the appropriate callback you check if the dataset that feeds your `RecyclerView` is empty. 
If the dataset is empty, the `RecyclerView` is empty too. In that case, the message appears on the screen.
If not, change its visibility:



```
private RecyclerView recyclerView;
private TextView emptyView;

// ...

recyclerView = (RecyclerView) rootView.findViewById(R.id.recycler_view);
emptyView = (TextView) rootView.findViewById(R.id.empty_view);

// ...

if (dataset.isEmpty()) {
    recyclerView.setVisibility(View.GONE);
    emptyView.setVisibility(View.VISIBLE);
}
else {
    recyclerView.setVisibility(View.VISIBLE);
    emptyView.setVisibility(View.GONE);
}

```


---

## Notes

- That does not work for me because the recycler view layout is inflated in the fragment whereas the decision whether to show an normal item layout or an no-items layout is made in the adapter.
-  when using a Fragment, the same thing applies. When you inflate your fragment view you have the recyclerview and then another layout that would be used for your empty view. Usually in my fragments I will have the follow there views:  1) recyclerview, 2) empty view, and 3) progressbar view. I usually pass the adapter whatever the list is, but based on the size of the list i will either hide the recyclerview and show the empty or vice versa. If a recyclerview has an empty list, then it does not do anything with it.
-  You can do it the other way around: Use an Eventbus (such as greenrobots Eventbus or Otto), then have the Adapter post on the eventbus when the dataset changes. In the fragment all you do is create a method whose parameters correspond to what the Adapter is passing into the Eventbus.post method and then change the layout accordingly. A more simple but also more coupled approach is to create a callback interface in the adapter, and upon creating the adapter have the fragment implement it.
- What does your full layout file look like?
- In this way, the verification will be made immediately before the screen be displayed to the user and will work for both, increasing or decreasing the amount of rows in the dataset.
- Is there no listener that one can attach tot he adapter to check if there is any items int eh adapter?
- This solution works for me perfectly, I only use the Kotlin, so check the condition like: override fun getItemCount() = dataSet.size.also { showEmpty(dataSet.isEmpty()) }
- what if the content of recyclerview can be decreased, how to detect it if data changed?
