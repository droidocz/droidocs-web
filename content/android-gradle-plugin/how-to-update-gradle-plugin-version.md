---
metaTitle: How to update Gradle Plugin version
tags:
- android-studio
- build.gradle
title: How to update Gradle Plugin version
---

## Context

I am trying to run a project and it shows me:



> 
> Error running app: This version of Android Studio is incompatible with
>  the Gradle Plugin used. Try disabling Instant Run (or updating either
>  the IDE or the Gradle plugin to the latest version)
> 
> 
> 


What should I do? 


How can I update gradle?



---

The gradle plugin is declared inside the build.gradle file in your modules or in your root folder (top-level file). 


Use:



```
 classpath 'com.android.tools.build:gradle:2.0.0'

```

Also this requires gradle 2.10 (don't confuse the gradle plugin with gradle).  

The gradle version is defined in `gradle/wrapper/gradle-wrapper.properties`. 


Use:



```
distributionUrl=https\://services.gradle.org/distributions/gradle-2.10-all.zip

```


---

## Notes

- another thumbs up for pointing out the diff between gradle and android gradle plugin versions
- For the new Gradle 3.3 update, usue the following: `distributionUrl=https\://services.gradle.org/distributions/gradle-3.3-all.zip`
