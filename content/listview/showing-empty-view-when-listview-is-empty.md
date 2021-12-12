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

It should be like this:



```
<TextView android:id="@android:id/empty"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:text="No Results" />

```

Note the *id* attribute.



---

## Notes

- you have to be using a ListViewActivity for it to work this way.
- you have implement the logic yourself, take a look at the sourcecode for ListViewActivity to see how they do it, or when you make your query check to see if it is empty, if so set your text view to VISIBLE, otherwise set it to GONE
- using the textview when you are using a custom adapter is not working.
- you don't need a ListViewActivity to use the empty functionality.
- Is there another way I can present the view when the list is empty?
- In cases such as this, when the ListView is not part of a ListActivity, this the correct (and quickest) way to hook up a View to be automatically displayed when a list is empty. (as is the case with the original question)   All that a ListActivity does is automatically call this method with a view defined in the XML with id android:id/empty
- I changed the XML to the following, but still I get the same results
-   How to set single empty view for multiListview?
