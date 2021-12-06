---
metaTitle: Custom Adapter for List View
tags:
- android-tablelayout
- custom-adapter
title: Custom Adapter for List View
---

## Context

I want to create a `custom adapter` for my list view. Is there any article that can walk me through how to create one and also explain how it works?



---


```
public class ListAdapter extends ArrayAdapter<Item> {

    private int resourceLayout;
    private Context mContext;

    public ListAdapter(Context context, int resource, List<Item> items) {
        super(context, resource, items);
        this.resourceLayout = resource;
        this.mContext = context;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = convertView;

        if (v == null) {
            LayoutInflater vi;
            vi = LayoutInflater.from(mContext);
            v = vi.inflate(resourceLayout, null);
        }

        Item p = getItem(position);

        if (p != null) {
            TextView tt1 = (TextView) v.findViewById(R.id.id);
            TextView tt2 = (TextView) v.findViewById(R.id.categoryId);
            TextView tt3 = (TextView) v.findViewById(R.id.description);

            if (tt1 != null) {
                tt1.setText(p.getId());
            }

            if (tt2 != null) {
                tt2.setText(p.getCategory().getId());
            }

            if (tt3 != null) {
                tt3.setText(p.getDescription());
            }
        }

        return v;
    }

}

```

This is a class I had used for my project. You need to have a collection of your items which you want to display, in my case it's `<Item>`. You need to override `View getView(int position, View convertView, ViewGroup parent)` method.


`R.layout.itemlistrow` defines the row of the `ListView`.



```
<?xml version="1.0" encoding="utf-8"?>
<TableLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_height="wrap_content" android:orientation="vertical"
    android:layout_width="fill_parent">

    <TableRow android:layout_width="fill_parent"
              android:id="@+id/TableRow01"
              android:layout_height="wrap_content">

        <TextView android:textColor="#FFFFFF"
                  android:id="@+id/id"
                  android:layout_width="fill_parent"
                  android:layout_height="wrap_content"
                  android:text="id" android:textStyle="bold" 
                  android:gravity="left"
                  android:layout_weight="1" 
                  android:typeface="monospace"
                  android:height="40sp" />
    </TableRow>

    <TableRow android:layout_height="wrap_content"
              android:layout_width="fill_parent">

        <TextView android:textColor="#FFFFFF" 
                  android:id="@+id/categoryId"
                  android:layout_width="fill_parent"
                  android:layout_height="wrap_content"
                  android:text="categoryId" 
                  android:layout_weight="1" 
                  android:height="20sp" />

        <TextView android:layout_height="wrap_content"
                  android:layout_width="fill_parent" 
                  android:layout_weight="1"
                  android:textColor="#FFFFFF"
                  android:gravity="right"
                  android:id="@+id/description"
                  android:text="description" 
                  android:height="20sp" />
    </TableRow>

</TableLayout>

```

In the `MainActivity` define `ListView`like this, 



```
ListView yourListView = (ListView) findViewById(R.id.itemListView);

// get data from the table by the ListAdapter
ListAdapter customAdapter = new ListAdapter(this, R.layout.itemlistrow, List<yourItem>);

yourListView .setAdapter(customAdapter);

```


---

## Notes:

- And what is my item here ListAdapter customAdapter = new ListAdapter(this, R.layout.itemlistrow, List&lt;yourItem&gt;); ?
- There is no need to keep the collection called items in your class, you are passing it to the super constructor. Items can be retrieved by the getItem(int pos) method.
- Is there a way to just retrieve the one provided at construction?
- Thanks for the code.. Can you explain the getView Method as in what should go into it ?
- I get error in the activity here ListView yourListView = (ListView) findViewById(R.id.itemListView); cannot be resolved or is not a field
