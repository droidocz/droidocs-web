---
metaTitle: How to start new activity on button click
tags:
- android-intent
- android-button
- android-lifecycle
title: How to start new activity on button click
---

## Context

In an Android application, how do you start a new activity (GUI) when a button in another activity is clicked, and how do you pass data between these two activities?



---

Easy.



```
Intent myIntent = new Intent(CurrentActivity.this, NextActivity.class);
myIntent.putExtra("key", value); //Optional parameters
CurrentActivity.this.startActivity(myIntent);

```

Extras are retrieved on the other side via:



```
@Override
protected void onCreate(Bundle savedInstanceState) {
    Intent intent = getIntent();
    String value = intent.getStringExtra("key"); //if it's a string you stored.
}

```

Don't forget to add your new activity in the AndroidManifest.xml:



```
<activity android:label="@string/app_name" android:name="NextActivity"/>

```
