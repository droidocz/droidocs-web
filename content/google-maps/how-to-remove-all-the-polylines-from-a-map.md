---
metaTitle: How to remove all the polylines from a map
tags:
- google-maps-android-api-2
title: How to remove all the polylines from a map
---

## Context

Following


[How to draw a path between two markers](https://stackoverflow.com/questions/14702621/answer-draw-path-between-two-points-using-google-maps-android-api-v2)


I had to add lot of polylines between two markers, to make a path.


One of the markers is draggable, lets say source is draggable.


So, when user starts dragging the marker, the path previously drawn must be erased and a new path between new source and destination must be draw.


I am able to draw the new path, but how can i erase the previous path?


This is how the path is drawn:



```
    for (int z = 0; z < list.size() - 1; z++) {
        LatLng src = list.get(z);
        LatLng dest = list.get(z + 1);
        Polyline line = map.addPolyline(new PolylineOptions()
                .add(new LatLng(src.latitude, src.longitude),
                        new LatLng(dest.latitude, dest.longitude))
                .width(2).color(Color.RED).geodesic(true));
    }

```

One solution i can get is



> 
> map.clear();
> 
> 
> 


To clear all the polylines, markers etc.. and add the markers again, then drawn the path.


But as soon as I start dragging, the marker is cleared, hence not visible on the map :(


Thank You



---

Keep track of the Polyline as you add it to the map:



```
Polyline polyline = this.mMap.addPolyline(new PolylineOptions().....);

```

Then when you want to remove it:



```
polyline.remove();

```

If you have lots of Polylines, just add them to a List as they are put on the map:



```
List<Polyline> polylines = new ArrayList<Polyline>();

for(....)
{
    polylines.add(this.mMap.addPolyline(new PolylineOptions()....));
}

```

And when you want to delete:



```
for(Polyline line : polylines)
{
    line.remove();
}

polylines.clear();

```

The key is to keep a reference to the Polyline objects and call .remove() on each one.

