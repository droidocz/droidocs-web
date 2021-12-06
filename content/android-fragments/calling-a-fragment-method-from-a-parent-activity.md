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


---

## Notes:

- Now the hard part is I can't seem to get a reference to the fragment in the first place. It's not defined in an XML layout, so I can't use findFragmentById(). And it's not clear to me from the code I'm following (ref above) how/where the fragment is even created. If it were I could just add a tag and use findFragmentByTag(). The AccountListActivity part of the example does have a call to beginTransaction().add(), but per my trace it's never called.
- By doing this i ended up in a null object reference!
- getFragmentManger is now deprecated , Use FragmentActivity.getSupportFragmentManager()
- The code pattern I am following is [FragmentTabsPager](http://developer.android.com/resources/samples/Support4Demos/src/com/example/android/supportv4/app/FragmentTabsPager.html).
- java.lang.NullPointerException: Attempt to invoke virtual method ...
- look in your **&lt;fragment tag** in the xml file. It would be "example_fragment" to match the example code given.
- The situation will be different when neither u are having the ID nor the TAG associated with the fragment .
- In Kotlin use such syntax to suppress "this cast can never success" warning

  `val fragm : MyFragment = fragmentManager.findFragmentById(R.id.my_fragment) as MyFragment`
- **search through your XML files**
