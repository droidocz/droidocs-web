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

Here's how to do it inside `ViewModel` and `FusedLocationProviderClient`, code in Kotlin



```
locationClient.lastLocation.addOnSuccessListener { location: Location? ->
            location?.let {
                val position = CameraPosition.Builder()
                        .target(LatLng(it.latitude, it.longitude))
                        .zoom(15.0f)
                        .build()
                map.animateCamera(CameraUpdateFactory.newCameraPosition(position))
            }
        }

```


---

## Notes

- Chainging multiple items like `locationClient.lastLocation.addOnSuccessListener{}`?
