---
metaTitle: Unfortunately System UI has stopped
title: Unfortunately System UI has stopped
---

## Context

I gets this message every time I start 4.0.3 emulator in WXGA800 mode. My app works fine without running System UI except action bar does not appears and I can't test my actionbar functionality. 
My OS is Win7 x64. Sdk revision 19.
Any ideas?
![System message screenshot](https://i.stack.imgur.com/WuV5M.png)


Stacktrace:



```
FATAL EXCEPTION: main
java.lang.RuntimeException: Unable to create service com.android.systemui.SystemUIService: java.lang.RuntimeException: Tablet device cannot show navigation bar and system bar
at android.app.ActivityThread.handleCreateService(ActivityThread.java:2263)
at android.app.ActivityThread.access$1600(ActivityThread.java:123)
at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1201)
at android.os.Handler.dispatchMessage(Handler.java:99)
at android.os.Looper.loop(Looper.java:137)
at android.app.ActivityThread.main(ActivityThread.java:4424)
at java.lang.reflect.Method.invokeNative(Native Method)
at java.lang.reflect.Method.invoke(Method.java:511)
at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:784)
at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:551)
at dalvik.system.NativeStart.main(Native Method)
Caused by: java.lang.RuntimeException: Tablet device cannot show navigation bar and system bar
at com.android.systemui.statusbar.tablet.TabletStatusBar.makeStatusBarView(TabletStatusBar.java:451)
at com.android.systemui.statusbar.StatusBar.start(StatusBar.java:64)
at com.android.systemui.statusbar.tablet.TabletStatusBar.start(TabletStatusBar.java:390)
at com.android.systemui.SystemUIService.onCreate(SystemUIService.java:93)
at android.app.ActivityThread.handleCreateService(ActivityThread.java:2253)

```

I figured it out. It happens when hw.mainKeys set to false in AVD setings. Thanks for your answers!



---

You can't have both system bar and navigation bar:



> 
> Caused by: java.lang.RuntimeException: Tablet device cannot show
>  navigation bar and system bar
> 
> 
> 


This is taken from the source of [`TabletStatusBar#makeStatusBarView`](http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/4.0.1_r1/com/android/systemui/statusbar/tablet/TabletStatusBar.java#TabletStatusBar.makeStatusBarView%28%29) note the comment:



```
     try {
         // Sanity-check that someone hasn't set up the config wrong and asked for a navigation
         // bar on a tablet that has only the system bar
         if (mWindowManager.hasNavigationBar()) {
             throw new RuntimeException(
                     "Tablet device cannot show navigation bar and system bar");
         }
     } catch (RemoteException ex) {
     }

```


---

## Notes

- It happens when hw.mainKeys set to false in AVD setings.
- I was a little confused about what `hw.mainKeys=false` does. I'm still confused, but removing it leaves the emulator with a nav/system bar at the bottom of the screen with soft home and back keys, which is what you want, I think.
- How could i do this, i have the Same Problem
