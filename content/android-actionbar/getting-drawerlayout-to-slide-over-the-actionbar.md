---
metaTitle: Getting DrawerLayout to Slide over the ActionBar
tags:
- android-ui
- android-tabs
- slidingdrawer
title: Getting DrawerLayout to Slide over the ActionBar
---

## Context

I have a sliding drawer menu in an activity, which has an actionbar with some tabs on it. 


I'd like to get the sliding drawer to slide over the tabs , not below them. 


This is what it looks like right now...


![Sliding menu under action bar tabs](https://i.stack.imgur.com/WaUgql.png)


Any ideas on how this could be done?


Note: I understand that I might be breaking some conventions and UI patterns here, and if it does not work at all, I'll look at alternatives. But I'd like to get this working first.


**EDIT:** See the below screen shot of the Google Play Music app that does exactly what I need. See @CommonsWare's answer below where he does agree that I might be breaking convention. But then given the Play Music app, it may not be altogether that rare either. 


![Proper navigation with tabs sliding correctly](https://i.stack.imgur.com/i1e4Ul.png)



---


> 
> Any ideas on how this could be done?
> 
> 
> 


Do any of the following:


* Switch away from action bar tabs, perhaps to `ViewPager` and a tabbed indicator (`PagerTabStrip`, `TabPageIndicator` from ViewPageIndicator)
* See if an existing third-party drawer implementation has not yet updated to the new UI standards
* Fork `DrawerLayout` and modify it to suit
* Roll your own navigation drawer from scratch



> 
> I understand that I might be breaking some conventions and UI patterns here
> 
> 
> 


[Correct](http://developer.android.com/design/patterns/navigation-drawer.html).



---

## Notes

-  Google Play Music is not using action bar tabs. It is using a `HorizontalScrollView` around a `LinearLayout` and a set of `TextView` widgets for "My Library" tabs above the `ViewPager`. I'm not sure where else in Play Music tabs are used -- that's the only spot I'm seeing. If you want the Google Play Music approach, I'd use a `ViewPager` and a suitable indicator.
- In light of the fact the above design does depart from conventions ( and I'd rather not ) , I do have a case for doing so, where the sliding drawer menu acts as top level navigation, and the tabs are navigation within a section of the app.
- So far the only place where I've seen a sliding drawer menu implemented alongside action bar tabs is the new Google Play Music app (in the My Library section), and it does work as expected, with the menu sliding over the tabs, instead of under them.
