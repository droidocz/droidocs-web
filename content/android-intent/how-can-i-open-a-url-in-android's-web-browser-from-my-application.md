---
metaTitle: How can I open a URL in Android's web browser from my application
tags:
- url
- android-browser
title: How can I open a URL in Android's web browser from my application
---

## Context

How to open an URL from code in the built-in web browser rather than within my application?


I tried this: 



```
try {
    Intent myIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(download_link));
    startActivity(myIntent);
} catch (ActivityNotFoundException e) {
    Toast.makeText(this, "No application can handle this request."
        + " Please install a webbrowser",  Toast.LENGTH_LONG).show();
    e.printStackTrace();
}

```

but I got an Exception:



```
No activity found to handle Intent{action=android.intent.action.VIEW data =www.google.com

```


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

