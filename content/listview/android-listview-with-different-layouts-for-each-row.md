---
metaTitle: Android ListView with different layouts for each row
tags:
- listviewitem
title: Android ListView with different layouts for each row
---

## Context

I am trying to determine the best way to have a single ListView that contains different layouts for each row. I know how to create a custom row + custom array adapter to support a custom row for the entire list view, but how can I implement many different row styles in the ListView?



---

Since you know how many types of layout you would have - it's possible to use those methods.


`getViewTypeCount()` - this methods returns information how many types of rows do you have in your list


`getItemViewType(int position)` - returns information which layout type you should use based on position


Then you inflate layout only if it's null and determine type using `getItemViewType`.


Look at **[this tutorial](http://android.amberfog.com/?p=296)** for further information.


To achieve some optimizations in structure that you've described in comment I would suggest:


* Storing views in object called `ViewHolder`. It would increase speed because you won't have to call `findViewById()` every time in `getView` method. See [List14 in API demos](http://developer.android.com/resources/samples/ApiDemos/src/com/example/android/apis/view/List14.html).
* Create one generic layout that will conform all combinations of properties and hide some elements if current position doesn't have it.


I hope that will help you. If you could provide some XML stub with your data structure and information how exactly you want to map it into row, I would be able to give you more precise advise. By pixel.

