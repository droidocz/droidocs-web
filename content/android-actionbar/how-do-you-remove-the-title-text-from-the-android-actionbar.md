---
metaTitle: How do you remove the title text from the Android ActionBar
title: How do you remove the title text from the Android ActionBar
---

## Context

I'm looking through the `Holo.Light` theme, and I can't seem to find the magic style to override to get rid of the title text that briefly shows up when my app first launches.


How can I do that?



---

Try:



```
 getActionBar().setDisplayShowTitleEnabled(false);

```

For v.7:



```
 getSupportActionBar().setDisplayShowTitleEnabled(false);

```


---

## Notes

- you will still see the title while the action bar is loading which is not what you want.
- it should be getSupportActionBar().setDisplayShowTitleEnabled(false); for v7 .
- I've searched the page and found nothing
- I mean from which method (activity, fragment) should it be called?
- You just need this once, in `onCreate` of your `MainActivity.tk`.
