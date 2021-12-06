---
metaTitle: How do I get the currently displayed fragment
tags:
- android-intent
- android-fragments
title: How do I get the currently displayed fragment
---

## Context

I am playing with fragments in Android.


I know I can change a fragment by using the following code:



```
FragmentManager fragMgr = getSupportFragmentManager();
FragmentTransaction fragTrans = fragMgr.beginTransaction();

MyFragment myFragment = new MyFragment(); //my custom fragment

fragTrans.replace(android.R.id.content, myFragment);
fragTrans.addToBackStack(null);
fragTrans.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_FADE);
fragTrans.commit();

```

My question is, in a Java file, how can I get the currently displayed Fragment instance?



---

When you add the fragment in your transaction you should use a tag.



```
fragTrans.replace(android.R.id.content, myFragment, "MY_FRAGMENT");

```

...and later if you want to check if the fragment is visible:



```
MyFragment myFragment = (MyFragment)getSupportFragmentManager().findFragmentByTag("MY_FRAGMENT");
if (myFragment != null && myFragment.isVisible()) {
   // add your code here
}

```

See also <http://developer.android.com/reference/android/app/Fragment.html>



---

## Notes:

- Ok, but I need a way to immediately get the currently displayed Fragment instance, not iteratively check through all fragments and then decide which fragment is now displayed on the screen. I think your answer needs my code to iteratively check each of my fragments, and find out the visible one ...
- Yes, but there could be more than one fragment visible at a time.
- BUT Asker wants the currently displayed fragment, which means he doesn't know which fragment is displayed.
- Ok, even there are several fragments displayed, I still need a way to get them... and a way which is better than iteratively check each of my fragments . I am concern on "get them" a method like getDisplayedFragment(), but not sure is there such method in Android
- You need also to put the TAG in the addToBackStack().
- If your phone is turned of isVisible will return false. Therefore this method does not indicates correct if fragment is the stack top one.
- Suppose I have 10 Fragment then I need to write multiple line of code for checking which fragment is active.
- fragTrans.replace(android.R.id.content, myFragment, "MY_FRAGMENT"); is used to set a TAG. But when I find the fragment later by TAG, it's null.
- `MainFragment myFragment = (MainFragment)getSupportFragmentManager().findFragmentById(R.id.frame_layout);            
if (myFragment != null && myFragment.isVisible())
            {
                Log.d(TAG,"myFragment is opened");
            }
            else
            {
                Log.d(TAG,"myFragment is not opened and null");
            }`  try this , with the help of this you dont have to keep track of every fragment tag. instead, use `findFragmentById` to find fragment and cast with class name and you can have condition for checking every fragment.
