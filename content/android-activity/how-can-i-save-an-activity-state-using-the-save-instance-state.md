---
metaTitle: How can I save an activity state using the save instance state
tags:
- application-state
title: How can I save an activity state using the save instance state
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

