---
metaTitle: Android - Removing Activity from Flavor
tags:
- android-activity
- android-productflavors
title: Android - Removing Activity from Flavor
---

## Context

How to remove an activity from an app flavor? Here is a simplified example, I have an app which has the following two flavors (Paid and Free). The app is small and only has 3 activities (MainActivity, ActivityOne and ActivityTwo). The paid app does not need any limitations since it will use the full code base. The free app however requires it to have MainActivity and ActivityTwo accessible to the user and not ActivityOne. How can I do a "Manifest Merge" when compiling the code so that ActivityOne is not present on the free version? In other words how should **src/free/AndroidManifest.xml** be created so that the free app does not have ActivityOne?


Below is the **build.gradle** file for the app:



```
apply plugin: 'com.android.application'

android {
    compileSdkVersion 21
    buildToolsVersion "21.1.2"

    defaultConfig {
        applicationId "com.example.calculator"
        minSdkVersion 21
        targetSdkVersion 21
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    productFlavors {
        paid {
            applicationId "com.example.paid"
            resValue "string", "app_name", "Paid Calculator"
            versionName "1.0-full"
        }
        free {
            applicationId "com.example.free"
            resValue "string", "app_name", "Free Calculator"
            versionName "1.0-free"
        }
    }
    sourceSets {
        paid {
            manifest.srcFile 'src/paid/AndroidManifest.xml'
        }
        free {
            manifest.srcFile 'src/free/AndroidManifest.xml'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:cardview-v7:21.0.0'
    compile 'com.android.support:recyclerview-v7:21.0.0'
    compile 'com.android.support:design:22.2.0'
    compile 'com.android.support:appcompat-v7:22.2.0'
}

```

Below is the manifest file for the app It is located at **src/main/AndroidManifest.xml**:



```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.calculator">

    <application
        android:name="com.example.calculator.ui.activities.AppController"
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:theme="@style/AppTheme">
        <activity
            android:name=".ui.activities.MainActivity"
            android:label="@string/app_name">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name=".ui.activities.ActivityOne"
            android:label="@string/title_activity_one"
            android:parentActivityName=".ui.activities.MainActivity">
            <meta-data
                android:name="android.support.PARENT_ACTIVITY"
                android:value=".ui.activities.MainActivity" />
        </activity>
        <activity
            android:name=".ui.activities.ActivityTwo"
            android:label="@string/title_activity_two"
            android:parentActivityName=".ui.activities.MainActivity">
            <meta-data
                android:name="android.support.PARENT_ACTIVITY"
                android:value=".ui.activities.MainActivity" />
        </activity>
    </application>
</manifest>

```


---

In your **free** flavor, in the `AndroidManifest` you can specify:



```
<activity android:name=".ui.activities.ActivityOne" tools:node="remove"/>

```

The marker **tools:node="remove"** will make the merger remove any activities with `android:name=".ui.activities.ActivityOne"`



---

## Notes

- Just tried this solution today and it is working as expected so it was either a bug in build system or a wrong priority as described here https://developer.android.com/studio/build/manifest-merge
(tried with as 3.2.1)
- It seems that the marker **tools:node="remove"** works with activity sub-nodes, but it does not work with the activity node itself. I also checked the merged manifest in the apk with the aapt tool, and the activity node is not removed.
- You only need to make sure there is a copied manifest under your **free** directory and modify that activity node in the **free** flavor's manifest.
