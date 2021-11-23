---
metaTitle: 'Android: how to draw a border to a LinearLayout'
tags:
- draw
title: 'Android: how to draw a border to a LinearLayout'
---

Do you really need to do that programmatically?


Just considering the title: You could use a ShapeDrawable as android:background…


For example, let's define `res/drawable/my_custom_background.xml` as:



```
<shape xmlns:android="http://schemas.android.com/apk/res/android"
       android:shape="rectangle">
  <corners
      android:radius="2dp"
      android:topRightRadius="0dp"
      android:bottomRightRadius="0dp"
      android:bottomLeftRadius="0dp" />
  <stroke
      android:width="1dp"
      android:color="@android:color/white" />
</shape>

```

and define android:background="@drawable/my\_custom\_background".


I've not tested but it should work.


**Update:**


I think that's better to leverage the xml shape drawable resource power if that fits your needs. With a "from scratch" project (for android-8), define res/layout/main.xml



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/border"
    android:padding="10dip" >
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hello World, SOnich"
        />
    [... more TextView ...]
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hello World, SOnich"
        />
</LinearLayout>

```

and a `res/drawable/border.xml`



```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
       android:shape="rectangle">
   <stroke
        android:width="5dip"
        android:color="@android:color/white" />
</shape>

```

Reported to work on a gingerbread device. Note that you'll need to relate `android:padding` of the LinearLayout to the `android:width` shape/stroke's value. Please, do not use `@android:color/white` in your final application but rather a project defined color.


You could apply `android:background="@drawable/border" android:padding="10dip"` to each of the LinearLayout from your provided sample.


As for your other posts related to display some circles as LinearLayout's background, I'm playing with Inset/Scale/Layer drawable resources ([see Drawable Resources](http://developer.android.com/guide/topics/resources/drawable-resource.html) for further information) to get something working to display perfect circles in the background of a LinearLayout but failed at the moment…


Your problem resides clearly in the use of `getBorder.set{Width,Height}(100);`. Why do you do that in an onClick method?


I need further information to not miss the point: why do you do that programmatically? Do you need a dynamic behavior? Your input drawables are png or ShapeDrawable is acceptable? etc.


To be continued (maybe tomorrow and as soon as you provide more precisions on what you want to achieve)…

