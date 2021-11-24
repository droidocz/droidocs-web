---
metaTitle: How do I get the currently displayed fragment
tags:
- android-intent
- android-fragments
title: How do I get the currently displayed fragment
---

## Context

I am playing with fragments in Android.


I know I can change a fragment by using the following code:



```
FragmentManager fragMgr = getSupportFragmentManager();
FragmentTransaction fragTrans = fragMgr.beginTransaction();

MyFragment myFragment = new MyFragment(); //my custom fragment

fragTrans.replace(android.R.id.content, myFragment);
fragTrans.addToBackStack(null);
fragTrans.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
fragTrans.commit();

```

My question is, in a Java file, how can I get the currently displayed Fragment instance?



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

