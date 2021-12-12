---
metaTitle: AsyncTaskLoader vs AsyncTask
tags:
- android-loadermanager
title: AsyncTaskLoader vs AsyncTask
---

## Context

Since `Honeycomb` and the `v4 Compatibility Library` it is possible to use `AsyncTaskLoader`. From what I understand, the `AsyncTaskLoader` can survive through config changes like screen flips. 


Is it recommended to use `AsyncTaskLoader` instead of `AsyncTask`? Does `LoaderManager` get in the picture too?


But I haven't found any good example(s) about how to correctly use the `AsyncTaskLoader`. The docs also provide no examples. Can anyone provide some good examples.



---

You can have a look at the compatibility library's source code to get more info. What a `FragmentActivity` does is:


* keep a list of `LoaderManager`'s
* make sure they don't get destroyed when you flip your phone (or another configuration change occurs) by saving instances using `onRetainNonConfigurationInstance()`
* kick the right loader when you call `initLoader()` in your Activity


You need to use the `LoaderManager` to interface with the loaders, and provide the needed callbacks to create your loader(s) and populate your views with the data they return. 


Generally it should be easier than managing `AsyncTask`'s yourself. However, `AsyncTaskLoader` is not exactly well documented, so you should study the example in the docs and/or model your code after `CursorLoader`. 



---

## Notes

- Maybe it is too early to find good examples about `AsyncTaskLoader`, and when more developers start using it, more examples will come.
