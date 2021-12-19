---
metaTitle: Changing EditText bottom line color with appcompat v7
tags:
- java
- android-edittext
- android-styles
title: Changing EditText bottom line color with appcompat v7
---

## Problem

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

## Solution

While [Laurents solution](https://stackoverflow.com/a/26631227/982852) is correct, it comes with some drawbacks as described in the comments since not only the bottom line of the `EditText` gets tinted but the Back Button of the `Toolbar`, `CheckBoxes` etc. as well.


Luckily `v22.1` of `appcompat-v7` introduced some new possibilities. Now it's possible to assign a specific theme only to one view. Straight from the [Changelog](http://developer.android.com/tools/support-library/features.html#v7-appcompat):



> 
> Deprecated use of app:theme for styling Toolbar. **You can now use** android:theme for toolbars on all API level 7 and higher devices and **android:theme** support **for all widgets** on API level 11 and higher devices. 
> 
> 
> 


So instead of setting the desired color in a global theme, we create a new one and assign it only to the `EditText`.


**Example:**



```
<style name="MyEditTextTheme">
    <!-- Used for the bottom line when not selected / focused -->
    <item name="colorControlNormal">#9e9e9e</item>
    <!-- colorControlActivated & colorControlHighlight use the colorAccent color by default -->
</style>

```



---



```
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:theme="@style/MyEditTextTheme"/>

```


---

## Notes

- using &lt;item name="colorAccent"&gt;#000000&lt;/item&gt; worked for me instead of colorControlNormal.
- `colorControlNormal` without the android prefix uses the appcompat method to tint widgets while with the prefix it fallsback to the system method and this is only available in API 21+ devices.
- hmm, I tested on my lollipop device and it wont tint to the custom color unless you implement it in v21 styles with the android namespace also.
- I am using `22.2.0` version of AppCompat but this trick is not working :(
