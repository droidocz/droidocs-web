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
