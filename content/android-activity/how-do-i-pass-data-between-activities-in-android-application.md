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

The easiest way to do this would be to pass the session id to the signout activity in the `Intent` you're using to start the activity:



```
Intent intent = new Intent(getBaseContext(), SignoutActivity.class);
intent.putExtra("EXTRA_SESSION_ID", sessionId);
startActivity(intent);

```

Access that intent on next activity:



```
String sessionId = getIntent().getStringExtra("EXTRA_SESSION_ID");

```

The [docs](http://developer.android.com/guide/topics/intents/intents-filters.html) for Intents has more information (look at the section titled "Extras").

