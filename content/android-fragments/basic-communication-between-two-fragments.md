---
metaTitle: Basic communication between two fragments
title: Basic communication between two fragments
---

## Context

I have one activity - `MainActivity`. Within this activity I have two fragments, both of which I created declaratively within the xml. 


I am trying to pass the `String` of text input by the user into `Fragment A` to the text view in `Fragment B`. However, this is proving to be very difficult. Does anyone know how I might achieve this?


I am aware that a fragment can get a reference to it's activity using `getActivity()`. So I'm guessing I would start there?



---

Some of the other examples (and even the [documentation](https://developer.android.com/training/basics/fragments/fragment-ui.html) at the time of this writing) use outdated `onAttach` methods. Here is a full updated example.


[![enter image description here](https://i.stack.imgur.com/xPoKN.png)](https://i.stack.imgur.com/xPoKN.png)


Notes
=====


* You don't want the Fragments talking directly to each other or to the Activity. That ties them to a particular Activity and makes reuse difficult.
* The solution is to make an callback listener interface that the Activity will implement. When the Fragment wants to send a message to another Fragment or its parent activity, it can do it through the interface.
* It is ok for the Activity to communicate directly to its child fragment public methods.
* Thus the Activity serves as the controller, passing messages from one fragment to another.


Code
====


*MainActivity.java*



```
public class MainActivity extends AppCompatActivity implements GreenFragment.OnGreenFragmentListener {

    private static final String BLUE_TAG = "blue";
    private static final String GREEN_TAG = "green";
    BlueFragment mBlueFragment;
    GreenFragment mGreenFragment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // add fragments
        FragmentManager fragmentManager = getSupportFragmentManager();

        mBlueFragment = (BlueFragment) fragmentManager.findFragmentByTag(BLUE_TAG);
        if (mBlueFragment == null) {
            mBlueFragment = new BlueFragment();
            fragmentManager.beginTransaction().add(R.id.blue_fragment_container, mBlueFragment, BLUE_TAG).commit();
        }

        mGreenFragment = (GreenFragment) fragmentManager.findFragmentByTag(GREEN_TAG);
        if (mGreenFragment == null) {
            mGreenFragment = new GreenFragment();
            fragmentManager.beginTransaction().add(R.id.green_fragment_container, mGreenFragment, GREEN_TAG).commit();
        }
    }

    // The Activity handles receiving a message from one Fragment
    // and passing it on to the other Fragment
    @Override
    public void messageFromGreenFragment(String message) {
        mBlueFragment.youveGotMail(message);
    }
}

```

*GreenFragment.java*



```
public class GreenFragment extends Fragment {

    private OnGreenFragmentListener mCallback;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_green, container, false);

        Button button = v.findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String message = "Hello, Blue! I'm Green.";
                mCallback.messageFromGreenFragment(message);
            }
        });

        return v;
    }

    // This is the interface that the Activity will implement
    // so that this Fragment can communicate with the Activity.
    public interface OnGreenFragmentListener {
        void messageFromGreenFragment(String text);
    }

    // This method insures that the Activity has actually implemented our
    // listener and that it isn't null.
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnGreenFragmentListener) {
            mCallback = (OnGreenFragmentListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnGreenFragmentListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mCallback = null;
    }
}

```

*BlueFragment.java*



```
public class BlueFragment extends Fragment {

    private TextView mTextView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_blue, container, false);
        mTextView = v.findViewById(R.id.textview);
        return v;
    }

    // This is a public method that the Activity can use to communicate
    // directly with this Fragment
    public void youveGotMail(String message) {
        mTextView.setText(message);
    }
}

```

XML
===


*activity\_main.xml*



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">

    <!-- Green Fragment container -->
    <FrameLayout
        android:id="@+id/green_fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:layout_marginBottom="16dp" />

    <!-- Blue Fragment container -->
    <FrameLayout
        android:id="@+id/blue_fragment_container"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

</LinearLayout>

```

*fragment\_green.xml*



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:background="#98e8ba"
              android:padding="8dp"
              android:layout_width="match_parent"
              android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:text="send message to blue"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</LinearLayout>

```

*fragment\_blue.xml*



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:background="#30c9fb"
              android:padding="16dp"
              android:layout_width="match_parent"
              android:layout_height="match_parent">

    <TextView
        android:id="@+id/textview"
        android:text="TextView"
        android:textSize="24sp"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</LinearLayout>

```


---

## Notes:

- If we need to communicate bettween Activity and fragment in two ways, Create and Java interface file instead of declared in Activity or fragment.
