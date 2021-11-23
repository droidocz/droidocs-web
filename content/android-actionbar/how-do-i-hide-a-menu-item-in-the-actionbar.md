---
metaTitle: How do I hide a menu item in the actionbar
tags:
- menuitem
- android-menu
title: How do I hide a menu item in the actionbar
---

Get a `MenuItem` pointing to such item, call `setVisible` on it to adjust its visibility and then call `invalidateOptionsMenu()` on your activity so the ActionBar menu is adjusted accordingly.


**Update:** A `MenuItem` is not a regular view that's part of your layout. Its something special, completely different. Your code returns `null` for `item` and that's causing the crash. What you need instead is to do:



```
MenuItem item = menu.findItem(R.id.addAction);

```

Here is the sequence in which you should call:
first call `invalidateOptionsMenu()` and then inside `onCreateOptionsMenu(Menu)` obtain a reference to the MenuItem (by calling `menu.findItem()`) and call `setVisible()` on it

