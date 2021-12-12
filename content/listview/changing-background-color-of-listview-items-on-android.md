---
metaTitle: Changing background color of ListView items on Android
tags:
- colors
title: Changing background color of ListView items on Android
---

## Context

How can I change background color of `ListView` items on a per-item basis. When I use `android:backgroundColor` in the `ListView` item layout I can achieve this, however the list selector is no longer visible. I can make the selector visible again by setting `drawSelectorOnTop` to true but then the selector overlays the whole item.


Any ideas how to change those background colors and keep the selector?


PS I would rather not change the selector itself.


EDIT: Authors of GMail application have managed to achieve exactly this so it's definitely possible.



---

You have to create a different state drawable for each color you want to use. 


For example: `list_selector_read.xml` and `list_selector_unread.xml`. 


All you need to do is set everything to transparent except the `android:state_window_focused="false"` item. 


Then when you are drawing your list you call `setBackgroundResource(R.drawable.list_selector_unread/read)` for each row. 


You don't set a listSelector on the ListView at all. That will maintain the default selector for your particular flavor of Android.



---

## Notes

- And `row.setBackgroundResource()` happens either in `YourCustomArrayAdapter.getView()` OR else you can forego this altogether by simply setting  `android:background=" on the outermost element of `res/layout/your_list_entry_layout.xml`.
- wouldn't mind example of the code that goes into list_selector_read.xml
-  It's a standard [Color State List resource](https://developer.android.com/guide/topics/resources/color-list-resource).
- Correction: A [State List Drawable resource](https://developer.android.com/guide/topics/resources/drawable-resource#StateList) is needed here, not a Color State List.
