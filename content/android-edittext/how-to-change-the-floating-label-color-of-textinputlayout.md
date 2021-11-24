---
metaTitle: How to change the floating label color of TextInputLayout
tags:
- android-design-library
- android-textinputlayout
title: How to change the floating label color of TextInputLayout
---

## Context

With reference to the new `TextInputLayout` released by Google, how do I change the floating label text color?


Setting `colorControlNormal`, `colorControlActivated`, `colorControlHighLight` in styles does not help.


This is what I have now:


![This is what I have now](https://i.stack.imgur.com/EES16.png)



---


> 
> how do I change the floating label text color?
> 
> 
> 


With the [Material Components library](https://github.com/material-components/material-components-android) you can customize the [`TextInputLayout`](https://github.com/material-components/material-components-android/blob/master/docs/components/TextField.md) the hint text color using (it requires the version 1.1.0)


* In the layout:
* **`app:hintTextColor`** attribute : the color of the label when it is collapsed and the text field is active
* **`android:textColorHint`** attribute: the color of the label in all other text field states (such as resting and disabled)



```
<com.google.android.material.textfield.TextInputLayout
     app:hintTextColor="@color/mycolor"
     android:textColorHint="@color/text_input_hint_selector"
     .../>

```

* extending a [material style](https://github.com/material-components/material-components-android/blob/master/docs/components/TextField.md#styles) `Widget.MaterialComponents.TextInputLayout.*`:



```
<style name="MyFilledBox" parent="Widget.MaterialComponents.TextInputLayout.FilledBox">
    <item name="hintTextColor">@color/mycolor</item>
    <item name="android:textColorHint">@color/text_input_hint_selector</item>
</style>

```

[![enter image description here](https://i.stack.imgur.com/xFKiw.png)](https://i.stack.imgur.com/xFKiw.png)[![enter image description here](https://i.stack.imgur.com/XFrja.png)](https://i.stack.imgur.com/XFrja.png)


The default selector for `android:textColorHint` is:



```
<selector xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:alpha="0.38" android:color="?attr/colorOnSurface" android:state_enabled="false"/>
  <item android:alpha="0.6" android:color="?attr/colorOnSurface"/>
</selector>

```
