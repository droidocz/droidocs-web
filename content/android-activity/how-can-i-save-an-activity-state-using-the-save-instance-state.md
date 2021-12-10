---
metaTitle: How can I save an activity state using the save instance state
tags:
- application-state
title: How can I save an activity state using the save instance state
---

## Context

I've been working on the Android SDK platform, and it is a little unclear how to save an application's state. So given this minor re-tooling of the 'Hello, Android' example:



```
package com.android.hello;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class HelloAndroid extends Activity {

  private TextView mTextView = null;

  /** Called when the activity is first created. */
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    mTextView = new TextView(this);

    if (savedInstanceState == null) {
       mTextView.setText("Welcome to HelloAndroid!");
    } else {
       mTextView.setText("Welcome back.");
    }

    setContentView(mTextView);
  }
}

```

I thought it would be enough for the simplest case, but it always responds with the first message, no matter how I navigate away from the app.


I'm sure the solution is as simple as overriding `onPause` or something like that, but I've been poking away in the documentation for 30 minutes or so and haven't found anything obvious.



---

You need to override `onSaveInstanceState(Bundle savedInstanceState)` and write the application state values you want to change to the `Bundle` parameter like this:



```
@Override
public void onSaveInstanceState(Bundle savedInstanceState) {
  super.onSaveInstanceState(savedInstanceState);
  // Save UI state changes to the savedInstanceState.
  // This bundle will be passed to onCreate if the process is
  // killed and restarted.
  savedInstanceState.putBoolean("MyBoolean", true);
  savedInstanceState.putDouble("myDouble", 1.9);
  savedInstanceState.putInt("MyInt", 1);
  savedInstanceState.putString("MyString", "Welcome back to Android");
  // etc.
}

```

The Bundle is essentially a way of storing a NVP ("Name-Value Pair") map, and it will get passed in to `onCreate()` and also `onRestoreInstanceState()` where you would then extract the values from activity like this:



```
@Override
public void onRestoreInstanceState(Bundle savedInstanceState) {
  super.onRestoreInstanceState(savedInstanceState);
  // Restore UI state from the savedInstanceState.
  // This bundle has also been passed to onCreate.
  boolean myBoolean = savedInstanceState.getBoolean("MyBoolean");
  double myDouble = savedInstanceState.getDouble("myDouble");
  int myInt = savedInstanceState.getInt("MyInt");
  String myString = savedInstanceState.getString("MyString");
}

```

Or from a fragment.



```
@Override
public void onViewStateRestored(@Nullable Bundle savedInstanceState) {
    super.onViewStateRestored(savedInstanceState);
    // Restore UI state from the savedInstanceState.
    // This bundle has also been passed to onCreate.
    boolean myBoolean = savedInstanceState.getBoolean("MyBoolean");
    double myDouble = savedInstanceState.getDouble("myDouble");
    int myInt = savedInstanceState.getInt("MyInt");
    String myString = savedInstanceState.getString("MyString");
}

```

You would usually use this technique to store instance values for your application (selections, unsaved text, etc.).



---

## Notes

- CAREFUL: you need to call  super.onSaveInstanceState(savedInstanceState) before adding your values to the Bundle, or they will get wiped out on that call (Droid X Android 2.2).
- http://developer.android.com/reference/android/app/Activity.html
- That fact effectively makes `onSaveInstanceState` almost useless except just for case of screen orientation changes. I don't understand why they even implemented it like this in the first place. And you can't have that Bundle the system give you to save things into except in this very particular method.
- I cannot seem to get a non-null savedInstanceState.
- Note that saving / restoring UI state to / from the Bundle is *automatically* taken care of *for `View`s that have been assigned ids*. From the `onSaveInstanceState` docs: "The default implementation takes care of most of the UI per-instance state for you by calling `onSaveInstanceState()` on each view in the hierarchy that has an id, and by saving the id of the currently focused view (all of which is restored by the default implementation of `onRestoreInstanceState(Bundle)`)"
-  +1 for mentioning that onSaveInstanceState() is not part of the life cycle.
- This method allows you to restore the form state so the user doesn't start over from scratch
-  looks like you found out [after posting this comment](http://stackoverflow.com/questions/5412746/android-fragment-onrestoreinstancestate) that something equivalent to `onRestoreInstanceState` is also available to Fragments.
- leason1 in android class - implement all lifecycle-"like" methods and use debugger or just plain System.out to check when exactly are those method called. It is essential if you want to build applications for android otherwise your apps will be crashing for no obvious reason but only time to time so you will easily publish it without even noticing it
- If we can recreate what we last had in `onCreate`, when should we use `onRestoreInstanceState`?
-  why wouldn't `onCreate` work for that case? `onCreate` is also called for orientation changes.
-  In [android developer](http://developer.android.com/training/basics/activity-lifecycle/recreating.html) the super.onSaveInstanceState(savedInstanceState)  is called after adding the values in the Bundle.
- I agree with  here is the link for documentation https://developer.android.com/topic/libraries/architecture/
- One more thing to add though: onSaveInstanceState() is not called when the user explicitly closes the activity or in other cases when finish() is called.
- Also, in onSaveInstanceState function, super.onSaveInstanceState(savedInstanceState); should be called in the last, i.e.
