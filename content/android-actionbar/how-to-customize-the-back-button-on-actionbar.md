---
metaTitle: How to customize the back button on ActionBar
title: How to customize the back button on ActionBar
---

## Context

I have been able to customize the action bar's background, logo image and text color using suggestions from these:  

[Android: How to change the ActionBar "Home" Icon to be something other than the app icon?](https://stackoverflow.com/questions/6351479/android-how-to-change-the-actionbar-home-icon-to-be-something-other-than-the)  

[ActionBar text color](https://stackoverflow.com/questions/5861661/actionbar-text-color)  

[ActionBar background image](https://stackoverflow.com/questions/5861870/actionbar-background-image)


The last piece I want to customize is the back button image. It's grey by default and I would like it to be white. Either changing the color, specifying a drawable or simply making it transparent (and adding the chevron to my customized logo image) would work. How do I go about that?



---

The "up" affordance indicator is provided by a drawable specified in the `homeAsUpIndicator` attribute of the theme. To override it with your own custom version it would be something like this:



```
<style name="Theme.MyFancyTheme" parent="android:Theme.Holo">
    <item name="android:homeAsUpIndicator">@drawable/my_fancy_up_indicator</item>
</style>

```

If you are supporting pre-3.0 with your application be sure you put this version of the custom theme in `values-v11` or similar.

