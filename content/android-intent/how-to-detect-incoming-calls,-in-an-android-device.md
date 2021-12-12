---
metaTitle: How to detect incoming calls, in an Android device
tags:
- android-permissions
- incoming-call
title: How to detect incoming calls, in an Android device
---

## Context

I'm trying to make an app like, when a call comes to the phone I want to detect the number. Below is what I tried, but it's not detecting incoming calls. 


I want to run my `MainActivity` in background, how can I do that?


I had given the permission in `manifest` file.



```
<uses-permission android:name="android.permission.READ_PHONE_STATE"/>

```

Is there anything else should I provide in the manifest?



```
public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.test_layout);
   }

   public class myPhoneStateChangeListener extends PhoneStateListener {
       @Override
       public void onCallStateChanged(int state, String incomingNumber) {
           super.onCallStateChanged(state, incomingNumber);
           if (state == TelephonyManager.CALL_STATE_RINGING) {
               String phoneNumber =   incomingNumber;
           }
       }
   }
}

```


---

Here's what I use to do this:


Manifest:



```
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.PROCESS_OUTGOING_CALLS"/>

<!--This part is inside the application-->
    <receiver android:name=".CallReceiver" >
        <intent-filter>
            <action android:name="android.intent.action.PHONE_STATE" />
        </intent-filter>
        <intent-filter>
            <action android:name="android.intent.action.NEW_OUTGOING_CALL" />
        </intent-filter>
    </receiver>

```

My base reusable call detector



```
package com.gabesechan.android.reusable.receivers;

import java.util.Date;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.TelephonyManager;

public abstract class PhonecallReceiver extends BroadcastReceiver {

    //The receiver will be recreated whenever android feels like it.  We need a static variable to remember data between instantiations

    private static int lastState = TelephonyManager.CALL_STATE_IDLE;
    private static Date callStartTime;
    private static boolean isIncoming;
    private static String savedNumber;  //because the passed incoming is only valid in ringing


    @Override
    public void onReceive(Context context, Intent intent) {

        //We listen to two intents.  The new outgoing call only tells us of an outgoing call.  We use it to get the number.
        if (intent.getAction().equals("android.intent.action.NEW_OUTGOING_CALL")) {
            savedNumber = intent.getExtras().getString("android.intent.extra.PHONE_NUMBER");
        }
        else{
            String stateStr = intent.getExtras().getString(TelephonyManager.EXTRA_STATE);
            String number = intent.getExtras().getString(TelephonyManager.EXTRA_INCOMING_NUMBER);
            int state = 0;
            if(stateStr.equals(TelephonyManager.EXTRA_STATE_IDLE)){
                state = TelephonyManager.CALL_STATE_IDLE;
            }
            else if(stateStr.equals(TelephonyManager.EXTRA_STATE_OFFHOOK)){
                state = TelephonyManager.CALL_STATE_OFFHOOK;
            }
            else if(stateStr.equals(TelephonyManager.EXTRA_STATE_RINGING)){
                state = TelephonyManager.CALL_STATE_RINGING;
            }


            onCallStateChanged(context, state, number);
        }
    }

    //Derived classes should override these to respond to specific events of interest
    protected abstract void onIncomingCallReceived(Context ctx, String number, Date start);
    protected abstract void onIncomingCallAnswered(Context ctx, String number, Date start);
    protected abstract void onIncomingCallEnded(Context ctx, String number, Date start, Date end);

    protected abstract void onOutgoingCallStarted(Context ctx, String number, Date start);      
    protected abstract void onOutgoingCallEnded(Context ctx, String number, Date start, Date end);

    protected abstract void onMissedCall(Context ctx, String number, Date start);

    //Deals with actual events

    //Incoming call-  goes from IDLE to RINGING when it rings, to OFFHOOK when it's answered, to IDLE when its hung up
    //Outgoing call-  goes from IDLE to OFFHOOK when it dials out, to IDLE when hung up
    public void onCallStateChanged(Context context, int state, String number) {
        if(lastState == state){
            //No change, debounce extras
            return;
        }
        switch (state) {
            case TelephonyManager.CALL_STATE_RINGING:
                isIncoming = true;
                callStartTime = new Date();
                savedNumber = number;
                onIncomingCallReceived(context, number, callStartTime);
                break;
            case TelephonyManager.CALL_STATE_OFFHOOK:
                //Transition of ringing->offhook are pickups of incoming calls.  Nothing done on them
                if(lastState != TelephonyManager.CALL_STATE_RINGING){
                    isIncoming = false;
                    callStartTime = new Date();
                    onOutgoingCallStarted(context, savedNumber, callStartTime);                     
                }
                else
                {
                    isIncoming = true;
                    callStartTime = new Date();
                    onIncomingCallAnswered(context, savedNumber, callStartTime); 
                }

                break;
            case TelephonyManager.CALL_STATE_IDLE:
                //Went to idle-  this is the end of a call.  What type depends on previous state(s)
                if(lastState == TelephonyManager.CALL_STATE_RINGING){
                    //Ring but no pickup-  a miss
                    onMissedCall(context, savedNumber, callStartTime);
                }
                else if(isIncoming){
                    onIncomingCallEnded(context, savedNumber, callStartTime, new Date());                       
                }
                else{
                    onOutgoingCallEnded(context, savedNumber, callStartTime, new Date());                                               
                }
                break;
        }
        lastState = state;
    }
}

```

Then to use it, simply derive a class from it and implement a few easy functions, whichever call types you care about:



```
public class CallReceiver extends PhonecallReceiver {

    @Override
    protected void onIncomingCallReceived(Context ctx, String number, Date start)
    {
        //
    }

    @Override
    protected void onIncomingCallAnswered(Context ctx, String number, Date start)
    {
        //
    }

    @Override
    protected void onIncomingCallEnded(Context ctx, String number, Date start, Date end)
    {
        //
    }

    @Override
    protected void onOutgoingCallStarted(Context ctx, String number, Date start)
    {
        //
    } 

    @Override 
    protected void onOutgoingCallEnded(Context ctx, String number, Date start, Date end)
    {
        //
    }

    @Override
    protected void onMissedCall(Context ctx, String number, Date start)
    {
        //
    }

}

```

In addition you can see a writeup I did on why the code is like it is on my [blog](http://gabesechansoftware.com/is-the-phone-ringing/#more-8). Gist link: <https://gist.github.com/ftvs/e61ccb039f511eb288ee>


EDIT: Updated to simpler code, as I've reworked the class for my own use



---

## Notes

- Just to add to this, it did not work when the app was not in foreground or background until I added this in the receiver: "android:enabled="true"
- This code doesn't display anything. Actually displaying it is your job, because I have no way of knowing how you want that done.
- There was a problem related to runtime permissions. READ_PHONE_STATE is a dangerous permission and needs to be asked on run time.
- you don't have `onOutgoingCallAnswered`
- You can write it to disk, say via shared preference but that can cause you to have false results as well-  it would prevent you from having your data properly cleared in several cases, such as around phone reboot. For my use case the rare null and lost data was better than incorrect data.
- A dialer app can try and send one, but there's no way to do it programatically. You should really avoid using USSD, there's generally better ways to do it-  USSD should be considered deprecated, its basically all legacy systems these days.
-  One question should I get the information for Dual sim mobile & on which sim receives call?
- `lastState`  should not be initialized to `CALL_STATE_IDLE`. I am missing few calls when my app gets killed while the current state is `RINGING`. Because when it becomes `IDLE` again on call ends, static variable is re-initialized to `CALL_STATE_IDLE` and it debounces doing nothing. So we lose the reference to `lastState`.
- I also wanted to ask about the status for `onOutgoingCallAnswered`
- Nice solution, but it remembers the previous state only while your app was not removed from memory (see static fields).
- I'm using the same code and running it on my OnePlus One. I've registered the receiver in the Manifest and also added the necessary permission. Using the exact same code.
- Unless you only want to know while you're activity ruins, in which case you need to register it programmatically
- Will this work if the app targets O, as there are new broadcast receiver limitations now? https://developer.android.com/preview/features/background.html#broadcasts
-  I got it, - `startService(new Intent(this, CallReceiver.class));`
- I detect some bugs , fixed them in this link : https://stackoverflow.com/a/68077549/10598138
- this doesn't work at all for me... in `MainActivity.onCreate(){}` I've placed `receiver = new CallReceiver(this);` and declared `private CallReceiver receiver;` globally but nothing runs
- Unfortunately the code doesn't' work for me (Android Studio 8).
-  - Just adding some detail to your comment -- Android 8 (API 26+) is when you must start registering receivers programmatically and not through the Manifest. Here is a blog about it: https://android.jlelse.eu/android-o-impact-on-running-apps-and-developer-viewpoint-b9f23047f306. It is also mentioned on the Developers.Android site in the change log for Android 8.0
- I learnt abstract class with this example !
- Also can you explain how to get which sim receives the call if the phone is a dual sim phone please?
- My preferred failure method for whay I was doing was to risk losing a call over risking stake data. For other problems it may differ.
-  Depends on the use case, I guess. Unfortunately it could happen that your app is removed from memory while the call is on (because the OS starts running out of memory) and get started again when the call ends by reacting on the incoming broadcast about the changed telephony state. In this scenario onOutgoingCallEnded callback is called with empty data instead of onIncomingCallEnded or onMissedCall.
- Tested it on Android 9 (API 28) and still works. [For more information](https://developer.android.com/guide/components/broadcast-exceptions)
- But it seems Android doesn't give the tools to manage this multiple line cases.
-  how will I start the call receiver without the main activity.
-  ReadPhoneState requires runtime permission. Other than that, I don't know of any reason it wouldn't, but I haven't tested it in a year or so, I haven't done any work that required this functionality.
- Never mind, I followed this tutorial: https://www.youtube.com/watch?v=DXPwxOc9-gw
-  when i call ussd code like *111# this receiver doest not work and can't detect any state but when i call a number works fine can you tell what is the problem?
-  doesn't work on some devices unless you register `PhonecallReceiver` with `registerReceiver`.
- You're right. The original version I posted didn't, I added that in a refactor to make things less clunky. As for enabled-true should be the default, according to the docs.
- Shouldn't the overriden methods in the subclass have Context in their signature?
- can i use this for flutter method channel
- PROCESS_OUTGOING_CALLS is sensitive permission, google play gonna reject your application if you use it
- On API level 28, null is always passed to onIncomingCallStarted.
- If the application is no longer in memory, I believe state is lost, even when using static variables.
- Nice use of `Abstraction`.
- Marshamellow+ requires run time permission
- Were you launching an Activity/Service from here, or were you just doing some work directly in the handler functions? In the first case, it may need a wakelock. In the second it ought to work, I've done it before (it would write to the database when calls ended, and it worked even when asleep).
