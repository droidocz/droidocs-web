---
metaTitle: Android map v2 zoom to show all the markers
tags:
- google-maps-api-2
- google-maps-android-api-2
title: Android map v2 zoom to show all the markers
---

## Context

I have 10 markers in the `GoogleMap`. I want to zoom in as much as possible and keep all markers in view? In the earlier version this can be achieved from `zoomToSpan()` but in v2 I have no idea how about doing that. Further, I know the radius of the circle that needs to be visible.



---

### Google Map V2


The following solution works for Android Marshmallow 6 (API 23, API 24, API 25, API 26, API 27, API 28). It also works in Xamarin.



```
LatLngBounds.Builder builder = new LatLngBounds.Builder();

//the include method will calculate the min and max bound.
builder.include(marker1.getPosition());
builder.include(marker2.getPosition());
builder.include(marker3.getPosition());
builder.include(marker4.getPosition());

LatLngBounds bounds = builder.build();

int width = getResources().getDisplayMetrics().widthPixels;
int height = getResources().getDisplayMetrics().heightPixels;
int padding = (int) (width * 0.10); // offset from edges of the map 10% of screen

CameraUpdate cu = CameraUpdateFactory.newLatLngBounds(bounds, width, height, padding);

mMap.animateCamera(cu);

```


---

## Notes

- For better-looking padding, use height instead of width and take 20% instead of 10% of it.
