---
metaTitle: How to dynamically update a ListView on Android
tags:
- filter
- android-widget
title: How to dynamically update a ListView on Android
---

## Context

On Android, how can I a `ListView` that filters based on user input, where the items shown are updated dynamically based on the `TextView` value? 


I'm looking for something like this:



```
-------------------------
| Text View             |
-------------------------
| List item             |
| List item             |
| List item             |
| List item             |
|                       |
|                       |
|                       |
|                       |
-------------------------

```


---

First, you need to create an XML layout that has both an EditText, and a ListView. 



```
<LinearLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical" >

    <!-- Pretty hint text, and maxLines -->
    <EditText android:id="@+building_list/search_box" 
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:hint="type to filter"
        android:inputType="text"
        android:maxLines="1"/>

    <!-- Set height to 0, and let the weight param expand it -->
    <!-- Note the use of the default ID! This lets us use a 
         ListActivity still! -->
    <ListView android:id="@android:id/list"
        android:layout_width="fill_parent"
        android:layout_height="0dip"
        android:layout_weight="1" 
         /> 

</LinearLayout>

```

This will lay everything out properly, with a nice EditText above the ListView. Next, create a ListActivity as you would normally, but add a `setContentView()` call in the `onCreate()` method so we use our recently declared layout. Remember that we ID'ed the `ListView` specially, with `android:id="@android:id/list"`. This allows the `ListActivity` to know which `ListView` we want to use in our declared layout. 



```
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.filterable_listview);

        setListAdapter(new ArrayAdapter<String>(this,
                       android.R.layout.simple_list_item_1, 
                       getStringArrayList());
    }

```

Running the app now should show your previous `ListView`, with a nice box above. In order to make that box do something, we need to take the input from it, and make that input filter the list. While a lot of people have tried to do this manually, *most* `ListView` `Adapter` classes come with a `Filter` object that can be used to perform the filtering automagically. We just need to pipe the input from the `EditText` into the `Filter`. Turns out that is pretty easy. To run a quick test, add this line to your `onCreate()` call



```
adapter.getFilter().filter(s);

```

Notice that you will need to save your `ListAdapter` to a variable to make this work - I have saved my `ArrayAdapter<String>` from earlier into a variable called 'adapter'.


Next step is to get the input from the `EditText`. This actually takes a bit of thought. You could add an `OnKeyListener()` to your `EditText`. However, this listener only receives *some key events*. For example, if a user enters 'wyw', the predictive text will likely recommend 'eye'. Until the user chooses either 'wyw' or 'eye', your `OnKeyListener` will not receive a key event. Some may prefer this solution, but I found it frustrating. I wanted every key event, so I had the choice of filtering or not filtering. The solution is a `TextWatcher`. Simply create and add a `TextWatcher` to the `EditText`, and pass the `ListAdapter` `Filter` a filter request every time the text changes. Remember to remove the `TextWatcher` in `OnDestroy()`! Here is the final solution:



```
private EditText filterText = null;
ArrayAdapter<String> adapter = null;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    setContentView(R.layout.filterable_listview);

    filterText = (EditText) findViewById(R.id.search_box);
    filterText.addTextChangedListener(filterTextWatcher);

    setListAdapter(new ArrayAdapter<String>(this,
                   android.R.layout.simple_list_item_1, 
                   getStringArrayList());
}

private TextWatcher filterTextWatcher = new TextWatcher() {

    public void afterTextChanged(Editable s) {
    }

    public void beforeTextChanged(CharSequence s, int start, int count,
            int after) {
    }

    public void onTextChanged(CharSequence s, int start, int before,
            int count) {
        adapter.getFilter().filter(s);
    }

};

@Override
protected void onDestroy() {
    super.onDestroy();
    filterText.removeTextChangedListener(filterTextWatcher);
}

```


---

## Notes

- Probably the easiest way would be to subclass the Adapter by extending it, and override the getFilter method to return a Filter object that you define. See http://github.com/android/platform_frameworks_base/blob/master/core/java/android/widget/ArrayAdapter.java#L449 to understand how the default ArrayFilter works - it would be simple to copy 95% of this code and change lines 479 and 486
- Is there any straightforward way to filter ListView in "contains" instead of "starts with" fashion like this solution does?
- &gt; Remember to remove the TextWatcher in OnDestroy()
- In landscape mode on a smaller screen, the EditText + keyboard takes the whole screen and the ListView is not visible!
- I have a question though: I have implemented this and after each letter that I type, the ListView disappears for a couple of seconds and then comes back, filtered. My intuition is that it's because I have 600+ items in the list, with non-trivial toString() functions.
- what is getStringArrayList(),i run this code,but cannot get the filter effect,can you help me
- I have implemented your solution but I am not getting my text filtered and I dont even get any exceptions.
-  what is getStringArrayList()  in your solution?
- I think it is usable AS-IS only for short lists.
-  i had use in this same way now problmen is that when user click on Any one item i want to display that item in full view. so basicaly i m loop arraylist and find compare text of getItemPosition text and arraylist but in my arraylist there are many thing of same name then how can i idetify that this name is selected?
- getFilter method returns null for me.
- Hamy, have you run into problems with this when rotating your device? I'm experiencing mysterious crashes (throwing weird exceptions) when I have text entered and rotate the device.
- To disable the default suggestions in the text box, you should use android:inputType="textFilter" instead of "text".
- Dont work on DB inflated ListViews.
-  Sir Your Code is too much wastage of time You are waste my time also .
- To understand the 'getStringArrayList()' function, just take a peek at the ArrayAdapter documentation - see http://developer.android.com/reference/android/widget/ArrayAdapter.html . The function either returns a String[], or a List&lt;String&gt;. You can be fancy and do items other than Strings, but that's more advanced than I'm covering here. The strings should be the text that you want to show up in the listview, one string per row naturally
