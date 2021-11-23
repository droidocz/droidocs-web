---
metaDescription: 'Questions about creating or managing Activities in Android. In Android Applications, an Activity is a Component that provides a user interface allowing the user to do something. Simple examples are: dial the phone, take a photo, send an email, or view a map.'
metaTitle: Android Activity
title: Android Activity
---

**Introduction**


In Android, an Activity is one of the several components that can make up an Android Application. What distinguishes an Activity from all other components is that it is the only component that can (and must) have a user interface. Since most applications are not useful without some way for the user to interact with the program, Activities are the most common components, as nearly every application has at least one and some have many.


For security and user protection, there are many things that can only be done from an Activity. 


**Creating an Activity**


The Activity class is a base class and must be extended for each and every Activity that you want to include. In order for an Activity to run, there is some amount of Java code required. This means that some level of Java expertise is also required. Once the code has been assembled, it is ready to be used by the system.


In order for an Activity to be called by the system (or any other app, including the home launcher), it must know that it exists. Each and every Activity must be declared in the AndroidManifest.xml by using an `<activity>`-tag. 


* Questions regarding the Android Manifest should refer to [android-manifest](/questions/tagged/android-manifest "show questions tagged 'android-manifest'").


**The User Interface**


In Android, the user interface of an Activity is called the Layout. The Layout is a hierarchy of extended Views that are rendered to the screen. Layouts may be created using
either by using [XML](https://developer.android.com/guide/topics/ui/declaring-layout.html) or [Java code](https://developer.android.com/reference/android/widget/package-summary.html). Regardless of which method was used to create the Layout, it may always be modified by Java code. 


* Questions regarding layout should refer to [android-layout](/questions/tagged/android-layout "show questions tagged 'android-layout'").
* Layout defined by android XML may also utilize the [android-xml](/questions/tagged/android-xml "show questions tagged 'android-xml'") tag.


**The Activity LifeCycle**


Every Activity in Android is subject to a LifeCycle. The LifeCycle performs the job of notifying the Activity when certain events have occurred, allowing the program to respond to them accordingly, if needed. This happens from the point that an Activity is started (`onCreate()`) all the way until the Activity is killed (`onDestroy()`). The LifeCycle events make no distinction between user-initiated events or simulated events. 


Due to the imposition of the LifeCycle on all Activities, it is very important to be aware which methods are called and when, as some of them can affect the stability of the application if not accounted for. Each has its own arguments for processing and many are repeated throughout the life of the Activity. The Android LifeCycle consists of the following methods (not necessarily in order): `onCreate()`, `onStart()`, `onResume()`, `onConfigurationChanged()`, `onRestoreInstanceState()`, `onPause()`, `onSaveInstanceState()`, `onStop()`, and `onDestroy()`.


![Android Activity lifecycle](https://i.stack.imgur.com/BKoFw.png)


* Questions regarding the LifeCycle should also use the tag [android-lifecycle](/questions/tagged/android-lifecycle "show questions tagged 'android-lifecycle'").


**Activities and Contexts**


Contexts are used often in Android to attribute certain actions to a task. They also help by routing operations that may run outside the developer's code so that it is attributed to the correct instance of the Activity. While there are several kinds of Contexts, Activity is also a Context and most methods that require one will easily accept a reference to the Activity. 


**Further reading:**


* [Activities Developer Guide](https://developer.android.com/guide/topics/fundamentals/activities.html)
* [Activity Class Reference](https://developer.android.com/reference/android/app/Activity.html)
