---
metaTitle: How to hide action bar before activity is created, and then show it again
tags:
- android-3.0-honeycomb
title: How to hide action bar before activity is created, and then show it again
---

## Context

I need to implement splash screen in my honeycomb app.
I use this code in activity's onCreate to show splash:



```
setContentView(R.layout.splash);
getActionBar().hide();

```

and this code to show main UI after sometime:



```
setContentView(R.layout.main);
getActionBar().show();

```

But *before* onCreate is called and splash appears, there is small amount of time when action bar shown.


How can I make action bar invisible?


I tried to apply theme to activity without action bar:



```
<item name="android:windowActionBar">false</item>

```

but in that case getActionBar() always returns null and I found no way to show it again.



---

Put your splash screen in a separate activity and use [`startActivityForResult`](http://developer.android.com/reference/android/app/Activity.html#startActivityForResult%28android.content.Intent,%20int%29) from your main activity's `onCreate` method to display it. This works because, according to the docs:



> 
> As a special case, if you call startActivityForResult() with a requestCode >= 0 during the initial onCreate(Bundle savedInstanceState)/onResume() of your activity, then your window will not be displayed until a result is returned back from the started activity. This is to avoid visible flickering when redirecting to another activity.
> 
> 
> 


You should probably do this only if the argument to `onCreate` is `null` (indicating a fresh launch of your activity, as opposed to a restart due to a configuration change).

