---
metaTitle: How to save RecyclerView's scroll position using RecyclerView.State
tags:
- state
title: How to save RecyclerView's scroll position using RecyclerView.State
---

## Context

I have a question about Android's [RecyclerView.State](http://developer.android.com/reference/android/support/v7/widget/RecyclerView.State.html).


I am using a RecyclerView, how could I use and bind it with RecyclerView.State?


My purpose is to **save the RecyclerView's scroll position**.



---

Update
------


Starting from `recyclerview:1.2.0-alpha02` release `StateRestorationPolicy` has been introduced. It could be a better approach to the given problem.


This topic has been covered on [android developers medium article](https://medium.com/androiddevelopers/restore-recyclerview-scroll-position-a8fbdc9a9334).


Also, @rubén-viguera shared more details in the answer below. <https://stackoverflow.com/a/61609823/892500>


Old answer
----------


If you are using LinearLayoutManager, it comes with pre-built save api [linearLayoutManagerInstance.onSaveInstanceState()](http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/5.0.0_r1/android/support/v7/widget/LinearLayoutManager.java#LinearLayoutManager.onSaveInstanceState%28%29) and restore api [linearLayoutManagerInstance.onRestoreInstanceState(...)](http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/5.0.0_r1/android/support/v7/widget/LinearLayoutManager.java#LinearLayoutManager.onRestoreInstanceState%28android.os.Parcelable%29)


With that, you can save the returned parcelable to your outState. e.g.,



```
outState.putParcelable("KeyForLayoutManagerState", linearLayoutManagerInstance.onSaveInstanceState());

```

, and restore restore position with the state you saved. e.g,



```
Parcelable state = savedInstanceState.getParcelable("KeyForLayoutManagerState");
linearLayoutManagerInstance.onRestoreInstanceState(state);

```

To wrap all up, your final code will look something like



```
private static final String BUNDLE_RECYCLER_LAYOUT = "classname.recycler.layout";

/**
 * This is a method for Fragment. 
 * You can do the same in onCreate or onRestoreInstanceState
 */
@Override
public void onViewStateRestored(@Nullable Bundle savedInstanceState) {
    super.onViewStateRestored(savedInstanceState);

    if(savedInstanceState != null)
    {
        Parcelable savedRecyclerLayoutState = savedInstanceState.getParcelable(BUNDLE_RECYCLER_LAYOUT);
        recyclerView.getLayoutManager().onRestoreInstanceState(savedRecyclerLayoutState);
    }
}

@Override
public void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    outState.putParcelable(BUNDLE_RECYCLER_LAYOUT, recyclerView.getLayoutManager().onSaveInstanceState());
}

```

**Edit:** You can also use the same apis with the GridLayoutManager, as it is a subclass of LinearLayoutManager. Thanks @wegsehen for the suggestion.


**Edit:** Remember, if you are also loading data in a background thread, you will need to a call to onRestoreInstanceState within your onPostExecute/onLoadFinished method for the position to be restored upon orientation change, e.g.



```
@Override
protected void onPostExecute(ArrayList<Movie> movies) {
    mLoadingIndicator.setVisibility(View.INVISIBLE);
    if (movies != null) {
        showMoviePosterDataView();
        mDataAdapter.setMovies(movies);
      mRecyclerView.getLayoutManager().onRestoreInstanceState(mSavedRecyclerLayoutState);
        } else {
            showErrorMessage();
        }
    }

```


---

## Notes

- Note that any LayoutManager has that, not only LinearLayoutManager, also GridLayoutManager, and if not its a false implementation.
- This works on a single `RecyclerView` but not if you have a `ViewPager` with a `RecycerView` on each page.
-  I think it works in a fragment (just checked), but not in `onCreateView`, but after data loading.
-  Currently, adding `<activity [..] android:configChanges="orientation|screenSize">` to AndroidManifest.xml works
-  Barış Aker I have a similar issue here: https://stackoverflow.com/questions/52176812/android-restore-recyclerview-item-positions-after-app-re-opens.
- Haven't had any problem with that and it saves the exact scroll position and state.
- What if you're not using a Fragment?
- linearLayoutManager.onInstanceState() always returns null --&gt; check the source code.
- All implementing subclasses (Linear, Grid, Staggered) returns a Parcelable. Here is my reference for LinearLayoutManager, http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/5.1.0_r1/android/support/v7/widget/LinearLayoutManager.java#214
-  in order for this to work in your **Fragment** ensure your saving the new layout state after the data is added to your adapter and not within `onViewStateRestored`. **ie:** ` adapter.submitList(homeContentList)
                    if (!homeContentList.isEmpty()) {
                        contentRecyclerView.scrollToPosition(0)
                        emptyContent.visibility = GONE
                        contentRecyclerView.layoutManager?.onRestoreInstanceState(this.savedRecyclerLayoutState)
                    }`
