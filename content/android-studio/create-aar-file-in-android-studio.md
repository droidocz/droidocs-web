---
metaTitle: Create aar file in Android Studio
tags:
- jar
- aar
title: Create aar file in Android Studio
---

## Context

I'd like to create an aar file for my library in Android Studio, i would've gone with a jar option but my library has resources.


Any idea how to create an aar file from a library?



---

Retrieve exported .aar file from local builds
=============================================


If you have a module defined as an android library project you'll get .aar files for all build flavors (debug and release by default) in the `build/outputs/aar/` directory of that project. 



```
your-library-project
    |- build
        |- outputs
            |- aar
                |- appframework-debug.aar
                 - appframework-release.aar

```

If these files don't exist start a build with



```
gradlew assemble

```

for macOS users



```
./gradlew assemble

```

Library project details
=======================


A library project has a `build.gradle` file containing `apply plugin: com.android.library`. For reference of this library packaged as an `.aar` file you'll have to define some properties like package and version. 


Example `build.gradle` file for library (this example includes obfuscation in release):



```
apply plugin: 'com.android.library'

android {
    compileSdkVersion 21
    buildToolsVersion "21.1.0"

    defaultConfig {
        minSdkVersion 9
        targetSdkVersion 21
        versionCode 1
        versionName "0.1.0"
    }
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

```

Reference .aar file in your project
===================================


In your app project you can drop this `.aar` file in the `libs` folder and update the `build.gradle` file to reference this library using the below example:



```
apply plugin: 'com.android.application'

repositories {
    mavenCentral()
    flatDir {
        dirs 'libs' //this way we can find the .aar file in libs folder
    }
}

android {
    compileSdkVersion 21
    buildToolsVersion "21.0.0"

    defaultConfig {

        minSdkVersion 14
        targetSdkVersion 20
        versionCode 4
        versionName "0.4.0"

        applicationId "yourdomain.yourpackage"
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        debug {
            minifyEnabled false
        }
    }
}

dependencies {
    compile 'be.hcpl.android.appframework:appframework:0.1.0@aar'
}

```

Alternative options for referencing local dependency files in gradle can be found at: <http://kevinpelgrims.com/blog/2014/05/18/reference-a-local-aar-in-your-android-project> 


Sharing dependencies using maven
================================


If you need to share these `.aar` files within your organization check out maven. A nice write up on this topic can be found at: <https://web.archive.org/web/20141002122437/http://blog.glassdiary.com/post/67134169807/how-to-share-android-archive-library-aar-across>


About the .aar file format
==========================


An aar file is just a `.zip` with an alternative extension and specific content. For details check [this link about the aar format](http://tools.android.com/tech-docs/new-build-system/aar-format).



---

## Notes

- +1 for `gradlew assemble` - that solved the problem I was having.
- For posterity: `gradlew` is a script in the **project toplevel directory**.
-  How to convert my android project into .aar file
