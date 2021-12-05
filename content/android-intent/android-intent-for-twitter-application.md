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



---

## Notes:

- Some applications want to limit to twitter posting, and this is what was asked here. Using the twitter API is a- reinventing the wheel b- a duplicate of what HTC/Samsung/twitter has already provided c- complicated (authentification, repost if fail, tiny url, etc.)


- `ACTION_SEND` is too vague. [I suggest you filter](http://regis.decamps.info/blog/2011/06/intent-to-open-twitter-client-on-android/) the list based on known package names.


- `ACTION_SEND` is not "too vague". And your filter is "too fragile" and "too dangerous", in that it relies on undocumented information from a tiny list of Twitter clients. If you only want to share to Twitter, use the Twitter client API.


- Well, yes, but the users will do bad ratings about my app, not about Facebook. For them it looks like an error of my app. And there are also many apps which integrate the SDK, so it's hard for them to know that it's Facebook's fault.


- In my case, I want to open a twitter page for a specific user, with the option of using the app, or the browser as a fall back, your answer only covers the assumption that the person asking the questions intends to send information via twitter, as opposed to retrieving it, as is my intention.


- If you set the all appropriate EXTRAS in the intent, then whatever is selected will use only what applies to it. Email clients will use the subject extra, meanwhile a twitter client will only use the text extra and so on. The code example @ rds links to only selects one package name and if a user has a twitter client not in that hard-coded list, the sharing will fail. Also, a chooser is not created but instead the set package immediately launched.


- and how to deal with Facebook's bug/"feature" of not prefilling the message? If Facebook will not work properly, you can't use the dialog.


- I'd prefer to customize the message formatting for the appropriate channel. Because most apps don't bother to filter themselves out appropriately (even with the application/twitter mime type set), manually filtering for known twitter apps seems to be an appropriate workaround.


- 'If Facebook will not work properly, you can't use the dialog" -- the issue with Facebook is between the user and Facebook. If you do not work for Facebook, it is not your "bug" and not your problem.


- Because i want to change subject accordingly.


