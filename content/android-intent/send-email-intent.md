---
metaTitle: Send Email Intent
tags:
- email
title: Send Email Intent
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
