---
metaTitle: How to update/refresh specific item in RecyclerView
tags:
- android-adapter
title: How to update/refresh specific item in RecyclerView
---

## Context

I'm trying to refresh specific item in `RecyclerView`.


**Story:** Whenever user clicks on item, it shows `AlertDialog`. User can type some text by clicking ok button. I want to show this text in this item and show invisible `ImageView` - declared in XML and adapter `ViewHolder` -


I used this function in `AlertDialog` Positive Button to update the item:



```
private void updateListItem(int position) {
  View view = layoutManager.findViewByPosition(position);
  ImageView medicineSelected = (ImageView) view.findViewById(R.id.medicine_selected);
  medicineSelected.setVisibility(View.VISIBLE);
  TextView orderQuantity = (TextView) view.findViewById(R.id.order_quantity);
  orderQuantity.setVisibility(View.VISIBLE);
  orderQuantity.setText(quantity + " packet added!");

  medicinesArrayAdapter.notifyItemChanged(position);
}

```

But this code not only changes the itemView at passed position, but also changes some of other itemView(s) as well!


How should I change specific itemView correctly by clicking on it?



---

Update single item
==================


1. Update the data item
2. Notify the adapter of the change with `notifyItemChanged(updateIndex)`


### Example


Change the "Sheep" item so that it says "I like sheep."


![Update single item](https://i.stack.imgur.com/UUzHr.gif)



```
String newValue = "I like sheep.";
int updateIndex = 3;
data.set(updateIndex, newValue);
adapter.notifyItemChanged(updateIndex);

```

My full answer with more examples is [here](https://stackoverflow.com/a/48959184/3681880).

