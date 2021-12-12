---
metaTitle: Simple Android grid example using RecyclerView with GridLayoutManager (like the old GridView)
tags:
- gridview
- gridlayoutmanager
title: Simple Android grid example using RecyclerView with GridLayoutManager (like the old GridView)
---

## Context

I know that `RecyclerView` has replaced the functionality of the old `ListView` and `GridView`. I am looking for a very basic example that shows a minimal grid setup using `RecyclerView`. I am not looking for long tutorial style explanations, just a minimal example. I imagine the simplest grid that mimics the old GridView would consist of the following features:


* multiple cells per row
* single view in each cell
* responds to click events


---

Although I do like and appreciate [*Suragch*'s answer](https://stackoverflow.com/a/40587169/5560215), I would like to leave a note because I found that coding the *Adapter* (`MyRecyclerViewAdapter`) to define and expose the Listener method `onItemClick` isn't the best way to do it, due to not using class encapsulation correctly. So my suggestion is to let the *Adapter* handle the Listening operations solely (that's his purpose!) and separate those from the Activity that uses the *Adapter* (`MainActivity`). So this is how I would set the Adapter class:


*MyRecyclerViewAdapter.java*



```
public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ViewHolder> {

    private String[] mData = new String[0];
    private LayoutInflater mInflater;

    // Data is passed into the constructor
    public MyRecyclerViewAdapter(Context context, String[] data) {
        this.mInflater = LayoutInflater.from(context);
        this.mData = data;
    }

    // Inflates the cell layout from xml when needed
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.recyclerview_item, parent, false);
        ViewHolder viewHolder = new ViewHolder(view);
        return viewHolder;
    }

    // Binds the data to the textview in each cell
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        String animal = mData[position];
        holder.myTextView.setText(animal);
    }

    // Total number of cells
    @Override
    public int getItemCount() {
        return mData.length;
    }

    // Stores and recycles views as they are scrolled off screen
    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        public TextView myTextView;

        public ViewHolder(View itemView) {
            super(itemView);
            myTextView = (TextView) itemView.findViewById(R.id.info_text);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            onItemClick(view, getAdapterPosition());
        }
    }

    // Convenience method for getting data at click position
    public String getItem(int id) {
        return mData[id];
    }

    // Method that executes your code for the action received
    public void onItemClick(View view, int position) {
        Log.i("TAG", "You clicked number " + getItem(position).toString() + ", which is at cell position " + position);
    }
}

```

Please note the `onItemClick` method now defined in `MyRecyclerViewAdapter` that is the place where you would want to code your tasks for the event/action received.


There is only a small change to be done in order to complete this transformation: the *Activity* doesn't need to implement `MyRecyclerViewAdapter.ItemClickListener` anymore, because now that is done completely by the *Adapter*. This would then be the final modification:


*MainActivity.java*



```
public class MainActivity extends AppCompatActivity {

    MyRecyclerViewAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // data to populate the RecyclerView with
        String[] data = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"};

        // set up the RecyclerView
        RecyclerView recyclerView = (RecyclerView) findViewById(R.id.rvNumbers);
        int numberOfColumns = 6;
        recyclerView.setLayoutManager(new GridLayoutManager(this, numberOfColumns));
        adapter = new MyRecyclerViewAdapter(this, data);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);
    }
}

```


---

## Notes

- passing data to presenter, doing some logic based on item clicked, tracking, etc.
- I disagree and think that click events should be processed in the hosting `Activity`. Because only it's click listener can know about the `Activity` views and other `Fragments`, `Activities`, etc. The adapter can only send click events to upper level. It should have the interface `ItemClickListener ` with so many events, as many events adapter's views can produce. This solution was written even earlier: https://stackoverflow.com/a/40563598/2914140.
- I agree that Adapter should handle click events, since it has the items with the data in it.  if you need to do some work in the adapter's host (a Fragment or Activity) you should create a callback interface with methods you need. And then you pass an instance of your host into Adapter's constructor. Having the instance of the host you can call it's methods when you need from your Adapter. This is often used when you need to work with ActionMode. When you longClick to select items and use ActionBar buttons.
