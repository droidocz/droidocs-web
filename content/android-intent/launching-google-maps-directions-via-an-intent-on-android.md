---
metaTitle: Launching Google Maps Directions via an intent on Android
tags:
- java
- google-maps
title: Launching Google Maps Directions via an intent on Android
---

## Context

My app needs to show Google Maps directions from A to B, but I don't want to put the Google Maps into my application - instead, I want to launch it using an Intent. Is this possible? If yes, how?



---

**Open Google Maps using Intent with different Modes:**


We can open Google Maps app using intent:



```
val gmmIntentUri = Uri.parse("google.navigation:q="+destintationLatitude+","+destintationLongitude + "&mode=b")
val mapIntent = Intent(Intent.ACTION_VIEW, gmmIntentUri)
mapIntent.setPackage("com.google.android.apps.maps")
startActivity(mapIntent)

```

Here, "mode=b" is for bicycle.


We can set driving, walking, and bicycling mode by using:


* d for driving
* w for walking
* b for bicycling


You can find more about intent with google maps [here](https://developers.google.com/maps/documentation/urls/android-intents).


Note: If there is no route for the bicycle/car/walk then it will show you "Can't find the way there"


You can check my original answer [here](https://stackoverflow.com/a/53264392/2024527).

