---
metaTitle: Change Toolbar color in Appcompat 21
tags:
- android-appcompat
- android-actionbar-compat
- android-toolbar
title: Change Toolbar color in Appcompat 21
---

## Problem

I am testing out the new Appcompat 21 Material Design features. Therefore I've created a Toolbar like this:



```
<android.support.v7.widget.Toolbar xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:app="http://schemas.android.com/apk/res-auto"
android:id="@+id/activity_my_toolbar"
android:layout_width="match_parent"
android:layout_height="wrap_content"
android:minHeight="?attr/actionBarSize"
android:background="?attr/colorPrimary"
app:theme="@style/ThemeOverlay.AppCompat.ActionBar"/>

```

and included it in my main layout file.


Then I've set it as supportActionBar like that:



```
Toolbar toolBar = (Toolbar)findViewById(R.id.activity_my_toolbar);
setSupportActionBar(toolBar);

```

It's working, but somehow I can't quite figure out how to customize the toolbar. It's grey and the text on it is black. How should I change background and text color?


I've gone through this instructions:


<http://android-developers.blogspot.de/2014/10/appcompat-v21-material-design-for-pre.html>


What have I overseen to change colors?



```
 <style name="AppTheme" parent="Theme.AppCompat.Light">
    <item name="android:windowActionBar" tools:ignore="NewApi">false</item>
    <item name="windowActionBar">false</item>
</style>

```

**EDIT**:


I was able to change the background color by adding these lines of code to the theme:



```
<item name="colorPrimary">@color/actionbar</item>
<item name="colorPrimaryDark">@color/actionbar_dark</item>

```

But they won't affect the text color. What am I missing? Instead of the black text and black menu button, I'd rather prefer a white text and white menu buttons:


![enter image description here](https://i.stack.imgur.com/0SD7L.png)



---

## Solution

**UPDATE 12/11/2019: Material Components Library**


With the Material Components and Androidx libraries you can use:


* the **`android:background`** attribute in the layout:



```
<com.google.android.material.appbar.MaterialToolbar
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:background="?attr/colorPrimary"

```
* apply the default style: **`style="@style/Widget.MaterialComponents.Toolbar.Primary"`** or customize the style inheriting from it:



```
<com.google.android.material.appbar.MaterialToolbar
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    style="@style/Widget.MaterialComponents.Toolbar.Primary"

```
* override the default color using the **`android:theme`** attribute:



```
<com.google.android.material.appbar.MaterialToolbar
    android:id="@+id/toolbar"
    android:layout_width="match_parent"
    android:layout_height="?attr/actionBarSize"
    android:theme="@style/MyThemeOverlay_Toolbar"

```


with:



```
  <style name="MyThemeOverlay_Toolbar" parent="ThemeOverlay.MaterialComponents.Toolbar.Primary">
    <item name="android:textColorPrimary">....</item>
    <item name="colorPrimary">@color/.....
    <item name="colorOnPrimary">@color/....</item>
  </style>

```

**OLD: Support libraries:**  

You can use a `app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar"` theme as suggested in other answers, but you can also use a solution like this:



```
<android.support.v7.widget.Toolbar
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    style="@style/HeaderBar"
    app:theme="@style/ActionBarThemeOverlay"
    app:popupTheme="@style/ActionBarPopupThemeOverlay"/>

```

And you can have the full control of your ui elements with these styles:



```
<style name="ActionBarThemeOverlay" parent="">
    <item name="android:textColorPrimary">#fff</item>
    <item name="colorControlNormal">#fff</item>
    <item name="colorControlHighlight">#3fff</item>
</style>

<style name="HeaderBar">
    <item name="android:background">?colorPrimary</item>
</style>

<style name="ActionBarPopupThemeOverlay" parent="ThemeOverlay.AppCompat.Light" >
    <item name="android:background">@android:color/white</item>
    <item name="android:textColor">#000</item>
</style>

```


---

## Notes

- Popup menu is still black background with white text
