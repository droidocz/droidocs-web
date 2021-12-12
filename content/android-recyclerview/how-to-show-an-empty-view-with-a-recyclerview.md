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

RVEmptyObserver
===============


Instead of using a custom `RecyclerView`, extending an `AdapterDataObserver` is a simpler solution that allows setting a custom `View` that is displayed when there are no items in the list:


**Example Usage:**



```
RVEmptyObserver observer = new RVEmptyObserver(recyclerView, emptyView)
rvAdapter.registerAdapterDataObserver(observer);

```

**Class:**



```
public class RVEmptyObserver extends RecyclerView.AdapterDataObserver {
    private View emptyView;
    private RecyclerView recyclerView;

    public RVEmptyObserver(RecyclerView rv, View ev) {
        this.recyclerView = rv;
        this.emptyView    = ev;
        checkIfEmpty();
    }

    private void checkIfEmpty() {
        if (emptyView != null && recyclerView.getAdapter() != null) {
            boolean emptyViewVisible = recyclerView.getAdapter().getItemCount() == 0;
            emptyView.setVisibility(emptyViewVisible ? View.VISIBLE : View.GONE);
            recyclerView.setVisibility(emptyViewVisible ? View.GONE : View.VISIBLE);
        }
    }

    public void onChanged() { checkIfEmpty(); }
    public void onItemRangeInserted(int positionStart, int itemCount) { checkIfEmpty(); }
    public void onItemRangeRemoved(int positionStart, int itemCount) { checkIfEmpty(); }
}

```


---

## Notes

- I believe that it will run faster if you don't call `checkIfEmpty()` in `onChanged()` and `onItemRangeInserted()`
