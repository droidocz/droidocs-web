---
metaTitle: startActivity() from BroadcastReceiver
tags:
- broadcastreceiver
title: startActivity() from BroadcastReceiver
---

## Problem

I am trying to autostart my nightclock application on charging using the following BroadcastReceiver implemented in the onPause() method:



```
BroadcastReceiver test = new BroadcastReceiver() {
    @Override
    public void onReceive(Context context, Intent intent) {
        unregisterReceiver(this);
        Intent i = new Intent(context, NightClock.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(i);   
    }           
};
registerReceiver(test, new IntentFilter(Intent.ACTION_POWER_CONNECTED));

```

The onReceive() method is fired when the USB-cable is plugged in, but the activity doesn't start. However the log shows this:



```
I/ActivityManager(   79): Starting activity: Intent { flg=0x10000000 cmp=com.meins.nightclock/.NightClock }

```

Any ideas why the log says the activity is started, but nothing happens?



---

## Solution

If your goal is that you want `NightClock` to be started whenever an `ACTION_POWER_CONNECTED` broadcast is sent, your approach of using a `BroadcastReceiver` is fine. However, do not register it from an activity. Rather, register it in the manifest:



```
<receiver android:name=".OnPowerReceiver">
        <intent-filter>
                <action android:name="android.intent.action.ACTION_POWER_CONNECTED" />
        </intent-filter>
</receiver>

```

Then, have your `BroadcastReceiver` as a public Java class (here named `OnPowerReceiver`, though you can call it whatever you want), and have it call `startActivity()`.


Bear in mind that users probably do not want you doing this. There are many other cases for connecting a phone to power besides starting a "night clock". I humbly suggest you simply let users start your activity via the home screen.



---

## Notes

- Try `<action android:name="android.intent.action.ACTION_POWER_CONNECTED" />`. Most of the time, they do not have the `ACTION_` in the string, but apparently they do on this one.
- you need to set flag `setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)`
- I've registered the `BroadcastReceiver` in the manifest like you said with this call in the `onReceive()` method: `context.startActivity(new Intent(context, NightClock.class));` But nothing happens when I connect the phone to power. Not even a log entry is added if I add `Log.d(this.toString(), "trying to start app ...");` to the method.
- what will do, if application is removed from task list?
