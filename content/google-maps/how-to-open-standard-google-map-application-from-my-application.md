---
metaTitle: How to open standard Google Map application from my application
title: How to open standard Google Map application from my application
---

## Context

Once user presses button in my application, I would like to open standard Google Map application and to show particular location. How can I do it? (without using `com.google.android.maps.MapView`)



---

You should create an `Intent` object with a geo-URI:



```
String uri = String.format(Locale.ENGLISH, "geo:%f,%f", latitude, longitude);
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
context.startActivity(intent);

```

If you want to specify an address, you should use another form of geo-URI: `geo:0,0?q=address`.


reference : <https://developer.android.com/guide/components/intents-common.html#Maps>



---

## Notes:

- THis moves me to the location but it does not put a balloon there.


- That method is meant for UI text only, that's why decimal point represenation may vary. Just use the "+" operator or StringBuilder: String uri = "geo:" + lastLocation.getLatitude() + "," + lastLocation.getLongitude().


- For directions, a navigation intent is now supported with google.navigation:q=latitude,longitude: 


Uri gmmIntentUri = Uri.parse("google.navigation:q=" + 12f " +"," + 2f);
Intent mapIntent = new Intent(Intent.ACTION\_VIEW, gmmIntentUri);
mapIntent.setPackage("com.google.android.apps.maps");
startActivity(mapIntent);


- `String.format("geo:%f,%f", latitude, longitude)` returned the string with commas: `geo:59,915494,30,409456`.


- but how to show pinpoint in maps application


- I think you can use this solution: http://stackoverflow.com/a/2663565/170842


- What is the format of latitude and longitude? If I pass `lat: 59.915494, lng: 30.409456` it returns wrong position.


- maps.google.com shows correct location, but when the same URI is used in android app, it shows some different place.


- Maybe you should also try to download other map applications and launch them with this URI.


- The URI must be: `geo:59.915494,30.409456`. You can check it using http://maps.google.com. Just enter `59.915494,30.409456` and you will get the right place.


- any method to show a pin in google maps?


- is there any way to launch this navigation without using ACTION\_VIEW, i want to launch this in my custom layout?


- If you need it in a custom layout you should use Maps API.


