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


---

## Notes

- _For future visitors to this answer_: **do not wrap TextView and CheckedTextview inside a layout**. Post it directly in your layout_file.xml file.
-  Don't you need `android:id=" in the simple_spinner_dropdown_item.xml file?
- Try changing `<item name="android:height">`  to `<item name="android:layout_height">`
- In R.layout.simple_spinner_dropdown_item, change android:layout_height value to "?attr/dropdownListPreferredItemHeight" or you will get an error: "Error: Attribute is not public"
- Actually you are using an array to populate the spinner.. What i have done is populated the spinner with an array of objects by implementing the `toString()` method in the class of which the custom array of objects belong. So i can't use the create from resource.. what i have to do is create a custom adapter but i am trying to avoid it. I want to do it so that it is applicable in the entire application without the need for custom adapter for all spinners as i have too many spinners in the application.
- I tried using the styles options that you suggested. I added:
`<item name="android:height"> 40sp </item>
        <item name="android:textSize">15sp</item>`
 in between the `spinnerItemStyle` tag but of no use.
