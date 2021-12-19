---
metaTitle: Sending an Intent to browser to open specific URL
title: Sending an Intent to browser to open specific URL
---

## Problem

I'm just wondering how to fire up an Intent to the phone's browser to open an specific URL and display it.


Can someone please give me a hint?



---

## Solution

The short version



```
startActivity(new Intent(Intent.ACTION_VIEW, 
    Uri.parse("http://almondmendoza.com/android-applications/")));

```

should work as well...

