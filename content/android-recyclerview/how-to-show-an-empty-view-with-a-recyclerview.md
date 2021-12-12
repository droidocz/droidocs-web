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

I use ViewSwitcher



```
<ViewSwitcher
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:id="@+id/switcher"
    >

    <android.support.v7.widget.RecyclerView
        android:id="@+id/list"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        />

    <TextView android:id="@+id/text_empty"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text="@string/list_empty"
        android:gravity="center"
        />

</ViewSwitcher>

```

in code you will check cursor/dataset and switch views.



```
void showItems(Cursor items) {
    if (items.size() > 0) {

        mAdapter.switchCursor(items);

        if (R.id.list == mListSwitcher.getNextView().getId()) {
            mListSwitcher.showNext();
        }
    } else if (R.id.text_empty == mListSwitcher.getNextView().getId()) {
        mListSwitcher.showNext();
    }
}

```

Also you can set animations if you wish with a couple lines of code



```
mListSwitcher.setInAnimation(slide_in_left);
mListSwitcher.setOutAnimation(slide_out_right);

```
