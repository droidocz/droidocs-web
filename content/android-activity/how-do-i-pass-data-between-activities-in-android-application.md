---
metaTitle: How do I pass data between Activities in Android application
tags:
- android-intent
title: How do I pass data between Activities in Android application
---

## Context

I have a scenario where, after logging in through a login page, there will be a sign-out `button` on each `activity`.


On clicking `sign-out`, I will be passing the `session id` of the signed in user to sign-out. Can anyone guide me on how to keep `session id` available to all `activities`?


Any alternative to this case 



---

In your current Activity, create a new `Intent`:



```
String value="Hello world";
Intent i = new Intent(CurrentActivity.this, NewActivity.class);    
i.putExtra("key",value);
startActivity(i);

```

Then in the new Activity, retrieve those values:



```
Bundle extras = getIntent().getExtras();
if (extras != null) {
    String value = extras.getString("key");
    //The key argument here must match that used in the other activity
}

```

Use this technique to pass variables from one Activity to the other.



---

## Notes

- Just an info for those who are so blind like me: if you put an integer in your current activity, you have to get it in the new one via `extras.getInt("new_variable_name")`. If you try to get it via `getString()` android see's that a int was given and returns null!
- what if the activity is already running, is there need to do `startActivity(i);` ? I mean, can I make *activity A* call *activity B*, and that returns data to *activity A* ?
- Here's a [nice example that sets and retrieves intent extras](http://www.codota.com/android/scenarios/52fcbcffda0ace249b7bce8e/android.content.Intent?tag=dragonfly)
- I prefer string variable. You can always convert a string to integer or float later.
