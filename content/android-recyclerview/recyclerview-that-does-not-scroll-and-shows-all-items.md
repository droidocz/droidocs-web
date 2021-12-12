---
metaTitle: RecyclerView that does not scroll and shows all items
title: RecyclerView that does not scroll and shows all items
---

## Context

I have a RecyclerView (and some other views) in a ScrollView. Currently the RecyclerView is laid out as very small (it shows 2 items out of 5 that it contains) and it scrolls independently of the ScrollView, which is obviously not great UX. I would like to get the RecyclerView to not scroll and to extend so that all its items are visible.


(I know it's stupid to use a RecyclerView in this case. I'm only doing this because somewhere else in the app I need a normal RecyclerView with scrolling etc. but the same kind of content, and I don't want to duplicate code).



---

The solution of **setNestedScrollingEnabled(false)** isn't as full as it should: you need to use NestedScrollView instead of ScrollViewfocusableInTouchMode="true" to the child of the NestedScrollView .


If you insist on using ScrollView, you should also set minHeight to the RecyclerView, and also set overScrollMode="never" . In this case, it still isn't a good solution because the minHeight might not be enough in some cases


Other alternative solutions that you should consider:


1. Replace the ScrollView&RecyclerView with a single RecyclerView, which has views with additional view type for what you had in the ScrollView
2. Use GridLayout or another layout instead.


---

## Notes

- does using `recyclerView` inside `scrollView` affects performance ?
-  to this behaviour of NestedScrollView, RecyclerView
