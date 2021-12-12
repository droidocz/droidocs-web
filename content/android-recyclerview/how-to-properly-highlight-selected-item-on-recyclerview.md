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

This is much simple way to do it.


Have a `private int selectedPos = RecyclerView.NO_POSITION;` in the RecyclerView Adapter class, and under onBindViewHolder method try:



```
@Override
public void onBindViewHolder(ViewHolder viewHolder, int position) {   
    viewHolder.itemView.setSelected(selectedPos == position);

}

```

And in your OnClick event modify:



```
@Override
public void onClick(View view) {
     notifyItemChanged(selectedPos);
     selectedPos = getLayoutPosition();
     notifyItemChanged(selectedPos); 
}

```

Works like a charm for Navigtional Drawer and other RecyclerView Item Adapters.


Note: Be sure to use a background color in your layout using a selector like colabug clarified:



```
<selector xmlns:android="http://schemas.android.com/apk/res/android">
  <item android:drawable="@color/pressed_color" android:state_pressed="true"/>
  <item android:drawable="@color/selected_color" android:state_selected="true"/>
  <item android:drawable="@color/focused_color" android:state_focused="true"/>
</selector>

```

Otherwise setSelected(..) will do nothing, rendering this solution useless.



---

## Notes

- I used this solution with a background drawable/selector set on my row view: 
```
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="
          android:state_pressed="true"/>
    <item android:drawable="
          android:state_selected="true"/>
    <item android:drawable="
          android:state_focused="true"/>
</selector>
```
-  getLayoutPosition is method of ViewHolder class whose object is passed as first parameter in bind view method. So it can be accessed by `vieHolder.getLayoutPosition`
- getLayoutPosition() isn't available by me.
- Don't just use -1, use RecyclerView.NO_POSITION; (which is -1)
- Is "selectedPosition" in the onClick method supposed to be "selectedPos"?
- `viewHolder.itemView.setSelected(selectedPos == position)` didn't work for me.
- My problem is that the first item already has the background highlighted even before the onClick method is called.
- I guess setting selectedPos as -1 rather than 0 would solve that issue
-  Sarma Do you mean the "int" variable should be set up like this: "private int selectedPos = RecyclerView.NO_POSITION"?
- Works fine except the first item is already highlighted even before the onClick method is called.
- If an item is clicked again, it is replaced my another in the recycler view.
- Nice stuff, but the app crashes using RecyclerView.NO_POSITION, after setting selectedPos = 0, solved the crash.
