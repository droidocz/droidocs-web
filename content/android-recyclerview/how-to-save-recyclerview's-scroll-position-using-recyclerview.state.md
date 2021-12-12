---
metaTitle: How to save RecyclerView's scroll position using RecyclerView.State
tags:
- state
title: How to save RecyclerView's scroll position using RecyclerView.State
---

## Context

I have a question about Android's [RecyclerView.State](http://developer.android.com/reference/android/support/v7/widget/RecyclerView.State.html).


I am using a RecyclerView, how could I use and bind it with RecyclerView.State?


My purpose is to **save the RecyclerView's scroll position**.



---

On Android API Level 28, I simply ensure that I set up my `LinearLayoutManager` and `RecyclerView.Adapter` in my `Fragment#onCreateView` method, and everything Just Worked™️. I didn't need to do any `onSaveInstanceState` or `onRestoreInstanceState` work.


[Eugen Pechanec's answer](https://stackoverflow.com/a/54461502/9636) explains why this works.

