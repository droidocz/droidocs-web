---
metaTitle: Using the "animated circle" in an ImageView while loading stuff
tags:
- loading
- geometry
title: Using the "animated circle" in an ImageView while loading stuff
---

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

