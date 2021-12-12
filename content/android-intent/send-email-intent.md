---
metaTitle: Send Email Intent
tags:
- email
title: Send Email Intent
---

## Context


```
Intent intent = new Intent(Intent.ACTION_SEND);
intent.setType("text/html");
intent.putExtra(Intent.EXTRA_EMAIL, "emailaddress@emailaddress.com");
intent.putExtra(Intent.EXTRA_SUBJECT, "Subject");
intent.putExtra(Intent.EXTRA_TEXT, "I'm email body.");

startActivity(Intent.createChooser(intent, "Send Email"));

```

The above code opens a dialog showing following apps:- Bluetooth, Google Docs, Yahoo Mail, Gmail, Orkut, Skype etc.


Actually, I want to filter these list-options. I want to show only email related apps e.g. Gmail, Yahoo Mail. How to do it?


I've seen such example on 'Android Market' application. 


1. Open Android Market app
2. Open any application where developer has specified his/her email address. (If you can't find such app just open my app:- market://details?id=com.becomputer06.vehicle.diary.free , OR search by 'Vehicle Diary')
3. Scroll down to 'DEVELOPER'
4. Click on 'Send Email'


The dialog shows only email Apps e.g. Gmail, Yahoo Mail etc. It does not show Bluetooth, Orkut etc. What code produces such dialog?



---

A late answer, although I figured out a solution which could help others:


Java version
------------



```
Intent emailIntent = new Intent(Intent.ACTION_SENDTO);
emailIntent.setData(Uri.parse("mailto:abc@xyz.com"));
startActivity(Intent.createChooser(emailIntent, "Send feedback"));

```

  

Kotlin version
--------------



```
val emailIntent = Intent(Intent.ACTION_SENDTO).apply { 
    data = Uri.parse("mailto:abc@xyz.com")
}
startActivity(Intent.createChooser(emailIntent, "Send feedback"))

```

  

This was my output (only Gmail + Inbox suggested):


[![my output](https://i.stack.imgur.com/js4Kw.png)](https://i.stack.imgur.com/js4Kw.png)


I got this solution from the [Android Developers](https://developer.android.com/guide/components/intents-common.html#Email) site.



---

## Notes

- For me it was important that there is no space between `mailto` and the email: `mailto:abc
