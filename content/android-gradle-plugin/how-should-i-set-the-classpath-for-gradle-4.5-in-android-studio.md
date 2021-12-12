---
metaTitle: How should I set the classpath for gradle 4.5 in android studio
tags:
- android-studio
- gradle
- groovy
title: How should I set the classpath for gradle 4.5 in android studio
---

## Context

I'm using android studio 3.1 and I just configured gradle-wrapper.properties to use gradle-4.5 and it downlowded the file succesfully.
:



```
distributionUrl=https\://services.gradle.org/distributions/gradle-4.5-all.zip

```

how should I configure classpath in dependencies of build.gradle file?
it was like this when I was using an older version of Gradle:



```
dependencies {
        classpath 'com.android.tools.build:gradle:3.1.0-alpha09'
}

```

I changed it to :



```
dependencies {
            classpath 'com.android.tools.build:gradle:4.5'
    }

```

but it didnt work



---

**Don't confuse gradle with android plugin for gradle.**


It is the **android plugin** for gradle and 4.5 doesn't exist.



```
dependencies {
            classpath 'com.android.tools.build:gradle:4.5'
    }

```

It is **gradle**, and it is enough to use gradle 4.5



```
distributionUrl=https\://services.gradle.org/distributions/gradle-4.5-all.zip

```
