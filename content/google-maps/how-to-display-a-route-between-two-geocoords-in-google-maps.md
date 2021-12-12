---
metaTitle: How to display a route between two geocoords in google maps
tags:
- overlay
- routes
title: How to display a route between two geocoords in google maps
---

## Context


> 
> **Possible Duplicate:**  
> 
> [J2ME/Android/BlackBerry - driving directions, route between two locations](https://stackoverflow.com/questions/2023669/j2me-android-blackberry-driving-directions-route-between-two-locations) 
> 
> 
> 


I'm just writing an App for displaying the route between two coords (lat, long) in google maps view.
Displaying an single coord (even with a marker) works fine, but how to draw route between two point with 2 markers?


I must admit that I'm quite new to Android and the maps-API...



---

this is working example [link](https://stackoverflow.com/questions/2023669/j2me-android-blackberry-driving-directions-route-between-two-locations/2023685#2023685). check it out. it helps to create the route overlay on the map. here is the [complete source](http://code.google.com/p/j2memaprouteprovider/source/browse/#svn/trunk/J2MEMapRouteAndroidEx/src/org/ci/geo/route) code for that.



---

## Notes

-  i have completely followed your above link for route map but i got null null pointer exception mpointsize .also am getting fatal exception as well here i have posted all my source code http://stackoverflow.com/questions/11928933/the-questions-is-related-to-routemap-path-names-displaying please anyone help me out of this error am getting fatal and null pointer exception at drawpath() .and send me rectified code thanks in advance.
- One note, you might be running afoul of the Google Maps api if you use it to obtain driving directions (they removed this capability from the android maps api).
- but we can do manipulations with the kml file of maps. in my answer, they are retriving the coordinates points to the route from the google maps kml file. check the RoadProvider.java the are build the url to get the road coordintes from the kml file.
