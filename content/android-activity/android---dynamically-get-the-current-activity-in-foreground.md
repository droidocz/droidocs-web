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



---

## Notes:

-  If the background work will go on long enough that you do not know what the foreground UI is (or even if it is in your own app), you probably want a service, just to signal to Android that you are doing that background work, so your process can live a bit longer.
- Have your activities register for the event in `onStart()` and unregister in `onStop()`.
- Step 2 in Plan B assumes that one knows for which activity ```startActivity()``` is to be called. I want the Activity on the top of my task to be started.
-  Registering with an event bus is fairly cheap, and if you happen to have a `BaseActivity` already, registering in there would seem to be a good plan. I don't know that I would necessarily introduce a common superclass just for two lines of code, but if you already have such a superclass, use it.
- I do have a ```BaseActivity``` superclass. But I am hesitant to put such code there. My purpose for having such base classes is to provide common helper methods which all the sub-classes will use, like, fragment transaction, resource access, etc. I don't like putting behavioral logic there because I rarely open such files. It could easily become an unwanted feature in a new sub-class. It's just a preference for me - keep behavior code in front of eyes.
- But why is step 1 (using a service) important, vs. using an AsyncTask for example?
