---
metaTitle: How to customize a Spinner in Android
tags:
- android-spinner
title: How to customize a Spinner in Android
---

Create a custom adapter with a custom layout for your spinner.



```
Spinner spinner = (Spinner) findViewById(R.id.pioedittxt5);
ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
        R.array.travelreasons, R.layout.simple_spinner_item);
adapter.setDropDownViewResource(R.layout.simple_spinner_dropdown_item);
spinner.setAdapter(adapter);

```

R.layout.simple\_spinner\_item



```
<TextView xmlns:android="http://schemas.android.com/apk/res/android" 
    android:id="@android:id/text1"
    style="@style/spinnerItemStyle"
    android:maxLines="1"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:ellipsize="marquee" />

```

R.layout.simple\_spinner\_dropdown\_item



```
<CheckedTextView xmlns:android="http://schemas.android.com/apk/res/android" 
    android:id="@android:id/text1"
    style="@style/spinnerDropDownItemStyle"
    android:maxLines="1"
    android:layout_width="match_parent"
    android:layout_height="?android:attr/dropdownListPreferredItemHeight"
    android:ellipsize="marquee" />

```

In styles add your custom dimensions and height as per your requirement.



```
 <style name="spinnerItemStyle" parent="android:Widget.TextView.SpinnerItem">

  </style>

  <style name="spinnerDropDownItemStyle" parent="android:TextAppearance.Widget.TextView.SpinnerItem">

  </style>

```
