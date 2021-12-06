---
metaTitle: How to download older google play services
tags:
- java
- linux
- gradle
title: How to download older google play services
---

## Context

Im going to use android `google maps v2` with `android emulator/android studio 0.4.0`. One of requirements is to put in project `google-play-services_lib` with version lower/equal to `emulator` level. My emulator works with `api lv 17`. The question is, how to download older version of `google-play-services_lib` than those downloaded by `android sdk manager`?



---


> 
> One of requirements is to put in project google-play-services\_lib with version lower/equal to emulator level.
> 
> 
> 


`google-play-services_lib` has nothing to do with emulator versions.



> 
> The question is, how to download older version of google-play-services\_lib than those downloaded by android sdk manager?
> 
> 
> 


AFAIK, there is no way to do this. Furthermore, as has been pointed out, this is not necessary.



> 
> Then If your device were broken or anything you would have no ability to test your program
> 
> 
> 


That makes no sense whatsoever. `google-play-services_lib` is a *library*. It is not Google Play Services itself, but a client library for utilizing Google Play Services.



> 
> But then I need to use support library what I would like to avoid
> 
> 
> 


As has been noted, the Android Support package is not tied to the Play Services SDK. Parts of the Play Services SDK can *use* the Android Support package (e.g., `SupportMapFragment`), but the Play Services SDK does not *require* the Android Support package.



---

## Notes:

- It is in developers' interest to use the oldest possible version in order to avoid bugging the user about upgrading the library.
-  You will have to test on Play Services-compatible hardware, then, until such time (if ever) an updated emulator image is available. ), you need to use a device that is able to get the latest Play Services.
- There are two reasons why one may want an older version of the Google Play Services SDK:  for comprehensive app testing, and because the emulator images for Android 4.2.2 have an older version (3136130) and are not upgradable.
-  used https://github.com/commonsguy/cw-omnibus/tree/ef269a785353b9dc2704aee9f7bc3b16abf186cc/Push/GCMClient2 and trying GCM notifies..works well if i download latest GPS i.e 8.1. Device has inbuild GPS apk version 6599000(6.5.9.9).why is failing in 6.5.9.9.GPS lib version refered was 7571000.If i make it to 6599000 i get need 7571000 result out dated GPS.
- No, I need the older SDK (library project) so that my app doesn't fail with this error at launch: 
Google Play services out of date.
-  You are referring to Google Play Services, not the Google Play Services SDK (i.e., `google-play-services_lib`).
