---
metaTitle: How to disable action bar permanently
title: How to disable action bar permanently
---

If you are using `Theme.Holo.Light` and want to use the `Theme.Holo.Light.NoActionBar` variant on pre 3.2 devices you can add this to your `styles.xml`:



```
<style name="NoActionBar" parent="@android:style/Theme.Holo.Light">
    <item name="android:windowActionBar">false</item>
    <item name="android:windowNoTitle">true</item>
</style> 

```

and then set it as your activity's theme:



```
<activity android:theme="@style/NoActionBar" ... />

```
