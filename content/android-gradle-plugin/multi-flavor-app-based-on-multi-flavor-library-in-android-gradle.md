---
metaTitle: Multi flavor app based on multi flavor library in Android Gradle
tags:
- gradle
title: Multi flavor app based on multi flavor library in Android Gradle
---

## Context

My app has several flavors for several markets in-app-billing systems.


I have a single library which shares the base code for all of my projects. So I decided to add those payment systems to this library as product flavors. 


The question is can android library have product flavors?


If so, how can I include different flavors in respective flavor of the app?


I searched a lot, and I couldn't find anything about this scenario. The only close thing I found was this in <http://tools.android.com/tech-docs/new-build-system/user-guide>:



```
dependencies {
    flavor1Compile project(path: ':lib1', configuration: 'flavor1Release')
    flavor2Compile project(path: ':lib1', configuration: 'flavor2Release')
}

```

I changed configuration to different things but it did not work!


I'm using android studio 0.8.2.



---

There are one problem with [Ali](https://stackoverflow.com/questions/24860659/multi-flavor-app-based-on-multi-flavor-library-in-android-gradle/24910671#24910671) answer. We are losing one very important dimension in our build variants. If we want to have all options (in my example below 4 (2 x 2)) we just have to add **custom configurations** in *main module build.gradle* file to be able to use all multi-flavor multi-buildType in `Build Variants`. We also have to set **publishNonDefault true** in the *library module build.gradle* file.


Example solution:


**Lib build.gradle**



```
android {

    publishNonDefault true

    buildTypes {
        release {
        }
        debug {
        }
    }
    productFlavors {
        free {
        }
        paid {
        }
    }
}

```

**App build.gradle**



```
android {

    buildTypes {
        debug {
        }
        release {
        }
    }
    productFlavors {
        free {
        }
        paid {
        }
    }
}

configurations {
    freeDebugCompile
    paidDebugCompile
    freeReleaseCompile
    paidReleaseCompile
}

dependencies {

    freeDebugCompile project(path: ':lib', configuration: 'freeDebug')
    paidDebugCompile project(path: ':lib', configuration: 'paidDebug')
    freeReleaseCompile project(path: ':lib', configuration: 'freeRelease')
    paidReleaseCompile project(path: ':lib', configuration: 'paidRelease')

}

```


---

## Notes

- After doing same stuff in My application, `Error:java.lang.RuntimeException: Error: more than one library with package name` , occoured
