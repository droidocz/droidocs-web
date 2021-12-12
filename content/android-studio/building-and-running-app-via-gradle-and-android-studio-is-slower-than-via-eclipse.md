---
metaTitle: Building and running app via Gradle and Android Studio is slower than via Eclipse
tags:
- gradle
- build.gradle
title: Building and running app via Gradle and Android Studio is slower than via Eclipse
---

## Context

I have a multi-project (~10 modules) of which building takes about 20-30 seconds each time. When I press Run in Android Studio, I have to wait every time to rebuild the app, which is extremely slow.


Is it possible to automate building process in Android Studio? Or do you have any advice on how to make this process faster?


In Eclipse, thanks to automatic building, running the same project on an emulator takes about 3-5 seconds.


This is my build.gradle file (app module):



```
buildscript {
    repositories {
        maven { url 'http://repo1.maven.org/maven2' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:0.4'
    }
}
apply plugin: 'android'

dependencies {
    compile fileTree(dir: 'libs', include: '*.jar')
    compile project(':libraries:SharedLibs')
    compile project(':libraries:actionbarsherlock')
    compile project(':libraries:FacebookSDK')
    compile project(':libraries:GooglePlayServices')
    compile project(':libraries:HorizontalGridView')
    compile project(':libraries:ImageViewTouch')
    compile project(':libraries:SlidingMenu')
}

android {
    compileSdkVersion 17
    buildToolsVersion "17.0.0"

    defaultConfig {
        minSdkVersion 8
        targetSdkVersion 16
    }
}

```


---

Searched everywhere for this and finally found a solution that works for us. Enabling parallel builds (On OSX: `preferences -> compiler -> gradle -> "Compile independent modules in parallel"`) and enabling 'make project automatically' brought it down from ~1 min to ~20 sec. Thanks to /u/Covalence.


<http://www.reddit.com/r/androiddev/comments/1k3nb3/gradle_and_android_studio_way_slower_to_build/>



---

## Notes

- 20 seconds is still awfully slow.
- I've tested it out on a single module app, and it didn't make any difference.
