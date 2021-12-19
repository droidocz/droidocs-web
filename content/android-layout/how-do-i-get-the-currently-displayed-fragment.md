---
metaTitle: How do I get the currently displayed fragment
tags:
- android-intent
- android-fragments
title: How do I get the currently displayed fragment
---

## Problem

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

## Solution

I know it's an old post, but was having trouble with it previously too. Found a solution which was to do this in the `onBackStackChanged()` listening function



```
  @Override
    public void onBackPressed() {
        super.onBackPressed();

         Fragment f = getActivity().getFragmentManager().findFragmentById(R.id.fragment_container);
      if(f instanceof CustomFragmentClass) 
        // do something with f
        ((CustomFragmentClass) f).doSomething();

    }

```

This worked for me as I didn't want to iterate through every fragment I have to find one that is visible. Hope it helps someone else too.



---

## Notes

- in case `.getFragmentManager` reports incompatible type, as it did in my case, it is because I was using the `android.support.app.v4.Fragment`, in which case the right method to use is `getSupportFragmentManager`
- or you can use `findFragmentByTag()` in place of `findFragmentById`, if you have provided tag to fragment when adding it to `fragmentManager.beginTransaction()
                .add(containerID, frag, fragmentTag)
                .addToBackStack(fragmentTag)
                .commit();`
