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

