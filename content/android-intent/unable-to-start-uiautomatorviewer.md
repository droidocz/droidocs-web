---
metaTitle: Unable to start uiautomatorviewer
tags:
- performance
- android-layout
- android-uiautomator
title: Unable to start uiautomatorviewer
---

## Context

I have :


* Android SDK Tools, Revision 22
* Android SDK Platform, API 18


I go to `<android-sdk>/tools/` , I see there is one file named "`uiautomatorviewer`",


I execute command `uiautomatorviewer` from terminal under the above path, however I got the following message:



```
uiautomatorviewer: command not found

```

why?



---

Because your `tools/` directory is not in your `PATH`. Either use `./uiautomatorviewer` or add `tools/` (and probably `platform-tools/` to your `PATH`. Note that this has nothing to do with programming and everything to do with your *nix-style OS (Linux, OS X, etc.).



---

## Notes:

- -- [file an issue](https://issuetracker.google.com/issues), then pray that Google pays attention to it.
- Still, this same location is still used in google's official instructions here: https://developer.android.com/training/testing/ui-testing/uiautomator-testing .
