---
metaTitle: ListView item background via custom selector
title: ListView item background via custom selector
---

## Context

Is it possible to apply a custom background to each Listview item via the list selector?


The default selector specifies `@android:color/transparent` for the `state_focused="false"` case, but changing this to some custom drawable doesn't affect items that aren't selected. Romain Guy seems to suggest [in this answer](https://stackoverflow.com/questions/2217753/changing-background-color-of-listview-items-on-android/2218270#2218270) that this is possible.


I'm currently achieving the same affect by using a custom background on each view and hiding it when the item is selected/focused/whatever so the selector is shown, but it'd be more elegant to have this all defined in one place.


For reference, this is the selector I'm using to try and get this working:



```
<selector xmlns:android="http://schemas.android.com/apk/res/android">

    <item android:state_focused="false"
        android:drawable="@drawable/list_item_gradient" />

    <!-- Even though these two point to the same resource, have two states so the drawable will invalidate itself when coming out of pressed state. -->
    <item android:state_focused="true" android:state_enabled="false"
        android:state_pressed="true"
        android:drawable="@drawable/list_selector_background_disabled" />
    <item android:state_focused="true" android:state_enabled="false"
        android:drawable="@drawable/list_selector_background_disabled" />

    <item android:state_focused="true" android:state_pressed="true"
        android:drawable="@drawable/list_selector_background_transition" />
    <item android:state_focused="false" android:state_pressed="true"
        android:drawable="@drawable/list_selector_background_transition" />

    <item android:state_focused="true"
        android:drawable="@drawable/list_selector_background_focus" />

</selector>

```

And this is how I'm setting the selector:



```
<ListView
    android:id="@android:id/list"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:listSelector="@drawable/list_selector_background" />    

```

Thanks in advance for any help!



---

I'm not sure how to achieve your desired effect through the selector itself -- after all, by definition, there is one selector for the whole list.


However, you can get control on selection changes and draw whatever you want. In [this sample project](http://github.com/commonsguy/cw-advandroid/tree/master/ListView/Selector/), I make the selector transparent and draw a bar on the selected item.

