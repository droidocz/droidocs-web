---
metaTitle: Is there a way to show a preview of a RecyclerView's contents in the Android Studio editor
tags:
- android-studio
- android-tools-namespace
title: Is there a way to show a preview of a RecyclerView's contents in the Android Studio editor
---

## Context

When I add the RecyclerView to the layout, it shows up as a blank screen. Is there a way, such as through the `tools` namespace, to show a preview of the content of the RecyclerView?



---

@oRRs is right !


I'm using Android Studio 1.4 RC2 and you can now specify any custom layout.


I tried a custom CardView and it works.



```
tools:listitem="@android:layout/simple_list_item_checked"

```


---

## Notes:

- If you also wish to set the orientation to be horizontal , you can: `tools:orientation="horizontal"`
- In addition to specifying `tools:orientation="horizontal"` or `android:orientation="horizontal"` I also had to specify `app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"` as per https://stackoverflow.com/questions/35681433/previewing-horizontal-recyclerview-in-android-studio
- Is there a way to show two types of items previewed. Sometimes RecyclerView shows more than one item Types.
- is there anyway to use ItemDecorations .?
- this has been an annoyance for me for a long time
- Don't use camel casing for 'listItem'.
- For me i currently just have to write `tools:listitem="
