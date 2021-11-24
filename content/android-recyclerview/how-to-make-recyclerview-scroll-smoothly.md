---
metaTitle: How to make RecyclerView scroll smoothly
tags:
- smooth-scrolling
- gridlayoutmanager
title: How to make RecyclerView scroll smoothly
---

## Context

This is more like a generic question, but after lot of search and try I am not able to understand why this is so difficult to achieve. [This](https://stackoverflow.com/a/28853254/1273407) is the closest answer I can find but still unable to implement.


To be specific I am using RecyclerView with GridLayoutManager. All I want is the grid layout to scroll smoothly (like default gallary app) ,nothing fancy, but the default implementation of grid layout manager scrolls the view in a 'jerky' manner. I tried to implement the method from above link but unsuccessfully.


I also tried to implement LinearSmoothScroller but I am not sure how to implement computeScrollVectorForPosition method. [Google's documentation](https://developer.android.com/reference/android/support/v7/widget/LinearSmoothScroller.html#computeScrollVectorForPosition(int)) on computeScrollVectorForPosition literally has 0 words. 


I found [this 3 part tutorial](http://blog.stylingandroid.com/scrolling-recyclerview-part-1/), but it was of very little help. So, all I want to ask is: can there be some kind of template code which we can implement in LinearSmoothScroller or by extending RecyclerView.SmoothScroller and achieve smooth scrolling ? Even if the code depends on number of items and items per row in gridlayout, there has to be some method to do it easily. Am I missing something here ?



---

The typical source of "jerky" scrolling in Android is the app taking too much time on the main application thread updating the UI. In the case of `RecyclerView`, this would mean taking too much time in `onBindViewHolder()` or possibly in `onCreateViewHolder()`. Those each need to return in sub-millisecond times, meaning you cannot do disk I/O or network I/O in them. 



> 
> think I found the problem. I am using holder.photo.setImageBitmap(BitmapFactory.decodeFile(itemList.get(position).get‌​AbsolutePath())); on onBindViewHolder() and the image file is around 100kb each with about a dozen images in the list
> 
> 
> 


Yes, that will be doing disk I/O and image decoding on the main application thread. That will be slow enough to cause jank in the UI (i.e., "jerky" scrolling).


Consider using an image loading library, like Picasso or Universal Image Loader, as they can populate your `ImageView` from the bitmap asynchronously.


[This sample app](https://github.com/commonsguy/cw-omnibus/tree/master/RecyclerView/VideoTable) uses Universal Image Loader to help populate the contents of a `RecyclerView` (with `GridLayoutManager`), with the data source being the available videos on the device.

