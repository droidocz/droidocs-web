---
metaTitle: Android Google Maps API V2 Zoom to Current Location
tags:
- location
- google-maps-android-api-2
title: Android Google Maps API V2 Zoom to Current Location
---

## Context

I'm trying to mess around with the Maps API V2 to get more familiar with it, and I'm trying to start the map centered at the user's current location. Using the `map.setMyLocationEnabled(true);` statement, I am able to show my current location on the map. This also adds the button to the UI that centers the map on my current location.


I want to simulate that button press in my code. I am familiar with the `LocationManager` and `LocationListener` classes and realize that using those is a viable alternative, but the functionality to center and zoom in on the user's location seems to already be built in through the button.


If the API has a method to show the user's current location, there surely must be an easier way to center on the location than to use the `LocationManager`/`LocationListener` classes, right?



---

Try this coding:



```
LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
Criteria criteria = new Criteria();

Location location = locationManager.getLastKnownLocation(locationManager.getBestProvider(criteria, false));
if (location != null)
{
    map.animateCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(location.getLatitude(), location.getLongitude()), 13));

    CameraPosition cameraPosition = new CameraPosition.Builder()
        .target(new LatLng(location.getLatitude(), location.getLongitude()))      // Sets the center of the map to location user
        .zoom(17)                   // Sets the zoom
        .bearing(90)                // Sets the orientation of the camera to east
        .tilt(40)                   // Sets the tilt of the camera to 30 degrees
        .build();                   // Creates a CameraPosition from the builder
    map.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));       
}

```


---

## Notes

- `The Google Play services location APIs are preferred over the Android framework location APIs (android.location) as a way of adding location awareness to your app.` This method is old. Please check https://developer.android.com/training/location/index.html
- It uses the above method with a little fail safe to check the next best possible location of the user. http://stackoverflow.com/a/14511032/845038 That might remedy getting a null by checking the next best location.
