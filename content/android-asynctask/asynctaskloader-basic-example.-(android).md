---
metaTitle: AsyncTaskLoader basic example. (Android)
tags:
- android-handler
title: AsyncTaskLoader basic example. (Android)
---

## Problem

I am using a Loader in my application and based on the result I get from the query I perform on COntacts using this Loader I perform some calculations and store them back in a Sqlite DB. I want this operation to be Asynchronous, however I am confused between using an Async task, as I have lot of different data types to return or should I use a simple handler or an AsyncTaskLoader, I want it to be simple as I am new to Loaders. I tried to search around for examples of AsyncTaskLoader but it seems rocket science, a basic and simple functional example of any of the three in the context of my scenario would be a lot helpful. 



---

## Solution

If you wish to use AsyncTaskLoader, [**here's**](https://github.com/alexjlockwood/AppListLoader) a nice sample for you.


EDIT: I've decided to make a simpler solution (based on [**this repo**](https://github.com/alexjlockwood/adp-applistloader)):



```
public abstract class AsyncTaskLoaderEx<T> extends AsyncTaskLoader<T> {
    private static final AtomicInteger sCurrentUniqueId = new AtomicInteger(0);
    private T mData;
    public boolean hasResult = false;

    public static int getNewUniqueLoaderId() {
        return sCurrentUniqueId.getAndIncrement();
    }

    public AsyncTaskLoaderEx(final Context context) {
        super(context);
        onContentChanged();
    }

    @Override
    protected void onStartLoading() {
        if (takeContentChanged())
            forceLoad();
        //this part should be removed from support library 27.1.0 :
        //else if (hasResult)
        //    deliverResult(mData);
    }

    @Override
    public void deliverResult(final T data) {
        mData = data;
        hasResult = true;
        super.deliverResult(data);
    }

    @Override
    protected void onReset() {
        super.onReset();
        onStopLoading();
        if (hasResult) {
            onReleaseResources(mData);
            mData = null;
            hasResult = false;
        }
    }

    protected void onReleaseResources(T data) {
        //nothing to do.
    }

    public T getResult() {
        return mData;
    }
}

```

Usage:


in your activity:



```
        getSupportLoaderManager().initLoader(TASK_ID, TASK_BUNDLE, new LoaderManager.LoaderCallbacks<Bitmap>() {
            @Override
            public Loader<Bitmap> onCreateLoader(final int id, final Bundle args) {
                return new ImageLoadingTask(MainActivity.this);
            }

            @Override
            public void onLoadFinished(final Loader<Bitmap> loader, final Bitmap result) {
                if (result == null)
                    return;
                //TODO use result
            }

            @Override
            public void onLoaderReset(final Loader<Bitmap> loader) {
            }
        });

```

inner static class , or a normal class:



```
private static class ImageLoadingTask extends AsyncTaskLoaderEx<Bitmap> {

    public ImageLoadingTask (Context context) {
        super(context);
    }

    @Override
    public Bitmap loadInBackground() {
        //TODO load and return bitmap
    }
}

```



---


Update: starting from support library 27.1.0, things changed a bit (link [**here**](https://issuetracker.google.com/issues/74278849#comment5)) :



> 
> In version 27.1.0, onStartLoading() is called every time the Activity
>  is started. Since you call deliverResult() in onStartLoading(), you
>  trigger onLoadFinished(). This is Working as Intended.
> 
> 
> You should remove your call to deliverResult() from onStartLoading()
>  as it is not needed (Loaders already deliver results computed in
>  loadInBackground() without any additional work needed on your part).
> 
> 
> 


I've updated the code above for this change.




---


EDIT:
Updated, kotlin version can be found [here](https://stackoverflow.com/a/28794783/878126).



---

## Notes

- you forgot to `return` from an `isReset()`
