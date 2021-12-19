---
metaTitle: How to change title of Activity in Android
title: How to change title of Activity in Android
---

## Problem

I am using 



```
Window w = getWindow();
w.setTitle("My title");

```

to change title of my current Activity but it does not seem to work.


Can anyone guide me on how to change this?



---

## Solution

Try setTitle by itself, like this:



```
setTitle("Hello StackOverflow");

```


---

## Notes

- setTitle not working for me, getSupportActionBar() and getActionBar() also nulls i cant set the title in runtime.
