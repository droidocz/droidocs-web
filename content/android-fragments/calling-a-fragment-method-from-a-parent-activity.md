---
metaTitle: Calling a Fragment method from a parent Activity
title: Calling a Fragment method from a parent Activity
---

## Problem

I see in the [Android Fragments Dev Guide](http://developer.android.com/guide/topics/fundamentals/fragments.html) that an "activity can call methods in a fragment by acquiring a reference to the Fragment from FragmentManager, using `findFragmentById()` or `findFragmentByTag()`."


The example that follows shows how to get a fragment reference, but not how to call specific methods in the fragment.


Can anyone give an example of how to do this? I would like to call a specific method in a Fragment from the parent Activity. Thanks.



---

## Solution

If you are using “import android.app.Fragment;”
Then use either:


1) 



```
ExampleFragment fragment = (ExampleFragment) getFragmentManager().findFragmentById(R.id.example_fragment); 
fragment.specific_function_name(); 

```

Where R.id.example\_fragment is most likely the FrameLayout id inside your xml layout. 
OR


2) 



```
ExampleFragment fragment = (ExampleFragment) getFragmentManager().findFragmentByTag(“FragTagName”); 
fragment.specific_function_name(); 

```

Where FragTagName is the name u specified when u did:



```
TabHost mTabHost.newTabSpec(“FragTagName”)

```



---


If you are using “import android.support.v4.app.Fragment;”
Then use either:


1) 



```
ExampleFragment fragment = (ExampleFragment) getSupportFragmentManager().findFragmentById(R.id.example_fragment); 
fragment.specific_function_name(); 

```

OR


2) 



```
ExampleFragment fragment = (ExampleFragment) getSupportFragmentManager().findFragmentByTag(“FragTagName”); 
fragment.specific_function_name(); 

```


---

## Notes

- I have a CoordinatorLayout with id R.id.example_fragment, its returning null.
- I suggest you post this as a new question and include your sample code. It's hard to tell the source of the problem without seeing the actual code.
