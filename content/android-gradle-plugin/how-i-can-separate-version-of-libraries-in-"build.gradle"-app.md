---
metaTitle: How I can separate version of libraries in "build.gradle" app
tags:
- gradle
- build.gradle
title: How I can separate version of libraries in "build.gradle" app
---

## Context

I'm trying to separate versions of the libraries to have all of them in one location in order to save time and complexity.


I saw a guy in some comment in some blog that sais the way he use to do this. He posted the next screens.


[![First Screen](https://i.stack.imgur.com/qfJvD.jpg)](https://i.stack.imgur.com/qfJvD.jpg)


[![Second Screen](https://i.stack.imgur.com/m1nwB.jpg)](https://i.stack.imgur.com/m1nwB.jpg)


I can't use this way to construct the gradle, but I think that is a good way.


My Project build.gradle file:



```
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
        maven {
            url "https://maven.google.com"
        }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
        maven {
            url "https://maven.google.com"
        }
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}

// Definition of versions of libraries
ext {

    toolVersions = [

            android :[
                    versionCode    : 1,
                    versionName    : "0.0.1",
                    minSdk          : 16,
                    targetSdk       : 26,
                    compileSdk      : 26,
                    buildTools      : "26.0.2",
                    support         : "26.1.0"
            ],
            espressoCore   : "2.2.2",
            junit           : "4.12"

    ]

    libVersions = [
            glide   :   "4.2.0",
            flubber :   "1.0.1"
    ]

}

```

My app build.gradle file:



```
apply plugin: 'com.android.application'

android {
    compileSdkVersion toolVersions.android.compileSdk
    buildToolsVersion toolVersions.android.buildTools
    defaultConfig {
        applicationId "com.maol.brastlewark"
        minSdkVersion toolVersions.android.minSdk
        targetSdkVersion toolVersions.android.targetSdk
        versionCode toolVersions.android.versionCode
        versionName toolVersions.android.versionName
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    androidTestCompile('com.android.support.test.espresso:espresso-core:' + toolVersion.espressoCore, {
        exclude group: 'com.android.support', module: 'support-annotations'
    })

    // SUPPORT LIBRARIES
    compile 'com.android.support:appcompat-v7:' toolVersion.support
    compile "com.android.support:support-core-utils:$rootProject.toolVersion.support"
    testCompile "junit:junit:$rootProject.toolVersion.junit"

    // IMAGE LOADER LIBRARY
    compile "com.github.bumptech.glide:glide:$rootProject.libVersions.glide"
    annotationProcessor "com.github.bumptech.glide:compiler:$rootProject.libVersions.glide"

    // VIEW ANIMATIONS
    compile "com.appolica:flubber:$rootProject.libVersions.flubber"

}

```

I don't know how to used this in the build.gradle (app). Anyone in the room can advised me something?


Thank you



---

You can create a file (for example `gradleScript/dependecies.gradle`):



```
ext {
    //Version
    supportLibrary = '26.1.0'

    //Support Libraries dependencies
    supportDependencies = [
            design           :         "com.android.support:design:${supportLibrary}",
            recyclerView     :         "com.android.support:recyclerview-v7:${supportLibrary}",
            cardView         :         "com.android.support:cardview-v7:${supportLibrary}",
            appCompat        :         "com.android.support:appcompat-v7:${supportLibrary}",
            supportAnnotation:         "com.android.support:support-annotations:${supportLibrary}",
    ]
}

```

In the top level file `build.gradle` add:



```
// Load dependencies
apply from: 'gradleScript/dependencies.gradle'

```

In the `module1/build.gradle`:



```
// Module build file

dependencies {
    //......
    compile supportDependencies.appCompat
    compile supportDependencies.design
}

```


---

## Notes

- I might be late but this might help beginners : to apply whole `supportDependencies` group do `supportDependencies.values()`.
- How to implement directly whole `supportDependencies` group?
- This approach doesn't show warning like https://miro.medium.com/max/3708/1*hgOycRk5Rds-gOS80Hz6IA.png
