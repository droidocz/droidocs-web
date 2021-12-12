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

So you can change it programmatically easily by using homeAsUpIndicator() function that added in android API level 18 and upper. 


`ActionBar().setHomeAsUpIndicator(R.drawable.ic_yourindicator);`


If you use support library


`getSupportActionBar().setHomeAsUpIndicator(R.drawable.ic_yourindicator);`



---

## Notes

- If you are using a drawer, you must call `drawerToggle.setDrawerIndicatorEnabled(false);` before changing the indicator
-  Thank you, setDrawerIndicatorEnabled(false / true); solved my problem to set home button as consistent 'Back' and (Open Drawer / Close Drawer) based on my requirements.
