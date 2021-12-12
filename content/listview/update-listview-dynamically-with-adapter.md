---
metaTitle: update listview dynamically with adapter
title: update listview dynamically with adapter
---

## Context

[This](http://saigeethamn.blogspot.com/2010/04/custom-listview-android-developer.html) tutorial uses a SimpleAdapter which works fine, but I need to update the arrays in the adapter when new data is entered.


Could you please guide me on how to update a ListView using something other than a SimpleAdapter?



---

Use a [ArrayAdapter](http://developer.android.com/reference/android/widget/ArrayAdapter.html) backed by an ArrayList. To change the data, just update the data in the list and call [adapter.notifyDataSetChanged()](http://developer.android.com/reference/android/widget/BaseAdapter.html#notifyDataSetChanged%28%29).



---

## Notes

- :) Although you can call notifyDataSetChanged() on SimpleAdapter too.
