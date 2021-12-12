---
metaTitle: Showing empty view when ListView is empty
title: Showing empty view when ListView is empty
---

## Context

For some reason the empty view, a *TextView* in this case, always appears even when the *ListView* is not empty. I thought the *ListView* would automatically detect when to show the empty view.



```
<RelativeLayout android:id="@+id/LinearLayoutAR"
    android:layout_height="fill_parent"
    android:layout_width="fill_parent">
    <ListView android:id="@+id/ARListView"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent"></ListView>
    <ProgressBar android:id="@+id/arProgressBar"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"></ProgressBar>
    <!-- Here is the view to show if the list is emtpy -->
    <TextView android:id="@id/android:empty"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text="No Results" />
</RelativeLayout>

```

How can I hook up the empty view properly?



---

When you extend `FragmentActivity` or `Activity` and **not** `ListActivity`, you'll want to take a look at:


[ListView.setEmptyView()](http://developer.android.com/reference/android/widget/AdapterView.html#setEmptyView%28android.view.View%29)

