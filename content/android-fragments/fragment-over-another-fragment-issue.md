---
metaTitle: Fragment over another fragment issue
title: Fragment over another fragment issue
---

## Context

When I'm showing one fragment (which is full screen with `#77000000` background) over another fragment (let's call it main), my main fragment still reacts to clicks (we can click a button even if we don't see it).


**Question**: how to prevent clicks on first (main) fragment?


**EDIT**


Unfortunately, I can't just hide main fragment, because I'm using transparent background on second fragment (so, user can see what located behind).



---

Set `clickable` property on the second fragment's view to true. The view will catch the event so that it will not be passed to the main fragment. So if the second fragment's view is a layout, this would be the code:



```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:clickable="true" />

```


---

## Notes

- Is there any reason why this would be a bad idea?
- I have a `RelativeLayout` inside the fragment, and I set the whole view with the `clickeable` property.
- `android:clickable="true"`
`android:focusable="true"`
- When I scroll on first page, it passes to second page also, and this solution didn't work for me.
- Use `Fragment.show()` and `Fragment.hide()` methods instead.
- Minimising and maximising the app still gives the focus back to the edittext in the parent fragment.
-  : Did you get the solution of your problem ??
- My bad, I was inflating the fragment with `inflater.inflate(R.layout.fragment_lastsearch, null);` instead of `inflater.inflate(R.layout.fragment_lastsearch, container, false);`.
- There is a problem with this solution, when you get in accessibility talkback mode ON, it won't read the individual elements instead gets the focus to root view.
- `'clickable' attribute found, please also add 'focusable'`. Android Studio recommends adding `focusable` too.
