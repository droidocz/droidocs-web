---
metaTitle: Android - Showing Phonebook contacts and selecting one
tags:
- android-layout
- android-intent
title: Android - Showing Phonebook contacts and selecting one
---

## Problem

I want to show the list of contacts in phonebook on a click of a button and then select one of the contacts from it and then retrieve its contact number? I dont want to make my custom list, is there a way to use androids built in functionality?



---

## Solution


```
Intent i=new Intent(Intent.ACTION_PICK, ContactsContract.Contacts.CONTENT_URI);

startActivityForResult(i, PICK_REQUEST);

```

The `Intent` delivered to your `onActivityResult()` method will contain the `Uri` of the chosen contact -- you will get this by calling `getData()` on that `Intent`.


[Here is a sample project](https://github.com/commonsguy/cw-omnibus/tree/master/ConfigChange/Fragments) that demonstrates this, with the logic being implemented in a retained fragment, so we hang onto the selected contact across configuration changes (e.g., user rotating the screen).


You can also use `ACTION_GET_CONTENT` for this, and I think that's the more modern pattern, though `ACTION_PICK` certainly works and is all I have sample code for at the time of this writing. If you are reading this in the future (hi, future!), it's possible that the linked-to sample has been updated to use `ACTION_GET_CONTENT`.

