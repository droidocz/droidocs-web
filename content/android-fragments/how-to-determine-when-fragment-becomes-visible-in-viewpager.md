---
metaTitle: How to determine when Fragment becomes visible in ViewPager
tags:
- android-viewpager
title: How to determine when Fragment becomes visible in ViewPager
---

## Problem

Problem: Fragment `onResume()` in `ViewPager` is fired before the fragment becomes actually visible.


For example, I have 2 fragments with `ViewPager` and `FragmentPagerAdapter`. The second fragment is only available for authorized users and I need to ask the user to log in when the fragment becomes visible (using an alert dialog).


BUT the `ViewPager` creates the second fragment when the first is visible in order to cache the second fragment and makes it visible when the user starts swiping.


So the `onResume()` event is fired in the second fragment long before it becomes visible. That's why I'm trying to find an event which fires when the second fragment becomes visible to show a dialog at the appropriate moment.


How can this be done?



---

## Solution

### New


`ViewPager2` + `FragmentStateAdapter` + `onResume()` (in Fragment)
solve the problem


### Old Answer (deprecated)


To detect `Fragment` in `ViewPager` visible, I'm quite sure that **only using** `setUserVisibleHint` is not enough.  

Here is my solution to check if a fragment is visible or invisible. First when launching viewpager, switch between page, go to another activity/fragment/ background/foreground`



```
public class BaseFragmentHelpLoadDataWhenVisible extends Fragment {
    protected boolean mIsVisibleToUser; // you can see this variable may absolutely <=> getUserVisibleHint() but it not. Currently, after many test I find that

    /**
     * This method will be called when viewpager creates fragment and when we go to this fragment background or another activity or fragment
     * NOT called when we switch between each page in ViewPager
     */
    @Override
    public void onStart() {
        super.onStart();
        if (mIsVisibleToUser) {
            onVisible();
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        if (mIsVisibleToUser) {
            onInVisible();
        }
    }

    /**
     * This method will called at first time viewpager created and when we switch between each page
     * NOT called when we go to background or another activity (fragment) when we go back
     */
    @Override
    public void setUserVisibleHint(boolean isVisibleToUser) {
        super.setUserVisibleHint(isVisibleToUser);
        mIsVisibleToUser = isVisibleToUser;
        if (isResumed()) { // fragment have created
            if (mIsVisibleToUser) {
                onVisible();
            } else {
                onInVisible();
            }
        }
    }

    public void onVisible() {
        Toast.makeText(getActivity(), TAG + "visible", Toast.LENGTH_SHORT).show();
    }

    public void onInVisible() {
        Toast.makeText(getActivity(), TAG + "invisible", Toast.LENGTH_SHORT).show();
    }
}

```

**EXPLANATION**
You can check the logcat below carefully then I think you may know why this solution will work


**First launch**



```
Fragment1: setUserVisibleHint: isVisibleToUser=false isResumed=false
Fragment2: setUserVisibleHint: isVisibleToUser=false isResumed=false
Fragment3: setUserVisibleHint: isVisibleToUser=false isResumed=false
Fragment1: setUserVisibleHint: isVisibleToUser=true isResumed=false // AT THIS TIME isVisibleToUser=true but fragment still not created. If you do something with View here, you will receive exception
Fragment1: onCreateView
Fragment1: onStart mIsVisibleToUser=true
Fragment2: onCreateView
Fragment3: onCreateView
Fragment2: onStart mIsVisibleToUser=false
Fragment3: onStart mIsVisibleToUser=false

```

**Go to page2**



```
Fragment1: setUserVisibleHint: isVisibleToUser=false isResumed=true
Fragment2: setUserVisibleHint: isVisibleToUser=true isResumed=true

```

**Go to page3**



```
Fragment2: setUserVisibleHint: isVisibleToUser=false isResumed=true
Fragment3: setUserVisibleHint: isVisibleToUser=true isResumed=true

```

**Go to background:**



```
Fragment1: onStop mIsVisibleToUser=false
Fragment2: onStop mIsVisibleToUser=false
Fragment3: onStop mIsVisibleToUser=true

```

**Go to foreground**



```
Fragment1: onStart mIsVisibleToUser=false
Fragment2: onStart mIsVisibleToUser=false
Fragment3: onStart mIsVisibleToUser=true

```

[DEMO project here](https://github.com/PhanVanLinh/AndroidDetectFragmentVisible)


Hope it help



---

## Notes

- It not works when a fragment has another view pager which also consists fragment.
- sorry, I can not post the answer at this time because i don't have enough time, if possible please refer my git about your problem here https://github.com/PhanVanLinh/AndroidViewPagerSkeleton/tree/master. `SubChildContainerFragment` is used for detect `a fragment has another view pager which also consists fragment`. You can mix `SubChildContainerFragment` and `ChildContainerFragment` to 1 class.
