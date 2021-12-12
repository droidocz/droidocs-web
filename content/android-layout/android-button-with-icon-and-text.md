---
metaTitle: Android button with icon and text
tags:
- android-button
title: Android button with icon and text
---

## Context

I have some buttons like this in my app:



```
    <Button
        android:id="@+id/bSearch"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:padding="16dp"
        android:text="Search"
        android:textSize="24sp" />

```

I'm trying to create a same button with text and a icon. 
android:drawableLeft doesn't work for me (Maybe it would, but i don't know how to set a max height to the icon).


So i created a LinearLayout with a ImageView and a TextView and made it act like a button:



```
    <LinearLayout
        android:id="@+id/bSearch2"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:background="@android:drawable/btn_default"
        android:clickable="true"
        android:padding="16dp"
        android:orientation="horizontal" >

        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:layout_marginLeft="5dp"
            android:adjustViewBounds="true"
            android:maxHeight="30dp"
            android:maxWidth="30dp"
            android:scaleType="fitCenter"
            android:src="@drawable/search_icon" />

        <TextView
            android:id="@+id/tvSearchCaption"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:textSize="24sp"
            android:paddingRight="30dp"
            android:gravity="center"
            android:text="Search" />
    </LinearLayout>

```

My new button is exactly what i want (font size, icon and text placement). 
But it doesn't look like my default buttons:


![enter image description here](https://i.stack.imgur.com/HHZkw.png)


So i tried, to change the background and the text color of my new Button:



```
Button Search = (Button) findViewById(R.id.bSearch);
LinearLayout bSearch2 = (LinearLayout) findViewById(R.id.bSearch2);
bSearch2.setBackground(bSearch.getBackground());
TextView tvSearchCaption = (TextView)findViewById(R.id.tvSearchCaption);
tvSearchCaption.setTextColor(bSearch.getTextColors().getDefaultColor());

```

This gives a strange result, my old button, gets messed up:


![enter image description here](https://i.stack.imgur.com/VSSkB.png)


When i change the order of these two buttons in the XML, so the "new button" goes first, it makes another strange result:


![enter image description here](https://i.stack.imgur.com/HluhB.png)


Now i noticed, that when i try to press the old button, the new one gets pressed.


Any ideas?



---

You can use the Material Components Library and the `MaterialButton` component.  

Use the **`app:icon`** and **`app:iconGravity="start"`** attributes.


Something like:



```
  <com.google.android.material.button.MaterialButton
        style="@style/Widget.MaterialComponents.Button.Icon"
        app:icon="@drawable/..."
        app:iconGravity="start"
        ../>

```

[![enter image description here](https://i.stack.imgur.com/GeKFi.png)](https://i.stack.imgur.com/GeKFi.png)



---

## Notes

- Note that if you have a material design theme for your app, the standard Button widget is auto inflated as the MaterialButton. Per here - https://material.io/develop/android/components/buttons/
