---
metaTitle: I have to add .aar files as a library in a sub project in Android studio. It gives me an error.
tags:
- android-studio
- gradle
- build.gradle
title: I have to add .aar files as a library in a sub project in Android studio. It gives me an error.
---

## Context

I have added the .aar files to libs folder in the sub-project.
And have given the repositories as:



```
repositories {
 mavenCentral()
    mavenLocal()
    flatDir {
        dirs 'libs'
    } 

```

in the build.gradle of this sub-project.
Do I need to add dependencies in Main project's build.gradle also?
If yes, how should that be done?



---

You are adding a aar file in libs folder.  

The aar file doesn't contain the dependencies, then you have to add these dependencies also in the main project.


In your `module1/build.gradle` you should have something like:



```
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile('com.android.support:appcompat-v7:22.2.1') //for example
    //..
 }

```

In your `mainModule/build.gradle` you have to add all the dependencies used by your module1.



```
dependencies {
        compile fileTree(dir: 'libs', include: ['*.jar'])
        compile(name:'fileName',ext:'aar')
        compile('com.android.support:appcompat-v7:22.2.1') //for example
        //...
     }

```
