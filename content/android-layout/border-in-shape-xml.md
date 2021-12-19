---
metaTitle: Border in shape XML
tags:
- border
- shapes
- stroke
title: Border in shape XML
---

## Problem

I am trying to make a drawable to use for a button. I would like it to have this coloring, with a 2px border around it.


Everything works just fine except I cannot get the border to show up...



```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle" >

    <gradient android:startColor="@color/bar_clicked_dark"
        android:endColor="@color/bar_clicked_light"
        android:angle="90"/>

    <corners android:bottomLeftRadius="0dp"
        android:topLeftRadius="15dp"
        android:bottomRightRadius="15dp"
        android:topRightRadius="0dp" />

    <stroke android:width="2dp" 
        color="#ff00ffff" />

</shape>

```


---

## Solution

It looks like you forgot the prefix on the color attribute. Try 



```
 <stroke android:width="2dp" android:color="#ff00ffff"/>

```
