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



---

## Notes

- In production level code, you may like to check if the url begins with `http` or `https`... Would be better to check `if (!url.startsWith("http://") && !url.startsWith("https://"))
 url = "http://" + url;`
- Funny thing here is that startActivity(i) line could produce ActivityNotFound exception so I go for wrap this line in try/catch block to prevent app crash. This could happen if really no browser app installed on target device (yeah, shoot happens) also it could be that your app was forbidden to start a browser using restrict profiles.
- To first verify that an app exists to receive the intent, call resolveActivity() on your Intent object. If the result is non-null, there is at least one app that can handle the intent and it's safe to call startActivity(). If the result is null, you should not use the intent and, if possible, you should disable the feature that invokes the intent.
- Encode the Query String 
  If any special characters or spaces. then It will work awesome.For Example :
   String query="For martin Luther King";
  query=URLEncoder.encode(query);
  String url="http://en.wikipedia.org/wiki/Special:Search?search="+query;
  Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
  startActivity(browserIntent);
-  The question was about sending a Intent to open the Browser, not about parsing the URL. If the URL is hardcoded, you wouldn't check for http(s), would you? So your argument to invalue the answer is simply invalid, and i do not understand why it has so many upvotes. Funniest thing is, no answer provided states that startActivity can only be called inside certain places, if someone wants to know that, he has to look it up in the docs - but if he wants to parse the URL, he just has to look at the comments.
- how about choosing the browser option if we have many items selected? is it possible to choose the 1st list after calling this code?
