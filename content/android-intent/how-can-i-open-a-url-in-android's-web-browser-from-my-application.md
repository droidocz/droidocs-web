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



---

## Notes

- `if (!url.startsWith("http://") && !url.startsWith("https://"))` is a common error which may lead you to urls like http://file:/// and break some good usecases.
- You need null check with [`resolveCheck`](https://developer.android.com/intl/ja/reference/android/content/Intent.html#resolveActivity(android.content.pm.PackageManager)). See the [offical docs](https://developer.android.com/intl/ja/guide/components/intents-common.html) : **Caution: If there are no apps on the device that can receive the implicit intent, your app will crash when it calls startActivity(). To first verify that an app exists to receive the intent, call resolveActivity() on your Intent object.
- URLUtil is a great way to check on user entered "url" Strings
- The URL is entered by the user, is there a way to automatically format?
- Except that your code and mbaird's aren't the same, from what I can tell for what's posted. Ensure that your URL has the `http://` scheme -- the exception shown suggests that your URL is lacking the scheme.
- User Apache UrlValidator for such operations: `UrlValidator.getInstance().isValid(url)`
- Encode the Query String 
  If any special characters or spaces. then It will work awesome.For Example :
   String query="For martin Luther King";
  query=URLEncoder.encode(query);
  String url="http://en.wikipedia.org/wiki/Special:Search?search="+query;
  Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
  startActivity(browserIntent);
- This wouldn't break file:// and others
- i splecial like if (!url.startsWith("http://") && !url.startsWith("https://"))
   url = "http://" + url;
- how i can use it without deep links variants on my app?
- **com.android.chrome E/chromium: [ERROR:layer_tree_host_impl.cc(2206)] Forcing zero-copy tile initialization as worker context is missing**
- When use Linkfy it is not nessesary to normalize url.
- It needed another ')' after '("http://www.google.com")', but other than that it worked.
