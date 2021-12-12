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

The most elegant and flexible solution I have found so far is here:
<http://android-er.blogspot.sg/2010/12/custom-arrayadapter-for-spinner-with.html>


Basically, follow these steps:


1. Create custom layout xml file for your dropdown item, let's say I will call it spinner\_item.xml
2. Create custom view class, for your dropdown Adapter. In this custom class, you need to overwrite and set your custom dropdown item layout in getView() and getDropdownView() method. My code is as below:



```
public class CustomArrayAdapter extends ArrayAdapter<String>{

private List<String> objects;
private Context context;

public CustomArrayAdapter(Context context, int resourceId,
     List<String> objects) {
     super(context, resourceId, objects);
     this.objects = objects;
     this.context = context;
}

@Override
public View getDropDownView(int position, View convertView,
    ViewGroup parent) {
    return getCustomView(position, convertView, parent);
}

@Override
public View getView(int position, View convertView, ViewGroup parent) {
  return getCustomView(position, convertView, parent);
}

public View getCustomView(int position, View convertView, ViewGroup parent) {

LayoutInflater inflater=(LayoutInflater) context.getSystemService(  Context.LAYOUT_INFLATER_SERVICE );
View row=inflater.inflate(R.layout.spinner_item, parent, false);
TextView label=(TextView)row.findViewById(R.id.spItem);
 label.setText(objects.get(position));

if (position == 0) {//Special style for dropdown header
      label.setTextColor(context.getResources().getColor(R.color.text_hint_color));
}

return row;
}

}

```
3. In your activity or fragment, make use of the custom adapter for your spinner view. Something like this:



```
Spinner sp = (Spinner)findViewById(R.id.spMySpinner);
ArrayAdapter<String> myAdapter = new CustomArrayAdapter(this, R.layout.spinner_item, options);
sp.setAdapter(myAdapter);

```


where options is the list of dropdown item string.



---

## Notes

- The trick for me was overriding getDropDownView, I was overriding getView, but didn't realized I had to override that method.
