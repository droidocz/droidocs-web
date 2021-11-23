---
metaTitle: How do I pass data between Activities in Android application
tags:
- android-intent
title: How do I pass data between Activities in Android application
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

