---
metaTitle: Android map v2 zoom to show all the markers
tags:
- google-maps-api-2
- google-maps-android-api-2
title: Android map v2 zoom to show all the markers
---

You should use the `CameraUpdate` class to do (probably) all programmatic map movements.


To do this, first calculate the bounds of all the markers like so:



```
LatLngBounds.Builder builder = new LatLngBounds.Builder();
for (Marker marker : markers) {
    builder.include(marker.getPosition());
}
LatLngBounds bounds = builder.build();

```

Then obtain a movement description object by using the factory: `CameraUpdateFactory`:



```
int padding = 0; // offset from edges of the map in pixels
CameraUpdate cu = CameraUpdateFactory.newLatLngBounds(bounds, padding);

```

Finally move the map:



```
googleMap.moveCamera(cu);

```

Or if you want an animation:



```
googleMap.animateCamera(cu);

```

That's all :)


**Clarification 1**


Almost all movement methods require the `Map` object to have passed the layout process. You can wait for this to happen using the `addOnGlobalLayoutListener` construct. Details can be found in comments to this answer and remaining answers. You can also find a [complete code for setting map extent using `addOnGlobalLayoutListener` here](https://stackoverflow.com/q/13692579/1820695).


**Clarification 2**


One comment notes that using this method for only one marker results in map zoom set to a "bizarre" zoom level (which I believe to be maximum zoom level available for given location). I think this is expected because:


1. The `LatLngBounds bounds` instance will have `northeast` property equal to `southwest`, meaning that the portion of area of the earth covered by this `bounds` is exactly zero. (This is logical since a single marker has no area.)
2. By passing `bounds` to `CameraUpdateFactory.newLatLngBounds` you essentially request a calculation of such a zoom level that `bounds` (having zero area) will cover the whole map view.
3. You can actually perform this calculation on a piece of paper. The theoretical zoom level that is the answer is +∞ (positive infinity). In practice the `Map` object doesn't support this value so it is clamped to a more reasonable maximum level allowed for given location.


Another way to put it: how can `Map` object know what zoom level should it choose for a *single location*? Maybe the optimal value should be 20 (if it represents a specific address). Or maybe 11 (if it represents a town). Or maybe 6 (if it represents a country). API isn't that smart and the decision is up to you.


So, you should simply check if `markers` has only one location and if so, use one of:


* `CameraUpdate cu = CameraUpdateFactory.newLatLng(marker.getPosition())` - go to marker position, leave current zoom level intact.
* `CameraUpdate cu = CameraUpdateFactory.newLatLngZoom(marker.getPosition(), 12F)` - go to marker position, set zoom level to arbitrarily chosen value 12.
