---
metaTitle: How to read value from gradle.properties in java module
tags:
- java
- gradle
- gradle-plugin
title: How to read value from gradle.properties in java module
---

## Context

I have a project in Android Studio with a couple of modules.


* The `app` module. With `apply plugin: 'com.android.application'`.
* The `androidLibrary` module. With `apply plugin: 'com.android.library'`.
* The `javaLibrary` module. With `apply plugin: 'java'`.


I want to declare some variables in the project `gradle.properties` file and be able to read them from the `javaLibrary` module.


I have declared the properties in the following ways according [this](https://docs.gradle.org/current/userguide/build_environment.html) documentation...


* `mysuperhost=superhost`
* `systemProp.mysuperhost=superhost`
* `ORG_GRADLE_PROJECT_mysuperhost=superhost`
* `org.gradle.project.mysuperhost=superhost`


... and tried to read them this way with no success:


* `System.getenv("mysuperhost");`
* `System.getProperty("mysuperhost");`


I know how to read properties from the `BuildConfig` class, but this is a generateed class in the app module (with `apply plugin: 'com.android.application'`), so this does not work for this particular case.



---

Your statement about being unable to use BuildConfig is not entirely accurate, as you can use Java reflection to find the public static members of BuildConfig as long as you know its fully qualified package.


Say the full package name of your generated BuildConfig is com.company.app.BuildConfig. You can get its Class object with:



```
Class<?> klass = Class.forName("com.company.app.BuildConfig");

```

Then you can use that Class object to pick out the fields of it by name:



```
Field field = klass.getDeclaredField("BUILD_TYPE");

```

Then you can get its value:



```
String value = field.get(null);

```


---

## Notes

- When I said I am able to read a `BuildConfig` member I meant I am able to do so from the `app` module. What I want to do is to read a property declared in the `gradle.properties` file from the `java` module.
- No, this is a complete division of the two. The Java module is simply having to make assumptions about what the app module contains.
- You can still definitely use reflection. A big reason to use reflection APIs is to pick out things from classes at runtime without having to compile against any of their symbols.
- Just to make sure before proceeding, does the `java` module need to depend on the `app`module?
