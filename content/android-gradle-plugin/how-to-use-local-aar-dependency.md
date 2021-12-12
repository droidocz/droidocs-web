---
metaTitle: How to use local aar dependency
tags:
- aar
title: How to use local aar dependency
---

## Context

i google about local aar,every one say it can work,but it don't work at android studio 1.1.0.


i try to use :



```
compile fileTree(dir: 'libs', include: ['*.aar'])

```

but it tip:



```
Warning:Project app: Only Jar-type local dependencies are supported. Cannot handle: /Users/kycq/AndroidStudioProjects/QingTaJiao/app/libs/KycqBasic-release.aar

```

how should i do to use local aar?
if i should use:



```
compile 'com.example.library:library:1.0.0@aar'

```

how to do this?



---

I was getting the same errors.


This was the only thing that helped me:



```
dependencies {
   compile(name:'nameOfYourAARFileWithoutExtension', ext:'aar')
 }
repositories{
      flatDir{
              dirs 'libs'
       }
 }

```

Reference: [Adding local .aar files to Gradle build using "flatDirs" is not working](https://stackoverflow.com/questions/24506648/adding-local-aar-files-to-gradle-build-using-flatdirs-is-not-working/28816265#28816265) 

