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



---

## Notes

- `<item name="android:homeAsUpIndicator"> didn't work for me, but `&lt;item name="homeAsUpIndicator"&gt; did. Guess it's android version thing
- I was declaring inside the style set as my ActionBarStyle as in AOSP on github but it was not working - moving out into the main theme did the trick!
- Anyone made this work with `Navigation Drawer`? I guess `ActionBarDrawerToggle` replaces the up indicator with one of its own, therefore setting it on style has no effect...
- Might be worth noting that if you want the already available holo icons, use  or 
-  the only way I was able to do this was via a custom layout.
- I tried &lt;item name="homeAsUpIndicator"&gt; in the values&gt;styles.xml and values-v11&gt;styles.xml. I am using v7-appcompat library.
- I had to add it to both the main theme and actionbar theme.
- 'android:homeAsUpIndicator' in values-v14, 'homeAsUpIndicator' in default values.
- use this in main theme， not in actionbarStyle， as [http://stackoverflow.com/questions/13168843/actionbarsherlock-changing-homeasupindicator-doesnt-work/13168883#13168883](http://stackoverflow.com/questions/13168843/actionbarsherlock-changing-homeasupindicator-doesnt-work/13168883#13168883) works for sherlock 4.4.0
- This gave me both the default back arrow and the selected icon instead of replacing the back arrow.
- Is there a possibility to provide padding for the "up" indicator and the logo that I would be using beside it?
-  it seems you're missing something "android:homeAsUpIndicator" not "homeAsUpIndicator" alone
-  actually i think that just like all the other stuff you can customize, if you want to handle both API11 and above and below, you need to have both items used.
- Because using R.drawable.abc_ic_ab_back_mtrl_am_alpha to change color has risks, as support version changes the drawable resource frequently.
- See this question https://stackoverflow.com/questions/54234481/is-it-possible-to-change-up-button-icon-in-navigation-component and this https://issuetracker.google.com/u/1/issues/121078028. Despite navigation component reaching version `2.2.1` customizing nav icon is still not supported.
