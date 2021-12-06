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


---

## Notes:

- (button click → transition to next activity)
- Is there any difference between `CurrentActivity.this.startActivity(myIntent)` and `startActivity(myIntent)`?
- There is more codemissing than code actually typed. Where is all xml interface and .java code missing?
- http://stackoverflow.com/a/7722428/442512
- It is also good to mention that you can also use CurrentActivity.this.finish(); at the end. Sometimes you don't want the user to end up on some error related activity when you redirected him and he presses the back button. What Finish() method does is that it destroys the current activity.
