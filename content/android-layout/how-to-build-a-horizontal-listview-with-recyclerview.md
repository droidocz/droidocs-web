---
metaTitle: How to build a horizontal ListView with RecyclerView
tags:
- android-recyclerview
title: How to build a horizontal ListView with RecyclerView
---

## Problem

I need to implement a horizontal listview in my Android application. I did a bit of research and came across *[How can I make a horizontal ListView in Android?](https://stackoverflow.com/questions/3877040/how-can-i-make-a-horizontal-listview-in-android)* and *[Horizontal ListView in Android?](https://stackoverflow.com/questions/3240331/horizontal-listview-in-android)*. However, these questions were asked before Recyclerview was released. Is there a better way to implement this now with Recyclerview?



---

## Solution

Complete example
================


[![enter image description here](https://i.stack.imgur.com/l9Ifb.png)](https://i.stack.imgur.com/l9Ifb.png)


The only real difference between a vertical `RecyclerView` and a horizontal one is how you set up the `LinearLayoutManager`. Here is the code snippet. The full example is below.



```
LinearLayoutManager horizontalLayoutManagaer = new LinearLayoutManager(MainActivity.this, LinearLayoutManager.HORIZONTAL, false);
recyclerView.setLayoutManager(horizontalLayoutManagaer);

```

This fuller example is modeled after [my vertical `RecyclerView` answer](https://stackoverflow.com/a/40584425/3681880).


Update Gradle dependencies
==========================


Make sure the following dependencies are in your app `gradle.build` file:



```
implementation 'com.android.support:appcompat-v7:27.1.1'
implementation 'com.android.support:recyclerview-v7:27.1.1'

```

You can update the version numbers to whatever is [the most current](https://stackoverflow.com/a/39239240/3681880).


Create activity layout
======================


Add the `RecyclerView` to your xml layout.


*activity\_main.xml*



```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/rvAnimals"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</RelativeLayout>

```

Create item layout
==================


Each item in our `RecyclerView` is going to have a single a colored `View` over a `TextView`. Create a new layout resource file.


*recyclerview\_item.xml*



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="wrap_content"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="10dp">

    <View
        android:id="@+id/colorView"
        android:layout_width="100dp"
        android:layout_height="100dp"/>

    <TextView
        android:id="@+id/tvAnimalName"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="20sp"/>

</LinearLayout>

```

Create the adapter
==================


The `RecyclerView` needs an adapter to populate the views in each row (horizontal item) with your data. Create a new java file.


*MyRecyclerViewAdapter.java*



```
public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ViewHolder> {

    private List<Integer> mViewColors;
    private List<String> mAnimals;
    private LayoutInflater mInflater;
    private ItemClickListener mClickListener;

    // data is passed into the constructor
    MyRecyclerViewAdapter(Context context, List<Integer> colors, List<String> animals) {
        this.mInflater = LayoutInflater.from(context);
        this.mViewColors = colors;
        this.mAnimals = animals;
    }

    // inflates the row layout from xml when needed
    @Override
    @NonNull
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.recyclerview_item, parent, false);
        return new ViewHolder(view);
    }

    // binds the data to the view and textview in each row
    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        int color = mViewColors.get(position);
        String animal = mAnimals.get(position);
        holder.myView.setBackgroundColor(color);
        holder.myTextView.setText(animal);
    }

    // total number of rows
    @Override
    public int getItemCount() {
        return mAnimals.size();
    }

    // stores and recycles views as they are scrolled off screen
    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        View myView;
        TextView myTextView;

        ViewHolder(View itemView) {
            super(itemView);
            myView = itemView.findViewById(R.id.colorView);
            myTextView = itemView.findViewById(R.id.tvAnimalName);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            if (mClickListener != null) mClickListener.onItemClick(view, getAdapterPosition());
        }
    }

    // convenience method for getting data at click position
    public String getItem(int id) {
        return mAnimals.get(id);
    }

    // allows clicks events to be caught
    public void setClickListener(ItemClickListener itemClickListener) {
        this.mClickListener = itemClickListener;
    }

    // parent activity will implement this method to respond to click events
    public interface ItemClickListener {
        void onItemClick(View view, int position);
    }
}

```

Notes


* Although not strictly necessary, I included the functionality for listening for click events on the items. This was available in the old `ListViews` and is a common need. You can remove this code if you don't need it.


Initialize RecyclerView in Activity
===================================


Add the following code to your main activity.


*MainActivity.java*



```
public class MainActivity extends AppCompatActivity implements MyRecyclerViewAdapter.ItemClickListener {

    private MyRecyclerViewAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // data to populate the RecyclerView with
        ArrayList<Integer> viewColors = new ArrayList<>();
        viewColors.add(Color.BLUE);
        viewColors.add(Color.YELLOW);
        viewColors.add(Color.MAGENTA);
        viewColors.add(Color.RED);
        viewColors.add(Color.BLACK);

        ArrayList<String> animalNames = new ArrayList<>();
        animalNames.add("Horse");
        animalNames.add("Cow");
        animalNames.add("Camel");
        animalNames.add("Sheep");
        animalNames.add("Goat");

        // set up the RecyclerView
        RecyclerView recyclerView = findViewById(R.id.rvAnimals);
        LinearLayoutManager horizontalLayoutManager
                = new LinearLayoutManager(MainActivity.this, LinearLayoutManager.HORIZONTAL, false);
        recyclerView.setLayoutManager(horizontalLayoutManager);
        adapter = new MyRecyclerViewAdapter(this, viewColors, animalNames);
        adapter.setClickListener(this);
        recyclerView.setAdapter(adapter);
    }

    @Override
    public void onItemClick(View view, int position) {
        Toast.makeText(this, "You clicked " + adapter.getItem(position) + " on item position " + position, Toast.LENGTH_SHORT).show();
    }
}

```

Notes


* Notice that the activity implements the `ItemClickListener` that we defined in our adapter. This allows us to handle item click events in `onItemClick`.


Finished
========


That's it. You should be able to run your project now and get something similar to the image at the top.


Notes
=====


* The colored views in my example could of course be replaced with images in a real project.
* [Vertical RecyclerView example](https://stackoverflow.com/questions/40584424/simple-android-recyclerview-example)
