---
metaTitle: Create a gradle dependency to import from git
tags:
- java
- git
- android-studio
title: Create a gradle dependency to import from git
---

## Context

This is how import dependencies in Android Studio. In this case okhttp:



```
dependencies {
    compile 'com.squareup.okhttp:okhttp:2.5.0'
} 

```

I would like to import a dependency created by myself. For example:



```
dependencies {
    compile 'my_library:1.0.0'
}

```

At this point if I learn how to create a dependency and import in Android Studio project would be enough.


But I would like host my library on a git(github) repository if possible. This would be awesome.



---

To achieve it you have some ways:


1. publish your library (artifact) in central maven or jcenter.
2. use a github repo and the [**jitpack** plugin](https://jitpack.io/)
3. publish the aar in a local maven repo (local o private)


**The point 2.** is very simple. Just push your codein github and modify the gradle script in the project where you want to use it.


Just add this repo tp your `build.gradle`



```
repositories {
        // ...
        maven { url "https://jitpack.io" }
    }

```

and the dependency:



```
dependencies {
        compile 'com.github.User:Repo:Tag'
    }

```

**To publish** a library in Central Maven or JCenter, it is very long to explain in an answer. Hovewer you can read these posts:


* Publish on [JCenter](http://inthecheesefactory.com/blog/how-to-upload-library-to-jcenter-maven-central-as-dependency/en)
* Publish on [Central Maven](http://gmariotti.blogspot.it/2013/09/publish-aar-file-to-maven-central-with.html)


---

## Notes

- In your library (https://github.com/rchampa/DropboxHttpConector) remove the compile 'com.github.User:Repo:Tag'. Also the maven { url "https://jitpack.io" } is not needed in the library. You have to use it only in the main project which uses that library.
- My new question is here http://stackoverflow.com/questions/33058358/jitpack-io-failed-to-resolve-github-repo
- I did it on 1.0.1 tag https://github.com/rchampa/DropboxHttpConector/releases/tag/1.0.1 but still my main project is failing to resolve.
- but I have problems adding my repo `compile 'com.github.rchampa:DropboxHttpConector:1.0.0'`  from `https://github.com/rchampa/DropboxHttpConector/releases`
