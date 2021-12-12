---
metaTitle: Gradle dependencies update
tags:
- gradle
- android-studio
- build.gradle
title: Gradle dependencies update
---

## Context

One of the advantages of using Gradle in Android Studio is that it helps in dependency management. So if I have used a particular version of a library in my `build.gradle` file,
then how will I force it to update the dependency version once the higher version is available?


Some of the dependencies in my build.gradle are specified as



```
dependencies {
    compile project(':facebookSDK')
    compile files('libs/picasso-2.1.1.jar')
    compile files('libs/crouton-1.8.1.jar')
}

```


---


> 
> One of the advantages of using Gradle in Android Studio is that it helps in dependency management.
> 
> 
> 


Not the way that you are using it.



> 
> So if i have used a particular version of a library in my build.gradle file, then how will i force it to update the dependency version once the higher version is available?
> 
> 
> 


In your case, you would download the new JARs, put them in `libs/`, and update your `build.gradle` to match.


The preferred approach is for you to delete those JARs and replace your two `compile files` statements with ones that pull down the dependencies from Maven Central or another artifact repository. You can find the proper statements for popular open source libraries like those via the [Gradle, please](http://gradleplease.appspot.com/) site.


In your case, you would use:



```
compile 'com.squareup.picasso:picasso:2.3.3'
compile 'de.keyboardsurfer.android.widget:crouton:1.8.5'

```

These will require you to also have a `repositories` closure as a peer to your `dependencies` closure:



```
repositories {
    mavenCentral()
}

```

This may already exist.


These `compile` statements still pin you to a specific version of those libraries, but moving to a new version would be a simple matter of updating the `compile` statement, and Gradle will pull down the new dependency on your next build.


If you want, you could replace part of the version number with a wildcard (e.g., `2.3.+`). This will cause Gradle to automatically update to new patchlevels of the library, in this case. Some developers do not approve of this approach, as while it is convenient, it does reduce your ability to be able to reproduce a build (e.g., you need to recompile some older branch of your code, and now you don't know what version of the artifact you were using back then).



---

## Notes

-  I am not aware that Gradle ever "highlights" libraries newer than what you ask for. If you use wildcards, it will automatically grab them; if you do not use wildcards, it ignores them. There's a plugin for Gradle that will give you a report of available updates to dependencies, though I forget where I saw it.
- I'll add this answer too : http://stackoverflow.com/a/35371234/2057809

Having gradle doing dependencies update is cool, but it's even more usefull when it can also detect automatically which dependencies need to be updated.
