---
metaTitle: Android Intent for Twitter application
tags:
- twitter
title: Android Intent for Twitter application
---

## Context

Is it possible to show a list of applications (with `intent.createChooser`) that only show me my twitter apps on my phone (so htc peep (htc hero) or twitdroid). I have tried it with `intent.settype("application/twitter")` but it doesnt find any apps for twitter and only shows my mail apps.


Thank you,


Wouter



---

It is entirely possible your users will only ever, now and forever, only want to post to Twitter.


I would think that it is more likely that your users want to send information to people, and Twitter is one possibility. But, they might also want to send a text message, or an email, etc.


In that case, use `ACTION_SEND`, as described [here](http://www.androidguys.com/2009/11/02/a-call-to-action-action_send-that-is/). Twidroid, notably, supports `ACTION_SEND`, so it will appear in the list of available delivery mechanisms.

