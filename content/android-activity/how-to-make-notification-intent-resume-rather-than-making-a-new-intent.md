---
metaTitle: How to make notification intent resume rather than making a new intent
tags:
- android-intent
- notifications
- resume
title: How to make notification intent resume rather than making a new intent
---

## Context

What i have here is a simple webview activity that when loaded it auto displays an ongoing notification. The idea is that people can navigate away from this activity and quickly access it again from any screen they want by pulling down the drop down menu and selecting it. Then when they want they can just close the notification by hitting the menu button and hitting exit and then the notification clears. This all works fine. However, when the notification is pressed it starts a new instance of the activity. What would i have to change to make it see if the activity has not already been destroyed and i can just call that instance back(resume it) and therefore not needing to load it again and won't need to add another activity to my stack. Any ideas? Any help would be greatly appreciated.



```
package com.my.app;

import com.flurry.android.FlurryAgent;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent; 
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.webkit.CookieSyncManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class Chat extends Activity { 
    private ProgressDialog progressBar;
    public WebView webview;
    private static final String TAG = "Main";

    private NotificationManager mNotificationManager;
    private int SIMPLE_NOTFICATION_ID;

    @Override
    public void onStart() {
       super.onStart();
       CookieSyncManager.getInstance().sync();
       FlurryAgent.onStartSession(this, "H9QGMRC46IPXB43GYWU1");
    }

    public void onCreate(Bundle savedInstanceState) { 
        super.onCreate(savedInstanceState);
        setContentView(R.layout.chat);

        mNotificationManager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);

        final Notification notifyDetails = new Notification(R.drawable.chat_notification,"Chat Started",System.currentTimeMillis());

        notifyDetails.flags |= Notification.FLAG_ONGOING_EVENT;

        Context context = getApplicationContext();

        CharSequence contentTitle = "Chat";
        CharSequence contentText = "Press to return to chat";

        Intent notifyIntent = new Intent(context, Chat.class);

        PendingIntent intent =
        PendingIntent.getActivity(Chat.this, 0,
        notifyIntent, android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        notifyDetails.setLatestEventInfo(context, contentTitle, contentText, intent);

        mNotificationManager.notify(SIMPLE_NOTFICATION_ID, notifyDetails);

        CookieSyncManager.createInstance(this);
        CookieSyncManager.getInstance().startSync();
        webview = (WebView) findViewById(R.id.webviewchat);
        webview.setWebViewClient(new chatClient());
        webview.getSettings().setJavaScriptEnabled(true);
        webview.getSettings().setPluginsEnabled(true);
        webview.loadUrl("http://google.com");

        progressBar = ProgressDialog.show(Chat.this, "", "Loading Chat...");  
    }

    private class chatClient extends WebViewClient { 
        @Override 
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            Log.i(TAG, "Processing webview url click...");
            view.loadUrl(url);
            return true;
        }

        public void onPageFinished(WebView view, String url) {
            Log.i(TAG, "Finished loading URL: " +url);
            if (progressBar.isShowing()) {
                progressBar.dismiss();
            }
        }
    }

    public boolean onKeyDown(int keyCode, KeyEvent event) { 
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webview.canGoBack()) { 
            webview.goBack(); 
            return true; 
        }
        return super.onKeyDown(keyCode, event); 
    }

    @Override
    public boolean onCreateOptionsMenu (Menu menu) {
        super.onCreateOptionsMenu(menu);
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.chatmenu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected (MenuItem item) {
        switch (item.getItemId()) {
            case R.id.home:
                Intent a = new Intent(this, Home.class);
                startActivity(a);
                return true;
            case R.id.closechat:
                mNotificationManager.cancel(SIMPLE_NOTFICATION_ID);
                Intent v = new Intent(this, Home.class);
                startActivity(v);
                return true;
        }
        return false;
    }

    public void onStop() {
       super.onStop();
       CookieSyncManager.getInstance().sync();
       FlurryAgent.onEndSession(this);
    }
}

```

@Commonsware


Just to be sure i have it correct, is this what you were suggesting?


I was a little worried about this line, 



```
PendingIntent.getActivity(Chat.this, 0, notifyIntent, SIMPLE_NOTFICATION_ID);

public void onCreate(Bundle savedInstanceState) { 
    super.onCreate(savedInstanceState);
    setContentView(R.layout.chat);

    mNotificationManager = (NotificationManager)getSystemService(NOTIFICATION_SERVICE);

    final Notification notifyDetails = new Notification(R.drawable.chat_notification,"Chat Started",System.currentTimeMillis());

    notifyDetails.flags |= Notification.FLAG_ONGOING_EVENT;


    Context context = getApplicationContext();

    CharSequence contentTitle = "Chat";
    CharSequence contentText = "Press to return to chat";

    Intent notifyIntent = new Intent(context, Chat.class);

    PendingIntent intent =
    PendingIntent.getActivity(Chat.this, 0, notifyIntent, SIMPLE_NOTFICATION_ID);
    notifyDetails.setLatestEventInfo(context, contentTitle, contentText, intent);
    notifyIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

    mNotificationManager.notify(SIMPLE_NOTFICATION_ID, notifyDetails);


    CookieSyncManager.createInstance(this);
    CookieSyncManager.getInstance().startSync();
    webview = (WebView) findViewById(R.id.webviewchat);
    webview.setWebViewClient(new chatClient());
    webview.getSettings().setJavaScriptEnabled(true);
    webview.getSettings().setPluginsEnabled(true);
    webview.loadUrl("http://google.com");

    progressBar = ProgressDialog.show(Chat.this, "", "Loading Chat...");        
}

```


---


> 
> The idea is that people can navigate
>  away from this activity and quickly
>  access it again from any screen they
>  want by pulling down the drop down
>  menu and selecting it.
> 
> 
> 


Please make this optional.



> 
> However, when the notification is
>  pressed it starts a new instance of
>  the activity.
> 
> 
> 


That will happen by default. 



> 
> What would i have to change to make it
>  see if the activity has not already
>  been destroyed and i can just call
>  that instance back(resume it) and
>  therefore not needing to load it again
>  and won't need to add another activity
>  to my stack.
> 
> 
> 


Get rid of `FLAG_ACTIVITY_NEW_TASK`. Add `notifyIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);` -- see [this sample project](http://github.com/commonsguy/cw-andtutorials/tree/master/20-Notifications/Patchy/).



```
Context context = getApplicationContext();

```

Please don't do this. Just use your `Activity` as a `Context`.

