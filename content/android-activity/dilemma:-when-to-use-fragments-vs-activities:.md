---
metaTitle: 'Dilemma: when to use Fragments vs Activities:'
tags:
- android-fragments
- architecture
title: 'Dilemma: when to use Fragments vs Activities:'
---

## Context

I know that `Activities` are designed to represent a single screen of my application, while `Fragments` are designed to be reusable UI layouts with logic embedded inside of them.


Until not long ago, I developed an application as it said that they should be developed.
I created an `Activity` to represent a screen of my application and used Fragments for `ViewPager` or `Google Maps`. I rarely created a `ListFragment` or other UI that can be reused several times.


Recently I stumbled on a project that contains only 2 `Activities` one is a `SettingsActivity` and other one is the `MainActivity`. The layout of the `MainActivity` is populated with many hidden full screen UI fragments and only one is shown. In the `Activity` logic there are many `FragmentTransitions` between the different screens of the application.


What I like about this approach is that because the application uses an `ActionBar`, it stays intact and does not move with the screen switching animation, which is what happens with `Activity` switching. This give a more fluent feel to those screen transitions.


So I guess what I'm asking is to share your current development manner regarding this topic, I know it might look like an opinion based question at first look but I look at it as an Android design and architecture question... Not really an opinion based one.


**UPDATE (01.05.2014):** Following this presentation by **Eric Burke** from **Square**, (which I have to say is a great presentation with a lot of useful tools for android developers. And I am not related in any way to Square)


<http://www.infoq.com/presentations/Android-Design/>


From my personal experience over the past few months, I found that the best way to construct my applications is to create groups of fragments that come to represent a **flow** in the application and present all those fragments in one `Activity`. So basically you will have the same number of `Activities` in your application as the number of flows.
That way the action bar stays intact on all the flow's screens, but is being recreated on changing a flow which makes a lot of sense. As Eric Burke states and as I have come to realize as well, the philosophy of using as few `Activities` as possible is not applicable for all situations because it creates a mess in what he calls the "God" activity.



---

Experts will tell you: "When I see the UI, I will know whether to use an `Activity` or a `Fragment`". In the beginning this will not have any sense, but in time, you will actually be able to tell if you need `Fragment` or not. 


There is a good practice I found very helpful for me. It occurred to me while I was trying to explain something to my daughter. 


Namely, imagine a box which represents a screen. Can you load another screen in this box? If you use a new box, will you have to copy multiple items from the 1st box? If the answer is Yes, then you should use `Fragments`, because the root `Activity` can hold all duplicated elements to save you time in creating them, and you can simply replace parts of the box. 


But **don't forget** that you always need a box container (`Activity`) or your parts will be dispersed. So one box with parts inside.


Take care not to misuse the box. Android UX experts advise (you can find them on YouTube) when we should explicitly load another `Activity`, instead to use a `Fragment` (like when we deal with the Navigation Drawer which has categories). Once you feel comfortable with `Fragments`, you can watch all their videos. Even more they are mandatory material. 


Can you right now look at your UI and figure out if you need an `Activity` or a `Fragment`? Did you get a new perspective? I think you did.



---

## Notes

- do you have a link to the youtube feed you mentioned? I search for "Android UX experts" and "Android UX" but am not entirely sure which videos you're talking about.
- One example of consideration: activity has parentActivity so we can synthesize backstack while entering from notification, but I don't think there's such parentFragment.
-  there is getParentFragment: https://developer.android.com/reference/android/support/v4/app/Fragment#getparentfragment
-  yes it's getParentFragment, but it's not what I meant dude, see https://developer.android.com/guide/topics/manifest/activity-element#parent
