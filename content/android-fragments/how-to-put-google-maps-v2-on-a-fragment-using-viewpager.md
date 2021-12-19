---
metaTitle: How to put Google Maps V2 on a Fragment using ViewPager
tags:
- google-maps
title: How to put Google Maps V2 on a Fragment using ViewPager
---

## Problem

I am trying to do a tab layout same in Play Store. I got to display the [tab layout using a fragments and viewpager from androidhive.](http://www.androidhive.info/2013/10/android-tab-layout-with-swipeable-views-1/) However, I can't implement [google maps v2](http://wptrafficanalyzer.in/blog/driving-distance-and-travel-time-duration-between-two-locations-in-google-map-android-api-v2/) on it. I searched the internet for hours already, but I can't find a tutorial on how to do it. Can some one please show me how?



---

## Solution

You can use this line if you want to use `GoogleMap` in a fragment:



```
<fragment
            android:id="@+id/map"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            class="com.google.android.gms.maps.SupportMapFragment" />

```



```
GoogleMap mGoogleMap = ((SupportMapFragment) getChildFragmentManager().findFragmentById(R.id.map)).getMap();

```


