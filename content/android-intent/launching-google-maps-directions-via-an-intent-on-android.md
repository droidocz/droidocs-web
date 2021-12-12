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

You could use something like this:



```
Intent intent = new Intent(android.content.Intent.ACTION_VIEW, 
    Uri.parse("http://maps.google.com/maps?saddr=20.344,34.34&daddr=20.5666,45.345"));
startActivity(intent);

```

To start the navigation from the current location, remove the `saddr` parameter and value.


You can use an actual street address instead of latitude and longitude. However this will give the user a dialog to choose between opening it via browser or Google Maps.


This will fire up Google Maps in navigation mode directly:



```
Intent intent = new Intent(android.content.Intent.ACTION_VIEW,
    Uri.parse("google.navigation:q=an+address+city"));

```

**UPDATE**


In May 2017 Google launched the new API for universal, cross-platform Google Maps URLs:


<https://developers.google.com/maps/documentation/urls/guide>


You can use Intents with the new API as well.



---

## Notes

- If you want to get rid of the dialog you can give the intent a hint as to which package you want to use. Before the startActivity() add this:

`intent.setClassName("com.google.android.apps.maps", "com.google.android.maps.MapsActivity");`
- Forcing the user into a specific activity when they may have other apps they prefer seems contrary to the bolt it together Android spirit to me.
- Navigation intents seem to be officially supported now: https://developers.google.com/maps/documentation/android/intents#launch_turn-by-turn_navigation
- However, there won't be any dialog if the user has already chosen the default app to open this type of intents to be the map app.
- Does uber or ola uses same technique for directions?
- Google Maps URL works on iOS but not on Android for me, on Android, it just opens the google maps in browser.
- is it possible to show names for the start and end locations?
- How can we use features like "Avoid Highways, Tolls" using the universal URL?
- Is there any limited number to launch the Google Maps App via this mentioned intent ?
- When pressing back button from maps app,there shows a black screen and underlying activity is recreated.Any idea how to fix this?
- When I press the back button from Navigation View that goes to map activity and then come back to my application. I want to single back to my activity from Navigation view when i press  back.
- I found error with that code
"Unable to find explicit activity class {com.google.android.apps.maps/com.google.android.maps.MapsActivity}; have you declared this activity in your AndroidManifest.xml?"
- is there a way to add multiple points by using
"google.navigation:q=lat1,lng1;lat2,lng2" I tried this on the destination location but it concatenates all the lat,lng pairs and shows a Error icon, I cant find google api support for multiple destinations
- Is there any way to Open polyline or List of Lat/Long in Google Map via Intent,
