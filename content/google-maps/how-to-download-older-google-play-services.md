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

