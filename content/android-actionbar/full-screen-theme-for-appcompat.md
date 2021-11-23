---
metaTitle: Full Screen Theme for AppCompat
tags:
- android-theme
title: Full Screen Theme for AppCompat
---

When you use Theme.AppCompat in your application you can use FullScreenTheme by adding the code below to styles.



```
<style name="Theme.AppCompat.Light.NoActionBar.FullScreen" parent="@style/Theme.AppCompat.Light.NoActionBar">
    <item name="android:windowNoTitle">true</item>
    <item name="android:windowActionBar">false</item>
    <item name="android:windowFullscreen">true</item>
    <item name="android:windowContentOverlay">@null</item>
</style>

```

and also mention in your manifest file.



```
<activity
   android:name=".activities.FullViewActivity"
   android:theme="@style/Theme.AppCompat.Light.NoActionBar.FullScreen" 
/>

```
