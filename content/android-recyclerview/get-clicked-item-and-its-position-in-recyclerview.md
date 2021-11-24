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

