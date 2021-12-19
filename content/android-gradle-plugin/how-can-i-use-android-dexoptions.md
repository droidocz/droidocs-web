---
metaTitle: how can I use Android dexOptions
title: how can I use Android dexOptions
---

## Problem

What are the meaning of the dexOptions.incremental, etc.
Any body can explain them to me.



```
dex options

android {
    dexOptions {
        incremental false
        preDexLibraries = false
        jumboMode = false
        javaMaxHeapSize "2048M"
    }
}
This affects all tasks using dex.

```


---

## Solution


> 
> ### `boolean incremental`
> 
> 
> Whether to enable the incremental mode for dx. This has many limitations and may not work. Use carefully.
> 
> 
> ### `String javaMaxHeapSize`
> 
> 
> Sets the -JXmx* value when calling dx. Format should follow the 1024M pattern.
> 
> 
> ### `boolean jumboMode`
> 
> 
> Enable jumbo mode in dx (--force-jumbo).
> 
> 
> ### `boolean preDexLibraries`
> 
> 
> Whether to pre-dex libraries. This can improve incremental builds, but clean builds may be slower.
> 
> 
> 


These can be found here:  

<http://google.github.io/android-gradle-dsl/current/com.android.build.gradle.internal.dsl.DexOptions.html>



---

## Notes

- Check https://developer.android.com/studio/build/optimize-your-build.html#dex_options for latest info, for example, using `javaMaxHeapSize` is not recommended.
