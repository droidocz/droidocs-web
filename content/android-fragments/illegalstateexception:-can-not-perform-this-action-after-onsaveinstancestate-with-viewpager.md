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



---

## Notes:

- You should use commitAllowingStateLoss() instead of commit()


- Regarding 'commitAllowingStateLoss' --/> "This is dangerous because the commit can be lost if the activity needs to later be restored from its state, so this should only be used for cases where it is okay for the UI state to change unexpectedly on the user."


- If I look at the v4 source for `popBackStackImmediate` it immediately fails if the state has been saved. Previously adding the fragment with `commitAllowingStateLoss` doesn't play any part. It has no effect on this specific exception. What we need is a `popBackStackImmediateAllowingStateLoss` method.


- But I've actually found an even better solution by using Otto message bus: register the fragment as a subscriber and listen for the async result from the bus. The async also needs a Produce method for the times when it completes and the fragment is paused.


- the issue is with doing fragment transactions after callbacks from background jobs when the app is not on the foreground.


- I think this is not 100% correct, check this link: http://www.androiddesignpatterns.com/2013/08/fragment-transaction-commit-state-loss.html


- I didn't use onSaveInstanceState() method.


- Wow i cant believe its 2017 and the suggestion posted by is still working, android is drop dead buggy


- maybe there are some conditions we can test for, and avoid calling `popBackStackImmediate()` on those conditions?


- Looking at sources: Implementation of `Fragment#onSaveInstanceState` is a NOP. Can you explain why not calling `super` method helps ?


- you are probably calling the `fragmentTransaction::commit()` from a background thread (using `runOnUiThread` or `handler` ). If user exits app (calling `onSavedStateInstance()`) fast, then this fts commit actually occurs later; resulting this issue. So the solution at this point probably is to allow state loss `commitAllowingStateLoss()`.


- What is `transaction` here?


- Did anyone file an issue that I could star?


- I use commitAllowingStateLoss for an app on play store and i'm still getting hundreds of the same exception at this line:
fragmentTransaction.replace(layoutId, newFragment).commitAllowingStateLoss();


- If you use `commitAllowingStateLoss`, you probably will encounter the `ArrayIndexOutOfBoundsException` while the fragmentManager trying to restore its state(not always). Even if I called commit in the `onCreate()` it still threw the `IllegalStateException`. I still can't figure out why.


- The error gets fired by `popBackStackImmediate()` and not by committing the transaction.


- Some methods, such as View#onDetachedFromWindow, require that you also call the super implementation as part of your method.\_


- How to commitAllowingStateLoss() while displaying fragment as a dialog.


- Interestingly I only use commitAllowingStateLoss(), tried both workaround in onSaveInstanteState(), still no luck, the issue still occurs once in a while.


- that exception only happens very rarely to me anyway


