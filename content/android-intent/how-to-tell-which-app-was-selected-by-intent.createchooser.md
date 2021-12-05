---
metaTitle: How to tell which app was selected by Intent.createChooser
title: How to tell which app was selected by Intent.createChooser
---

## Context

Code:



```
Intent launchIntent = new Intent(Intent.ACTION_MAIN);
launchIntent.addCategory(Intent.CATEGORY_HOME);
Intent chooser = Intent.createChooser(launchIntent, "Complete Action using..");
activity.startActivity(chooser);

```

I don't see any way to tell which Intent (HOME category launcher) was selected. There is no Intent.addOnActionSetListener, and no chooser.addOnIntentChosenListener etc. 


So how can I tell which was selected? Do I have to write my own chooser for this?



---

On Android 5.1+, you can use [the three-parameter edition of the `createChooser()` method](https://developer.android.com/reference/android/content/Intent.html#createChooser(android.content.Intent,%20java.lang.CharSequence,%20android.content.IntentSender)), where the last parameter is an [`IntentSender`](https://developer.android.com/reference/android/content/IntentSender.html) that you can use to find out what was chosen.


Prior to Android 5.1, there is nothing in Android to let you know what the user chose.



---

## Notes:

- Do you have a code sample of how to create the `IntentSender` and how to read out the chosen app?


- So the only way to make it work on 4.4 is to use a packageManager instance to list all apps in a given category, and then create my own selection dialog?


- see https://stackoverflow.com/a/30693465/2937955 for code sample (and don't forget to read comment in that answer about completing the manifest...)


