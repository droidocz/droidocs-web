---
metaTitle: Android ListView Headers
title: Android ListView Headers
---

## Context

How do you make those standard header labels in the ListView Control?


An example would be in the contacts application you see the first letter of the grouped contacts for each letter in the alphabet.


If possible please provide some code snippets on how to construct the grouped data and the display of the ListView.



---

You can use my [`MergeAdapter`](http://github.com/commonsguy/cwac-merge) or Jeff Sharkey's [`SeparatedListAdapter`](http://jsharkey.org/blog/2008/08/18/separating-lists-with-headers-in-android-09/) for that.


In the case of `MergeAdapter`, you would add an ordinary `View` (e.g., `TextView`) for a section header, then an `Adapter` for the contents of that section. Lather, rinse, repeat.

