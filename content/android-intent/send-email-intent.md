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


---

## Notes:

- Please check out the official Android doc on sending email as intent, which works perfectly: https://developer.android.com/guide/components/intents-common.html#Email


- If you don't have a specific recipient, this also works: `Uri.fromParts("mailto", "", null)`


- Someone below mentioned that specifying the "mailto" part is what narrows the available options to email clients. Using Uri.fromParts("mailto", "", null) will put the cursor in the recipient field - perfect for what I needed.


- In some circumstances, this caused an exception: "Calling startActivity() from outside of an Activity context requires the FLAG\_ACTIVITY\_NEW\_TASK flag. To fix that, at least this works:
`Intent chooser = Intent.createChooser(emailIntent, "Send email...");
chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
startActivity(chooser);`


- You shouldn't create a chooser if you want the user to send the email directly to an email address of your choice. [Ref](https://developer.android.com/reference/android/content/Intent.html#ACTION_CHOOSER) Instead you should just do `startActivity(emailIntent)`


- — with this code, **subject & body are lost**. Right now, the best way seems to be Approach 2 from here: https://medium.com/better-programming/the-imperfect-android-send-email-action-59610dfd1c2d


- You can try i.putExtra(Intent.EXTRA\_STREAM, Uri.fromFile(pic)) and i.setType("image/png"), but you need to check on several OS versions as I had problem with attaching txt files, it worked on a version of OS, but would be different on the others


- `intent.resolveActivity()` gives warning see here: https://developer.android.com/training/package-visibility


- Keep in mind that the EXTRA\_EMAIL should allways be a String array, not a String with one address because that will be ignored.


- This one worked with every app I tested https://stackoverflow.com/a/17886006/1329901


