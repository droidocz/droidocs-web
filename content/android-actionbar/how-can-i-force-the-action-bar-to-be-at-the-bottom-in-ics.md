---
metaTitle: How can I force the Action Bar to be at the bottom in ICS
tags:
- android-4.0-ice-cream-sandwich
title: How can I force the Action Bar to be at the bottom in ICS
---

## Context

Ice Cream Sandwich (Android 4.0) adds the option of having the `Action Bar` at the bottom of the screen on phones, and that's something I'd love to have in an application of mine. The [docs](http://developer.android.com/guide/topics/ui/actionbar.html) mention `uiOptions="splitActionBarWhenNarrow"` for when you want something, i.e. tabs, at the top and `Action Bar` shortcuts at the bottom. I've tried adding the line in the application manifest, as described in the docs, but haven't got it working thus far.


Here's an example:


![enter image description here](https://i.stack.imgur.com/zbk5a.png)


Also, I noticed that on my Galaxy Nexus, which runs ICS, that the messaging application has the `Action Bar` the bottom and nothing but the title on the top, so it must be possible to somehow force the `Action Bar` to be at the bottom.


Any ideas?



---


> 
> I've tried adding the line in the application manifest, as described in the docs, but haven't got it working thus far.
> 
> 
> 


It worked for me in [this sample project](https://github.com/commonsguy/cw-android/tree/master/Menus/ActionBarBC). Here is the manifest:



```
<?xml version="1.0" encoding="utf-8"?>
<manifest package="com.commonsware.android.actionbarbc"
          xmlns:android="http://schemas.android.com/apk/res/android">

  <application android:hardwareAccelerated="true"
               android:icon="@drawable/cw"
               android:label="@string/app_name">
    <activity android:label="@string/app_name"
              android:name=".InflationDemo"
              android:uiOptions="splitActionBarWhenNarrow">
      <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
      </intent-filter>
    </activity>
  </application>
  <uses-sdk android:minSdkVersion="4"
            android:targetSdkVersion="11" />
  <supports-screens android:anyDensity="true"
                    android:largeScreens="true"
                    android:normalScreens="true"
                    android:smallScreens="true"
                    android:xlargeScreens="true" />
</manifest>

```


> 
> Also, I noticed that on my Galaxy Nexus, which runs ICS, that the messaging application has the Action Bar the bottom and nothing but the title on the top, so it must be possible to somehow force the Action Bar to be at the bottom.
> 
> 
> 


If you are referring to the conversation list, that is the `ActionBar` at the top and bottom, using `splitActionBarWhenNarrow` and the following setup code:



```
private void setupActionBar() {
    ActionBar actionBar = getActionBar();

    ViewGroup v = (ViewGroup)LayoutInflater.from(this)
        .inflate(R.layout.conversation_list_actionbar, null);
    actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM,
            ActionBar.DISPLAY_SHOW_CUSTOM);
    actionBar.setCustomView(v,
            new ActionBar.LayoutParams(ActionBar.LayoutParams.WRAP_CONTENT,
                    ActionBar.LayoutParams.WRAP_CONTENT,
                    Gravity.CENTER_VERTICAL | Gravity.RIGHT));

    mUnreadConvCount = (TextView)v.findViewById(R.id.unread_conv_count);
}

```


---

## Notes:

-  I have not examined the contents of `R.layout.conversation_list_actionbar`, sorry.
- In other words, the fix is to always have an item in the top bar that prevents the bottom content from ever fitting in there, thus forcing everything into the bottom bar?
