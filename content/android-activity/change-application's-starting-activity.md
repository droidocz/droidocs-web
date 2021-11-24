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
