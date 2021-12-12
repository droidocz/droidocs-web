---
metaTitle: Android app google maps showing grey tiles and not map!
tags:
- google-maps
title: Android app google maps showing grey tiles and not map!
---

## Context

I followed this guide here perfectly and have gone through it again but when I run the program on my google avd the page loads but only grey tiles appear and it doesn't show a map which it should. 


Does anyone have any ideas?


Thanks



---

You either have the wrong value for `android:apiKey` in your `MapView`, or you do not have the `INTERNET` permission, or you do not have Internet access.

