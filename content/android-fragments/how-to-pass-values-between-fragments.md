---
metaTitle: How to pass values between Fragments
title: How to pass values between Fragments
---

**Step 1**: To send data from a fragment to an activity



```
Intent intent = new Intent(getActivity().getBaseContext(),
                           TargetActivity.class);
intent.putExtra("message", message);
getActivity().startActivity(intent);

```

**Step 2**: To receive this data in an Activity:



```
Intent intent = getIntent();
String message = intent.getStringExtra("message");

```

**Step 3**: To send data from an activity to another activity, follow the normal approach



```
Intent intent = new Intent(MainActivity.this,
                           TargetActivity.class);
intent.putExtra("message", message);
startActivity(intent);

```

**Step 4**: To receive this data in an activity



```
  Intent intent = getIntent();
  String message = intent.getStringExtra("message");

```

**Step 5.**: From an Activity you can send data to a Fragment with the intent as:



```
Bundle bundle = new Bundle();
bundle.putString("message", "From Activity");

// Set Fragmentclass Arguments
Fragmentclass fragobj = new Fragmentclass();
fragobj.setArguments(bundle);

```

And to receive a fragment in the Fragment onCreateView method:



```
@Override
public View onCreateView(LayoutInflater inflater, ViewGroup container,
Bundle savedInstanceState) {
    String strtext = getArguments().getString("message");

    return inflater.inflate(R.layout.fragment, container, false);
}

```
