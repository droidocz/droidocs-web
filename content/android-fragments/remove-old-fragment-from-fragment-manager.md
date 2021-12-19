---
metaTitle: Remove old Fragment from fragment manager
tags:
- android-tabhost
title: Remove old Fragment from fragment manager
---

## Problem

I'm trying to learn how to use `Fragment`s in android.
I'm trying to remove old `fragment` when new `fragment` is calling in android.



---

## Solution

You need to find reference of existing Fragment and remove that fragment using below code. You need add/commit fragment using one tag ex. "TAG\_FRAGMENT".



```
Fragment fragment = getSupportFragmentManager().findFragmentByTag(TAG_FRAGMENT);
if(fragment != null)
    getSupportFragmentManager().beginTransaction().remove(fragment).commit();

```

That is it.



---

## Notes

- Is fragment also not work using stack mechanism? Or is back stack just if we use it? Or does this technique move fragments on top and then remove the fragment and put the fragments back or something?
-  Yes, You can use pop back stack. But if you want remove specific fragment from container you can use remove method.
- But for that you need to tell fragment manager to add them in stack. Refer: https://developer.android.com/reference/android/app/FragmentTransaction.html#addToBackStack(java.lang.String)
- Fragment 1-&gt; Fragment 2 -&gt; Fragment 3 

Does this mean that the Fragments are kept in a stack or is the back stack just maintained as a custom mechanism?
- Just wanted to add that by commit schedules it to be executed on the next run loop. If you need it removed immediately, you can call `fragmentManager.executePendingTransactions()`
