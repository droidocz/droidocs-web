---
metaTitle: RecyclerView - Get view at particular position
tags:
- java
- widget
- position
title: RecyclerView - Get view at particular position
---

## Context

I have an activity with a `RecyclerView` and an `ImageView`. I am using the `RecyclerView` to show a list of images horizontally. When I click on an image in the `RecyclerView` the `ImageView` in the activity should show a bigger picture of the image. So far everything works fine.


Now there are two more `ImageButtons` in the activity: `imageButton_left` and `imageButton_right`. When I click on `imageButton_left`, the image in the `ImageView` should turn left and also, the thumbnail in the `RecyclerView` should reflect this change. Similar is the case with `imageButton_right`.


I am able to rotate the `ImageView`. But, how can I rotate the thumbnail in the `RecyclerView`? How can I get the `ViewHolder`'s `ImageView`? 


Code:


Activity XML:



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerview"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp" />


    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:orientation="vertical">

        <ImageView
            android:id="@+id/original_image"
            android:layout_width="200dp"
            android:layout_height="200dp"
            android:scaleType="fitXY"
            android:src="@drawable/image_not_available_2" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="10dp"
            android:gravity="center_horizontal"
            android:orientation="horizontal">


            <ImageButton
                android:id="@+id/imageButton_left"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_marginRight="20dp"
                android:background="@drawable/rotate_left_icon" />

            <ImageButton
                android:id="@+id/imageButton_right"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:background="@drawable/rotate_right_icon" />

        </LinearLayout>
    </LinearLayout>
</LinearLayout>

```

My Activity Code:



```
public class SecondActivity extends AppCompatActivity implements IRecyclerViewClickListener {


    RecyclerView mRecyclerView;
    LinearLayoutManager mLayoutManager;
    RecyclerViewAdapter mRecyclerViewAdapter;
    List<String> urls = new ArrayList<String>();
    ImageView mOriginalImageView;
    ImageButton mLeftRotate, mRightRotate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);
        urls.clear();

        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerview);
        mLayoutManager = new LinearLayoutManager(this, android.support.v7.widget.LinearLayoutManager.HORIZONTAL, false);
        mLayoutManager.setOrientation(android.support.v7.widget.LinearLayoutManager.HORIZONTAL);
        mRecyclerView.setLayoutManager(mLayoutManager);
        mRecyclerViewAdapter = new RecyclerViewAdapter(this, urls);
        mRecyclerView.setAdapter(mRecyclerViewAdapter);

        mOriginalImageView = (ImageView) findViewById(R.id.original_image);
        mLeftRotate = (ImageButton) findViewById(R.id.imageButton_left);
        mLeftRotate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mOriginalImageView.setRotation(mOriginalImageView.getRotation() - 90);
            }
        });


        mRightRotate = (ImageButton) findViewById(R.id.imageButton_right);
        mRightRotate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mOriginalImageView.setRotation(mOriginalImageView.getRotation() + 90);
            }
        });

        Intent intent = getIntent();
        if (intent != null) {

            String portfolio = intent.getStringExtra("portfolio");

            try {

                JSONArray jsonArray = new JSONArray(portfolio);

                for (int i = 0; i < jsonArray.length(); i++) {

                    JSONObject jsonObject = jsonArray.getJSONObject(i);

                    String url = jsonObject.getString("url");
                    urls.add(url);
                }

                Log.d(Const.DEBUG, "URLs: " + urls.toString());

                mRecyclerViewAdapter.notifyDataSetChanged();

            } catch (Exception e) {
                e.printStackTrace();
            }

        }

    }


    @Override
    public void onItemClick(int position) {
        Picasso.with(this).load(urls.get(position)).into(mOriginalImageView);
    }
}

```

My Custom Adapter for RecyclerView:



```
public class RecyclerViewAdapter extends RecyclerView.Adapter<RecyclerViewAdapter.ViewHolder> {

    Context context;
    List<String> mUrls = new ArrayList<String>();

    IRecyclerViewClickListener mIRecyclerViewClickListener;

    public int position;

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }



    public RecyclerViewAdapter(Context context, List<String> urls) {
        this.context = context;
        this.mUrls.clear();
        this.mUrls = urls;

        Log.d(Const.DEBUG, "Urls Size: " + urls.size());
        Log.d(Const.DEBUG, urls.toString());

        if (context instanceof IRecyclerViewClickListener)
            mIRecyclerViewClickListener = (IRecyclerViewClickListener) context;
        else
            Log.d(Const.DEBUG, "Implement IRecyclerViewClickListener in Activity");
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_horizontal_recyclerview, parent, false);
        ViewHolder holder = new ViewHolder(view);
        return holder;
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Picasso.with(context).load(mUrls.get(position)).into(holder.mImageView);
    }

    @Override
    public int getItemCount() {
        return mUrls.size();
    }


    public void rotateThumbnail() {


    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        public ImageView mImageView;
        public View v;

        public ViewHolder(View v) {
            super(v);
            v.setTag(getAdapterPosition());
            v.setOnClickListener(this);
            this.mImageView = (ImageView) v.findViewById(R.id.image);
        }

        @Override
        public void onClick(View v) {
            this.v = v;
            mIRecyclerViewClickListener.onItemClick(getAdapterPosition());
        }
    }


}

```


---

If you want the `View`, make sure to access the `itemView` property of the ViewHolder like so: `myRecyclerView.findViewHolderForAdapterPosition(pos).itemView;`

