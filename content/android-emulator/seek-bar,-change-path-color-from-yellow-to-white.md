---
metaTitle: Seek bar, change path color from yellow to white
title: Seek bar, change path color from yellow to white
---

## Problem

I have two questions:


1) how do I change the color of the seek bar (path) from yellow (the default color) to white. What I mean to say is, while I slide the thumb , it turns the line traversed from grey to yellow. I want track/line to either remain grey or white..Basically I want just the thumb to move with no color change in the seek bar.


2)
How to change the thumb of seekbar from rectangle to circle/sphere/round shape. 


any pointers will be appreciated. 



---

## Solution

I want to complete the answer from above for the people who are new to the system,


the missing xmls ( background\_fill , progress\_fill and progress could look like that for a gradient red


progress.xml
------------



```
<?xml version="1.0" encoding="utf-8"?>
    <layer-list xmlns:android="http://schemas.android.com/apk/res/android">
        <item 
            android:id="@android:id/background" 
            android:drawable="@drawable/background_fill" />

        <item android:id="@android:id/progress">
           <clip android:drawable="@drawable/progress_fill" />
        </item>
  </layer-list>

```

background\_fill.xml
--------------------



```
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient 
        android:startColor="#FF555555" 
        android:centerColor="#FF555555"
        android:endColor="#FF555555" 
        android:angle="90" />

    <corners android:radius="5px" />

    <stroke 
        android:width="2dp" 
        android:color="#50999999" />

    <stroke 
        android:width="1dp" 
        android:color="#70555555" />
</shape>

```

progress\_fill.xml
------------------



```
<?xml version="1.0" encoding="UTF-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <gradient 
        android:startColor="#FF470000" 
        android:centerColor="#FFB80000"
        android:endColor="#FFFF4400" 
        android:angle="180" />

    <corners android:radius="5px" />

    <stroke 
            android:width="2dp" 
            android:color="#50999999" />

    <stroke 
            android:width="1dp" 
            android:color="#70555555" />
</shape>

```

i did not complete the implementing for android:thumb, so the thumb will be still the original one


Therefore we just have to delete this line again from our layout xml where we define the seekbar



```
android:thumb="@drawable/thumb"

```

Good luck!!!



---

## Notes

- Hello, your example works perfect, but I can't add custom thumb for seekbar. Could you do me a favour to show how to add thumb to your example?
