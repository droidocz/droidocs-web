---
metaTitle: Launch custom android application from android browser
tags:
- intentfilter
title: Launch custom android application from android browser
---

## Context

Can anybody please guide me regarding how to launch my android application from the android browser? 



---

Use an [`<intent-filter>`](http://developer.android.com/guide/topics/manifest/intent-filter-element.html) with a [`<data>`](http://developer.android.com/guide/topics/manifest/data-element.html) element. For example, to handle all links to twitter.com, you'd put this inside your `<activity>` in your `AndroidManifest.xml`:



```
<intent-filter>
    <data android:scheme="http" android:host="twitter.com"/>
    <action android:name="android.intent.action.VIEW" />
</intent-filter>

```

Then, when the user clicks on a link to twitter in the browser, they will be asked what application to use in order to complete the action: the browser or your application.


Of course, if you want to provide tight integration between your website and your app, you can define your own scheme:



```
<intent-filter>
    <data android:scheme="my.special.scheme" />
    <action android:name="android.intent.action.VIEW" />
</intent-filter>

```

Then, in your web app you can put links like:



```
<a href="my.special.scheme://other/parameters/here">

```

And when the user clicks it, your app will be launched automatically (because it will probably be the only one that can handle `my.special.scheme://` type of uris). The only downside to this is that if the user doesn't have the app installed, they'll get a nasty error. And I'm not sure there's any way to check.




---


**Edit:** To answer your question, you can use `getIntent().getData()` which returns a [`Uri`](http://d.android.com/reference/android/net/Uri.html) object. You can then use `Uri.*` methods to extract the data you need. For example, let's say the user clicked on a link to `http://twitter.com/status/1234`:



```
Uri data = getIntent().getData();
String scheme = data.getScheme(); // "http"
String host = data.getHost(); // "twitter.com"
List<String> params = data.getPathSegments();
String first = params.get(0); // "status"
String second = params.get(1); // "1234"

```

You can do the above anywhere in your `Activity`, but you're probably going to want to do it in `onCreate()`. You can also use `params.size()` to get the number of path segments in the `Uri`. Look to javadoc or the android developer website for other `Uri` methods you can use to extract specific parts.



---

## Notes

- Anyone who, like me, is unable to get this scheme work, needs to add `android:exported="true"` to their `Activity` in manifest. Check this answer http://stackoverflow.com/a/13044911/1276636
- Not sure how this is working for the entire world. Just doesn't work on chrome and it always opens the link in browser until you place the "android:pathPrefix" element. If it still doesn't work for someone, refer this please: http://stackoverflow.com/a/21727055/2695276

PS: struggled for days over this.
- It should be noted that functionality changed since Chrome version 25. Refer to [this page](https://developer.chrome.com/multidevice/android/intents) for details about the new approach.
- **But**, you can add data to your url, as GET parameters.
-  this does not works on android lollipop until your scheme is http or https... and if it is so, it launches the default app(browser) and shows nothing, my app never runs :/
- host not important, so you can dont set it.
- how can I apply this to a mobile hybrid app built on html5, css3 and javascript only which I use web marmalade to compile?
- I have one downside, if i open the app without clicking a link ... nullpointerexception ... so i tried to make a check if the data is null then don't try to fetch data but that doesn't work either.
- Note that there is now an in-built editor available for Android Studio https://developer.android.com/studio/write/app-link-indexing.html
-  check out [getIntent()](https://developer.android.com/reference/android/app/Activity.html#getIntent()), [getData()](https://developer.android.com/reference/android/content/Intent.html#getData()) and the [Uri object](https://developer.android.com/reference/android/net/Uri.html).
-  - How do you parse parameters if passed with the uri - such as www.blablabal.com/mycode.aspx?gameid=1232323   ?
- is that really better to put it in onCreate than in onResume OR in onNewIntent when the activity uses the singleTop launchMode ?
-  i have similar issue http://stackoverflow.com/questions/35716173/how-to-open-application-on-click-of-confrimation-link
-   In click of URL i am get the JSON object in which i will get   (MyApp://?screen=upgrade)  so in manifest file i have to write only &lt;data android:scheme="MyApp"
              android:host="screen=upgrade" /&gt; plz help me out
- Would it be possible to intercept the posted data and not only the URL?
-   sorry for above comment just want to ask In click of URL server will redirect me to these URL  (MyApp://?screen=upgrade)  so in manifest file i have to write only &lt;data android:scheme="MyApp"
              android:host="screen=upgrade" /&gt; plz help me out
