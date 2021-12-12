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

If your `minSdkVersion` is 21+ use `android:buttonTint` attribute to update the color of a checkbox:



```
<CheckBox
  ...
  android:buttonTint="@color/tint_color" />

```

In projects that use AppCompat library and support Android versions below 21 you can use a compat version of the `buttonTint` attribute:



```
<CheckBox
  ...
  app:buttonTint="@color/tint_color" />

```

In this case if you want to subclass a `CheckBox` don't forget to use `AppCompatCheckBox` instead.


**PREVIOUS ANSWER:**


You can change `CheckBox`s drawable using `android:button="@drawable/your_check_drawable"` attribute.



---

## Notes

- We have to use the native elements instead customising it unnecessarily.
- Note: For material design styling, there is the `contentControl` options now: https://materialdoc.com/components/selection-controls/
- The value of `buttonTint` seems to override the `textColor` value.
