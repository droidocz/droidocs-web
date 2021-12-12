---
metaTitle: How to include *.so library in Android Studio
title: How to include *.so library in Android Studio
---

## Context

I read many threads how to add a *.so library to Android Studio, but none of them works, especially when it comes to the point of text: This does not work with the newer xxx (Android Studio, gradle, ...)


Can we make a fresh start please. I got:


Android Studio 0.6.0


From Project Structure I see:


SDK Location:



```
/usr/share/android-studio/data/sdk
/usr/lib/jvm/default-java

```

Project:



```
Gradle version 1.10
Android Plugin Version 0.11.+

```

Modules/app:
Properties:


Compile Sdk Version 19
Build Tools Version 19.1.0


Dependencies:



```
{dir=libs, include=[*.jar]} Compile

{dir=libs, include=[*.so]}  Provided

m com.android.support: appcompat -v7:19.+   Compile

```

I got the *.so files pre-compiled and at the demo app they are working. I have to change the source code of the app, so I need to rebuild with the same *.so files.



---

**Android NDK official `hello-libs` CMake example**


<https://github.com/googlesamples/android-ndk/tree/840858984e1bb8a7fab37c1b7c571efbe7d6eb75/hello-libs>


Just worked for me on Ubuntu 17.10 host, Android Studio 3, Android SDK 26, so I strongly recommend that you base your project on it.


The shared library is called `libgperf`, the key code parts are:


* [hello-libs/app/src/main/cpp/CMakeLists.txt](https://github.com/googlesamples/android-ndk/blob/840858984e1bb8a7fab37c1b7c571efbe7d6eb75/hello-libs/app/src/main/cpp/CMakeLists.txt): 



```
// -L
add_library(lib_gperf SHARED IMPORTED)
set_target_properties(lib_gperf PROPERTIES IMPORTED_LOCATION
          ${distribution_DIR}/gperf/lib/${ANDROID_ABI}/libgperf.so)

// -I
target_include_directories(hello-libs PRIVATE
                           ${distribution_DIR}/gperf/include)
// -lgperf
target_link_libraries(hello-libs
                      lib_gperf)

```
* [app/build.gradle](https://github.com/googlesamples/android-ndk/blob/840858984e1bb8a7fab37c1b7c571efbe7d6eb75/hello-libs/app/build.gradle):



```
android {
    sourceSets {
        main {
            // let gradle pack the shared library into apk
            jniLibs.srcDirs = ['../distribution/gperf/lib']

```

Then, if you look under `/data/app` on the device, `libgperf.so` will be there as well.
* on C++ code, use: `#include <gperf.h>`
* header location: `hello-libs/distribution/gperf/include/gperf.h`
* lib location: `distribution/gperf/lib/arm64-v8a/libgperf.so`
* If you only support some architectures, see: [Gradle Build NDK target only ARM](https://stackoverflow.com/questions/33278152/gradle-build-ndk-target-only-arm/47558314#47558314)


The example git tracks the prebuilt shared libraries, but it also contains the build system to actually build them as well: <https://github.com/googlesamples/android-ndk/tree/840858984e1bb8a7fab37c1b7c571efbe7d6eb75/hello-libs/gen-libs>

