---
metaTitle: Need an example about RecyclerView.Adapter.notifyItemChanged(int position, Object payload)
tags:
- payload
title: Need an example about RecyclerView.Adapter.notifyItemChanged(int position, Object payload)
---

## Problem

According to `RecyclerView` documentation about medthod [notifyItemChanged(int position, Object payload)](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html#notifyItemChanged(int,%20java.lang.Object)) 



> 
> Notify any registered observers that the item at position has changed with an optional payload object.
> 
> 
> 


I don't understand how to use second paramenter `payload` in this method. I have searched many document about "payload" but everything was ambiguous.


So, If you know about this method, please show me a clear example about it. Thank you very much.



---

## Solution

If you want to update **not all** holder View but just **part of it**, this method is what you need.


Image that you have following **ViewHolder**



```
public class ViewHolder extends RecyclerView.ViewHolder {
        public final TextView tvPlayer;
        public final TextView tvScore;

        public ViewHolder(View view) {
            super(view);
            tvPlayer = (TextView) view.findViewById(R.id.tv_player);
            tvScore = (TextView) view.findViewById(R.id.tv_score);
        }

    }

```

And somewhere in your code you call adapter to update **single** *TextView - tvScore*



```
mRecyclerViewAdapter.notifyItemChanged(position, new Integer(4533));

```

[...]


***onBindViewHolder(ViewHolder holder, int position, List payloads)*** catches callback at first.
If `payloads` doesn't match your requirements you have to obligatory call super class `super.onBindViewHolder(holder,position, payloads);` which trigger `onBindViewHolder(ViewHolder holder, int position)` for other cases.



```
     // Update only part of ViewHolder that you are interested in
     // Invoked before onBindViewHolder(ViewHolder holder, int position)
        @Override
        public void onBindViewHolder(ViewHolder holder, int position, List<Object> payloads) {
            if(!payloads.isEmpty()) {
                if (payloads.get(0) instanceof Integer) {
                    holder.tvScore.setText(String.valueOf((Integer)payloads.get(0)))
                }
            }else {
                super.onBindViewHolder(holder,position, payloads);
            }
        }

    // Update ALL VIEW holder
    @Override
        public void onBindViewHolder(ViewHolder holder, int position) {
            MItem item = mList.get(position)
            // some update
        }

```


---

## Notes

- Why is it a list of payloads, though? In which case do you have more than one object in the list?
- If you are using Kotlin, there is hint that payload is type of `Any` and in Java is `Object`, so you may pass there anything you want. Later on you will cast your objects inside `onBindViewHolder(ViewHolder holder, int position, List<Object> payloads)`. See more at: https://developer.android.com/reference/android/support/v7/widget/RecyclerView.Adapter.html#notifyItemChanged(int, java.lang.Object)
