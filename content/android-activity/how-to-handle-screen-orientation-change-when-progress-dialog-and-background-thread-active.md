---
metaTitle: How to handle screen orientation change when progress dialog and background thread active
tags:
- android-dialog
title: How to handle screen orientation change when progress dialog and background thread active
---

## Problem

My program does some network activity in a background thread. Before starting, it pops up a progress dialog. The dialog is dismissed on the handler. This all works fine, except when screen orientation changes while the dialog is up (and the background thread is going). At this point the app either crashes, or deadlocks, or gets into a weird stage where the app does not work at all until all the threads have been killed.


How can I handle the screen orientation change gracefully?


The sample code below matches roughly what my real program does:



```
public class MyAct extends Activity implements Runnable {
    public ProgressDialog mProgress;

    // UI has a button that when pressed calls send

    public void send() {
         mProgress = ProgressDialog.show(this, "Please wait", 
                      "Please wait", 
                      true, true);
        Thread thread = new Thread(this);
        thread.start();
    }

    public void run() {
        Thread.sleep(10000);
        Message msg = new Message();
        mHandler.sendMessage(msg);
    }

    private final Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            mProgress.dismiss();
        }
    };
}

```

Stack:



```
E/WindowManager(  244): Activity MyAct has leaked window com.android.internal.policy.impl.PhoneWindow$DecorView@433b7150 that was originally added here
E/WindowManager(  244): android.view.WindowLeaked: Activity MyAct has leaked window com.android.internal.policy.impl.PhoneWindow$DecorView@433b7150 that was originally added here
E/WindowManager(  244):     at android.view.ViewRoot.<init>(ViewRoot.java:178)
E/WindowManager(  244):     at android.view.WindowManagerImpl.addView(WindowManagerImpl.java:147)
E/WindowManager(  244):     at android.view.WindowManagerImpl.addView(WindowManagerImpl.java:90)
E/WindowManager(  244):     at android.view.Window$LocalWindowManager.addView(Window.java:393)
E/WindowManager(  244):     at android.app.Dialog.show(Dialog.java:212)
E/WindowManager(  244):     at android.app.ProgressDialog.show(ProgressDialog.java:103)
E/WindowManager(  244):     at android.app.ProgressDialog.show(ProgressDialog.java:91)
E/WindowManager(  244):     at MyAct.send(MyAct.java:294)
E/WindowManager(  244):     at MyAct$4.onClick(MyAct.java:174)
E/WindowManager(  244):     at android.view.View.performClick(View.java:2129)
E/WindowManager(  244):     at android.view.View.onTouchEvent(View.java:3543)
E/WindowManager(  244):     at android.widget.TextView.onTouchEvent(TextView.java:4664)
E/WindowManager(  244):     at android.view.View.dispatchTouchEvent(View.java:3198)

```

I have tried to dismiss the progress dialog in onSaveInstanceState, but that just prevents an immediate crash. The background thread is still going, and the UI is in partially drawn state. Need to kill the whole app before it starts working again.



---

## Solution

When you switch orientations, Android will create a new View. You're probably getting crashes because your background thread is trying to change the state on the old one. (It may also be having trouble because your background thread isn't on the UI thread)


I'd suggest making that mHandler volatile and updating it when the orientation changes.



---

## Notes

- You might have pinpointed the reason for the crash. I got rid of the crash, but I still haven't figured out how to restore the UI to the state it was in before the orientation change in a reliable way.
- Having played with it recently, I can pass on that you do get a new activity when your app changes orientation. (You also get a new view) If you try to update the old view you'll get an exception because the old view has an invalid application context (your old activity)
You can kinda get around this by passing in myActivity.getApplicationContext() instead of a pointer to the activity itself.
- Essentially, you have to reconfigure the view using the old data. So I'd suggest requesting numerical status udpates from the progress bar and rebuilding a new view when you get that new 'onStart'
I can't remember offhand if you get a new activity as well but some hunting through the documentation should help.
