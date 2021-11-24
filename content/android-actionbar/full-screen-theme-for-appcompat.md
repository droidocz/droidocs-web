---
metaTitle: Full Screen Theme for AppCompat
tags:
- android-theme
title: Full Screen Theme for AppCompat
---

## Context

I would like to know how can I apply full screen theme ( no title bar + no actionbar ) to an activity. I am using AppCompat library from support package v7. 


I've tried to applied `android:theme="@android:style/Theme.NoTitleBar.Fullscreen"` to my specific activity but it crashed. I think it's because my application theme is like this.



```
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">

```

I also have tried this 



```
getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN);

```

which only hides title bar but not the action bar. 
My current workaround is that hiding the actionbar with 



```
getSupportActionBar().hide();

```


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
