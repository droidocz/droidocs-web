---
metaTitle: How to get the ActionBar height
title: How to get the ActionBar height
---

## Context

I am trying to get the height of the `ActionBar` (using Sherlock) every time an activity is created (specially to handle configuration changes on rotation where the ActionBar height might change).


For this I use the method `ActionBar.getHeight()` which works only when the `ActionBar` is shown.


When the first activity is created for the first time, I can call `getHeight()` in the `onCreateOptionsMenu` callback. But this method is not called after.


So my question is when can I call getHeight() and be assured that it doesn't return 0?
Or if it is not possible, how can I set the height of the ActionBar ?



---

While @birdy's answer is an option if you want to explicitly control the ActionBar size, there is a way to pull it up without locking the size that I found in support documentation. It's a little awkward but it's worked for me. You'll need a context, this example would be valid in an Activity.



```
// Calculate ActionBar height
TypedValue tv = new TypedValue();
if (getTheme().resolveAttribute(android.R.attr.actionBarSize, tv, true))
{
    int actionBarHeight = TypedValue.complexToDimensionPixelSize(tv.data,getResources().getDisplayMetrics());
}

```

**Kotlin**:



```
val tv = TypedValue()
if (requireActivity().theme.resolveAttribute(android.R.attr.actionBarSize, tv, true)) {
    val actionBarHeight = TypedValue.complexToDimensionPixelSize(tv.data, resources.displayMetrics)
}

```


---

## Notes

- Generally from exhaustive Googling or drudging thru the developer handbook.
- "android.R.attr.actionBarSize" is not working in android version 2.3, but "R.attr.actionBarSize" is working android all version. just use "R.attr.actionBarSize" instead of "android.R.attr.actionBarSize", "android.support.v7.appcompat.R.attr.actionBarSize" and etc.
- `androidx.appcompat.R.attr.actionBarSize` for androidx
- We get some number, but it's definitely not the same as the action bar height.
- Is it possible to get an explanation of what was done. And possibly also how you could do it in javafx?
- As  mentioned below, for appcompat, you want to use `android.support.v7.appcompat.R.attr.actionBarSize`.
- I suggest taking a look at the developer handbook to understand why.
- Only `android.support.v7.appcompat.R.attr.actionBarSize` worked with me on galaxy s3 and everywhere.
- This worked for me in both cases: (i) onCreateView and (ii) onConfigurationChanged.
- I had to call getContext().getTheme()... instead of simply getTheme()
- But if you think this is hard, try disambiguating "external storage" files in 4.2+. They're *mounted* not *linked* in three locations. Then when you're done with that if you're on 4.4+ you can suffer the "rich" (google for atrocious) Document API to write to external SD cards.
- The support library is a far cry from what it was when this was posted.
