---
metaTitle: Changing background color of ListView items on Android
tags:
- colors
title: Changing background color of ListView items on Android
---

You have to create a different state drawable for each color you want to use. 


For example: `list_selector_read.xml` and `list_selector_unread.xml`. 


All you need to do is set everything to transparent except the `android:state_window_focused="false"` item. 


Then when you are drawing your list you call `setBackgroundResource(R.drawable.list_selector_unread/read)` for each row. 


You don't set a listSelector on the ListView at all. That will maintain the default selector for your particular flavor of Android.

