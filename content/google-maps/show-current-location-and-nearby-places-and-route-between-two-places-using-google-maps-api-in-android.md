---
metaTitle: Show Current Location and Nearby Places and Route between two places using Google Maps API in Android
tags:
- google-places-api
title: Show Current Location and Nearby Places and Route between two places using Google Maps API in Android
---

## Context

I need to develop an application using `Google Maps` in Android to locate my *current location* and need to *find nearest location*.


(For example: **Nearby police station from my current location**.)


It should accept my current location and output should display nearest place.


Can anyone help me to give some suggestion,links,tutorial to do that?



---

1. First go through **[this tutorial](http://mobiforge.com/developing/story/using-google-maps-android)** for getting familiar with
Android Google Maps and this for **[API 2](http://www.codeproject.com/Articles/614946/Android-google-map-api-v-setup)**.
2. To retrive the current location of device see **[this answer](https://stackoverflow.com/questions/1513485/how-do-i-get-the-current-gps-location-programmatically-in-android)** or this **[another answer](https://stackoverflow.com/questions/3145089/what-is-the-simplest-and-most-robust-way-to-get-the-users-current-location-in-a/3145655#3145655)** and for **[API 2](http://ramsandroid4all.blogspot.in/2013/06/google-maps-android-api-v2-showing.html)**
3. Then you can get places near by your location using **[Google Place
 API](http://code.google.com/apis/maps/documentation/places/)** and for use of Place Api see **[this blog](http://ddewaele.blogspot.com/2011/05/introducing-google-places-api.html).**
4. After getting Placemarks of near by location use **[this
blog with source code](http://wptrafficanalyzer.in/blog/customizing-infowindow-contents-in-google-map-android-api-v2-using-infowindowadapter/)** to show markers on map with balloon overlay with API 2.
5. You also have great sample to draw route between two points on map
look here in these links **[Link1](https://stackoverflow.com/questions/2023669/j2me-android-blackberry-driving-directions-route-between-two-locations/2023685#2023685)** and **[Link2](http://about-android.blogspot.in/2010/03/sample-google-map-driving-direction.html)** and this [**Great Answer**](https://stackoverflow.com/questions/3109158/how-to-draw-a-path-on-a-map-using-kml-file).


After following these steps you will be easily able to do your application. The only condition is, you will have to read it and understand it, because like magic its not going to be complete in a click.



---

## Notes

- If any of the links fail to open please do comment here,Will change it with the best example/blog available.
