---
metaTitle: Android Fragments and animation
tags:
- android-3.0-honeycomb
title: Android Fragments and animation
---

## Context

How should you implement the sort of sliding that for example the Honeycomb Gmail client uses?


Can `TransactionManager` handle this automatically by adding and removing the Fragments, it's kind of difficult to test this due to the emulator being a slideshow :)



---

I'd highly suggest you use this instead of creating the animation file because it's a much better solution. Android Studio already provides **default** `animation` you can use without creating any new XML file. The animations' names are **android.R.anim.slide\_in\_left** and **android.R.anim.slide\_out\_right** and you can use them as follows:



> 
> **fragmentTransaction.setCustomAnimations(android.R.anim.slide\_in\_left, android.R.anim.slide\_out\_right);**
> 
> 
> 



```
FragmentManager fragmentManager = getSupportFragmentManager();
FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();              
fragmentTransaction.setCustomAnimations(android.R.anim.slide_in_left, android.R.anim.slide_out_right);
fragmentManager.addOnBackStackChangedListener(this);
fragmentTransaction.replace(R.id.frame, firstFragment, "h");
fragmentTransaction.addToBackStack("h");
fragmentTransaction.commit();

```

**Output:**


[![enter image description here](https://i.stack.imgur.com/GnM7k.gif)](https://i.stack.imgur.com/GnM7k.gif)



---

## Notes

- android.R...
"Android Studio Provides default animation",that's not for android studio it can work in eclipse too,android.R is android specific.And by the way you didn't share the information what apis have this.Because stuff on android.R are different on different apis.
