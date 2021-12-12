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

There are many related problems with a similar error message. Check the second line of this particular stack trace. This exception is specifically related to the call to `FragmentManagerImpl.popBackStackImmediate`.


This method call, like `popBackStack`, will *always* fail with `IllegalStateException` if the session state has already been saved. Check the source. There is nothing you can do to stop this exception being thrown. 


* Removing the call to `super.onSaveInstanceState` will not help.
* Creating the Fragment with `commitAllowingStateLoss` will not help.


Here's how I observed the problem:


* There's a form with a submit button.
* When the button is clicked a dialog is created and an async process starts.
* The user clicks the home key before the process is finished - `onSaveInstanceState` is called.
* The process completes, a callback is made and `popBackStackImmediate` is attempted.
* `IllegalStateException` is thrown.


Here's what I did to solve it:


As it is not possible to avoid the `IllegalStateException` in the callback, catch & ignore it.



```
try {
    activity.getSupportFragmentManager().popBackStackImmediate(name);
} catch (IllegalStateException ignored) {
    // There's no way to avoid getting this if saveInstanceState has already been called.
}

```

This is enough to stop the app from crashing. But now the user will restore the app and see that the button they thought they'd pressed hasn't been pressed at all (they think). The form fragment is still showing!


To fix this, when the dialog is created, make some state to indicate the process has started.



```
progressDialog.show(fragmentManager, TAG);
submitPressed = true;

```

And save this state in the bundle.



```
@Override
public void onSaveInstanceState(Bundle outState) {
    ...
    outState.putBoolean(SUBMIT_PRESSED, submitPressed);
}

```

Don't forget to load it back again in `onViewCreated`


Then, when resuming, rollback the fragments if submit was previously attempted. This prevents the user from coming back to what seems like an un-submitted form.



```
@Override
public void onResume() {
    super.onResume();
    if (submitPressed) {
        // no need to try-catch this, because we are not in a callback
        activity.getSupportFragmentManager().popBackStackImmediate(name);
        submitPressed = false;
    }
}

```


---

## Notes

- Interesting reading about that here: http://www.androiddesignpatterns.com/2013/08/fragment-transaction-commit-state-loss.html
- What if the `popBackStackImmediate` was called by Android itself?
- I didn't use public void onSaveInstanceState(Bundle outState)  method. Do I need to set empty method for public void onSaveInstanceState(Bundle outState) ?
- If you use DialogFragment, I've made an alternative to it here: https://github.com/AndroidDeveloperLB/DialogShard
