---
metaTitle: Android ListView setSelection() does not seem to work
title: Android ListView setSelection() does not seem to work
---

## Problem

I have a `ListActivity` that implements `onListItemClick()` and calls a `doSomething()` function of the class. The latter contains `l.setSelection(position)` where `l` is the `ListView` object.


Now there is a `onClickListener()` listening for a button click that perfoms some actions and that too calls `doSomething()`.


In the first case, the selected item get positioned appropriately, but in the latter, nothing happens.


Any clues about this strange behaviour and how I might make it work?



---

## Solution

`setSelection()` does not necessarily have visual impact. The selection bar only appears if you use the D-pad/trackball to navigate the list. If you tap on the screen to click something, the selection bar appears briefly and vanishes.


Hence, `setSelection()` will only have a visual impact if the activity is not in touch mode (i.e., the last thing the user did was use the D-pad/trackball).


I am not 100% certain this explains your phenomenon given the description you provided, but I figured it is worth a shot...



---

## Notes

- However, the docs state for setSelection(): "If in touch mode, the item will not be selected but it will still be positioned appropriately".
