---
metaTitle: 'IllegalStateException: Can not perform this action after onSaveInstanceState with ViewPager'
tags:
- android-viewpager
- illegalstateexception
- fragmenttransaction
title: 'IllegalStateException: Can not perform this action after onSaveInstanceState with ViewPager'
---

Please check my answer [here](https://stackoverflow.com/a/10261438/542091). Basically I just had to :



```
@Override
protected void onSaveInstanceState(Bundle outState) {
    //No call for super(). Bug on API Level > 11.
}

```

Don't make the call to `super()` on the `saveInstanceState` method. This was messing things up...


This is a known [bug](http://code.google.com/p/android/issues/detail?id=19917) in the support package. 


If you need to save the instance and add something to your `outState` `Bundle` you can use the following:



```
@Override
protected void onSaveInstanceState(Bundle outState) {
    outState.putString("WORKAROUND_FOR_BUG_19917_KEY", "WORKAROUND_FOR_BUG_19917_VALUE");
    super.onSaveInstanceState(outState);
}

```

In the end the proper solution was (as seen in the comments) to use :



```
transaction.commitAllowingStateLoss();

```

when adding or performing the `FragmentTransaction` that was causing the `Exception`.

