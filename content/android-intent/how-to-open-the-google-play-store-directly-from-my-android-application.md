---
metaTitle: How to open the Google Play Store directly from my Android application
tags:
- google-play
title: How to open the Google Play Store directly from my Android application
---

## Problem

I have open the Google Play store using the following code 



```
Intent i = new Intent(android.content.Intent.ACTION_VIEW);
i.setData(Uri.parse("https://play.google.com/store/apps/details?id=my packagename "));
startActivity(i);.

```

But it shows me a Complete Action View as to select the option (browser/play store). I need to open the application in Play Store directly.



---

## Solution

Go on Android Developer official link as tutorial step by step see and got the code for your application package from play store if exists or play store apps not exists then open application from web browser.


**Android Developer official link**


<https://developer.android.com/distribute/tools/promote/linking.html>


**Linking to a Application Page**


From a web site: `https://play.google.com/store/apps/details?id=<package_name>`


From an Android app: `market://details?id=<package_name>`


**Linking to a Product List**


From a web site: `https://play.google.com/store/search?q=pub:<publisher_name>`


From an Android app: `market://search?q=pub:<publisher_name>`


**Linking to a Search Result**


From a web site: `https://play.google.com/store/search?q=<search_query>&c=apps`


From an Android app: `market://search?q=<seach_query>&c=apps`



---

## Notes

-  I think the point is that it's not listed as a suggestion any more. If you search that page for the word `market` you won't find any solution. I think the new way is to fire off a more generic intent https://developer.android.com/distribute/marketing-tools/linking-to-google-play#android-app . More recent versions of the Play Store app probably have an intent filter for this URI `https://play.google.com/store/apps/details?id=com.example.android`
- Using market:// prefix is not recommended anymore (check the link you posted)
