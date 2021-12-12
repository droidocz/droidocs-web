---
metaTitle: Android ListView headers
tags:
- java
- header
- android-arrayadapter
title: Android ListView headers
---

## Context

I have ListView that has some kind of events on it. Events are sorted by day, and I would like to have header with date on it for every day, and then events listen below.


Here is how I populate that list:



```
ArrayList<TwoText> crs = new ArrayList<TwoText>();

crs.add(new TwoText("This will be header", event.getDate()));

for (Event event : events) {
    crs.add(new TwoText(event.getStartString() + "-" + event.getEndString(), event.getSubject()));
}

arrayAdapter = new TwoTextArrayAdapter(this, R.layout.my_list_item, crs);
lv1.setAdapter(arrayAdapter);

```

and this is how my class TwoText looks:



```
public class TwoText {
    public String classID;
    public String state;

    public TwoText(String classID, String state) {
        this.classID = classID;
        this.state = state;
    }
}

```

and this is how my TwoTextArrayAdapter class looks:



```
import java.util.ArrayList;
import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

public class TwoTextArrayAdapter extends ArrayAdapter<TwoText> {

    private ArrayList<TwoText> classes;
    private Activity con;
    TextView seperator;

    public TwoTextArrayAdapter(Activity context, int textViewResourceId, ArrayList<TwoText> classes) {
        super(context, textViewResourceId, classes);
        this.con = context;
        this.classes = classes;

    }

    @Override

    public View getView(int position, View convertView, ViewGroup parent) {

        View v = convertView;

        if (v == null) {

            LayoutInflater vi = (LayoutInflater) con.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

            v = vi.inflate(R.layout.my_list_item, null);

        }

        TwoText user = classes.get(position);

        if (user != null) {

            TextView content1 = (TextView) v.findViewById(R.id.list_content1);

            TextView content2 = (TextView) v.findViewById(R.id.list_content2);

            if (content1 != null) {

                content1.setText(user.classID);
            }   
            if(content2 != null) {

                content2.setText(user.state);
            }
        }
        return v;
    }
}

```

and this is my\_list\_item.xml



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <TextView
        style="?android:attr/listSeparatorTextViewStyle"
        android:id="@+id/separator"
        android:text="Header"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:background="#757678"
        android:textColor="#f5c227" />

    <LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="horizontal" >

        <TextView
            android:id="@+id/list_content1"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:layout_margin="5dip"
            android:clickable="false"
            android:gravity="center"
            android:longClickable="false"
            android:paddingBottom="1dip"
            android:paddingTop="1dip"
            android:text="sample"
            android:textColor="#ff7f1d"
            android:textSize="17dip"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/list_content2"
            android:layout_width="wrap_content"
            android:layout_height="match_parent"
            android:layout_margin="5dip"
            android:clickable="false"
            android:gravity="center"
            android:linksClickable="false"
            android:longClickable="false"
            android:paddingBottom="1dip"
            android:paddingTop="1dip"
            android:text="sample"
            android:textColor="#6d6d6d"
            android:textSize="17dip" />
    </LinearLayout>

</LinearLayout>

```

what I do at the moment is that I am adding header just as regular list object, but Id like it to be as header and in my case have a date on it.


I have this code in my xml for header:



```
<TextView
        style="?android:attr/listSeparatorTextViewStyle"
        android:id="@+id/separator"
        android:text="Header"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:background="#757678"
        android:textColor="#f5c227" />

```

and I tried hiding it when it is unneccessary and showing it when neccessary but I just messed up rest of my code. I tried few more tutorials but they also had same effect.


Could anyone guide me on how to do that easy way?



---

Here's how I do it, the keys are [getItemViewType](http://developer.android.com/reference/android/widget/Adapter.html#getItemViewType%28int%29) and [getViewTypeCount](http://developer.android.com/reference/android/widget/Adapter.html#getViewTypeCount%28%29) in the `Adapter` class. `getViewTypeCount` returns how many types of items we have in the list, in this case we have a header item and an event item, so two. `getItemViewType` should return what type of `View` we have at the input `position`.


Android will then take care of passing you the right type of `View` in `convertView` automatically.


Here what the result of the code below looks like: 


![](https://i.stack.imgur.com/b528R.png)
First we have an interface that our two list item types will implement



```
public interface Item {
    public int getViewType();
    public View getView(LayoutInflater inflater, View convertView);
}

```

Then we have an adapter that takes a list of `Item`



```
public class TwoTextArrayAdapter extends ArrayAdapter<Item> {
    private LayoutInflater mInflater;

    public enum RowType {
        LIST_ITEM, HEADER_ITEM
    }

    public TwoTextArrayAdapter(Context context, List<Item> items) {
        super(context, 0, items);
        mInflater = LayoutInflater.from(context);
    }

    @Override
    public int getViewTypeCount() {
        return RowType.values().length;

    }

    @Override
    public int getItemViewType(int position) {
        return getItem(position).getViewType();
    }

```


> 
> 
> ```
> @Override
> public View getView(int position, View convertView, ViewGroup parent) {
>    return getItem(position).getView(mInflater, convertView);
> }
> 
> ```
> 
> 


**EDIT**
**Better For Performance.. can be noticed when scrolling**



```
private static final int TYPE_ITEM = 0; 
private static final int TYPE_SEPARATOR = 1; 

public View getView(int position, View convertView, ViewGroup parent)  {
    ViewHolder holder = null;
    int rowType = getItemViewType(position);
    View View;
    if (convertView == null) {
        holder = new ViewHolder();
        switch (rowType) {
            case TYPE_ITEM:
                convertView = mInflater.inflate(R.layout.task_details_row, null);
                holder.View=getItem(position).getView(mInflater, convertView);
                break;
            case TYPE_SEPARATOR:
                convertView = mInflater.inflate(R.layout.task_detail_header, null);
                holder.View=getItem(position).getView(mInflater, convertView);
                break;
        }
        convertView.setTag(holder);
    }
    else
    {
        holder = (ViewHolder) convertView.getTag();
    }
    return convertView; 
} 

public static class ViewHolder {
    public  View View; } 
}

```

Then we have classes the implement `Item` and inflate the correct layouts. In your case you'll have something like a `Header` class and a `ListItem` class.



```
   public class Header implements Item {
    private final String         name;

    public Header(String name) {
        this.name = name;
    }

    @Override
    public int getViewType() {
        return RowType.HEADER_ITEM.ordinal();
    }

    @Override
    public View getView(LayoutInflater inflater, View convertView) {
        View view;
        if (convertView == null) {
            view = (View) inflater.inflate(R.layout.header, null);
            // Do some initialization
        } else {
            view = convertView;
        }

        TextView text = (TextView) view.findViewById(R.id.separator);
        text.setText(name);

        return view;
    }

}

```

And then the `ListItem` class



```
    public class ListItem implements Item {
    private final String         str1;
    private final String         str2;

    public ListItem(String text1, String text2) {
        this.str1 = text1;
        this.str2 = text2;
    }

    @Override
    public int getViewType() {
        return RowType.LIST_ITEM.ordinal();
    }

    @Override
    public View getView(LayoutInflater inflater, View convertView) {
        View view;
        if (convertView == null) {
            view = (View) inflater.inflate(R.layout.my_list_item, null);
            // Do some initialization
        } else {
            view = convertView;
        }

        TextView text1 = (TextView) view.findViewById(R.id.list_content1);
        TextView text2 = (TextView) view.findViewById(R.id.list_content2);
        text1.setText(str1);
        text2.setText(str2);

        return view;
    }

}

```

And a simple `Activity` to display it



```
public class MainActivity extends ListActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        List<Item> items = new ArrayList<Item>();
        items.add(new Header("Header 1"));
        items.add(new ListItem("Text 1", "Rabble rabble"));
        items.add(new ListItem("Text 2", "Rabble rabble"));
        items.add(new ListItem("Text 3", "Rabble rabble"));
        items.add(new ListItem("Text 4", "Rabble rabble"));
        items.add(new Header("Header 2"));
        items.add(new ListItem("Text 5", "Rabble rabble"));
        items.add(new ListItem("Text 6", "Rabble rabble"));
        items.add(new ListItem("Text 7", "Rabble rabble"));
        items.add(new ListItem("Text 8", "Rabble rabble"));

        TwoTextArrayAdapter adapter = new TwoTextArrayAdapter(this, items);
        setListAdapter(adapter);
    }

}

```

Layout for `R.layout.header`



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal" >

    <TextView
        style="?android:attr/listSeparatorTextViewStyle"
        android:id="@+id/separator"
        android:text="Header"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:background="#757678"
        android:textColor="#f5c227" />

</LinearLayout>

```

Layout for `R.layout.my_list_item`



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal" >

    <TextView
        android:id="@+id/list_content1"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dip"
        android:clickable="false"
        android:gravity="center"
        android:longClickable="false"
        android:paddingBottom="1dip"
        android:paddingTop="1dip"
        android:text="sample"
        android:textColor="#ff7f1d"
        android:textSize="17dip"
        android:textStyle="bold" />

    <TextView
        android:id="@+id/list_content2"
        android:layout_width="wrap_content"
        android:layout_height="match_parent"
        android:layout_margin="5dip"
        android:clickable="false"
        android:gravity="center"
        android:linksClickable="false"
        android:longClickable="false"
        android:paddingBottom="1dip"
        android:paddingTop="1dip"
        android:text="sample"
        android:textColor="#6d6d6d"
        android:textSize="17dip" />

</LinearLayout>

```

Layout for `R.layout.activity_main.xml`



```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" >

    <ListView
        android:id="@android:id/list"
        android:layout_width="fill_parent"
        android:layout_height="fill_parent" />

</RelativeLayout>

```

You can also get fancier and use `ViewHolders`, load stuff asynchronously, or whatever you like.



---

## Notes

- Liked your solution here, but since you're extending an ArrayAdapter, you shouldn't track your own List of items. Just use the internally tracked one in ArrayAdapter. Otherwise you are doubling the amount of memory to store your Items
- I did, however, have an issue with the results of the ListView being in a semi-random order (first header and items were ok, following were messed up), I managed to find out what the problem is. The block of code underneath **'EDIT Better For Performance.. can be noticed when scrolling'** messed it up for me - removing this from the Custom ArrayAdapter class fixed the issue for me.
- I'd only add this to the adapter, if the headers are non clickable (which could be set in a constructor)


    public boolean isEnabled(int position) {
        return (getItem(position).getViewType() == RowType.LIST_ITEM.ordinal());
    }
- the rows are getting randomized when the list view is scrolled?
- Why can't Google just make this happen with just 3 lines of code?
-  I don't think the memory is getting doubled as claimed by Jay Soyer. We are dealing with reference objects here. All that is happening is that an extra reference is being created to items array when we are doing this.items = items in the constructor. There is no new creation or copying of items being done in the constructor for the memory to double.
- How can you retrieve the object you passed on the first place? In the section class, I passed an object to the constructor, but I can't get it from onItemClickListener.
- But I want to keep header on top until its items are being shown while scrolling list and then show next header on top while its items are being shown.
- If you could upload the eclipse project too, it would be even better.
- how to implement list click in this and how to get the clicked objet?
- Header takes 2 arguments and ListItem takes 3, it looks to me like they are both one short, my ide isn't accepting that, can anyone explain?
-  Thanks Jay, I've updated the code to use the internal list.
- I didn't want to read that long code but the code and the answer are both well written.
-  do you know how this would work with a cursor for the list items?
- I've added the layouts to the post, they use the XML from your post for the most part.
- I had tried to simplify the implementation a bit by removing the need to pass around a `LayoutInflater`, but I forgot to missed updating some sections
-  how to get item data from click of `ListView`?
- Hello guys, how can one retrieve the value of selected position from arraylist, suppose i do, items.get(position) i cannot access the paramaters.
- It looks like the line "holder.View=getItem(position).getView(mInflater, convertView);" will result in the convertView saving the references and data associated, because the concrete implementations of the Item interface seem to findViewById AND associate data. This probably works fine when convertView is NULL, wondering how this works when convertView is not null as we are not associating new data when view is recycled
