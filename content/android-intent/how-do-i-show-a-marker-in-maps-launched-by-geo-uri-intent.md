---
metaTitle: How do I show a marker in Maps launched by geo URI Intent
tags:
- google-maps
- android-maps
title: How do I show a marker in Maps launched by geo URI Intent
---

## Context

I have a application where I want to show different locations (one at the time, picked by user input) by launching Google Maps with their specific geo coordinates.


I'm currently using this (with real lat. and long. values of course):



```
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:<lat>,<long>?z=17"));
startActivity(intent);

```

It's quite exactly what I want, except that it doesn't show any indicator or marker for the specified point. It only centers at it's location.


Is there some way to get the marker or something else included without using a MapView?



---

There are many more options to launch a Google map using an intent...
---------------------------------------------------------------------



```
   Double myLatitude = 44.433106;
   Double myLongitude = 26.103687;
   String labelLocation = "Jorgesys @ Bucharest";

```

### 1)



```
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("geo:<" + myLatitude  + ">,<" + myLongitude + ">?q=<" + myLatitude  + ">,<" + myLongitude + ">(" + labelLocation + ")"));
    startActivity(intent);

```

### 2)



```
String urlAddress = "http://maps.google.com/maps?q="+ myLatitude  +"," + myLongitude +"("+ labelLocation + ")&iwloc=A&hl=es";
    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(urlAddress));
    startActivity(intent);

```

### 3)



```
   String urlAddress = "http://maps.googleapis.com/maps/api/streetview?size=500x500&location=" + myLatitude  + "," + myLongitude + "&fov=90&heading=235&pitch=10&sensor=false";
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(urlAddress));
        startActivity(intent);

```


---

## Notes

- "iwloc" stands for info window location and "hl" for the language, if you don´t set this values, default values apply.
- you miss `)` on second way.
