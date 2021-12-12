---
metaTitle: Start an Activity with a parameter
tags:
- oncreate
title: Start an Activity with a parameter
---

## Context

I'm very new on Android development.


I want to create and start an activity to show information about a game. I show that information I need a gameId.


How can I pass this game ID to the activity? The game ID is absolutely necessary so I don't want to create or start the activity if it doesn't have the ID.


It's like the activity has got only **one** constructor with one parameter.


How can I do that?


Thanks.



---

Just add extra data to the Intent you use to call your activity.


In the caller activity :



```
Intent i = new Intent(this, TheNextActivity.class);
i.putExtra("id", id);
startActivity(i);

```

Inside the onCreate() of the activity you call :



```
Bundle b = getIntent().getExtras();
int id = b.getInt("id");

```


---

## Notes

- is it okay to pass in a custom object type ?
- See this  : http://stackoverflow.com/questions/14333449/passing-data-through-intent-using-serializable
-  looking at the signature of the API it looks like any custom types need to be parcelable or serialisable. Presumablly because the andriod activity API is designed on the assumptoin that the new activity may be in a differnet process.
