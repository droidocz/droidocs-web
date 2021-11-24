---
metaTitle: How to center items of a recyclerview
tags:
- android-recyclerview
title: How to center items of a recyclerview
---

## Context

I need to center elements in each row so they will be like in this mockup.
I've been searching if there is any layout that works that way without look.
items are centered in their rows.


![mockup](https://i.stack.imgur.com/w11fv.png])


This is how it looks now in my code.![enter image description here](https://i.stack.imgur.com/GuTGy.jpg)



---

I am assuming that you are using a `LinearLayoutManager` with a `RecyclerView` for a `ListView`-style effect. In that case, use a `horizontal` `LinearLayout` for each row, with `android:gravity="center"` to center its contents.

