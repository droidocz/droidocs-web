---
metaTitle: RecyclerView change data set
title: RecyclerView change data set
---

## Problem

I want to implement search functionality for my RecyclerView. On text changed i want to change the data that are displayed with this widget. Maybe this question has been asked before or is simple, but I don't know how the change the data that is to be shown...


My RecyclerView is defined as follows:



```
     // 1. get a reference to recyclerView
    mRecyclerView = (RecyclerView)findViewById(R.id.recyclerView);

    // 2. set layoutManger
    mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
    // 3. create an adapter
    mAdapter = new ItemsAdapter(itemsData);
    // 4. set adapter
    mRecyclerView.setAdapter(mAdapter);

```

And the data that I am showing is something like:



```
   ItemData itemsData[] = { new ItemData("Mary Richards"),
        new ItemData("Tom Brown"),
        new ItemData("Lucy London")          
};

```

So when when I want to give the adapter another set of data, another array (with one item for example), what should I do?



---

## Solution

If you have stable ids in your adapter, you can get pretty good results (animations) if you create a new array containing the filtered items and call 



```
recyclerView.swapAdapter(newAdapter, false);

```

Using [swapAdapter](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.html#swapAdapter(android.support.v7.widget.RecyclerView.Adapter,%20boolean)) hints RecyclerView that it can re-use view holders. (vs in setAdapter, it has to recycle all views and re-create because it does not know that the new adapter has the same ViewHolder set with the old adapter).


A better approach would be finding which items are removed and calling `notifyItemRemoved(index)`. Don't forget to actually remove the item. This will let RecyclerView run predictive animations. Assuming you have an Adapter that internally uses an ArrayList, implementation would look like this:



```
// adapter code
final List<ItemData> mItems = new ArrayList(); //contains your items
public void filterOut(String filter) {
   final int size = mItems.size();
   for(int i = size - 1; i>= 0; i--) {
       if (mItems.get(i).test(filter) == false) {
           mItems.remove(i);
           notifyItemRemoved(i);
       }
   }
}

```

It would perform even better if you can batch `notifyItemRemoved` calls and use `notifyItemRangeRemoved` instead. It would look sth like: (not tested)



```
public void filterOut(String filter) {
   final int size = mItems.size();
   int batchCount = 0; // continuous # of items that are being removed
   for(int i = size - 1; i>= 0; i--) {
       if (mItems.get(i).test(filter) == false) {
           mItems.remove(i);
           batchCount ++;
       } else if (batchCount != 0) { // dispatch batch
           notifyItemRangeRemoved(i + 1, batchCount);
           batchCount = 0;
       }
   }
   // notify for remaining
   if (batchCount != 0) { // dispatch remaining
       notifyItemRangeRemoved(0, batchCount);
   }
}

```

You need to extend this code to add items that were previously filtered out but now should be visible (e.g. user deletes the filter query) but I think this one should give the basic idea.


Keep in mind that, each notify item call affects the ones after it (which is why I'm traversing the list from end to avoid it). Traversing from end also helps ArrayList's remove method performance (less items to shift).


For example, if you were traversing the list from the beginning and remove the first two items.
You should either call



```
notifyItemRangeRemoved(0, 2); // 2 items starting from index 0

```

or if you dispatch them one by one



```
notifyItemRemoved(0);
notifyItemRemoved(0);//because after the previous one is removed, this item is at position 0

```


---

## Notes

- My dataset changes but I dont know in what way (some new items might be added and some might be removed) yet the view stays the same, so should I pass true or false to swapAdapter?
- A note on the "stable ids" solution: You don't need to implicitly call `swapAdapter()`. But any other solution like using the same adapter, and change the backing list items works just as good, as long as you call `notifyDataSetChanged()`.
- never knew about this method.
