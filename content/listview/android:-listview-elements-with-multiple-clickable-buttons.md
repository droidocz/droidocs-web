---
metaTitle: 'Android: ListView elements with multiple clickable buttons'
tags:
- button
title: 'Android: ListView elements with multiple clickable buttons'
---

## Context

I've a `ListView` where every element in the list contains a TextView and two different Buttons. Something like this:



```
ListView
--------------------
[Text]
[Button 1][Button 2]
--------------------
[Text]
[Button 1][Button 2]
--------------------
... (and so on) ...

```

With this code I can create an `OnItemClickListener` for the whole item:



```
listView.setOnItemClickListener(new OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> list, View view, int position, long id) {
        Log.i(TAG, "onListItemClick: " + position);

        }

    }
});

```

However, I don't want the whole item to be clickable, but only the two buttons of each list element.


So my question is, how do I implement a onClickListener for these two buttons with the following parameters:


* `int button` (which button of the element has been clicked)
* `int position` (which is the element in the list on which the button click happened)




---


**Update:** I found a solution as described in my answer below. Now I can click/tap the button via the touch screen. However, I can't manually select it with the trackball. It always selects the whole list item and from there goes directly to the next list item ignoring the buttons, even though I set `.setFocusable(true)` and `setClickable(true)` for the buttons in `getView()`.


I also added this code to my custom list adapter:



```
@Override
public boolean  areAllItemsEnabled() {
    return false;           
}

@Override
public boolean isEnabled(int position) {
        return false;
}

```

This causes that no list item is selectable at all any more. But it didn't help in making the nested buttons selectable.


Anyone an idea?



---

This is sort of an appendage @znq's answer...


There are many cases where you want to know the row position for a clicked item AND you want to know which view in the row was tapped. This is going to be a lot more important in tablet UIs.


You can do this with the following custom adapter:



```
private static class CustomCursorAdapter extends CursorAdapter {

    protected ListView mListView;

    protected static class RowViewHolder {
        public TextView mTitle;
        public TextView mText;
    }

    public CustomCursorAdapter(Activity activity) {
        super();
        mListView = activity.getListView();
    }

    @Override
    public void bindView(View view, Context context, Cursor cursor) {
        // do what you need to do
    }

    @Override
    public View newView(Context context, Cursor cursor, ViewGroup parent) {
        View view = View.inflate(context, R.layout.row_layout, null);

        RowViewHolder holder = new RowViewHolder();
        holder.mTitle = (TextView) view.findViewById(R.id.Title);
        holder.mText = (TextView) view.findViewById(R.id.Text);

        holder.mTitle.setOnClickListener(mOnTitleClickListener);
        holder.mText.setOnClickListener(mOnTextClickListener);

        view.setTag(holder);

        return view;
    }

    private OnClickListener mOnTitleClickListener = new OnClickListener() {
        @Override
        public void onClick(View v) {
            final int position = mListView.getPositionForView((View) v.getParent());
            Log.v(TAG, "Title clicked, row %d", position);
        }
    };

    private OnClickListener mOnTextClickListener = new OnClickListener() {
        @Override
        public void onClick(View v) {
            final int position = mListView.getPositionForView((View) v.getParent());
            Log.v(TAG, "Text clicked, row %d", position);
        }
    };
}

```


---

## Notes

- or you can also use something like this ListView mListView = (ListView) v.getParent().getParent();
- How can I get the position if I use the adapter in a separate class. I simply used the position inside OnClickListener, something like this like_c.get(position) . It suggest to make the position to final in getView method of the adapter. If I make that change the position I get is same for all the items in the lisview.
- I am using your code in my app but the click event is called after a delay or when I try to scroll the listview.
-  If you're using the getView() method of the adapter then you already have the position passed to you in the method params. In that case you could use something like setTag() to store the position information.
- Thats because when you use the position parameter of the getView method it gives you the position of the item of the list which is most recently created but not the one you clicked
