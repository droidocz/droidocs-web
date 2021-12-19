---
metaTitle: How to include an Android library module in another library
tags:
- gradle
- android-library
title: How to include an Android library module in another library
---

## Problem

I am building an Android library that is packaged as an aar and distributed to 3rd party developers.


The structure is pretty simple:


project
---libraryA
---libraryB


libraryA requires libraryB, which is why is has this in its gradle file:



```
compile project(':libraryB')

```

And settings.gradle has



```
include ':libraryB', ':libraryA'

```

But if I build the project as an aar it only includes libraryA. What am I missing? 


I read the responses to this: [Android Studio how to package single AAR from multiple library projects?](https://stackoverflow.com/questions/20700581/android-studio-how-to-package-single-aar-from-multiple-library-projects?lq=1)


Is this still not possible? I would assume that splitting up your code into multiple modules is not bad practice?



---

## Solution


> 
> Is this still not possible?
> 
> 
> 


Correct, at least through the standard build tools. It's possible there are third-party plugins, scripts, or other recipes to create a "fat AAR" out of an AAR and its dependencies.



> 
> I would assume that splitting up your code into multiple modules is not bad practice?
> 
> 
> 


Having multiple modules is perfectly fine for local development. However, modules are dependencies. When you ship a library, you need to satisfy all those dependencies, which will include any of your modules. That, in turn, means that any modules that your library depends upon must also be libraries, distributed in a way that a consumer of your top-level library will be able to get to those dependencies.



---

## Notes

- can you give an example of a script or third-party plugin that does the work?
- However, I know there are things that create fat JARs (though I forget their names), and so in principle something could create a "fat AAR", given sufficient engineering effort.
