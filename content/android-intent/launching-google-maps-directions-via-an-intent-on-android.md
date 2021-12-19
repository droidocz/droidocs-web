---
metaTitle: Launching Google Maps Directions via an intent on Android
tags:
- java
- google-maps
title: Launching Google Maps Directions via an intent on Android
---

## Problem

My app needs to show Google Maps directions from A to B, but I don't want to put the Google Maps into my application - instead, I want to launch it using an Intent. Is this possible? If yes, how?



---

## Solution

Using the latest **cross-platform Google Maps URLs**:
Even if google maps app is missing it will open in browser


Example <https://www.google.com/maps/dir/?api=1&origin=81.23444,67.0000&destination=80.252059,13.060604>



```
Uri.Builder builder = new Uri.Builder();
builder.scheme("https")
    .authority("www.google.com")
    .appendPath("maps")
    .appendPath("dir")
    .appendPath("")
    .appendQueryParameter("api", "1")
    .appendQueryParameter("destination", 80.00023 + "," + 13.0783);
String url = builder.build().toString();
Log.d("Directions", url);
Intent i = new Intent(Intent.ACTION_VIEW);
i.setData(Uri.parse(url));
startActivity(i);

```
