---
metaTitle: Change EditText hint color when using TextInputLayout
tags:
- android-support-library
- android-design-library
- android-textattributes
title: Change EditText hint color when using TextInputLayout
---

## Context

I am using the new `TextInputLayout` from the design library. I am able to get it to show and to change the color of the floating label. Unfortunately the actual `EditText` hint is now always white. 


I have tried changing the hintColor in XML, styles, and programmatically and also tried using the `android.support.v7.widget.AppCompatEditText`
but the `EditText` hint always shows white. 


Here is my XML for my `TextInputLayout` and `EditText`



```
<android.support.design.widget.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android.support.design:hintTextAppearance="@style/GreenTextInputLayout">


    <EditText

    android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/city"
        android:textColorHint="@color/black"
        android:hint="@string/city" />

</android.support.design.widget.TextInputLayout>

```

And here is the style I am using for the `TextInputLayout` (I tried making the `hintTextColor` attribute black but didn't do anything for me):



```
<style name="GreenTextInputLayout" parent="@style/TextAppearance.AppCompat">
    <item name="android:textColor">@color/homestory_green</item>
</style>

```


---

With the [Material Components library](https://github.com/material-components/material-components-android) you can customize the [`TextInputLayout`](https://github.com/material-components/material-components-android/blob/master/docs/components/TextInputLayout.md) the hint text color using:


* In the layout:


	+ **`app:hintTextColor`** attribute : the color of the label when it is collapsed and the text field is active
	+ **`android:textColorHint`** attribute: the color of the label in all other text field states (such as resting and disabled)


Something like:




```
<com.google.android.material.textfield.TextInputLayout
     app:hintTextColor="@color/mycolor"
     android:textColorHint="@color/text_input_hint_selector"
     .../>

```

[![enter image description here](https://i.stack.imgur.com/xFKiw.png)](https://i.stack.imgur.com/xFKiw.png)[![enter image description here](https://i.stack.imgur.com/XFrja.png)](https://i.stack.imgur.com/XFrja.png)

