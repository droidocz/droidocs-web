---
metaTitle: No internet on Android emulator - why and how to fix
title: No internet on Android emulator - why and how to fix
---

## Context

I am trying to use internet with the Android emulator, but with no success.
Any ideas?



---

Try launching the Emulator from the command line as follows:



```
emulator -verbose -avd <AVD name>

```

This will give you detailed output and may show the error that's preventing the emulator from connecting to the Internet.

