---
metaTitle: Android Fragments and animation
tags:
- android-3.0-honeycomb
title: Android Fragments and animation
---

## Context

How should you implement the sort of sliding that for example the Honeycomb Gmail client uses?


Can `TransactionManager` handle this automatically by adding and removing the Fragments, it's kind of difficult to test this due to the emulator being a slideshow :)



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


---

## Notes:

- When i tried this it show *RuntimeException: Unknown animator name: translate*.


- For the other readers, you could also have android:interpolator as an attribute, with your favorite one specified (such as "


- I'm targeting API Level 7 with the compatability APIs.


- you can try using a compatibility library like [NineOldAndroids](http://nineoldandroids.com/) to bring the Honeycomb API down to Eclair.


- Make sure the animations defined in slide\_in\_left and right are constructed using a set of objectAnimator definitions rather than the old animation definition.


- `ObjectAnimator` causes an exception for me, whereas `translate` animation works fine.


- See http://www.github.com/kedzie/Support\_v4\_NineOldAndroids for details. It allows using Property Animations for Fragment Transitions, PageTransformers, and some other stuff.


- this only works when using the support library. See the following answer for more info: http://stackoverflow.com/a/9856449/435605


- Is there a built-in transition that is already used for activities, which I can use for fragments too?


- Please note that by using `fragmentTransaction.replace()`, you may be causing fragments to hit lifecycle events unnecessarily when the user presses the back button as compared to `fragmentTransaction.add()`. But, if you use `.add()`, you're not going to get as nice of an animation :) See here: http://stackoverflow.com/a/21684520/1738090


- This was supported by the translate object, but I can't used the "old" animations with FragmentTransaction. Also if I use the objectAnimator, will it stil work when running on devices lower than API 11?


- what if one wants to apply a custom animation ? the way you apply for other views using startAnimation method


- Nine Old doesn't work with fragment https://github.com/JakeWharton/NineOldAndroids/issues/43


- If you want to make a transition that works on both 2.x and 3.0+ you should first look here: http://stackoverflow.com/a/7892524/969325.


