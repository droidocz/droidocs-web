---
metaTitle: Detect when RecyclerView reaches the bottom most position while scrolling
tags:
- scroll
title: Detect when RecyclerView reaches the bottom most position while scrolling
---

## Problem

I have this code for a RecyclerView.



```
    recyclerView = (RecyclerView)rootview.findViewById(R.id.fabric_recyclerView);
    recyclerView.setLayoutManager(layoutManager);
    recyclerView.addItemDecoration(new RV_Item_Spacing(5));
    FabricAdapter fabricAdapter=new FabricAdapter(ViewAdsCollection.getFabricAdsDetailsAsArray());
    recyclerView.setAdapter(fabricAdapter);

```

I need to know when the RecyclerView reaches bottom most position while scrolling. Is it possible ? If yes, how ?



---

## Solution

Use this code for avoiding repeated calls



```
    recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
        @Override
        public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
            super.onScrollStateChanged(recyclerView, newState);

            if (!recyclerView.canScrollVertically(1) && newState==RecyclerView.SCROLL_STATE_IDLE) {
                Log.d("-----","end");
                
            }
        }
    });

```


---

## Notes

- This will also trigger when you try to swipe up while having few elements in the recycler.
- Just add an additional check for if you can scroll up. If you can't scroll up, and can't scroll down, then just ignore the result (cause the list isn't long enough). `recyclerView.canScrollVertically(-1) && !recyclerView.canScrollVertically(1)`
