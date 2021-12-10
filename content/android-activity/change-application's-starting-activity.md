---
metaTitle: Change application's starting activity
title: Change application's starting activity
---

## Context

I have created the meat and guts of my application but I want to add a different activity that will be the starting point (sort of a log-in screen).


Couple questions:


* 1 I have a fairly decent handle on how to switch between activities (based on this article: <http://www.linux-mag.com/id/7498>) but I'm not sure **how to go about creating a new one (with eclipse)**.
* 2 Once I have a new activity created, **how can I set it as the default activity of my application?** I presume I could just change the name of the classes...but is there a more elegant way to handle that (maybe within the `AndroidManifest.xml`)?


---

Yes, you use the `AndroidManifest.xml` file. You can actually even have more than one launcher activity specified in your application manifest. To make an activity seen on the launcher you add these attributes to your activity in the manifest:



```
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>

```


---

## Notes

- This is correct answer, but I just noticed something odd: if you change the starting Activity to anything else, and the original launched activity still exists, the SDK won't be able to launch your application anymore. Somehow it has a reference to the activity on the launch configuration. So after you do the above change, you also need to go to "Run" &gt; "Debug Configurations", find your project's build profile, tab "Android", and change the launched activity to either the default or the correct one under "Launch:". Not sure why the default was deselected for me, but changing it back worked.
-  it will make that activity appear on the launcher page, you can have multiple activities with this intent-filter giving you multiple icons on the homescreen.
- So by including that intent-filter node with it's child nodes, that makes whatever activity it's in the first one to load when the application starts?
- you mention this line "ou can actually even have more than one launcher activity specified in your application manifest".Which activity will first launch if we have more than one activity
- My application is a first time installation application.
- In AndroidStudio it's necessary to manually change the starting activity since it ignores the manifest.xml file.
- is there any shortcut in android studio to make any activity to main activity, like "right click(on any activity file)" -&gt; "make main activity" etc ?
- It is really odd to get in Eclipse and find out that you can't use 'Properties' context menu of a project. I am wandering if Android Studio allow us to set the main activity.
