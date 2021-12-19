---
metaTitle: Android ListView scrolling to top
title: Android ListView scrolling to top
---

## Problem

I have a `ListView` with custom rows. When any of these rows is
clicked, the ListView's data is regenerated. I'd like the list to
scroll back to the top when this happens.


I initially tried using `setSelection(0)` in each row's `OnClickListener`
to achieve this but was unsuccessful (I believe because the `ListView`
loses its scroll position when its data is invalidated - so my call to
setSelection is undone. I still don't understand how the ListView
decides where to scroll to after invalidation, though).


The only working solution I know of was given by Romain Guy here:
<http://groups.google.com/group/android-developers/browse_thread/thread/127ca57414035301>


It involves (`View.post`)ing the call to `_listView.setSelection(0)`. I
found this to perform quite poorly.
The newly generated list shows up with its scroll location unchanged
and there is a considerable delay before it scrolls back to the top.


Is there any better way to achieve this functionality?


Any help would be much appreciated.


Thanks!



---

## Solution

Personally, I recommend you find a different UI pattern. It is possible that users will find your current "click, and the list changes *in situ*" approach intuitive, but I am skeptical.


You could try subclassing `ListView` and overriding `layoutChildren()` to chain to the superclass, then call `setSelection(0)` in the case where that is needed. If the "considerable delay" is due to just the `post()` call, this should clear it up.



---

## Notes

- The list is changed in situ because breadcrumbs are shown elsewhere on the screen - the typical android UI designs are a less suited to my specific UI goals and target users.
