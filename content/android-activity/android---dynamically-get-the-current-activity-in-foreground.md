---
metaTitle: Android - Dynamically Get the Current Activity in Foreground
tags:
- java
- dynamic
- get
title: Android - Dynamically Get the Current Activity in Foreground
---

## Context

here is the situation:


1. In a Thread an event is triggered.
2. The current activity needs to be retrieved.
3. Then a Dialog Box is created on that activity and shown.


Problems:
 As far as I've searched there is no way to retrieve the current activity in the foreground.


Extra info:
 This needs to be able to be handled in multiple activities. So, it can be popped-up in Activity-A or B or C.



---

**Plan A**: taking your request literally


Step #1: Have the thread be managed by a service


Step #2: have the service send a message when the "even is triggered" -- `LocalBroadcastManager`, Square's Otto, greenrobot's EventBus, etc.


Step #3: Have each activity be set up to listen for that message when it is in the foreground


Step #4: Have the activity display the dialog upon receipt of the message




---


**Plan B**: same visual result


Step #1: Have the thread be managed by a service


Step #2: Have the service call `startActivity()` on a dialog-themed activity


Step #3: There is no step #3

