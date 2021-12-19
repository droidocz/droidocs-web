---
metaTitle: Android Studio doesn't see device
tags:
- adb
- device
- avd
title: Android Studio doesn't see device
---

## Problem

The AVD Manager in Android Studio doesn't show my device but `adb devices` does show it. Am I missing something obvious here?



---

## Solution

The AVD Manager is for emulator images. It never shows hardware. This is true for any usage of the AVD Manager: Eclipse, Android Studio, etc.



---

## Notes

- Ok how do I get android studio to run the app on the phone then?
