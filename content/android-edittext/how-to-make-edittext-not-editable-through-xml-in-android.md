---
metaTitle: How to make EditText not editable through XML in Android
title: How to make EditText not editable through XML in Android
---

## Problem

Can anyone tell me how to make an `EditText` not editable via XML? I tried setting `android:editable` to `false`, but


1. it is deprecated; and
2. it didn't work.


---

## Solution

As mentioned in other answers, you can do a `setEnabled(false)` but since you are asking how to set it via XML, here is how to do it.


Add the following attribute to your `EditText`:



```
android:enabled="false"

```


---

## Notes

- by enable, we cant access the click listener as well.
-  `enabled` is not deprecated.
- but this method deprecated
