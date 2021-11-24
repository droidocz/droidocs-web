---
metaTitle: Activity restart on rotation Android
tags:
- rotation
title: Activity restart on rotation Android
---

## Context

In my Android application, when I rotate the device (slide out the keyboard) then my `Activity` is restarted (`onCreate` is called). Now, this is probably how it's supposed to be, but I do a lot of initial setting up in the `onCreate` method, so I need either:


1. Put all the initial setting up in another function so it's not all lost on device rotation or
2. Make it so `onCreate` is not called again and the layout just adjusts or
3. Limit the app to just portrait so that `onCreate` is not called.


---

**Using the Application Class**


Depending on what you're doing in your initialization you could consider creating a new class that extends `Application` and moving your initialization code into an overridden `onCreate` method within that class.



```
public class MyApplicationClass extends Application {
  @Override
  public void onCreate() {
    super.onCreate();
    // TODO Put your application initialization code here.
  }
}

```

The `onCreate` in the application class is only called when the entire application is created, so the Activity restarts on orientation or keyboard visibility changes won't trigger it.


It's good practice to expose the instance of this class as a singleton and exposing the application variables you're initializing using getters and setters.


*NOTE: You'll need to specify the name of your new Application class in the manifest for it to be registered and used:*



```
<application
    android:name="com.you.yourapp.MyApplicationClass"

```

**Reacting to Configuration Changes** *[UPDATE: this is deprecated since API 13; [see the recommended alternative](http://www.androiddesignpatterns.com/2013/04/retaining-objects-across-config-changes.html)]*


As a further alternative, you can have your application listen for events that would cause a restart – like orientation and keyboard visibility changes – and handle them within your Activity.


Start by adding the `android:configChanges` node to your Activity's manifest node



```
 <activity android:name=".MyActivity"
      android:configChanges="orientation|keyboardHidden"
      android:label="@string/app_name">

```

or for [Android 3.2 (API level 13) and newer](https://stackoverflow.com/a/9550231/2291):



```
<activity android:name=".MyActivity"
      android:configChanges="keyboardHidden|orientation|screenSize"
      android:label="@string/app_name">

```

Then within the Activity override the `onConfigurationChanged` method and call `setContentView` to force the GUI layout to be re-done in the new orientation.



```
@Override
public void onConfigurationChanged(Configuration newConfig) {
  super.onConfigurationChanged(newConfig);
  setContentView(R.layout.myLayout);
}

```
