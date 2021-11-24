---
metaTitle: Changing EditText bottom line color with appcompat v7
tags:
- java
- android-edittext
- android-styles
title: Changing EditText bottom line color with appcompat v7
---

## Context

I am using appcompat v7 to get the look consistent on Android 5 and less. It works rather well. However I cannot figure out how to change the bottom line color and the accent color for EditTexts. Is it possible? 


I have tried to define a custom `android:editTextStyle` (cf. below) but I only succeeded to change the full background color or text color but not the bottom line nor the accent color. Is there a specific property value to use? do I have to use a custom drawable image through the `android:background` property? is it not possible to specify a color in hexa?



```
 <style name="Theme.App.Base" parent="Theme.AppCompat.Light.DarkActionBar">
     <item name="android:editTextStyle">@style/Widget.App.EditText</item>
 </style>

 <style name="Widget.App.EditText" parent="Widget.AppCompat.EditText">
     ???
 </style>

```

According to android API 21 sources, EditTexts with material design seem to use `colorControlActivated` and `colorControlNormal`. Therefore, I have tried to override these properties in the previous style definition but it has no effect. Probably appcompat does not use it. Unfortunately, I cannot find the sources for the last version of appcompat with material design. 



---

Finally, I have found a solution. It simply consists of overriding the value for `colorControlActivated`, `colorControlHighlight` and `colorControlNormal` in your app theme definition and not your edittext style. Then, think to use this theme for whatever activity you desire. Below is an example:



```
<style name="Theme.App.Base" parent="Theme.AppCompat.Light.DarkActionBar">
    <item name="colorControlNormal">#c5c5c5</item>
    <item name="colorControlActivated">@color/accent</item>
    <item name="colorControlHighlight">@color/accent</item>
</style>

```
