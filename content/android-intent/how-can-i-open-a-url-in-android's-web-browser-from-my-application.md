---
metaTitle: How can I open a URL in Android's web browser from my application
tags:
- url
- android-browser
title: How can I open a URL in Android's web browser from my application
---

Try this:



```
Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com"));
startActivity(browserIntent);

```

That works fine for me.


As for the missing "http://" I'd just do something like this:



```
if (!url.startsWith("http://") && !url.startsWith("https://"))
   url = "http://" + url;

```

I would also probably pre-populate your EditText that the user is typing a URL in with "http://".

