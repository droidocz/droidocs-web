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


> 
> simply create two list in adapter one orignal and one temp and **implements Filterable**.
> 
> 
> 



```
    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                final FilterResults oReturn = new FilterResults();
                final ArrayList<T> results = new ArrayList<>();
                if (origList == null)
                    origList = new ArrayList<>(itemList);
                if (constraint != null && constraint.length() > 0) {
                    if (origList != null && origList.size() > 0) {
                        for (final T cd : origList) {
                            if (cd.getAttributeToSearch().toLowerCase()
                                    .contains(constraint.toString().toLowerCase()))
                                results.add(cd);
                        }
                    }
                    oReturn.values = results;
                    oReturn.count = results.size();//newly Aded by ZA
                } else {
                    oReturn.values = origList;
                    oReturn.count = origList.size();//newly added by ZA
                }
                return oReturn;
            }

            @SuppressWarnings("unchecked")
            @Override
            protected void publishResults(final CharSequence constraint,
                                          FilterResults results) {
                itemList = new ArrayList<>((ArrayList<T>) results.values);
                // FIXME: 8/16/2017 implement Comparable with sort below
                ///Collections.sort(itemList);
                notifyDataSetChanged();
            }
        };
    }

```

where



```
public GenericBaseAdapter(Context mContext, List<T> itemList) {
        this.mContext = mContext;
        this.itemList = itemList;
        this.origList = itemList;
    }

```


---

## Notes

- I created two lists and used a simple filter method. I can't seem to pass the correct adapter position for an item to the next Activity. I would appreciate any thoughts or ideas you could suggest for this one:  https://stackoverflow.com/questions/46027110/recyclerview-wrong-position-in-filtered-list
