---
metaTitle: Sending an Intent to browser to open specific URL
title: Sending an Intent to browser to open specific URL
---

## Context

I'm just wondering how to fire up an Intent to the phone's browser to open an specific URL and display it.


Can someone please give me a hint?



---

To open a URL/website you do the following:



```
String url = "http://www.example.com";
Intent i = new Intent(Intent.ACTION_VIEW);
i.setData(Uri.parse(url));
startActivity(i);

```

Here's the [documentation of `Intent.ACTION_VIEW`](http://developer.android.com/reference/android/content/Intent.html#ACTION_VIEW).




---


Source: [Opening a URL in Android's web browser from within application](http://programming.guide/java/open-url-in-androids-web-browser.html)

