---
metaTitle: Get clicked item and its position in RecyclerView
tags:
- listview
title: Get clicked item and its position in RecyclerView
---

## Context

I am replacing my `ListView` with `RecyclerView`, list showing ok, but I would like to know how to get clicked item and its position, similar to the method [`OnItemClickListener.onItemClick(AdapterView parent, View v, int position, long id)`](http://developer.android.com/reference/android/widget/AdapterView.OnItemClickListener.html) we use in `ListView`.


Thanks for ideas!



---

Based on the link: [Why doesn't RecyclerView have onItemClickListener()? and How RecyclerView is different from Listview?](https://stackoverflow.com/questions/24885223/why-doesnt-recyclerview-have-onitemclicklistener-and-how-recyclerview-is-dif), and also @Duncan's general idea, I give my solution here:


* Define one interface `RecyclerViewClickListener` for a passing message from the adapter to `Activity`/`Fragment`:



```
  public interface RecyclerViewClickListener {
      public void recyclerViewListClicked(View v, int position);
  }

```
* In `Activity`/`Fragment` implement the interface, and also pass listener to adapter:



```
  @Override
  public void recyclerViewListClicked(View v, int position){... ...}

  //set up adapter and pass clicked listener this
  myAdapter = new MyRecyclerViewAdapter(context, this);

```
* In `Adapter` and `ViewHolder`:



```
  public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ItemViewHolder> {
     ... ... 
     private Context context;
     private static RecyclerViewClickListener itemListener;


     public MyRecyclerViewAdapter(Context context, RecyclerViewClickListener itemListener) {
         this.context = context;
         this.itemListener = itemListener;
         ... ...
     }


     //ViewHolder class implement OnClickListener, 
     //set clicklistener to itemView and, 
     //send message back to Activity/Fragment 
     public static class ItemViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{
         ... ...
         public ItemViewHolder(View convertView) {
             super(convertView);
             ... ...
             convertView.setOnClickListener(this);
         }

         @Override
         public void onClick(View v) {
             itemListener.recyclerViewListClicked(v, this.getPosition());     

         }
     }
  }

```


After testing, it works fine.


[**UPDATE**]


Since API 22, `RecyclerView.ViewHolder.getPosition()` is deprecated, so instead with `getLayoutPosition()`.



---

## Notes:

- use getLayoutPosition() method as getPosition() is depricated now.
- thanks for this piece of code :)
just one tip: reference the static `private static RecyclerViewClickListener itemListener;` in a static way in the constructor.
- `public void recyclerViewListClicked(View v, int position);` The modifier `public` is redundant for interface methods
- Should you not be using a WeakReference here: `new MyRecyclerViewAdapter(context, this)`?
-  I ended up adding a listener into each item in the method ```onBindViewHolder```. Moreover, my list item was not all clickable (only part of the item).
- On onclick inside ItemViewHolderclass, we are passing itemListener.recyclerViewListClicked(v, this.getPosition());, instead you can pass recyclerviewItemClickListener.OnItemClick(view,getAdapterPosition());this as well.
- If I want to use this Listener approach to delete items from the dataset and view. It works for the first item, but then the index is shifted by +1 every subsequent delete. I tried to use `adapter.notifyItemRemoved(pos)` but it doesn't help
- What if I don't want ```RecyclerViewClickListener```to be static? For example, I have 3 tabs that use the same kind of adapter and the three implement RecyclerViewClickListener. But if it is not static, how to use it inside ```static class ItemViewHolde``` ?
- how to get the clicked item object to activity from adapter android.i need more clearity am doing as per u r instruction item click listener is not called
