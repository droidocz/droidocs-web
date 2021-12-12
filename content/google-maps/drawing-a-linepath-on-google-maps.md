---
metaTitle: Drawing a line/path on Google Maps
tags:
- overlay
- android-mapview
- draw
title: Drawing a line/path on Google Maps
---

## Context

I've been busy for a long time finding out how to draw a line between two (GPS) points on the map in HelloMapView but with no luck.


Could anyone please tell me how to do so.


Suppose I use the HelloMapView which extends MapView. Do I need to use overlays? If so do I have to override the onDraw() method of the overlay and draw a line here? I actually tried these things but with no result.


Thank you in advance!



---

For those who *really only* want to draw a simple line - there is indeed also the short short version.



```
GoogleMap map;
// ... get a map.
// Add a thin red line from London to New York.
Polyline line = map.addPolyline(new PolylineOptions()
    .add(new LatLng(51.5, -0.1), new LatLng(40.7, -74.0))
    .width(5)
    .color(Color.RED));

```

from <https://developers.google.com/maps/documentation/android/reference/com/google/android/gms/maps/model/Polyline>



---

## Notes

- But if we need to et shortest path how can implement it?
- Needs to be there and is useful to know because if you want to have only one at the same time you need to remove the previously created one.
