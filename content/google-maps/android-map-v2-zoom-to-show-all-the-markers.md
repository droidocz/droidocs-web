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


---

## Notes:

- It should be noted that the move cannot happen from the onCreate calls, the view must be created. I needed to use addOnGlobalLayoutListener to get the appropriate sample.


- googleMap
 .setOnMapLoadedCallback(new GoogleMap.OnMapLoadedCallback() {



```
  public void onMapLoaded() {
   googleMap.moveCamera(cu);

  }
 }); This will avoid the error on measure.

```

- To be precise: *some* movement methods won't work right after creating the map object. The reason for this is the map object hasn't been *measured* yet i.e. A typical fix is to use `addOnGlobalLayoutListener()` or `post()` with an appropriate `Runnable`. This is exactly the reason why getting marker screen coordinates can't be done in `onCreate` - see http://stackoverflow.com/q/14429877/1820695 However you *can* use some methods even before layout has happened - eg. `CameraUpdateFactory.newLatLngBounds()` with *4 params*.


- see [here](http://stackoverflow.com/q/14977078/1820695) for ugly workaround. although I once had an idea (which I never tested but you can): you save current map position to `CameraPosition p1`. then you proceed with calculating `CameraUpdate cu` like above and do `map.moveCamera(cu)`. you save current position to `p2` and check if its zoom is out of desired range - if so, you build new `CameraPosition p3` based on `p2` but with zoom corrected and issue `map.moveCamera(p1); map.animateCamera(CameraUpdateFactory.newCameraPosition(p3));` - warning: never tested.


- isnt there a way to set a max limit to the zoom level in map irrespective of the the number of markers?


- 
```
        **Error**`com.google.maps.api.android.lib6.common.apiexception.c: Error using newLatLngBounds(LatLngBounds, int): Map size can't be 0. Most likely, layout has not yet occured for the map view. Either wait until layout has occurred or use newLatLngBounds(LatLngBounds, int, int, int) which allows you to specify the map's dimensions.` How can i solve can you help me please

```

- This code gave me the error: "the size of the map should not be 0". So what I had to do was to set the width and height of the map like this:  

`final int width = getResources().getDisplayMetrics().widthPixels;
final int height = getResources().getDisplayMetrics().heightPixels;
final CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngBounds(latLngBounds, width, height, padding);`.


