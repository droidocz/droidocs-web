---
metaTitle: Android RecyclerView addition & removal of items
tags:
- java
- user-interface
- selection
title: Android RecyclerView addition & removal of items
---

I have done something similar.
In your `MyAdapter`:



```
public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{
    public CardView mCardView;
    public TextView mTextViewTitle;
    public TextView mTextViewContent;
    public ImageView mImageViewContentPic;

    public ImageView imgViewRemoveIcon;
    public ViewHolder(View v) {
        super(v);
        mCardView = (CardView) v.findViewById(R.id.card_view);
        mTextViewTitle = (TextView) v.findViewById(R.id.item_title);
        mTextViewContent = (TextView) v.findViewById(R.id.item_content);
        mImageViewContentPic = (ImageView) v.findViewById(R.id.item_content_pic);
        //......
        imgViewRemoveIcon = (ImageView) v.findViewById(R.id.remove_icon);

        mTextViewContent.setOnClickListener(this);
        imgViewRemoveIcon.setOnClickListener(this);
        v.setOnClickListener(this);
        mTextViewContent.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View view) {
                if (mItemClickListener != null) {
                    mItemClickListener.onItemClick(view, getPosition());
                }
                return false;
            }
        });
    }


    @Override
    public void onClick(View v) {
        //Log.d("View: ", v.toString());
        //Toast.makeText(v.getContext(), mTextViewTitle.getText() + " position = " + getPosition(), Toast.LENGTH_SHORT).show();
        if(v.equals(imgViewRemoveIcon)){
            removeAt(getPosition());
        }else if (mItemClickListener != null) {
            mItemClickListener.onItemClick(v, getPosition());
        }
    }
}

public void setOnItemClickListener(final OnItemClickListener mItemClickListener) {
    this.mItemClickListener = mItemClickListener;
}
public void removeAt(int position) {
    mDataset.remove(position);
    notifyItemRemoved(position);
    notifyItemRangeChanged(position, mDataSet.size());
}

```

Hope this helps.


**Edit:**


`getPosition()` is deprecated now, use `getAdapterPosition()` instead.

