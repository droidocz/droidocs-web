---
metaTitle: How to Animate Addition or Removal of Android ListView Rows
tags:
- animation
title: How to Animate Addition or Removal of Android ListView Rows
---

## Context

In iOS, there is a very easy and powerful facility to animate the addition and removal of UITableView rows, [here's a clip from a youtube video](http://www.youtube.com/watch?v=VhSWE6_ieyA#t=1m10s) showing the default animation. Note how the surrounding rows collapse onto the deleted row. This animation helps users keep track of what changed in a list and where in the list they were looking at when the data changed.


Since I've been developing on Android I've found no equivalent facility to animate individual rows in a [TableView](http://developer.android.com/reference/android/widget/ListView.html). Calling [`notifyDataSetChanged()`](http://developer.android.com/reference/android/widget/BaseAdapter.html#notifyDataSetChanged()) on my Adapter causes the ListView to immediately update its content with new information. I'd like to show a simple animation of a new row pushing in or sliding out when the data changes, but I can't find any documented way to do this. It looks like [LayoutAnimationController](http://LayoutAnimationController) might hold a key to getting this to work, but when I set a LayoutAnimationController on my ListView (similar to [ApiDemo's LayoutAnimation2](http://developer.android.com/resources/samples/ApiDemos/src/com/example/android/apis/view/LayoutAnimation2.html)) and remove elements from my adapter after the list has displayed, the elements disappear immediately instead of getting animated out.


I've also tried things like the following to animate an individual item when it is removed:



```
@Override
protected void onListItemClick(ListView l, View v, final int position, long id) {
    Animation animation = new ScaleAnimation(1, 1, 1, 0);
    animation.setDuration(100);
    getListView().getChildAt(position).startAnimation(animation);
    l.postDelayed(new Runnable() {
        public void run() {
            mStringList.remove(position);
            mAdapter.notifyDataSetChanged();
        }
    }, 100);
}

```

However, the rows surrounding the animated row don't move position until they jump to their new positions when `notifyDataSetChanged()` is called. It appears ListView doesn't update its layout once its elements have been placed.


While writing my own implementation/fork of ListView has crossed my mind, this seems like something that shouldn't be so difficult.


Thanks!



---

Since Android is open source, you don't actually need to reimplement ListView's optimizations. You can grab ListView's code and try to find a way to hack in the animation, you can also [open a feature request](http://code.google.com/p/android/issues/entry?template=Feature%20request) in android bug tracker (and if you decided to implement it, don't forget to [contribute a patch](http://source.android.com/source/submit-patches.html)). 


FYI, the ListView source code is [here](http://android.git.kernel.org/?p=platform/frameworks/base.git;a=blob;f=core/java/android/widget/ListView.java;h=892c44af7ffc4605004971b2d6dce88c065f1c76;hb=HEAD).



---

## Notes

- Please look at implementations in various open source libraries.
