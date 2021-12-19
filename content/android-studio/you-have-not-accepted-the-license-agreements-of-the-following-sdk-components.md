---
metaTitle: You have not accepted the license agreements of the following SDK components
tags:
- gradle
- android-sdk-tools
title: You have not accepted the license agreements of the following SDK components
---

## Problem

I downloaded the latest Android SDK tools version 24.4.1. I used the command line to install SDKs. I typed `y` when asked 



> 
> Do you accept the license 'android-sdk-license-c81a61d9' [y/n]: y
>  after that install succeeded.
> 
> 
> 


But when using Gradle 3.1 to build, the follows shows up 



> 
> You have not accepted the license agreements of the following SDK components:
>  [Android SDK Platform 23, Android SDK Build-Tools 23.0.1].
>  Before building your project, you need to accept the license agreements and complete the installation of the missing components using the Android Studio SDK Manager.
>  Alternatively, to learn how to transfer the license agreements from one workstation to another, go to <http://d.android.com/r/studio-ui/export-licenses.html>
> 
> 
> 


I checked `~/.android` and `/opt/android-sdk` where Android tools are put. Neither contain folder named `licenses`.



---

## Solution

I have resolve the problem by using the command:



> 
> 1. Go to: C:\Users\ [PC NAME] \AppData\Local\Android\sdk\tools\bin\ (If the folder is not available then download the android SDK first, or
>  you can install it from the android studio installation process.)
> 2. Shift+Left click and Press W,then Enter to open CMD on the folder path
> 3. Type in the cmd: sdkmanager --licenses
> 4. Once press enter, you need to accept all the licenses by pressing y
> 
> 
> 


CHECKING THE LICENSES



> 
> 1. Go to: C:\Users[PC NAME]\AppData\Local\Android\sdk\
> 2. Check the folder named licenses
> 
> 
> 



```
android-googletv-license
android-sdk-license
android-sdk-preview-license
google-gdk-license
intel-android-extra-license
mips-android-sysimage-license

```

WAS TESTED ON CORDOVA USING THE COMMAND: 



> 
> cordova build android
> 
> 
> 


-- **UPDATE NEW FOLDER PATH** --


Open Android Studio, Tools > Sdk Manager > Android SDK Command-Line Tools (Just Opt-in)


[![enter image description here](https://i.stack.imgur.com/c45em.png)](https://i.stack.imgur.com/c45em.png)


SDKManager will be store in :



> 
> 1. Go to C:\Users\ [PC NAME] \AppData\Local\Android\Sdk\cmdline-tools\latest\bin
> 2. Type in the cmd: sdkmanager --licenses
> 
> 
> 


Documentation to using the Android SDK: <https://developer.android.com/studio/command-line/sdkmanager.html>



---

## Notes

- not windows, but `ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.`
- Using the sdk-manager available after following your install directions and path you suggested above (I use Arch Linux so --&gt; `/home/[USER]/Android/Sdk/cmdline-tools/latest/bin/sdkmanager`) allowed me to get past the licenses issue! The `sdkmanager` installed by Android SDK here `/opt/android-sdk/tools/bin/sdkmanager` seems to be broken.
