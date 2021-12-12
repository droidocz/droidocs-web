---
metaTitle: How to emulate GPS location in the Android Emulator
tags:
- testing
- geolocation
title: How to emulate GPS location in the Android Emulator
---

## Context

I want to get longitude and latitude in Android emulator for testing.


Can any one guide me how to achieve this?


How do I set the location of the emulator to a test position?



---

Assuming you've got a mapview set up and running:



```
MapView mapView = (MapView) findViewById(R.id.mapview);
final MyLocationOverlay myLocation = new MyLocationOverlay(this, mapView);

mapView.getOverlays().add(myLocation);
myLocation.enableMyLocation();

myLocation.runOnFirstFix(new Runnable() {
    public void run() {
        GeoPoint pt = myLocation.getMyLocation();
    }
});

```

You'll need the following permission in your manifest:



```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>

```

And to send mock coordinates to the emulator from Eclipse, Go to the "Window" menu, select "Show View" > "Other" > "Emulator control", and you can send coordinates from the emulator control pane that appears.



---

## Notes

- i have tried using this ans sending mock values to emulator control but when i press send button it does not do any thing no message nothing appears to confirm values sent or not. seocnd thing GeoPoint g=     myLocation.getMyLocation();
is returning null value.
- Are you sure that you're using it within `runOnFirstFix`? Because that's the event that's raised when the device first receives GPS position, so if that's ever raised, `getMyLocation` should definitely return a value.
