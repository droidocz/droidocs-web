---
metaTitle: Setting Custom ActionBar Title from Fragment
tags:
- java
- android-actionbar
- android-fragmentactivity
title: Setting Custom ActionBar Title from Fragment
---

## Context

In my Main `FragmentActivity`, I setup my custom `ActionBar` title like this:



```
    LayoutInflater inflator = (LayoutInflater) this
            .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    View v = inflator.inflate(R.layout.custom_titlebar, null);

    TextView tv = (TextView) v.findViewById(R.id.title);
    Typeface tf = Typeface.createFromAsset(this.getAssets(),
            "fonts/capsuula.ttf");
    tv.setTypeface(tf);
    tv.setText(this.getTitle());

    actionBar.setCustomView(v);

```

This works perfect. However, once I open other `Fragments`, I want the title to change. I am not sure how to access the Main `Activity` to do this? In the past, I did this:



```
((MainFragmentActivity) getActivity()).getSupportActionBar().setTitle(
            catTitle);

```

Can someone advise on the proper method?


**XML:**



```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@android:color/transparent" >

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_marginLeft="5dp"
        android:ellipsize="end"
        android:maxLines="1"
        android:text=""
        android:textColor="#fff"
        android:textSize="25sp" />

</RelativeLayout>

```


---

What you're doing is correct. `Fragments` don't have access to the `ActionBar` APIs, so you have to call `getActivity`. Unless your `Fragment` is a static inner class, in which case you should create a `WeakReference` to the parent and call Activity.`getActionBar` from there.


To set the title for your `ActionBar`, while using a custom layout, in your `Fragment` you'll need to call `getActivity().setTitle(YOUR_TITLE)`.


The reason you call `setTitle` is because you're calling `getTitle` as the title of your `ActionBar`. `getTitle` returns the title for that `Activity`.


If you don't want to get call `getTitle`, then you'll need to create a public method that sets the text of your `TextView` in the `Activity` that hosts the `Fragment`. 


**In your Activity**:



```
public void setActionBarTitle(String title){
    YOUR_CUSTOM_ACTION_BAR_TITLE.setText(title);
}

```

**In your Fragment**:



```
((MainFragmentActivity) getActivity()).setActionBarTitle(YOUR_TITLE);

```

**Docs:**


[`Activity.getTitle`](https://developer.android.com/reference/android/app/Activity.html#getTitle())


[`Activity.setTitle`](https://developer.android.com/reference/android/app/Activity.html#setTitle(java.lang.CharSequence))


Also, you don't need to call `this.whatever` in the code you provided, just a tip.



---

## Notes

- If a fragment wants to communicate with its host activity, let the activity implement an interface provided by the fragment. The fragment can then call the method through the implemented interface.
- This approach have a problem, what if you have many fragments, each one sets a different title on the actionbar. But what if you just add fragments, instead of replacing? the title wont change when you press back, for my case It wont work.
- In your OP you don't mention anything *not* working, you only mention wanting to know the "proper" method to set the title in the `ActionBar` from a `Fragment`. Also, I wasn't offering removing `this.whatever` as a solution to anything, that was only a code formatting tip.
- for me, `Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
((TextView)toolbar.getChildAt(0)).setText(title);`
- For what its worth, I posted my `XML` and also removed "this". No changes...  And no, its not a `static` inner class.
-  I struggle with this answer for a while until I made it work (that's why I upvoted it, as well as your question) : in my navigation-drawer main activity ( `menu_act` ) I made global "mTitle", and, in a fragment, first I assign a title to "mTitle" ( `( (menu_act) getActivity() ).mTitle = "new_title"` ), and immediately I do `( (menu_act) getActivity() ).restoreActionBar();`.
