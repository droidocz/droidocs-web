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

The `savedInstanceState` is only for saving state associated with a current instance of an Activity, for example current navigation or selection info, so that if Android destroys and recreates an Activity, it can come back as it was before. See the documentation for [`onCreate`](http://developer.android.com/reference/android/app/Activity.html#onCreate(android.os.Bundle)) and [`onSaveInstanceState`](http://developer.android.com/reference/android/app/Activity.html#onSaveInstanceState(android.os.Bundle))


For more long lived state, consider using a SQLite database, a file, or preferences. See [Saving Persistent State](http://developer.android.com/reference/android/app/Activity.html#SavingPersistentState).



---

## Notes

- ... which raises the question of *when* does the system need to create a new instance of Activity. Some ways of exiting an app don't create a bundle, so a new instance must be created. This is the fundamental problem; it means one cannot *rely* on existence of bundle, and must do some alternative means of persistent storage.
- savedInstanceState is null when the system is creating a new instance of your Activity and not null when it's restoring.
