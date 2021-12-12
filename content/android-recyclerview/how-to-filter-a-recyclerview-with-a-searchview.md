---
metaTitle: How to filter a RecyclerView with a SearchView
tags:
- searchview
- android-filterable
title: How to filter a RecyclerView with a SearchView
---

## Context

I am trying to implement the `SearchView` from the support library. I want the user to be to use the `SearchView` to filter a `List` of movies in a `RecyclerView`.


I have followed a few tutorials so far and I have added the `SearchView` to the `ActionBar`, but I am not really sure where to go from here. I have seen a few examples but none of them show results as you start typing.


This is my `MainActivity`:



```
public class MainActivity extends ActionBarActivity {

    RecyclerView mRecyclerView;
    RecyclerView.LayoutManager mLayoutManager;
    RecyclerView.Adapter mAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recycler_view);

        mRecyclerView = (RecyclerView) findViewById(R.id.recycler_view);
        mRecyclerView.setHasFixedSize(true);

        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new CardAdapter() {
            @Override
            public Filter getFilter() {
                return null;
            }
        };
        mRecyclerView.setAdapter(mAdapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        SearchView searchView = (SearchView) menu.findItem(R.id.menu_search).getActionView();
        searchView.setSearchableInfo(searchManager.getSearchableInfo(getComponentName()));
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}

```

And this is my `Adapter`:



```
public abstract class CardAdapter extends RecyclerView.Adapter<CardAdapter.ViewHolder> implements Filterable {

    List<Movie> mItems;

    public CardAdapter() {
        super();
        mItems = new ArrayList<Movie>();
        Movie movie = new Movie();
        movie.setName("Spiderman");
        movie.setRating("92");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Doom 3");
        movie.setRating("91");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Transformers");
        movie.setRating("88");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Transformers 2");
        movie.setRating("87");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Transformers 3");
        movie.setRating("86");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Noah");
        movie.setRating("86");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Ironman");
        movie.setRating("86");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Ironman 2");
        movie.setRating("86");
        mItems.add(movie);

        movie = new Movie();
        movie.setName("Ironman 3");
        movie.setRating("86");
        mItems.add(movie);
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup viewGroup, int i) {
        View v = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.recycler_view_card_item, viewGroup, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int i) {
        Movie movie = mItems.get(i);
        viewHolder.tvMovie.setText(movie.getName());
        viewHolder.tvMovieRating.setText(movie.getRating());
    }

    @Override
    public int getItemCount() {
        return mItems.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder{

        public TextView tvMovie;
        public TextView tvMovieRating;

        public ViewHolder(View itemView) {
            super(itemView);
            tvMovie = (TextView)itemView.findViewById(R.id.movieName);
            tvMovieRating = (TextView)itemView.findViewById(R.id.movieRating);
        }
    }
}

```


---

Introduction
============


Since it is not really clear from your question what exactly you are having trouble with, I wrote up this quick walkthrough about how to implement this feature; if you still have questions feel free to ask.


I have a working example of everything I am talking about here in this [**GitHub Repository**](https://github.com/xaverkapeller/Searchable-RecyclerView-Demo).


In any case the result should looks something like this:


![demo image](https://i.stack.imgur.com/qDtH7.gif)


If you first want to play around with the demo app you can install it from the Play Store:


[![Get it on Google Play](https://developer.android.com/images/brand/en_generic_rgb_wo_60.png)](https://play.google.com/store/apps/details?id=com.github.wrdlbrnft.searchablerecyclerviewdemo)


Anyway lets get started.




---


Setting up the `SearchView`
===========================


In the folder `res/menu` create a new file called `main_menu.xml`. In it add an item and set the `actionViewClass` to `android.support.v7.widget.SearchView`. Since you are using the support library you have to use the namespace of the support library to set the `actionViewClass` attribute. Your xml file should look something like this:



```
<menu xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto">

    <item android:id="@+id/action_search"
          android:title="@string/action_search"
          app:actionViewClass="android.support.v7.widget.SearchView"
          app:showAsAction="always"/>
      
</menu>

```

In your `Fragment` or `Activity` you have to inflate this menu xml like usual, then you can look for the `MenuItem` which contains the `SearchView` and implement the `OnQueryTextListener` which we are going to use to listen for changes to the text entered into the `SearchView`:



```
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.menu_main, menu);

    final MenuItem searchItem = menu.findItem(R.id.action_search);
    final SearchView searchView = (SearchView) searchItem.getActionView();
    searchView.setOnQueryTextListener(this);

    return true;
}

@Override
public boolean onQueryTextChange(String query) {
    // Here is where we are going to implement the filter logic
    return false;
}

@Override
public boolean onQueryTextSubmit(String query) {
    return false;
}

```

And now the `SearchView` is ready to be used. We will implement the filter logic later on in `onQueryTextChange()` once we are finished implementing the `Adapter`.




---


Setting up the `Adapter`
========================


First and foremost this is the model class I am going to use for this example:



```
public class ExampleModel {

    private final long mId;
    private final String mText;

    public ExampleModel(long id, String text) {
        mId = id;
        mText = text;
    }

    public long getId() {
        return mId;
    }

    public String getText() {
        return mText;
    }
}

```

It's just your basic model which will display a text in the `RecyclerView`. This is the layout I am going to use to display the text:



```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <data>

        <variable
            name="model"
            type="com.github.wrdlbrnft.searchablerecyclerviewdemo.ui.models.ExampleModel"/>

    </data>

    <FrameLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="?attr/selectableItemBackground"
        android:clickable="true">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:padding="8dp"
            android:text="@{model.text}"/>

    </FrameLayout>

</layout>

```

As you can see I use Data Binding. If you have never worked with data binding before don't be discouraged! It's very simple and powerful, however I can't explain how it works in the scope of this answer.


This is the `ViewHolder` for the `ExampleModel` class:



```
public class ExampleViewHolder extends RecyclerView.ViewHolder {

    private final ItemExampleBinding mBinding;

    public ExampleViewHolder(ItemExampleBinding binding) {
        super(binding.getRoot());
        mBinding = binding;
    }

    public void bind(ExampleModel item) {
        mBinding.setModel(item);
    }
}

```

Again nothing special. It just uses data binding to bind the model class to this layout as we have defined in the layout xml above.


Now we can finally come to the really interesting part: Writing the Adapter. I am going to skip over the basic implementation of the `Adapter` and am instead going to concentrate on the parts which are relevant for this answer.


But first there is one thing we have to talk about: The [**`SortedList`**](https://developer.android.com/reference/android/support/v7/util/SortedList.html) class.




---


SortedList
==========


The `SortedList` is a completely amazing tool which is part of the `RecyclerView` library. It takes care of notifying the `Adapter` about changes to the data set and does so it a very efficient way. The only thing it requires you to do is specify an order of the elements. You need to do that by implementing a `compare()` method which compares two elements in the `SortedList` just like a `Comparator`. But instead of sorting a `List` it is used to sort the items in the `RecyclerView`!


The `SortedList` interacts with the `Adapter` through a `Callback` class which you have to implement:



```
private final SortedList.Callback<ExampleModel> mCallback = new SortedList.Callback<ExampleModel>() {

    @Override
    public void onInserted(int position, int count) {
         mAdapter.notifyItemRangeInserted(position, count);
    }

    @Override
    public void onRemoved(int position, int count) {
        mAdapter.notifyItemRangeRemoved(position, count);
    }

    @Override
    public void onMoved(int fromPosition, int toPosition) {
        mAdapter.notifyItemMoved(fromPosition, toPosition);
    }

    @Override
    public void onChanged(int position, int count) {
        mAdapter.notifyItemRangeChanged(position, count);
    }

    @Override
    public int compare(ExampleModel a, ExampleModel b) {
        return mComparator.compare(a, b);
    }

    @Override
    public boolean areContentsTheSame(ExampleModel oldItem, ExampleModel newItem) {
        return oldItem.equals(newItem);
    }

    @Override
    public boolean areItemsTheSame(ExampleModel item1, ExampleModel item2) {
        return item1.getId() == item2.getId();
    }
}

```

In the methods at the top of the callback like `onMoved`, `onInserted`, etc. you have to call the equivalent notify method of your `Adapter`. The three methods at the bottom `compare`, `areContentsTheSame` and `areItemsTheSame` you have to implement according to what kind of objects you want to display and in what order these objects should appear on the screen.


Let's go through these methods one by one:



```
@Override
public int compare(ExampleModel a, ExampleModel b) {
    return mComparator.compare(a, b);
}

```

This is the `compare()` method I talked about earlier. In this example I am just passing the call to a `Comparator` which compares the two models. If you want the items to appear in alphabetical order on the screen. This comparator might look like this:



```
private static final Comparator<ExampleModel> ALPHABETICAL_COMPARATOR = new Comparator<ExampleModel>() {
    @Override
    public int compare(ExampleModel a, ExampleModel b) {
        return a.getText().compareTo(b.getText());
    }
};

```

Now let's take a look at the next method:



```
@Override
public boolean areContentsTheSame(ExampleModel oldItem, ExampleModel newItem) {
    return oldItem.equals(newItem);
}

```

The purpose of this method is to determine if the content of a model has changed. The `SortedList` uses this to determine if a change event needs to be invoked - in other words if the `RecyclerView` should crossfade the old and new version. If you model classes have a correct `equals()` and `hashCode()` implementation you can usually just implement it like above. If we add an `equals()` and `hashCode()` implementation to the `ExampleModel` class it should look something like this:



```
public class ExampleModel implements SortedListAdapter.ViewModel {

    private final long mId;
    private final String mText;

    public ExampleModel(long id, String text) {
        mId = id;
        mText = text;
    }

    public long getId() {
        return mId;
    }

    public String getText() {
        return mText;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ExampleModel model = (ExampleModel) o;

        if (mId != model.mId) return false;
        return mText != null ? mText.equals(model.mText) : model.mText == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (mId ^ (mId >>> 32));
        result = 31 * result + (mText != null ? mText.hashCode() : 0);
        return result;
    }
}

```

Quick side note: Most IDE's like Android Studio, IntelliJ and Eclipse have functionality to generate `equals()` and `hashCode()` implementations for you at the press of a button! So you don't have to implement them yourself. Look up on the internet how it works in your IDE!


Now let's take a look at the last method:



```
@Override
public boolean areItemsTheSame(ExampleModel item1, ExampleModel item2) {
    return item1.getId() == item2.getId();
}

```

The `SortedList` uses this method to check if two items refer to the same thing. In simplest terms (without explaining how the `SortedList` works) this is used to determine if an object is already contained in the `List` and if either an add, move or change animation needs to be played. If your models have an id you would usually compare just the id in this method. If they don't you need to figure out some other way to check this, but however you end up implementing this depends on your specific app. Usually it is the simplest option to give all models an id - that could for example be the primary key field if you are querying the data from a database.


With the `SortedList.Callback` correctly implemented we can create an instance of the `SortedList`:



```
final SortedList<ExampleModel> list = new SortedList<>(ExampleModel.class, mCallback);

```

As the first parameter in the constructor of the `SortedList` you need to pass the class of your models. The other parameter is just the `SortedList.Callback` we defined above.


Now let's get down to business: If we implement the `Adapter` with a `SortedList` it should look something like this:



```
public class ExampleAdapter extends RecyclerView.Adapter<ExampleViewHolder> {

    private final SortedList<ExampleModel> mSortedList = new SortedList<>(ExampleModel.class, new SortedList.Callback<ExampleModel>() {
        @Override
        public int compare(ExampleModel a, ExampleModel b) {
            return mComparator.compare(a, b);
        }

        @Override
        public void onInserted(int position, int count) {
            notifyItemRangeInserted(position, count);
        }

        @Override
        public void onRemoved(int position, int count) {
            notifyItemRangeRemoved(position, count);
        }

        @Override
        public void onMoved(int fromPosition, int toPosition) {
            notifyItemMoved(fromPosition, toPosition);
        }

        @Override
        public void onChanged(int position, int count) {
            notifyItemRangeChanged(position, count);
        }

        @Override
        public boolean areContentsTheSame(ExampleModel oldItem, ExampleModel newItem) {
            return oldItem.equals(newItem);
        }

        @Override
        public boolean areItemsTheSame(ExampleModel item1, ExampleModel item2) {
            return item1.getId() == item2.getId();
        }
    });

    private final LayoutInflater mInflater;
    private final Comparator<ExampleModel> mComparator;

    public ExampleAdapter(Context context, Comparator<ExampleModel> comparator) {
        mInflater = LayoutInflater.from(context);
        mComparator = comparator;
    }

    @Override
    public ExampleViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        final ItemExampleBinding binding = ItemExampleBinding.inflate(inflater, parent, false);
        return new ExampleViewHolder(binding);
    }

    @Override
    public void onBindViewHolder(ExampleViewHolder holder, int position) {
        final ExampleModel model = mSortedList.get(position);
        holder.bind(model);
    }

    @Override
    public int getItemCount() {
        return mSortedList.size();
    }
}

```

The `Comparator` used to sort the item is passed in through the constructor so we can use the same `Adapter` even if the items are supposed to be displayed in a different order.


Now we are almost done! But we first need a way to add or remove items to the `Adapter`. For this purpose we can add methods to the `Adapter` which allow us to add and remove items to the `SortedList`:



```
public void add(ExampleModel model) {
    mSortedList.add(model);
}

public void remove(ExampleModel model) {
    mSortedList.remove(model);
}

public void add(List<ExampleModel> models) {
    mSortedList.addAll(models);
}

public void remove(List<ExampleModel> models) {
    mSortedList.beginBatchedUpdates();
    for (ExampleModel model : models) {
        mSortedList.remove(model);
    }
    mSortedList.endBatchedUpdates();
}

```

We don't need to call any notify methods here because the `SortedList` already does this for through the `SortedList.Callback`! Aside from that the implementation of these methods is pretty straight forward with one exception: the remove method which removes a `List` of models. Since the `SortedList` has only one remove method which can remove a single object we need to loop over the list and remove the models one by one. Calling `beginBatchedUpdates()` at the beginning batches all the changes we are going to make to the `SortedList` together and improves performance. When we call `endBatchedUpdates()` the `RecyclerView` is notified about all the changes at once.


Additionally what you have to understand is that if you add an object to the `SortedList` and it is already in the `SortedList` it won't be added again. Instead the `SortedList` uses the `areContentsTheSame()` method to figure out if the object has changed - and if it has the item in the `RecyclerView` will be updated.


Anyway, what I usually prefer is one method which allows me to replace all items in the `RecyclerView` at once. Remove everything which is not in the `List` and add all items which are missing from the `SortedList`:



```
public void replaceAll(List<ExampleModel> models) {
    mSortedList.beginBatchedUpdates();
    for (int i = mSortedList.size() - 1; i >= 0; i--) {
        final ExampleModel model = mSortedList.get(i);
        if (!models.contains(model)) {
            mSortedList.remove(model);
        }
    }
    mSortedList.addAll(models);
    mSortedList.endBatchedUpdates();
}

```

This method again batches all updates together to increase performance. The first loop is in reverse since removing an item at the start would mess up the indexes of all items that come up after it and this can lead in some instances to problems like data inconsistencies. After that we just add the `List` to the `SortedList` using `addAll()` to add all items which are not already in the `SortedList` and - just like I described above - update all items that are already in the `SortedList` but have changed.


And with that the `Adapter` is complete. The whole thing should look something like this:



```
public class ExampleAdapter extends RecyclerView.Adapter<ExampleViewHolder> {

    private final SortedList<ExampleModel> mSortedList = new SortedList<>(ExampleModel.class, new SortedList.Callback<ExampleModel>() {
        @Override
        public int compare(ExampleModel a, ExampleModel b) {
            return mComparator.compare(a, b);
        }

        @Override
        public void onInserted(int position, int count) {
            notifyItemRangeInserted(position, count);
        }

        @Override
        public void onRemoved(int position, int count) {
            notifyItemRangeRemoved(position, count);
        }

        @Override
        public void onMoved(int fromPosition, int toPosition) {
            notifyItemMoved(fromPosition, toPosition);
        }

        @Override
        public void onChanged(int position, int count) {
            notifyItemRangeChanged(position, count);
        }

        @Override
        public boolean areContentsTheSame(ExampleModel oldItem, ExampleModel newItem) {
            return oldItem.equals(newItem);
        }

        @Override
        public boolean areItemsTheSame(ExampleModel item1, ExampleModel item2) {
            return item1 == item2;
        }
    });

    private final Comparator<ExampleModel> mComparator;
    private final LayoutInflater mInflater;

    public ExampleAdapter(Context context, Comparator<ExampleModel> comparator) {
        mInflater = LayoutInflater.from(context);
        mComparator = comparator;
    }

    @Override
    public ExampleViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        final ItemExampleBinding binding = ItemExampleBinding.inflate(mInflater, parent, false);
        return new ExampleViewHolder(binding);
    }

    @Override
    public void onBindViewHolder(ExampleViewHolder holder, int position) {
        final ExampleModel model = mSortedList.get(position);
        holder.bind(model);
    }

    public void add(ExampleModel model) {
        mSortedList.add(model);
    }

    public void remove(ExampleModel model) {
        mSortedList.remove(model);
    }

    public void add(List<ExampleModel> models) {
        mSortedList.addAll(models);
    }

    public void remove(List<ExampleModel> models) {
        mSortedList.beginBatchedUpdates();
        for (ExampleModel model : models) {
            mSortedList.remove(model);
        }
        mSortedList.endBatchedUpdates();
    }

    public void replaceAll(List<ExampleModel> models) {
        mSortedList.beginBatchedUpdates();
        for (int i = mSortedList.size() - 1; i >= 0; i--) {
            final ExampleModel model = mSortedList.get(i);
            if (!models.contains(model)) {
                mSortedList.remove(model);
            }
        }
        mSortedList.addAll(models);
        mSortedList.endBatchedUpdates();
    }

    @Override
    public int getItemCount() {
        return mSortedList.size();
    }
}

```

The only thing missing now is to implement the filtering!




---


Implementing the filter logic
=============================


To implement the filter logic we first have to define a `List` of all possible models. For this example I create a `List` of `ExampleModel` instances from an array of movies:



```
private static final String[] MOVIES = new String[]{
        ...
};

private static final Comparator<ExampleModel> ALPHABETICAL_COMPARATOR = new Comparator<ExampleModel>() {
    @Override
    public int compare(ExampleModel a, ExampleModel b) {
        return a.getText().compareTo(b.getText());
    }
};

private ExampleAdapter mAdapter;
private List<ExampleModel> mModels;
private RecyclerView mRecyclerView;

    @Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);

    mAdapter = new ExampleAdapter(this, ALPHABETICAL_COMPARATOR);

    mBinding.recyclerView.setLayoutManager(new LinearLayoutManager(this));
    mBinding.recyclerView.setAdapter(mAdapter);

    mModels = new ArrayList<>();
    for (String movie : MOVIES) {
        mModels.add(new ExampleModel(movie));
    }
    mAdapter.add(mModels);
}

```

Nothing special going on here, we just instantiate the `Adapter` and set it to the `RecyclerView`. After that we create a `List` of models from the movie names in the `MOVIES` array. Then we add all the models to the `SortedList`.


Now we can go back to `onQueryTextChange()` which we defined earlier and start implementing the filter logic:



```
@Override
public boolean onQueryTextChange(String query) {
    final List<ExampleModel> filteredModelList = filter(mModels, query);
    mAdapter.replaceAll(filteredModelList);
    mBinding.recyclerView.scrollToPosition(0);
    return true;
}

```

This is again pretty straight forward. We call the method `filter()` and pass in the `List` of `ExampleModel`s as well as the query string. We then call `replaceAll()` on the `Adapter` and pass in the filtered `List` returned by `filter()`. We also have to call `scrollToPosition(0)` on the `RecyclerView` to ensure that the user can always see all items when searching for something. Otherwise the `RecyclerView` might stay in a scrolled down position while filtering and subsequently hide a few items. Scrolling to the top ensures a better user experience while searching.


The only thing left to do now is to implement `filter()` itself:



```
private static List<ExampleModel> filter(List<ExampleModel> models, String query) {
    final String lowerCaseQuery = query.toLowerCase();

    final List<ExampleModel> filteredModelList = new ArrayList<>();
    for (ExampleModel model : models) {
        final String text = model.getText().toLowerCase();
        if (text.contains(lowerCaseQuery)) {
            filteredModelList.add(model);
        }
    }
    return filteredModelList;
}

```

The first thing we do here is call `toLowerCase()` on the query string. We don't want our search function to be case sensitive and by calling `toLowerCase()` on all strings we compare we can ensure that we return the same results regardless of case. It then just iterates through all the models in the `List` we passed into it and checks if the query string is contained in the text of the model. If it is then the model is added to the filtered `List`.


And that's it! The above code will run on API level 7 and above and starting with API level 11 you get item animations for free!


I realize that this is a very detailed description which probably makes this whole thing seem more complicated than it really is, but there is a way we can generalize this whole problem and make implementing an `Adapter` based on a `SortedList` much simpler.




---


Generalizing the problem and simplifying the Adapter
====================================================


In this section I am not going to go into much detail - partly because I am running up against the character limit for answers on Stack Overflow but also because most of it already explained above - but to summarize the changes: We can implemented a base `Adapter` class which already takes care of dealing with the `SortedList` as well as binding models to `ViewHolder` instances and provides a convenient way to implement an `Adapter` based on a `SortedList`. For that we have to do two things:


* We need to create a `ViewModel` interface which all model classes have to implement
* We need to create a `ViewHolder` subclass which defines a `bind()` method the `Adapter` can use to bind models automatically.


This allows us to just focus on the content which is supposed to be displayed in the `RecyclerView` by just implementing the models and there corresponding `ViewHolder` implementations. Using this base class we don't have to worry about the intricate details of the `Adapter` and its `SortedList`.


### SortedListAdapter


Because of the character limit for answers on StackOverflow I can't go through each step of implementing this base class or even add the full source code here, but you can find the full source code of this base class - I called it `SortedListAdapter` - in this [**GitHub Gist**](https://gist.github.com/xaverkapeller/1b6233e99c6b7d54c204e61c1c9c0bf3).


To make your life simple I have published a library on jCenter which contains the `SortedListAdapter`! If you want to use it then all you need to do is add this dependency to your app's build.gradle file:



```
compile 'com.github.wrdlbrnft:sorted-list-adapter:0.2.0.1'

```

You can find more information about this library [**on the library homepage**](https://xaverkapeller.github.io/SortedListAdapter/).


### Using the SortedListAdapter


To use the `SortedListAdapter` we have to make two changes:


* Change the `ViewHolder` so that it extends `SortedListAdapter.ViewHolder`. The type parameter should be the model which should be bound to this `ViewHolder` - in this case `ExampleModel`. You have to bind data to your models in `performBind()` instead of `bind()`.



```
 public class ExampleViewHolder extends SortedListAdapter.ViewHolder<ExampleModel> {

     private final ItemExampleBinding mBinding;

     public ExampleViewHolder(ItemExampleBinding binding) {
         super(binding.getRoot());
         mBinding = binding;
     }

     @Override
     protected void performBind(ExampleModel item) {
         mBinding.setModel(item);
     }
 }

```
* Make sure that all your models implement the `ViewModel` interface:



```
 public class ExampleModel implements SortedListAdapter.ViewModel {
     ...
 }

```


After that we just have to update the `ExampleAdapter` to extend `SortedListAdapter` and remove everything we don't need anymore. The type parameter should be the type of model you are working with - in this case `ExampleModel`. But if you are working with different types of models then set the type parameter to `ViewModel`.



```
public class ExampleAdapter extends SortedListAdapter<ExampleModel> {

    public ExampleAdapter(Context context, Comparator<ExampleModel> comparator) {
        super(context, ExampleModel.class, comparator);
    }

    @Override
    protected ViewHolder<? extends ExampleModel> onCreateViewHolder(LayoutInflater inflater, ViewGroup parent, int viewType) {
        final ItemExampleBinding binding = ItemExampleBinding.inflate(inflater, parent, false);
        return new ExampleViewHolder(binding);
    }

    @Override
    protected boolean areItemsTheSame(ExampleModel item1, ExampleModel item2) {
        return item1.getId() == item2.getId();
    }

    @Override
    protected boolean areItemContentsTheSame(ExampleModel oldItem, ExampleModel newItem) {
        return oldItem.equals(newItem);
    }
}

```

After that we are done! However one last thing to mention: The `SortedListAdapter` does not have the same `add()`, `remove()` or `replaceAll()` methods our original `ExampleAdapter` had. It uses a separate `Editor` object to modify the items in the list which can be accessed through the `edit()` method. So if you want to remove or add items you have to call `edit()` then add and remove the items on this `Editor` instance and once you are done, call `commit()` on it to apply the changes to the `SortedList`:



```
mAdapter.edit()
        .remove(modelToRemove)
        .add(listOfModelsToAdd)
        .commit();

```

All changes you make this way are batched together to increase performance. The `replaceAll()` method we implemented in the chapters above is also present on this `Editor` object:



```
mAdapter.edit()
        .replaceAll(mModels)
        .commit();

```

If you forget to call `commit()` then none of your changes will be applied!



---

## Notes

- I haven't yet read the whole answer, I had to pause my reading somewhere at half to write this comment - this is one of the best answers I have find here on the SO!
- +1 just to show us that Data Binding exists in Android! I've never hear about that and seems that I'll begin using it.
- If you are unfamiliar with data binding check out this offical guide from the Android Developer page: https://developer.android.com/topic/libraries/data-binding/index.html
- Do we have to do filtering in background thread because of performance?
-  If you are filtering a large dataset or retrieving results from a database or a web service or anything else that might take a while then you should do it in a separate thread and then post the results on the main thread once everything is done.
- I could tell you about a much simpler way to achieve something similar, but the results would by far not be as good. I link to it at the bottom of the answer as an option for people who don't want to implement all this themselves - it also has a few additional features and performance optimizations. You can check it out here: https://wrdlbrnft.github.io/SortedListAdapter/
- Thanks a lot :D, yep this is my first time working with data binding i didn't knew that the databinding was generated automatically i compiled my project and everything is working, at my first try, this feels weird, i usually get exceptions when I dive into unknown territory
- I am using your method `replaceAll` and it messes up with indexes. I had to use `public void replaceAll(List<ExampleModel> models) {
    mSortedList.beginBatchedUpdates();
    mSortedList.clear();
    mSortedList.addAll(models);
    mSortedList.endBatchedUpdates();
}`
- The Binding classes are generated from the layout xml files by the Android Gradle Plugin when you compile the project.
- How would you use this to compare multiple things of your model? For example, you're now comparing the text (the movie title) but what if you also want to search by the director? So your model would have a director field and you'd set up another comparator which you'd send to your adapter, but then?
- i am not an expert where can i find the ItemExampleBinding ?
- what about when your menu is in your activity yet your list and adapter connection is in a separate fragment?
- All other answers related to recyclerview just use findViewById and code-behind on the fragment/activity.
- TL;DR - Made everything by myself without such difficult explanation.
- It is a class auto generated by the Android Data Binding library. Here you can find more information about the Data Binding Library: https://developer.android.com/topic/libraries/data-binding/index.html
- To have `AndroidStudio` generate `equals()` and `hashCode()`: Select from the toolbar `Code` -&gt; `Generate...` -&gt; select `equals() and hashCode()` and then choose wisely which fields are allowed to be `null`.
- What is ItemExampleBinding class?
- Could have been made much much simpler.. too complicated I would say.
- To generate the equals() and haschCode() functions in Android Studio - Ctrl+Shit+O - a window pops up with all the functions you can override.
- When I use `.edit().replaceAll().commit()`, it doesn't remove values in the adapter, `itemsToRemove` size is 0, why is that?
- Keep getting indexOutofBounds
- Thanks to https://stackoverflow.com/a/37207601/956975 - you just add a FILTER not another comparator.
- Starting with the Support Library version 27.1.0, the `SortedList` class has a `replaceAll( T... items)` method. There is also a new `ListAdapter` class that extends the regular `RecyclerView.Adapter` class, which was designed specifically for updating the contents of the `RecyclerView` asynchronously: https://developer.android.com/reference/android/support/v7/recyclerview/extensions/ListAdapter.html
- Nevermind, tried using `.replaceAll()` in the very first part of initialization where I add initial list, it works as intended now