---
metaTitle: 'IllegalStateException: Can not perform this action after onSaveInstanceState with ViewPager'
tags:
- android-viewpager
- illegalstateexception
- fragmenttransaction
title: 'IllegalStateException: Can not perform this action after onSaveInstanceState with ViewPager'
---

## Context

I'm getting user reports from my app in the market, delivering the following exception:



```
java.lang.IllegalStateException: Can not perform this action after onSaveInstanceState
at android.app.FragmentManagerImpl.checkStateLoss(FragmentManager.java:1109)
at android.app.FragmentManagerImpl.popBackStackImmediate(FragmentManager.java:399)
at android.app.Activity.onBackPressed(Activity.java:2066)
at android.app.Activity.onKeyUp(Activity.java:2044)
at android.view.KeyEvent.dispatch(KeyEvent.java:2529)
at android.app.Activity.dispatchKeyEvent(Activity.java:2274)
at com.android.internal.policy.impl.PhoneWindow$DecorView.dispatchKeyEvent(PhoneWindow.java:1803)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at com.android.internal.policy.impl.PhoneWindow$DecorView.superDispatchKeyEvent(PhoneWindow.java:1855)
at com.android.internal.policy.impl.PhoneWindow.superDispatchKeyEvent(PhoneWindow.java:1277)
at android.app.Activity.dispatchKeyEvent(Activity.java:2269)
at com.android.internal.policy.impl.PhoneWindow$DecorView.dispatchKeyEvent(PhoneWindow.java:1803)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.widget.TabHost.dispatchKeyEvent(TabHost.java:297)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at android.view.ViewGroup.dispatchKeyEvent(ViewGroup.java:1112)
at com.android.internal.policy.impl.PhoneWindow$DecorView.superDispatchKeyEvent(PhoneWindow.java:1855)
at com.android.internal.policy.impl.PhoneWindow.superDispatchKeyEvent(PhoneWindow.java:1277)
at android.app.Activity.dispatchKeyEvent(Activity.java:2269)
at com.android.internal.policy.impl.PhoneWindow$DecorView.dispatchKeyEvent(PhoneWindow.java:1803)
at android.view.ViewRoot.deliverKeyEventPostIme(ViewRoot.java:2880)
at android.view.ViewRoot.handleFinishedEvent(ViewRoot.java:2853)
at android.view.ViewRoot.handleMessage(ViewRoot.java:2028)
at android.os.Handler.dispatchMessage(Handler.java:99)
at android.os.Looper.loop(Looper.java:132)
at android.app.ActivityThread.main(ActivityThread.java:4028)
at java.lang.reflect.Method.invokeNative(Native Method)
at java.lang.reflect.Method.invoke(Method.java:491)
at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:844)
at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:602)
at dalvik.system.NativeStart.main(Native Method)

```

Apparently it has something to do with a FragmentManager, which I don't use. The stacktrace doesn't show any of my own classes, so I have no idea where this exception occurs and how to prevent it.


For the record: I have a tabhost, and in each tab there is a ActivityGroup switching between Activities.



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

