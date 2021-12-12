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


```
public class MyRvAdapter extends RecyclerView.Adapter<MyRvAdapter.MyViewHolder>{
    public Context context;
    public ArrayList<RvDataItem> dataItems;

    ...
    constructor
    overrides
    ...

    class MyViewHolder extends RecyclerView.ViewHolder{
        public TextView textView;
        public Context context;

        public MyViewHolder(View itemView, Context context) {
            super(itemView);

            this.context = context;

            this.textView = (TextView)itemView.findViewById(R.id.textView);

            // on item click
            itemView.setOnClickListener(new View.OnClickListener(){
                @Override
                public void onClick(View v) {
                    // get position
                    int pos = getAdapterPosition();

                    // check if item still exists
                    if(pos != RecyclerView.NO_POSITION){
                        RvDataItem clickedDataItem = dataItems.get(pos);
                        Toast.makeText(v.getContext(), "You clicked " + clickedDataItem.getName(), Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }
    }
}

```


---

## Notes

- getAdapterPosition() is what I needed.
