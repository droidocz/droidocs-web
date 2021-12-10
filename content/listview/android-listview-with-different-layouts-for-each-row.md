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



---

## Notes

- Although I still prefer the way exposed here. It makes clearer what you want to achieve.
- sorry for digging this up again, but you would actually recommend having a single large layout file and control visibility of parts of it, instead of have separate layout files, which get inflated respectively using getItemViewType?
- what if I you wanna add many type of items not just Layouts in list view?
-  you can declare as many views as you want in a single view holder and it isn't necessary to use every view declared in the view holder. If a sample code is needed, please do let me know, I'll post it.
-  link to the tutorial is dead :(  is it still available elsewhere?
- I could do with a code example if possible.
- But in multiple layout strategy we can not user view holder properly because setTag can only contain one view holder and whenever row layout switches again we need to call findViewById() . I personal experienced it what is your suggestion on it ?
