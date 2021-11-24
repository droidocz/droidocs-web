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
