---
title: "Android Intent"
---

**From the [Android Developers reference site](https://developer.android.com/reference/android/content/Intent.html):**



> 
> An Intent provides a facility for performing late runtime binding
>  between the code in different applications. Its most significant use
>  is in the launching of activities, where it can be thought of as the
>  glue between activities. It is basically a passive data structure
>  holding an abstract description of an action to be performed.
> 
> 
> 


**The Basics**


Intents are used extensively within the Android Platform for telling the operating system that a certain action needs to be performed. At first glance, the apparent use of Intents is to start Activities (components that have a user interface). Upon gaining even a limited experience with Android development, it becomes clear that it is used for nearly every component within the Android platform.


Services are bound or started by Activities. BroadcastReceivers listen for Intents that are sent either by the operating system or other applications. Even Widgets cannot be placed onto the Home Screen without an Intent. 


**Intent Actions**


The Action is the core of the Intent. It is simply a string that is passed to the operating system to indicate a given action. Some are general and provided directly by the platform. Others are specific to packages and unique tasks. This allows for any developer to create their own Intents with very little effort for either public or private use.


A Custom Intent Action follows the form `"top.company.package.DO_SOMETHING"`, where: top is the top-level domain following usage conventions (com for commercial, org for non-commercial organization, edu for educational organization, etc); company is the company name of the developer; package is the name of the package; and DO\_SOMETHING is a meaningful name describing the action. Android-provided Intents can be found at: [Intent Filters](https://developer.android.com/guide/topics/intents/intents-filters.html)


*Example:* `com.softwareheroes.coolui.SHOW_LOG` might show the log file for the Cool UI application made by the fictional commercial enterprise Software Heroes.


**Intent Extras**


Many times when starting another application component, developers will need to transmit information. The threading model can sometimes make this difficult, especially when communicating with different types of components. Intent Extras allow you to transmit a wide variety of data without having to resort to complex threading or security access levels. A full list of data types that can be transmitted and received is located [here](https://developer.android.com/reference/android/content/Intent.html).


**Pending Intents**


Pending Intents are Intents that are created early to be fired later on behalf on the application that created it. Using this mechanism, an application may create an Intent to respond to a possible future event and even give that Intent to an external application. The most popularized use of these is in notifications, which require that when clicked on they perform *some* action.


**When to Use This Tag**


Since Intents are so widely used, it is hard to gauge when it might be appropriate to use this tag. In general, if you simply want to know which Intent starts which application or what the Intent is when a common system event occurs, one should refer to the [reference](https://developer.android.com/reference/android/content/Intent.html) or [guide](https://developer.android.com/guide/topics/intents/intents-filters.html). These also link to several tutorials. If these resources do not address the specific need or query, then simply try and verify that the issue is really a lack of understanding with regard to Intents or the specific Intent.



> 
> *Poor Example:* How do I respond to an SMS message?
> 
> 
> 


This is common knowledge and provided in the [explanation of Intents](https://developer.android.com/guide/topics/intents/intents-filters.html) on the Android Developer site.



> 
> *Good Example:* Can I pass the extras from Intent to another safely?
> 
> 
> 

