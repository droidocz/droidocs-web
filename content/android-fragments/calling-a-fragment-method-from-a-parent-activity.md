---
metaTitle: Calling a Fragment method from a parent Activity
title: Calling a Fragment method from a parent Activity
---

## Context

I see in the [Android Fragments Dev Guide](http://developer.android.com/guide/topics/fundamentals/fragments.html) that an "activity can call methods in a fragment by acquiring a reference to the Fragment from FragmentManager, using `findFragmentById()` or `findFragmentByTag()`."


The example that follows shows how to get a fragment reference, but not how to call specific methods in the fragment.


Can anyone give an example of how to do this? I would like to call a specific method in a Fragment from the parent Activity. Thanks.



---

not get the question exactly as it is too simple :



```
ExampleFragment fragment = (ExampleFragment) getFragmentManager().findFragmentById(R.id.example_fragment);
fragment.<specific_function_name>(); 

```

**Update:**
For those who are using Kotlin



```
var fragment = supportFragmentManager.findFragmentById(R.id.frameLayoutCW) as WebViewFragment
fragment.callAboutUsActivity()

```
