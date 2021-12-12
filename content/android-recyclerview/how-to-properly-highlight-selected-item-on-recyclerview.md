---
metaTitle: How to properly highlight selected item on RecyclerView
title: How to properly highlight selected item on RecyclerView
---

## Context

I am trying to use a `RecyclerView` as a horizontal `ListView`. I am trying to figure out how to highlight the selected item. When I click on one of the items, it gets selected and it is highlighted properly but when I click on another one, the second one gets highlighted with the older one. 


Here is my onClick function:



```
@Override
public void onClick(View view) {

    if(selectedListItem!=null){
        Log.d(TAG, "selectedListItem " + getPosition() + " " + item);
        selectedListItem.setBackgroundColor(Color.RED);
    }
    Log.d(TAG, "onClick " + getPosition() + " " + item);
    viewHolderListener.onIndexChanged(getPosition());
    selectedPosition = getPosition();
    view.setBackgroundColor(Color.CYAN); 
    selectedListItem = view;
}

```

Here is the `onBindViewHolder`:



```
@Override
public void onBindViewHolder(ViewHolder viewHolder, int position) {   
    viewHolder.setItem(fruitsData[position]);
    if(selectedPosition == position)
        viewHolder.itemView.setBackgroundColor(Color.CYAN);    
    else
        viewHolder.itemView.setBackgroundColor(Color.RED);

}

```


---

Look on my solution. I suppose that you should set selected position in holder and pass it as Tag of View. 
The view should be set in the onCreateViewHolder(...) method. There is also correct place to set listener for view such as OnClickListener or LongClickListener.


Please look on the example below and read comments to code.



```
public class MyListAdapter extends RecyclerView.Adapter<MyListAdapter.ViewHolder> {
    //Here is current selection position
    private int mSelectedPosition = 0;
    private OnMyListItemClick mOnMainMenuClickListener = OnMyListItemClick.NULL;

    ...

    // constructor, method which allow to set list yourObjectList

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        //here you prepare your view 
        // inflate it
        // set listener for it
        final ViewHolder result = new ViewHolder(view);
        final View view =  LayoutInflater.from(parent.getContext()).inflate(R.layout.your_view_layout, parent, false);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //here you set your current position from holder of clicked view
                mSelectedPosition = result.getAdapterPosition();

                //here you pass object from your list - item value which you clicked
                mOnMainMenuClickListener.onMyListItemClick(yourObjectList.get(mSelectedPosition));

                //here you inform view that something was change - view will be invalidated
                notifyDataSetChanged();
            }
        });
        return result;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        final YourObject yourObject = yourObjectList.get(position);

        holder.bind(yourObject);
        if(mSelectedPosition == position)
            holder.itemView.setBackgroundColor(Color.CYAN);
        else
            holder.itemView.setBackgroundColor(Color.RED);
    }

    // you can create your own listener which you set for adapter
    public void setOnMainMenuClickListener(OnMyListItemClick onMyListItemClick) {
        mOnMainMenuClickListener = onMyListItemClick == null ? OnMyListItemClick.NULL : onMyListItemClick;
    }

    static class ViewHolder extends RecyclerView.ViewHolder {


        ViewHolder(View view) {
            super(view);
        }

        private void bind(YourObject object){
            //bind view with yourObject
        }
    }

    public interface OnMyListItemClick {
        OnMyListItemClick NULL = new OnMyListItemClick() {
            @Override
            public void onMyListItemClick(YourObject item) {

            }
        };

        void onMyListItemClick(YourObject item);
    }
}

```


---

## Notes

- There is many solution... You can use getter and setter, You can create your own method saveInstanceState for adapter and call it in saveInstanceState from Activity/Fragment
- Do you think mSelectedPosition can be declared as static to maintain configuration changes?
- screen rotation) we can declare this variable in activity and get it from there, right?
