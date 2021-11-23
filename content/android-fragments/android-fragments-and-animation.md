---
metaTitle: Android Fragments and animation
tags:
- android-3.0-honeycomb
title: Android Fragments and animation
---

To animate the transition between fragments, or to animate the process of showing or hiding a fragment you use the `Fragment Manager` to create a `Fragment Transaction`.


Within each Fragment Transaction you can specify in and out animations that will be used for show and hide respectively (or both when replace is used). 


The following code shows how you would replace a fragment by sliding out one fragment and sliding the other one in it's place.



```
FragmentTransaction ft = getFragmentManager().beginTransaction();
ft.setCustomAnimations(R.anim.slide_in_left, R.anim.slide_out_right);

DetailsFragment newFragment = DetailsFragment.newInstance();

ft.replace(R.id.details_fragment_container, newFragment, "detailFragment");

// Start the animated transition.
ft.commit();

```

To achieve the same thing with hiding or showing a fragment you'd simply call `ft.show` or `ft.hide`, passing in the Fragment you wish to show or hide respectively.


For reference, the XML animation definitions would use the `objectAnimator` tag. An example of slide\_in\_left might look something like this:



```
<?xml version="1.0" encoding="utf-8"?>
<set>
  <objectAnimator xmlns:android="http://schemas.android.com/apk/res/android"
    android:propertyName="x" 
    android:valueType="floatType"
    android:valueFrom="-1280"
    android:valueTo="0" 
    android:duration="500"/>
</set>

```
