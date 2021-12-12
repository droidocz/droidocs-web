---
metaTitle: How to manage different support library versions for 3rd party deps with gradle
tags:
- android-studio
- gradle
- dependency-management
title: How to manage different support library versions for 3rd party deps with gradle
---

## Context

I have a bunch of third party libs that I include in my base application. I cannot control the support library those 3rd party modules include. This makes it hard to have the same version of the android support library in my application.


I know using gradle when I can exclude certain libraries from each dependency:



```
compile('com.test:lib1:1.0.0') {
    exclude group: 'com.android.support'
}

```

However there are a ton of support libraries and excluding them all for each one of my 3rd party libraries seems like overkill.


Is there a better way?


Reading this blog post: <https://www.devsbedevin.net/android-understanding-gradle-dependencies-and-resolving-conflicts/>


It suggests:



```
configurations.all {
  resolutionStrategy {
    preferProjectModules()
  }
}

```

However when using that I still get a warning in Android Studio in my gradle file that there are multiple versions of the support library detected.


What do I do if my dependencies depend on different versions of the support library? In either case above I would be forcing the 3rd party libraries to use a specific version of the support library that they were not build with. Which version am I supposed to use? Latest support library? Min support library of all 3rd party dependencies?


Here is a minimal gradle file example showing pulling in 3rd party dependencies that each depend on their own version of the support library.



```
android {
    compileSdkVersion 26
    buildToolsVersion '26.0.2'

    defaultConfig {
        applicationId "com.example.app"
        minSdkVersion 17
        targetSdkVersion 25
    }
}

configurations.all {
    resolutionStrategy {
        preferProjectModules()
    }
}

dependencies {
    compile 'com.android.support:support-v13:26.0.0'
    compile 'com.test:lib1:1.0' // depends on support-v13:25.0.0
    compile 'com.test:lib2:1.0' // depends on support-v13:25.2.0
    compile 'com.test:lib3:1.0' // depends on support-v13:25.4.0
    compile 'com.test:lib4:1.0' // depends on support-v13:26.0.0
}

```

Android studio gives the following warning:


[![enter image description here](https://i.stack.imgur.com/wqQxA.png)](https://i.stack.imgur.com/wqQxA.png)



---

This is certainly possible. In your projects build.gradle file (the top level build.gradle file) add the following code block:



```
ext {
    supportlib_version = '26.1.0'
    gps_version = '11.2.0'
}

//Ensure that all dependencies use the same version of the Android Support library
subprojects {
    project.configurations.all {
        resolutionStrategy.eachDependency { details ->
            if (details.requested.group == 'com.android.support'
                    && !details.requested.name.contains('multidex')) {
                details.useVersion "$supportlib_version"
            }
            if (details.requested.group == 'com.google.android.gms'
                    && !details.requested.name.contains('multidex')) {
                details.useVersion "$gps_version"
            }
        }
    }
}

```

The following code ensures that the 'com.android.support' dependency version will be equal to $supportlib\_version for all dependencies. The same for the 'com.google.android.gms' framework.


Make sure that in your module's build.gradle file you also use these versions for your dependencies. E.g.:



```
compile "com.android.support:support-v4:$supportlib_version"

```

Read more about forcing a certain dependency version in the [Official Gradle documentation](https://docs.gradle.org/current/dsl/org.gradle.api.artifacts.ResolutionStrategy.html).


**Update**
[Google has decoupled library versions](https://developers.google.com/android/guides/versioning). Therefore, forcing a specific version above 15.0.0 may not work. Instead, you can allow a limited range of versions. The example below allows any version higher than 15.0.0 but lower than 16.



```
gps_version = '[15.0.0, 16.0.0)'

```


---

## Notes

- Sure but what if the support library version that my dependencies were built with are not compatible with the support library I am using. And doesn't referProjectModules() do the same thing?
- But using multiple versions of a support library in one project, this may also load to bugs. Since using a high support library version should resolve the former (as newer versions are backward compatible), I would recommend the former.
