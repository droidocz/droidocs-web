---
metaTitle: 'Android: how to hide ActionBar on certain activities'
tags:
- java
title: 'Android: how to hide ActionBar on certain activities'
---

## Problem

I've developed a simple demo application with a splash screen a map and some regular screens.


I have an action bar at the top that contains a logo. It all looks fine on my phone (Galaxy s1 I9000 V2.3) but when i test it on Galaxy s2 v4 the action bar appears also in the splash screen and in the map screen.


The spalsh and map activity are not even inheriting from ActionBarActivity so how is that possible and how can i make it go away?


Manifest:



```
<application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:theme="@style/Theme.AppCompat.Light" >
        <activity
            android:name=".HomeActivity"
            android:icon="@drawable/android_logo"
            android:label=""
            android:logo="@drawable/android_logo" >

            <!--
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            -->
        </activity>
        <activity
            android:name=".MapActivity"
            android:label="" >
        </activity>
        <activity
            android:name=".PackageActivity"
            android:icon="@drawable/android_logo"
            android:label=""
            android:logo="@drawable/android_logo" >
        </activity>
        <activity
            android:name=".SplashActivity"
            android:label="" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

    </application>

```

MapActivity definition (it's a long one so i included just the definition):



```
public class MapActivity extends FragmentActivity implements LocationListener

```

Splash Activity:



```
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;

public class SplashActivity extends Activity{

    private static final long SPLASH_DISPLAY_LENGTH = 2000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        new Handler().postDelayed(new Runnable(){
            @Override
            public void run() {
                Intent mainIntent = new Intent(SplashActivity.this,HomeActivity.class);
                SplashActivity.this.startActivity(mainIntent);
                SplashActivity.this.finish();
            }
        }, SPLASH_DISPLAY_LENGTH);

    }

}

```


---

## Solution

As you are asking about how to **hide** in a **certain activity**, this is what you need :



```
getSupportActionBar().hide(); 

```
