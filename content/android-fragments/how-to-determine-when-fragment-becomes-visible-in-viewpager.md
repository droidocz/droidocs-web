---
metaTitle: How to determine when Fragment becomes visible in ViewPager
tags:
- android-viewpager
title: How to determine when Fragment becomes visible in ViewPager
---

## Context

Problem: Fragment `onResume()` in `ViewPager` is fired before the fragment becomes actually visible.


For example, I have 2 fragments with `ViewPager` and `FragmentPagerAdapter`. The second fragment is only available for authorized users and I need to ask the user to log in when the fragment becomes visible (using an alert dialog).


BUT the `ViewPager` creates the second fragment when the first is visible in order to cache the second fragment and makes it visible when the user starts swiping.


So the `onResume()` event is fired in the second fragment long before it becomes visible. That's why I'm trying to find an event which fires when the second fragment becomes visible to show a dialog at the appropriate moment.


How can this be done?



---


> 
> How to determine when Fragment becomes visible in ViewPager
> 
> 
> 


You can do the following by overriding `setUserVisibleHint` in your `Fragment`:



```
public class MyFragment extends Fragment {
    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        if (isVisibleToUser) {
        }
        else {
        }
    }
}

```


---

## Notes:

- I have found that the setUserVisibleHint method gets called BEFORE the onCreateView gets called and this makes it difficult to track any initialization.
- `setUserVisibleHint` is now **Deprecated**
- Its just ridiculous that there are so many different hacks for something the SDK should provide by default.
-  If you want to run some code when the hint's coming in as true, but which needs the view tree already initialized, just wrap that block of code in `isResumed()` to avoid an NPE.
- I have 3 fragments in viewstatepager and found getUserVisibleHint() always returns true.
- I haven't seen setUserVisibleHint() documented anywhere as a lifecycle event of the Fragment.
- You know, in Java a method is identified, in part, with a name (as you used), and a CLASS. Especially as there are two objects that may be manipulated (`Fragment` and `ViewPager`).
- here is the best way https://stackoverflow.com/a/63591019/5773037
- Looks like setUserVisibleHint is only for SupportLibrary, couldn't find it in latest SDK
- Actually I have tried this way before, but I found that not only the currently centered page, but also the pages before and after it got "user visible hint". So it may be suitable if your ViewPager shows more than one page at the same time (usually the case on tablet UI), but not for that shows only on page at a time.
- `setUserVisibleHint()` is not called when your App is paused on the fragment you want and you restart it from `onNewIntent()`
- http://stackoverflow.com/questions/40149039/viewpager-recyclerview-issue-in-android
- A bit late, but for anyone facing the same issue, you could try [FragmentViewPager](https://github.com/sbrukhanda/fragmentviewpager)  library (I am the author), which deals with this issue and provides a few extra features. For a sample, check project's GitHub page or this [stackoverflow answer](http://stackoverflow.com/a/38008088/5865280).
- My example with setsetUserVisibleHint should work fine by using the boolean paramater.
