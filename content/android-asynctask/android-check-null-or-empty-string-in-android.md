---
metaTitle: Android check null or empty string in Android
tags:
- android-fragmentactivity
title: Android check null or empty string in Android
---

### Use [`TextUtils.isEmpty( someString )`](https://developer.android.com/reference/android/text/TextUtils.html#isEmpty(java.lang.CharSequence))



```
String myString = null;

if (TextUtils.isEmpty(myString)) {
    return; // or break, continue, throw
}

// myString is neither null nor empty if this point is reached
Log.i("TAG", myString);

```

**Notes**


* The [documentation](https://developer.android.com/reference/android/text/TextUtils.html#isEmpty(java.lang.CharSequence)) states that both null and zero length are checked for. No need to reinvent the wheel here.
* A good practice to follow is [early return](https://softwareengineering.stackexchange.com/a/18473/186547).
