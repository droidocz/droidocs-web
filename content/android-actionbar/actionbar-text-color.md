---
metaTitle: ActionBar text color
tags:
- android-3.0-honeycomb
- android-text-color
title: ActionBar text color
---

Ok, I've found a better way. I'm now able to only change the color of the title. You can also tweak the subtitle.


**Here is my styles.xml:**



```
<?xml version="1.0" encoding="utf-8"?>
<resources>
  <style name="MyTheme" parent="@android:style/Theme.Holo.Light">
    <item name="android:actionBarStyle">@style/MyTheme.ActionBarStyle</item>
  </style>

  <style name="MyTheme.ActionBarStyle" parent="@android:style/Widget.Holo.Light.ActionBar">
    <item name="android:titleTextStyle">@style/MyTheme.ActionBar.TitleTextStyle</item>
  </style>

  <style name="MyTheme.ActionBar.TitleTextStyle" parent="@android:style/TextAppearance.Holo.Widget.ActionBar.Title">
    <item name="android:textColor">@color/red</item>
  </style>
</resources>

```
