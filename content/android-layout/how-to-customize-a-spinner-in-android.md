---
metaTitle: How to customize a Spinner in Android
tags:
- android-spinner
title: How to customize a Spinner in Android
---

## Context

I want to add a custom height to the dropdown of a `Spinner`, say 30dp, and I want to hide the dividers of the dropdown list of `Spinner`.


So far I tried to implement following style to the `Spinner`:



```
<style name="spinner_style">
        <item name="android:paddingLeft">0dp</item>
        <item name="android:dropDownWidth">533dp</item>
        <item name="android:showDividers">none</item>
        <item name="android:dividerHeight">0dp</item>
        <item name="android:popupBackground">@drawable/new_bg</item>
        <item name="android:dropDownHeight">70dp</item>
        <item name="android:scrollbarAlwaysDrawVerticalTrack">true</item>
        <item name="android:dropDownSelector">@android:color/white</item>
 </style>

```

and the code of my spinner is :



```
<Spinner
            android:id="@+id/pioedittxt5"
            android:layout_width="543dp"
            android:layout_height="63dp"
            android:layout_toRightOf="@+id/piotxt5"
            android:background="@drawable/spinner"
            style="@style/spinner_style"
            android:dropDownVerticalOffset="-53dp"
            android:spinnerMode="dropdown"
            android:drawSelectorOnTop="true"
            android:entries="@array/travelreasons"
            android:prompt="@string/prompt" />

```

But nothing seems to be working.



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
