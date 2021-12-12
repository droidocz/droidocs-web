---
metaTitle: Android Studio gradle-###-bin.zip vs. gradle-###-all.zip
tags:
- android-studio
title: Android Studio gradle-###-bin.zip vs. gradle-###-all.zip
---

## Context

One developer on my team has some setting in Android Studio that replaces the `distributionUrl` entry in `gradle/wrapper/gradle-wrapper.properties` to use the `gradle-###-all.zip`, while my Android Studio changes it back to `gradle-###-bin.zip`. 


Basically, my diff always looks like:


`-distributionUrl=https\://services.gradle.org/distributions/gradle-1.12-all.zip
+distributionUrl=https\://services.gradle.org/distributions/gradle-1.12-bin.zip`


This is annoying. What setting is it, and how do I change it?



---

`gradle-1.12-all.zip` file will have binaries, sources, and documentation.
`gradle-1.12-bin.zip` will have only binaries(That should be enough as you don't need any samples/docs)


If you want to know about gradle wrapper, please check this
<http://www.gradle.org/docs/current/userguide/gradle_wrapper.html>



---

## Notes

-  You need to extend the wrapper task and define `distributionType = DistributionType.ALL`, see https://docs.gradle.org/current/dsl/org.gradle.api.tasks.wrapper.Wrapper.html
- I'm using IntelliJ and I need to know the `build.gradle` or IntelliJ configuration setting so that when `gradle wrapper` is run it sets the `distributionUrl` from `gradle-4.1-bin.zip` to `gradle-4.1-all.zip`.
