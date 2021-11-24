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

**UPDATE**


Official approach:



```
public void composeEmail(String[] addresses, String subject) {
    Intent intent = new Intent(Intent.ACTION_SENDTO);
    intent.setData(Uri.parse("mailto:")); // only email apps should handle this
    intent.putExtra(Intent.EXTRA_EMAIL, addresses);
    intent.putExtra(Intent.EXTRA_SUBJECT, subject);
    if (intent.resolveActivity(getPackageManager()) != null) {
        startActivity(intent);
    }
}

```

[Ref link](https://developer.android.com/guide/components/intents-common.html#Email)


**OLD ANSWER**


The accepted answer doesn't work on the 4.1.2. This should work on all platforms:



```
Intent emailIntent = new Intent(Intent.ACTION_SENDTO, Uri.fromParts(
            "mailto","abc@gmail.com", null));
emailIntent.putExtra(Intent.EXTRA_SUBJECT, "Subject");
emailIntent.putExtra(Intent.EXTRA_TEXT, "Body");
startActivity(Intent.createChooser(emailIntent, "Send email..."));

```

Update: According to [marcwjj](https://stackoverflow.com/users/1446995/marcwjj), it seems that on 4.3, we need to pass string array instead of a string for email address to make it work. We might need to add one more line:



```
intent.putExtra(Intent.EXTRA_EMAIL, addresses); // String[] addresses

```
