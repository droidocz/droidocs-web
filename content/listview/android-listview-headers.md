---
metaTitle: Android ListView Headers
title: Android ListView Headers
---

## Problem

How do you make those standard header labels in the ListView Control?


An example would be in the contacts application you see the first letter of the grouped contacts for each letter in the alphabet.


If possible please provide some code snippets on how to construct the grouped data and the display of the ListView.



---

## Solution

You can use my [`MergeAdapter`](http://github.com/commonsguy/cwac-merge) or Jeff Sharkey's [`SeparatedListAdapter`](http://jsharkey.org/blog/2008/08/18/separating-lists-with-headers-in-android-09/) for that.


In the case of `MergeAdapter`, you would add an ordinary `View` (e.g., `TextView`) for a section header, then an `Adapter` for the contents of that section. Lather, rinse, repeat.



---

## Notes

- Is this the standard methodology that google used in their applications?
- "Is this the standard methodology that google used in their applications?" You would have to look at their source code on http://source.android.com. Jeff Sharkey's implementation was originally for 0.9 but probably still works; my two implementations work up through 2.0.1.
- What about `ExpandableListView` (http://developer.android.com/reference/android/widget/ExpandableListView.html)? It has similar functionality.
- All that is in ListView folder is HeaderFooter, RateListView and Selector.
