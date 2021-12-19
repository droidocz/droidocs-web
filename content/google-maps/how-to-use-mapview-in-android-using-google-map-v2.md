---
metaTitle: How to use MapView in android using google map V2
title: How to use MapView in android using google map V2
---

## Problem

I want to show a map in on of my activity.


In google map V1 we use -



```
 <com.google.android.maps.MapView
        android:id="@+id/mapview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:apiKey="@string/api_map_key"
        android:clickable="true"
        android:enabled="true" />

```

and extend the activity by using MapActivity class.


In Versing 2 it uses Fragment instead of mapview and have to extend activity by FragmentActivity instead normal Activity.
ex- 



```
<fragment
            android:id="@+id/map"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            class="com.google.android.gms.maps.SupportMapFragment" />

```

Now Can I use Same way to create mapview instead of Fragment using version 2 .()


Can anyone use MapView using V2?



---

## Solution

More complete sample from [here](https://gist.github.com/joshdholtz/4522551) and [here](http://ucla.jamesyxu.com/?p=287).


Or you can check out my layout sample. p.s no need to put API key in the map view.



```
<?xml version="1.0" encoding="utf-8"?>

<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="match_parent">

    <com.google.android.gms.maps.MapView
            android:id="@+id/map_view"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_weight="2"
            />

    <ListView android:id="@+id/nearby_lv"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:background="@color/white"
              android:layout_weight="1"
            />

</LinearLayout>

```


---

## Notes

- The linked examples ar far away from tutorials.
- These all tutorials are helpful but they are for either `eclipse` or older version of `android studio`
