---
metaTitle: Is there any way to integrate Eclipse with Gradle in Android project
tags:
- eclipse
- gradle
- gradle-eclipse
title: Is there any way to integrate Eclipse with Gradle in Android project
---

## Problem

I have Android project with standard build.gradle (also I added android annotations). 


Also I installed Gradle plugin (from <http://dist.springsource.org/release/GRECLIPSE/e4.3/>) to my Eclipse (Kepler) and converted project to Gradle project. 


Unfortunately I cannot run Gradle build on my Eclipse (in cmd line everything works).


My question is how to make Eclipse works with Gradle just like with Maven.



---

## Solution

Read [Is it possible to use the Gradle build system for Android with Eclipse?](https://stackoverflow.com/questions/17107014/is-it-possible-to-use-the-gradle-build-system-for-android-with-eclipse)


try [Nodeclipse/Enide Gradle for Eclipse](https://github.com/Nodeclipse/nodeclipse-1/tree/master/org.nodeclipse.enide.gradle)
([marketplace](http://marketplace.eclipse.org/content/gradle)) 


Some screenshots for Gradle for Eclipse:


![](https://marketplace.eclipse.org/sites/default/files/styles/ds_solution_screenshot/public/EditBox-plugin-gradle-example.PNG?itok=Fe_8TGFM)


![](https://github.com/Nodeclipse/nodeclipse-1/blob/master/org.nodeclipse.enide.gradle/docs/Preferences.png?raw=true)

