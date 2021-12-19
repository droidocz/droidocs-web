---
metaTitle: Using the "animated circle" in an ImageView while loading stuff
tags:
- loading
- geometry
title: Using the "animated circle" in an ImageView while loading stuff
---

## Problem

I am currently using in my application a listview that need maybe one second to be displayed.


What I currently do is using the @id/android:empty property of the listview to create a "loading" text.



```
 <TextView android:id="@id/android:empty"
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           android:background="#FF0000"
           android:text="Loading..."/>

```

Now, I would like to replace that with the animated circle that is used in a loading dialog instead of this text, i guess you all know what I mean:


Edit: I do not want a dialog. I want to show that inside my layout.


![http://flexfwd.com/DesktopModules/ATI_Base/resources/images/loading_blue_circle.gif](https://i.stack.imgur.com/h6viz.gif)


Thank a lot for your help!



---

## Solution

Simply put this block of xml in your activity layout file:



```
<RelativeLayout
    android:id="@+id/loadingPanel"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center" >

    <ProgressBar
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:indeterminate="true" />
</RelativeLayout>

```

And when you finish loading, call this one line:



```
findViewById(R.id.loadingPanel).setVisibility(View.GONE);

```

The result (and it spins too): 


![enter image description here](https://i.stack.imgur.com/1sp1o.png)

