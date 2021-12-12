---
metaTitle: Removing an activity from the history stack
tags:
- activity-lifecycle
title: Removing an activity from the history stack
---

## Context

My app shows a signup activity the first time the user runs the app, looks like:


1. ActivitySplashScreen (welcome to game, sign up for an account?)
2. ActivitySplashScreenSignUp (great, fill in this info)
3. ActivityGameMain (main game screen)


so the activities launch each other in exactly that order, when the user clicks through a button on each screen.


When the user goes from activity #2 to #3, is it possible to wipe #1 and #2 off the history stack completely? I'd like it so that if the user is at #3, and hits the back button, they just go to the homescreen, instead of back to the splash screen.


I think I can accomplish this with tasks (ie. start a new task on #3) but wanted to see if there was simpler method,


Thanks



---

You can achieve this by setting the `android:noHistory` [attribute](http://developer.android.com/reference/android/R.styleable.html#AndroidManifestActivity_noHistory) to `"true"` in the relevant `<activity>` entries in your `AndroidManifest.xml` file. For example:



```
<activity
    android:name=".AnyActivity"
    android:noHistory="true" />

```


---

## Notes

- How can I achieve this from code? Because I don't want to do this all the time. I would like to remove a given activity from history only under some conditions.
- Equivalently you can use `FLAG_ACTIVITY_NO_HISTORY`.
- It is difficult to copy the needed flag as it is a link, so here one that can easily be copied. `android:noHistory="true"`
- Just be aware that using the noHistory attribute will make that activity finish, which might cause unexpected behavior with G+ login for example. See:
https://stackoverflow.com/questions/20383878/android-app-crashes-without-any-exception-when-trying-to-sign-in-with-google-pl
Took me a while to find this bug as my app kept crashing without any  trace.
- using this, if u press home button and again start app, instead of resuming activity, it wl finish activity!
- It works fine when you get to Activity #3 - pressing Back closes the app. Pressing Back in Activity #2, however, should return you to #1 - but with this solution it just closes the app. Plus, as was already pointed out, when you for example request some permission on runtime, the Activity from which you were requesting it closes and doesn't reopen after the permission is granted/denied. I believe the OP's problem can't be solved statically by some Manifest value like this.
- I have applied this attribute still is not working in-case of when app was not in recent app list. Any one please suggest how to remove activity when app was not in background previously.
- Note: `android:noHistory="true"` will make it impossible to use things like the [`AccountPicker`](https://developers.google.com/android/reference/com/google/android/gms/common/AccountPicker) within the Activity; as when it opens your Activity will close.
- http://stackoverflow.com/questions/31693570/application-should-not-display-in-recent-app-list-after-finish-the-new-activity?noredirect=1#comment51330227_31693570
- Thank you for the suggest.But this is just show the activity when the activity doesnt destroyed.it means, when the app or activity killed, after that, this not work.
- If user is already loged in then the flow will be Checkout --&gt; Payment. In this case if user press back button from "Payment", user should directed to Checkout screen screen directly. But what if user press back button on Otp screen, he must be directed to Login screen(this is the requirement).
