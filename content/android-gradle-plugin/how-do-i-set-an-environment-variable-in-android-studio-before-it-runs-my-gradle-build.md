---
metaTitle: How do I set an environment variable in Android Studio before it runs my gradle build
tags:
- android-studio
- gradle
title: How do I set an environment variable in Android Studio before it runs my gradle build
---

## Problem

My Gradle build looks at an environment variable called BUILD\_NUMBER to determine the version to allocate to my android application as follows:



```
def buildNumber = System.getenv("BUILD_NUMBER") ?: "local"

```

So as long as that environment variable is set, the build number is used in defaultConfig as follows:



```
versionName "1.4.0."+buildNumber

```

Usually, Jenkins will call this Gradle build and supply the BUILD\_NUMBER environment variable.


If I run the Gradle build from my command prompt, I know I can set BUILD\_NUMBER = x.


However, if I build using Android Studio, how can I set the BUILD\_NUMBER environment variable through Android Studio itself?



---

## Solution

One option is to make use of gradle properties that can be overriden by environment variables. You can read about it [here](https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_properties_and_system_properties).



> 
> If the environment variable name looks like **ORG\_GRADLE\_PROJECT**\_*prop*=somevalue, then Gradle will set a prop property on your project object, with the value of somevalue.
> 
> 
> 


What this means is that you can


1. set `BUILD_NUMBER=42` in your `.properties` file (project, or global) as you would usually do,
2. and in your CI you would name the environment variable `ORG_GRADLE_PROJECT_BUILD_NUMBER`, overwriting or setting `BUILD_NUMBER` in your CI build.




---


*Note:* Use `gradle.properties` in your project root directory, and do not modify `local.properties`.



---

## Notes

- Unfortunately the properties in the local.properties file is not automatically made available in build.gradle, so I had to manually read the local.properties file in my build.gradle script.
- `local.properties` are generated and used by android studio / android plugin. The "local" properties are in the `gradle.properties` file in the project root dir.
