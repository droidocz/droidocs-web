---
metaTitle: Android RecyclerView addition & removal of items
tags:
- java
- user-interface
- selection
title: Android RecyclerView addition & removal of items
---

## Problem

I have a RecyclerView with an TextView text box and a cross button ImageView. I have a button outside of the recyclerview that makes the cross button ImageView visible / gone.


I'm looking to remove an item from the recylerview, when that items cross button ImageView is pressed.


My adapter:



```
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> implements View.OnClickListener, View.OnLongClickListener {

    private ArrayList<String> mDataset;
    private static Context sContext;

    public MyAdapter(Context context, ArrayList<String> myDataset) {
        mDataset = myDataset;
        sContext = context;
    }

    @Override
    public MyAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.my_text_view, parent, false);

        ViewHolder holder = new ViewHolder(v);
        holder.mNameTextView.setOnClickListener(MyAdapter.this);
        holder.mNameTextView.setOnLongClickListener(MyAdapter.this);

        holder.mNameTextView.setTag(holder);

        return holder;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {

        holder.mNameTextView.setText(mDataset.get(position));

    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }


    @Override
    public void onClick(View view) {
        ViewHolder holder = (ViewHolder) view.getTag();
        if (view.getId() == holder.mNameTextView.getId()) {
            Toast.makeText(sContext, holder.mNameTextView.getText(), Toast.LENGTH_SHORT).show();
        }
    }


    @Override
    public boolean onLongClick(View view) {
        ViewHolder holder = (ViewHolder) view.getTag();
        if (view.getId() == holder.mNameTextView.getId()) {
            mDataset.remove(holder.getPosition());

            notifyDataSetChanged();

            Toast.makeText(sContext, "Item " + holder.mNameTextView.getText() + " has been removed from list",
                    Toast.LENGTH_SHORT).show();
        }
        return false;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView mNumberRowTextView;
        public TextView mNameTextView;


        public ViewHolder(View v) {
            super(v);

            mNameTextView = (TextView) v.findViewById(R.id.nameTextView);
        }
    }
}

```

My layout is:



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:gravity="center_vertical"
    android:id="@+id/layout">

    <TextView
        android:id="@+id/nameTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="18sp"
        android:padding="5dp"
        android:background="@drawable/greyline"/>

    <ImageView
        android:id="@+id/crossButton"
        android:layout_width="16dp"
        android:layout_height="16dp"
        android:visibility="gone"
        android:layout_marginLeft="50dp"
        android:src="@drawable/cross" />
</LinearLayout>

```

How can I get something like an onClick working for my crossButton ImageView? Is there a better way? Maybe changing the whole item onclick into a remove the item? The recyclerview shows a list of locations that need to be edited. Any technical advice or comments / suggestions on best implementation would be hugely appreciated.



---

## Solution

Here are some visual supplemental examples. See [my fuller answer](https://stackoverflow.com/a/48959184/3681880) for examples of adding and removing a range.


Add single item
---------------


Add "Pig" at index `2`.


![Insert single item](https://i.stack.imgur.com/VGB85.gif)



```
String item = "Pig";
int insertIndex = 2;
data.add(insertIndex, item);
adapter.notifyItemInserted(insertIndex);

```

Remove single item
------------------


Remove "Pig" from the list.


![Remove single item](https://i.stack.imgur.com/je91J.gif)



```
int removeIndex = 2;
data.remove(removeIndex);
adapter.notifyItemRemoved(removeIndex);

```
