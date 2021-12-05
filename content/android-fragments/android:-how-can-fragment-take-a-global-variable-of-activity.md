---
metaTitle: 'Android: how can fragment take a global variable of Activity'
tags:
- java
- variables
title: 'Android: how can fragment take a global variable of Activity'
---

## Context

I have an activity with a global variable int x, how can a fragment get the current value of variable x of its activity ?



---

Using a public static variable isn't the best way to communicate between an activity and a fragment. Check out [this answer](https://stackoverflow.com/a/20521851/3681880) for other ways:


The [Android documentation](http://developer.android.com/training/basics/fragments/communicating.html) recommends using an interface when the Fragment wants communicate with the Activity. And when the Activity wants to communicate with the Fragment, the Activity should get a reference to the Fragment (with [findFragmentById](http://developer.android.com/reference/android/support/v4/app/FragmentManager.html#findFragmentById%28int%29)) and then call the Fragment's public method.


The reason for this is so that fragments are decoupled from the activity they are in. They can be reused in any activity. If you directly access a parent Activity or one of its global variables from within a fragment, you are no longer able to use that fragment in a different Activity.



---

## Notes:

- but why can't you use the fragment in different activity if we do this.


- Because the fragment would still have a dependency on the old activity. You would have to change the fragment code every time that you wanted to use it in a new activity.


