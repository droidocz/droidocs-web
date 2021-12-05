---
metaTitle: How to implement Android Pull-to-Refresh
tags:
- android-listview
- pull-to-refresh
title: How to implement Android Pull-to-Refresh
---

## Context

In Android applications such as Twitter (official app), when you encounter a ListView, you can pull it down (and it will bounce back when released) to refresh the content.


I wonder what is the best way, in your opinion, to implement that?


Some possibilities I could think of:


1. An item on top of the ListView - however I don't think scrolling back to item position 1 (0-based) with animation on the ListView is an easy task.
2. Another view outside the ListView - but I need to take care of moving the ListView position down when it is pulled, and I'm not sure if we can detect if the drag-touches to the ListView still really scroll the items on the ListView.


Any recommendations?


P.S. I wonder when the official Twitter app source code is released. It has been mentioned that it will be released, but 6 months has passed and we haven't heard about it since then.



---

Finally, Google released an official version of the pull-to-refresh library!


It is called `SwipeRefreshLayout`, inside the support library, and the documentation is [**here**](https://developer.android.com/reference/android/support/v4/widget/SwipeRefreshLayout.html):


1. Add `SwipeRefreshLayout` as a parent of view which will be treated as a pull to refresh the layout. (I took `ListView` as an example, it can be any `View` like `LinearLayout`, `ScrollView` etc.)



```
 <android.support.v4.widget.SwipeRefreshLayout
     android:id="@+id/pullToRefresh"
     android:layout_width="match_parent"
     android:layout_height="wrap_content">
     <ListView
         android:id="@+id/listView"
         android:layout_width="match_parent"
         android:layout_height="match_parent"/>
 </android.support.v4.widget.SwipeRefreshLayout>

```
2. Add a listener to your class



```
 protected void onCreate(Bundle savedInstanceState) {
     final SwipeRefreshLayout pullToRefresh = findViewById(R.id.pullToRefresh);
     pullToRefresh.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
         @Override
         public void onRefresh() {
             refreshData(); // your code
             pullToRefresh.setRefreshing(false);
         }
     });
 }

```


You can also call `pullToRefresh.setRefreshing(true/false);` as per your requirement.


**UPDATE**


Android support libraries have been deprecated and have been replaced by AndroidX. The link to the new library can be found [**here**](https://developer.android.com/reference/androidx/swiperefreshlayout/widget/SwipeRefreshLayout).


Also, you need to add the following dependency to your project:



```
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0'

```

**OR**


You can go to Refactor>>Migrate to AndroidX and Android Studio will handle the dependencies for you.



---

## Notes:

- can I use a ProgressBar instead of Color Scheme on SwipeRefreshLayout?


- Example code https://guides.codepath.com/android/Implementing-Pull-to-Refresh-Guide


