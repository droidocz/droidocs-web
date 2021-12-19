---
metaTitle: 'Example: Communication between Activity and Service using Messaging'
tags:
- android-service
title: 'Example: Communication between Activity and Service using Messaging'
---

## Problem

I couldn't find any examples of how to send messages between an activity and a service, and I have spent far too many hours figuring this out. Here is an example project for others to reference.


This example allows you to start or stop a service directly, and separately bind/unbind from the service. When the service is running, it increments a number at 10 Hz. If the activity is bound to the `Service`, it will display the current value. Data is transferred as an Integer and as a String so you can see how to do that two different ways. There are also buttons in the activity to send messages to the service (changes the increment-by value).


**Screenshot:**


![Screenshot of Android service messaging example](https://i.stack.imgur.com/CMPS7.png)


**AndroidManifest.xml:**



```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="com.exampleservice"
      android:versionCode="1"
      android:versionName="1.0">
    <application android:icon="@drawable/icon" android:label="@string/app_name">
        <activity android:name=".MainActivity"
                  android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    <service android:name=".MyService"></service>
    </application>
    <uses-sdk android:minSdkVersion="8" />
</manifest>

```

**res\values\strings.xml:**



```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">ExampleService</string>
    <string name="service_started">Example Service started</string>
    <string name="service_label">Example Service Label</string>
</resources>

```

**res\layout\main.xml:**







```
<RelativeLayout
    android:id="@+id/RelativeLayout01"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content" >

    <Button
        android:id="@+id/btnStart"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Start Service" >
    </Button>

    <Button
        android:id="@+id/btnStop"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:text="Stop Service" >
    </Button>
</RelativeLayout>

<RelativeLayout
    android:id="@+id/RelativeLayout02"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content" >

    <Button
        android:id="@+id/btnBind"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Bind to Service" >
    </Button>

    <Button
        android:id="@+id/btnUnbind"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:text="Unbind from Service" >
    </Button>
</RelativeLayout>

<TextView
    android:id="@+id/textStatus"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="Status Goes Here"
    android:textSize="24sp" />

<TextView
    android:id="@+id/textIntValue"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="Integer Value Goes Here"
    android:textSize="24sp" />

<TextView
    android:id="@+id/textStrValue"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:text="String Value Goes Here"
    android:textSize="24sp" />

<RelativeLayout
    android:id="@+id/RelativeLayout03"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content" >

    <Button
        android:id="@+id/btnUpby1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Increment by 1" >
    </Button>

    <Button
        android:id="@+id/btnUpby10"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:text="Increment by 10" >
    </Button>
</RelativeLayout>

```


**src\com.exampleservice\MainActivity.java:**



```
package com.exampleservice;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends Activity {
    Button btnStart, btnStop, btnBind, btnUnbind, btnUpby1, btnUpby10;
    TextView textStatus, textIntValue, textStrValue;
    Messenger mService = null;
    boolean mIsBound;
    final Messenger mMessenger = new Messenger(new IncomingHandler());

    class IncomingHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
            case MyService.MSG_SET_INT_VALUE:
                textIntValue.setText("Int Message: " + msg.arg1);
                break;
            case MyService.MSG_SET_STRING_VALUE:
                String str1 = msg.getData().getString("str1");
                textStrValue.setText("Str Message: " + str1);
                break;
            default:
                super.handleMessage(msg);
            }
        }
    }
    private ServiceConnection mConnection = new ServiceConnection() {
        public void onServiceConnected(ComponentName className, IBinder service) {
            mService = new Messenger(service);
            textStatus.setText("Attached.");
            try {
                Message msg = Message.obtain(null, MyService.MSG_REGISTER_CLIENT);
                msg.replyTo = mMessenger;
                mService.send(msg);
            }
            catch (RemoteException e) {
                // In this case the service has crashed before we could even do anything with it
            }
        }

        public void onServiceDisconnected(ComponentName className) {
            // This is called when the connection with the service has been unexpectedly disconnected - process crashed.
            mService = null;
            textStatus.setText("Disconnected.");
        }
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        btnStart = (Button)findViewById(R.id.btnStart);
        btnStop = (Button)findViewById(R.id.btnStop);
        btnBind = (Button)findViewById(R.id.btnBind);
        btnUnbind = (Button)findViewById(R.id.btnUnbind);
        textStatus = (TextView)findViewById(R.id.textStatus);
        textIntValue = (TextView)findViewById(R.id.textIntValue);
        textStrValue = (TextView)findViewById(R.id.textStrValue);
        btnUpby1 = (Button)findViewById(R.id.btnUpby1);
        btnUpby10 = (Button)findViewById(R.id.btnUpby10);

        btnStart.setOnClickListener(btnStartListener);
        btnStop.setOnClickListener(btnStopListener);
        btnBind.setOnClickListener(btnBindListener);
        btnUnbind.setOnClickListener(btnUnbindListener);
        btnUpby1.setOnClickListener(btnUpby1Listener);
        btnUpby10.setOnClickListener(btnUpby10Listener);

        restoreMe(savedInstanceState);

        CheckIfServiceIsRunning();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString("textStatus", textStatus.getText().toString());
        outState.putString("textIntValue", textIntValue.getText().toString());
        outState.putString("textStrValue", textStrValue.getText().toString());
    }
    private void restoreMe(Bundle state) {
        if (state!=null) {
            textStatus.setText(state.getString("textStatus"));
            textIntValue.setText(state.getString("textIntValue"));
            textStrValue.setText(state.getString("textStrValue"));
        }
    }
    private void CheckIfServiceIsRunning() {
        //If the service is running when the activity starts, we want to automatically bind to it.
        if (MyService.isRunning()) {
            doBindService();
        }
    }

    private OnClickListener btnStartListener = new OnClickListener() {
        public void onClick(View v){
            startService(new Intent(MainActivity.this, MyService.class));
        }
    };
    private OnClickListener btnStopListener = new OnClickListener() {
        public void onClick(View v){
            doUnbindService();
            stopService(new Intent(MainActivity.this, MyService.class));
        }
    };
    private OnClickListener btnBindListener = new OnClickListener() {
        public void onClick(View v){
            doBindService();
        }
    };
    private OnClickListener btnUnbindListener = new OnClickListener() {
        public void onClick(View v){
            doUnbindService();
        }
    };
    private OnClickListener btnUpby1Listener = new OnClickListener() {
        public void onClick(View v){
            sendMessageToService(1);
        }
    };
    private OnClickListener btnUpby10Listener = new OnClickListener() {
        public void onClick(View v){
            sendMessageToService(10);
        }
    };
    private void sendMessageToService(int intvaluetosend) {
        if (mIsBound) {
            if (mService != null) {
                try {
                    Message msg = Message.obtain(null, MyService.MSG_SET_INT_VALUE, intvaluetosend, 0);
                    msg.replyTo = mMessenger;
                    mService.send(msg);
                }
                catch (RemoteException e) {
                }
            }
        }
    }


    void doBindService() {
        bindService(new Intent(this, MyService.class), mConnection, Context.BIND_AUTO_CREATE);
        mIsBound = true;
        textStatus.setText("Binding.");
    }
    void doUnbindService() {
        if (mIsBound) {
            // If we have received the service, and hence registered with it, then now is the time to unregister.
            if (mService != null) {
                try {
                    Message msg = Message.obtain(null, MyService.MSG_UNREGISTER_CLIENT);
                    msg.replyTo = mMessenger;
                    mService.send(msg);
                }
                catch (RemoteException e) {
                    // There is nothing special we need to do if the service has crashed.
                }
            }
            // Detach our existing connection.
            unbindService(mConnection);
            mIsBound = false;
            textStatus.setText("Unbinding.");
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            doUnbindService();
        }
        catch (Throwable t) {
            Log.e("MainActivity", "Failed to unbind from the service", t);
        }
    }
}

```

**src\com.exampleservice\MyService.java:**



```
package com.exampleservice;

import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.util.Log;

public class MyService extends Service {
    private NotificationManager nm;
    private Timer timer = new Timer();
    private int counter = 0, incrementby = 1;
    private static boolean isRunning = false;

    ArrayList<Messenger> mClients = new ArrayList<Messenger>(); // Keeps track of all current registered clients.
    int mValue = 0; // Holds last value set by a client.
    static final int MSG_REGISTER_CLIENT = 1;
    static final int MSG_UNREGISTER_CLIENT = 2;
    static final int MSG_SET_INT_VALUE = 3;
    static final int MSG_SET_STRING_VALUE = 4;
    final Messenger mMessenger = new Messenger(new IncomingHandler()); // Target we publish for clients to send messages to IncomingHandler.


    @Override
    public IBinder onBind(Intent intent) {
        return mMessenger.getBinder();
    }
    class IncomingHandler extends Handler { // Handler of incoming messages from clients.
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
            case MSG_REGISTER_CLIENT:
                mClients.add(msg.replyTo);
                break;
            case MSG_UNREGISTER_CLIENT:
                mClients.remove(msg.replyTo);
                break;
            case MSG_SET_INT_VALUE:
                incrementby = msg.arg1;
                break;
            default:
                super.handleMessage(msg);
            }
        }
    }
    private void sendMessageToUI(int intvaluetosend) {
        for (int i=mClients.size()-1; i>=0; i--) {
            try {
                // Send data as an Integer
                mClients.get(i).send(Message.obtain(null, MSG_SET_INT_VALUE, intvaluetosend, 0));

                //Send data as a String
                Bundle b = new Bundle();
                b.putString("str1", "ab" + intvaluetosend + "cd");
                Message msg = Message.obtain(null, MSG_SET_STRING_VALUE);
                msg.setData(b);
                mClients.get(i).send(msg);

            }
            catch (RemoteException e) {
                // The client is dead. Remove it from the list; we are going through the list from back to front so this is safe to do inside the loop.
                mClients.remove(i);
            }
        }
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i("MyService", "Service Started.");
        showNotification();
        timer.scheduleAtFixedRate(new TimerTask(){ public void run() {onTimerTick();}}, 0, 100L);
        isRunning = true;
    }
    private void showNotification() {
        nm = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);
        // In this sample, we'll use the same text for the ticker and the expanded notification
        CharSequence text = getText(R.string.service_started);
        // Set the icon, scrolling text and timestamp
        Notification notification = new Notification(R.drawable.icon, text, System.currentTimeMillis());
        // The PendingIntent to launch our activity if the user selects this notification
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, new Intent(this, MainActivity.class), 0);
        // Set the info for the views that show in the notification panel.
        notification.setLatestEventInfo(this, getText(R.string.service_label), text, contentIntent);
        // Send the notification.
        // We use a layout id because it is a unique number.  We use it later to cancel.
        nm.notify(R.string.service_started, notification);
    }
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("MyService", "Received start id " + startId + ": " + intent);
        return START_STICKY; // run until explicitly stopped.
    }

    public static boolean isRunning()
    {
        return isRunning;
    }


    private void onTimerTick() {
        Log.i("TimerTick", "Timer doing work." + counter);
        try {
            counter += incrementby;
            sendMessageToUI(counter);

        }
        catch (Throwable t) { //you should always ultimately catch all exceptions in timer tasks.
            Log.e("TimerTick", "Timer Tick Failed.", t);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (timer != null) {timer.cancel();}
        counter=0;
        nm.cancel(R.string.service_started); // Cancel the persistent notification.
        Log.i("MyService", "Service Stopped.");
        isRunning = false;
    }
}

```


---

## Solution

Look at the [LocalService example](http://developer.android.com/reference/android/app/Service.html#LocalServiceSample).


Your `Service` returns an instance of itself to consumers who call `onBind`. Then you can directly interact with the service, e.g. registering your own listener interface with the service, so that you can get callbacks.



---

## Notes

- The problem with `LocalBroadcastManager` is that it's non-blocking and you have to wait for results.
- I've used a `LocalBroadcastManager` to continuously exchange data between two `Activity` instances.
- Can you please help me with this question https://stackoverflow.com/questions/51508046/binding-a-jobintentservice-to-a-activity
