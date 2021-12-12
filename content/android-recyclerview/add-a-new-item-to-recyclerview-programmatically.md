---
metaTitle: Add a new item to recyclerview programmatically
tags:
- add
- items
title: Add a new item to recyclerview programmatically
---

## Context

I'm still trying to get my head around recyclerview. 
I have an arraylist, that I use to initialize a recycler view with.


How can I add new items to the recycler view post setting an adapter and layoutmanager?



```
private void initData() {
        mItems = new ArrayList<String>();
        for (int i = 0; i < ITEMS_COUNT; i++) {
            mItems.add("Item " + (i + 1));
        }
    }

    private void initRecyclerView() {
        mRecentRecyclerView = (RecyclerView) findViewById(R.id.recentrecyclerView);
        mRecentRecyclerView.setHasFixedSize(true);
        mRecentLayoutManager = new LinearLayoutManager(this);
        mRecentRecyclerView.setLayoutManager(mRecentLayoutManager);



        mAdapter = new RecyclerView.Adapter<CustomViewHolder>() {
            @Override
            public CustomViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
                View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.notice_snippet
                        , viewGroup, false);
                return new CustomViewHolder(view);
            }

            @Override
            public void onBindViewHolder(CustomViewHolder viewHolder, int i) {
                viewHolder.noticeSubject.setText(mItems.get(i));
            }

            @Override
            public int getItemCount() {
                return mItems.size();
            }

        };
        mRecentRecyclerView.setAdapter(mAdapter);

    private class CustomViewHolder extends RecyclerView.ViewHolder {

        private TextView noticeSubject;

        public CustomViewHolder(View itemView) {
            super(itemView);

            noticeSubject = (TextView) itemView.findViewById(R.id.notice_subject);
        }
    }

```

So basically after I `initdata()` and `initRecyclerView()`, how do i add a new item to the RecyclerView??



---

First add your item to `mItems` and then use:



```
mAdapter.notifyItemInserted(mItems.size() - 1);

```

this method is better than using:



```
mAdapter.notifyDataSetChanged();

```

in performance.



---

## Notes

- It also means that it won't break animations
- index of last element of mItems is mItems.size()-1.
- I have images that should be loaded from internet in onBindViewHolder. Every time I receive data, I need to append to the list and called notifyDataSetChanged(). You can also use mAdapter.notifyItemRangeInserted(mItems.size() - 1, new_array_of_items_to_be_added.size());
-  What does the "-1" do at the end of your "notifyItemInserted" do? Does it say that if the numbers of items starts with zero, then the item will be inserted at the end of the list each time?
- what if i have to add 10 more items in one go?
- Using the code just for the last item seems to work. Don't need to do it for all the newly inserted items .
- The first mentioned approach will not work until you just add one item to the list. The reason can be found in the RecyclerView, where the list of items is traversed in a way which misbehaves in my opinion. My quick solution is:
```int position = getItemCount() - 1;```
if (position != 0) {
notifyItemInserted(position);
} else {
notifyDataSetChanged();
}
- How about insert at first of recycler view?
