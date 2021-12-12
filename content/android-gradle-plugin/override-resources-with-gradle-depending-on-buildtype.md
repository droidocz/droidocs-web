---
metaTitle: Override resources with gradle depending on buildType
tags:
- gradle
- android-studio
- build.gradle
title: Override resources with gradle depending on buildType
---

## Context

I want to override some strings in my res/strings.xml with gradle.


I know that [since Android Gradle Plugin 0.7.+](http://tools.android.com/tech-docs/new-build-system) theres the possibilty to have a variant specific source folder. 
But my app has a lot of flavors and I don't want to add additionally variant specific folders.


**UPDATE 2014-01-17**


What I want in detail:


I have some variables in my Resources that are depending only by the buildType (e.g. "release"). 
First I thought my **SOLUTION\_1** (override data after resources were merged) is nice, because if I have to change these variables I just have to change them in the build.config (just one place). 
But as Scott Barta wrote in the comment below there are some good reasons why this solution is NOT a good idea.


So i tried another solution **SOLUTION\_2** (just merge the right resources) based on [this GitHub project of shakalaca](https://github.com/shakalaca/learning_gradle_android/blob/082fa1575de1fa75ef09c90cb0cfdd60407e184d/07_tricks/app/build.gradle). I think this way is more elegant and I still have the advantage just to change the variables in **one** place!


**SOLUTION\_1 (override data after resources were merged):**


What I did in AS 0.4.2:


* in `build.gradle` I try to override the string "Hello World" to "OVERRIDE" ([based on my answer at this post](https://stackoverflow.com/questions/17465353/how-to-replace-a-string-for-a-buildvariant-with-gradle-in-android-studio)):



```
android.applicationVariants.all{ variant ->
    // override data in resource after merge task
    variant.processResources.doLast {
        overrideDataInResources(variant)
    }
}

def overrideDataInResources(buildVariant){
    copy {
        // *** SET COPY PATHS ***
        try {
            from("${buildDir}/res/all/${buildVariant.dirName}") {
                // println "... FROM: ${buildDir}/res/all/${buildVariant.dirName}"
                include "values/values.xml"
            }
        } catch (e) {
            println "... EXCEPTION: " + e
        }

        into("${buildDir}/res/all/${buildVariant.dirName}/values")
        // println "... INTO: ${buildDir}/res/all/${buildVariant.dirName}/values"

        // --- override string "hello_world"
        filter {
            String line ->
                line.replaceAll("<string name=\"hello_world\">Hello world!</string>",
                        "<string name=\"hello_world\">OVERRIDE</string>");
        }

    // *** SET PATH TO NEW RES *** 
    buildVariant.processResources.resDir = file("${buildDir}/res/all/${buildVariant.dirName}/values/values/values.xml")
    // println "... NEW RES PATH: " + "${buildDir}/res/all/${buildVariant.dirName}/values/values/values.xml"
    }
}

```


The copy and filter task works fine, but I couldn't set the "new" values.xml as string resource.


**SOLUTION\_2 (just merge the right resources)**


* define a floavor for specific buildType (e.g. "releaseRes")
* merge this resourses with the flavor you want to build:



```
android.applicationVariants.all{ variant ->
    variant.mergeResources.doFirst{
        checkResourceFolder(variant)
    }
}

def checkResourceFolder(variant){
    def name = variant.name;
    if(name.contains("Release")){
       android.sourceSets.release.res.srcDirs = ['src/releaseRes/res']
       android.sourceSets.flavor1.res.srcDirs = ['src/flavor1/res']
    }
}

```


---

You should strive to come up with a solution that doesn't involve writing any custom code in your build files, especially code that does tricky things with reassigning source sets on the fly. Custom Gradle code is a little funky to write, and it's difficult to debug and maintain. The new build system is extremely powerful and already has tons of flexibility, and it's likely that you can already do what you want; it's just a matter of learning how.


Especially if you're just learning the ins and outs of Android-Gradle projects (and it's so new that we all are), it's best to try hard to work with the functionality built into the system before thinking outside the box.


Some recommendations:


* It's unlikely you need to vary resources based on build type. A build type in Android-Gradle is supposed to be something like debug or release, where the difference is in debuggability, compiler optimization, or signing; build types are supposed to be functionally equivalent to each other. If you look at the [properties you can set on a build type through the Groovy DSL](http://tools.android.com/tech-docs/new-build-system/user-guide#TOC-Build-Types), you can see the intent: `debuggable`, `jniDebugBuild`, `renderscriptDebugBuild`, `renderscriptOptimLevel`, `packageNameSuffix`, `versionNameSuffix`, `signingConfig`, `zipAlign`, `runProguard`, `proguardFile`, `proguardFiles`.
* If you still think you want to vary resources based on build type, there's already an easy way to do that with the current build system. You can have a build-type-specific resource directory, put your resources in there, and the resource merging in the build system will take care of things for you at build time. This is one of the powerful features in Android/Gradle. See [Using Build Flavors - Structuring source folders and build.gradle correctly](https://stackoverflow.com/questions/16737006/using-build-flavors-structuring-source-folders-and-build-gradle-correctly) for information on how to make that work.
* If you want to vary something based on build type and your needs are very quick and simple, you might want to do the switch in Java code instead of resources and instead of in the build system. There's the `BuildConfig` mechanism for that sort of thing -- it's a Java class that defines a `DEBUG` flag based on debug/release build status, and you can add your own custom Java code from different build types to do more meaningful things. `BuildConfig` was intended for allowing small functional differences between build types, for cases where a debug build might want to perform some wasteful operation to assist in development, like doing more extensive data validation or creating more detailed debug logging, and those wasteful things are best optimized out of release builds. Having said that, it might be an appropriate mechanism to do what you want.
* Consider using flavors for what you're using build types for now. Conceptually a flavor is kind of like a build type in that it's another variant of your application that can be built; the build system will create a matrix of flavors vs. build types and can build all combinations. However, flavors address a different use case, where different flavors share most code but can have significant functional differences. A common example is a free vs. paid version of your application. Inasmuch as a different resource in different variants of your app represents different functionality, that might indicate a need for a different flavor. Flavors can have different resource directories that are merged at build time in the same way as build configs; see the question linked above for more info.


---

## Notes

- Now there is the possibilty to generate resource values through DSL: https://plus.google.com/109385828142935151413/posts/UVKA58MZV3J. Just for interest: Should this work like the `BuildConfig` mechanism? I just tried this - gradle didn't throw any Exception, but I couldn't find the resource value.
- my new question based on the new `resValue` field in gradle: http://stackoverflow.com/questions/21600160/resvalue-gradle-error-unsupported-type-string-in-generated-xml
- One example for build type - based variations: Server IP and Port of the target server for the app, set in a custom configuration file (located in the res/xml folder). Though I am sure this could also be achieved differently from within the app, rather than through configuration (though I kinda of prefer the latter).
- It would be worth posting that as a separate question with the code you're using.
