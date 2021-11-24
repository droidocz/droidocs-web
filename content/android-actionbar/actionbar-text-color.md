---
metaTitle: ActionBar text color
tags:
- android-3.0-honeycomb
- android-text-color
title: ActionBar text color
---

## Context

how can I change the text color of the ActionBar? I've inherited the Holo Light Theme, I'm able to change the background of the ActionBar but I don't find out what is the attribute to tweak to change the text color.




---


Ok, I'm able to change the text color with the attribute android:textColorPrimary but it also changes the text color of the dropdown menu displayed when an overflow happen on the ActionBar buttons. Any idea how to change the color of those dropdown menu / List ?



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
