---
metaTitle: How to change the color of a CheckBox
tags:
- android-checkbox
title: How to change the color of a CheckBox
---

## Context

How do I change the default `CheckBox` color in Android?  

By default the `CheckBox` color is green, and I want to change this color.  

If it is not possible please tell me how to make a custom `CheckBox`?



---

You can change the color directly in XML. Use `buttonTint` for the box: *(as of API level 23)*



```
<CheckBox
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:buttonTint="@color/CHECK_COLOR" />

```

You can also do this using `appCompatCheckbox v7` for older API levels:



```
<android.support.v7.widget.AppCompatCheckBox 
    android:layout_width="wrap_content" 
    android:layout_height="wrap_content" 
    app:buttonTint="@color/COLOR_HERE" /> 

```


---

## Notes

- And don't forget to add _xmlns:app="http://schemas.android.com/apk/res-auto"_ to your main/parent layout
- How about setting 2 different colors for checked and unchecked states?
- Not working for me using 'android.support.v7.widget.AppCompatCheckBox'
- This will automatically be used when you use CheckBox in your layouts. You should only need to manually use this class when writing custom views.
