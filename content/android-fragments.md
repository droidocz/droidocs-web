---
title: "Android Fragments"
---


> 
> A `Fragment` represents a behavior or a portion of user interface in an `Activity`. and reuse a fragment in multiple activities.
> 
> 
> Fragments were first introduced in Android 3.0 (API 11). However, the
>  [Support V4 Library](https://stackoverflow.com/tags/android-compat-lib/info) back-ported fragments to every version of
>  Android from 1.6 (API 4) onwards.
> 
> 
> 


Here are the important things to understand about fragments:


* A Fragment is a combination of an XML layout file and a java class much like an Activity.
* Using the support library, fragments are supported back to all relevant Android versions.
* Fragments encapsulate views and logic so that it is easier to reuse within activities.
* Fragments are standalone components that can contain views, events and logic.
* You can combine multiple fragments in a single activity to build a multi-pane UI.


[![Usage of Fragments in different environments](https://i.stack.imgur.com/OXTpt.png)](https://i.stack.imgur.com/OXTpt.png)


* You can add fragments to your app directly with XML or through the `FragmentManager` in Java.
* The `FragmentManager` is responsible for all runtime management of fragments including adding, removing, hiding, showing, or otherwise navigating between fragments. The fragment manager is also responsible for finding fragments within an activity.


The ApiDemos sample application present in the SDK provides runnable fragment examples and source code.


You can find more information in:


* Android [Developers Guide on Fragments](https://developer.android.com/guide/topics/fundamentals/fragments.html)
* Developer Blog: [The Android 3.0 Fragments API](https://android-developers.blogspot.com/2011/02/android-30-fragments-api.html)
* [Official Fragment Documentation](https://developer.android.com/reference/android/app/Fragment.html)
* [Official Support v4 Fragment Documentation](https://developer.android.com/reference/android/app/Fragment.html)
* [Creating and Using Fragments - Codepath](http://guides.codepath.com/android/Creating-and-Using-Fragments)
* Compatibility Library's [official documentation](https://developer.android.com/tools/support-library/features.html#v4)


**Tag Usage:**


[![](https://i.stack.imgur.com/tKsDb.png)android](/questions/tagged/android "show questions tagged 'android'") [android-fragmentmanager](/questions/tagged/android-fragmentmanager "show questions tagged 'android-fragmentmanager'") [android-fragmentactivity](/questions/tagged/android-fragmentactivity "show questions tagged 'android-fragmentactivity'") [android-listfragment](/questions/tagged/android-listfragment "show questions tagged 'android-listfragment'") [android-dialogfragment](/questions/tagged/android-dialogfragment "show questions tagged 'android-dialogfragment'") [fragmentpageradapter](/questions/tagged/fragmentpageradapter "show questions tagged 'fragmentpageradapter'") [fragment-tab-host](/questions/tagged/fragment-tab-host "show questions tagged 'fragment-tab-host'") [fragmenttransaction](/questions/tagged/fragmenttransaction "show questions tagged 'fragmenttransaction'") [fragmentstatepageradapter](/questions/tagged/fragmentstatepageradapter "show questions tagged 'fragmentstatepageradapter'") [android-nested-fragment](/questions/tagged/android-nested-fragment "show questions tagged 'android-nested-fragment'") [dialogfragment](/questions/tagged/dialogfragment "show questions tagged 'dialogfragment'") [fragment-backstack](/questions/tagged/fragment-backstack "show questions tagged 'fragment-backstack'")

