---
metaTitle: How to programmatically scroll to the bottom of a Recycler View
tags:
- android-layout
title: How to programmatically scroll to the bottom of a Recycler View
---

## Context

I want to scroll to the bottom of a recycler view on click of a button, how do I do this?



---

You can use [scrollToPosition()](http://developer.android.com/reference/android/support/v7/widget/RecyclerView.html#scrollToPosition(int)) with the index of the last position.



---

## Notes

- Based on the doc, " RecyclerView does not implement scrolling logic, rather forwards the call to scrollToPosition(int)". It does not implement the logic, simply call this function will does nothing.
- Image in the list item is the cause?
- Same as previous answer - If recycle view element is big (image for example) this show only start if item. So this not real scroll to bottom (I can still scroll more by hand after this)
