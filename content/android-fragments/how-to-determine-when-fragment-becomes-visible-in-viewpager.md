---
metaTitle: How to determine when Fragment becomes visible in ViewPager
tags:
- android-viewpager
title: How to determine when Fragment becomes visible in ViewPager
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
