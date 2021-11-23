---
metaTitle: Change application's starting activity
title: Change application's starting activity
---

Yes, you use the `AndroidManifest.xml` file. You can actually even have more than one launcher activity specified in your application manifest. To make an activity seen on the launcher you add these attributes to your activity in the manifest:



```
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>

```
