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

As of Android Studio 1.3.1 it shows default list items in the preview but it doesn't let yout specify your own yet. Hopefully, it will come.



---

## Notes

- Just right-click the RecyclerView in the layout editor and choose "Preview list content". Unfortunately, you still cannot use it for your own layouts, at least for me it's throwing a rendering error.
