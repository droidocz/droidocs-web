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



---

## Notes:

- Yes, you'd have to make the session ID available to every activity where you want to allow the user to signout. Alternatively, you could store it in the Application object, but then you'd have to manage the state of the session (check if it's valid before using, etc).


- Please be aware that the documentation points the following: Add extended data to the intent. The name must include a package prefix, for example the app com.android.contacts would use names like "com.android.contacts.ShowAll".


- And to read data from other Activity use `Long session_ids=getIntent().getExtras().getLong("EXTRA_SESSION_IDS");`


- How can we pass data using `setData` and what is difference between theses two approaches?


- Use Wagon. It makes it simpler: github.com/beplaya/Wagon


- using above procedure?


- does this work if the target activity already runs in background? my onresume function olds alwas just the first intend


- Be aware of TransactionTooLargeException , if your data exceeds 1 mb size then it will throw exception. So take care while sending complete list.


- we can send data with multiple way like 
1- Intent


- Take a look at this library for easy handling intent data: https://github.com/kostasdrakonakis/android\_navigator


