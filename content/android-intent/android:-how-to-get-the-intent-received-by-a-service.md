---
metaTitle: 'Android: how to get the intent received by a service'
tags:
- service
title: 'Android: how to get the intent received by a service'
---

## Problem

I'm starting a service with an intent where I put extra information.


How can I get the intent in the code of my service?


There isn't a function like `getIntent().getExtras()` in service like in activity.



---

## Solution

Override `onStart()` -- you receive the `Intent` as a parameter.

