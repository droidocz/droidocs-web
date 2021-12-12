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

The accepted answer is for older versions of android studio and most of them works still now. Updating android studio made it a little bit faster. Don't bother to specify heap size as it'll increase automatically with the increase of Xms and Xmx. Here's some modification with the VMoptions


1. In bin folder there's a studio.vmoptions file to set the environment configuration. In my case this is studio64.vmoptions
Add the following lines if they're not added already and save the file. In my case I've 8GB RAM.



```
-Xms4096m
-Xmx4096m
-XX:MaxPermSize=2048m
-XX:+CMSClassUnloadingEnabled
-XX:+CMSPermGenSweepingEnabled 
-XX:+HeapDumpOnOutOfMemoryError
-Dfile.encoding=utf-8`

```
2. Start android studio. Go to File-> Settings-> Build, Execution, Deployment-> Compiler


	* Check compile independent modules in parallel
	* In command-line Options write: --offline
	* Check Make project automatically
	* Check configure on demand


In case of using mac, at first I couldn't find the vmoptions. Anyway, here's a [nice article about how we can change the vmoptions in MAC OSX](http://lifeofcoding.com/2015/01/19/How-to-increase-Android-studio-memory-limit-in-Mac/). Quoting from this article here.


Open your terminal and put this command to open the vmoptions in MAC OSX:



```
open -e /Applications/Android\ Studio.app/Contents/bin/studio.vmoptions

```


---

## Notes

- as of AS 2.3.2 you can change vim options by help-&gt; Edit Custom Vm Options
