---
metaTitle: How do I get the currently displayed fragment
tags:
- android-intent
- android-fragments
title: How do I get the currently displayed fragment
---

When you add the fragment in your transaction you should use a tag.



```
fragTrans.replace(android.R.id.content, myFragment, "MY_FRAGMENT");

```

...and later if you want to check if the fragment is visible:



```
MyFragment myFragment = (MyFragment)getSupportFragmentManager().findFragmentByTag("MY_FRAGMENT");
if (myFragment != null && myFragment.isVisible()) {
   // add your code here
}

```

See also <http://developer.android.com/reference/android/app/Fragment.html>

