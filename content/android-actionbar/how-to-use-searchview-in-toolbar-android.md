---
metaTitle: How to use SearchView in Toolbar Android
tags:
- searchview
- android-toolbar
title: How to use SearchView in Toolbar Android
---

## Context

The code on which I am working, is using a `Toolbar` and inflating a `menu`.


Here is the code



```
private Toolbar mToolbar;
mToolbar.inflateMenu(R.menu.chat_screen_menu);
setupMenu ();
private void setupMenu ()
   {
   mMenu = mToolbar.getMenu();
   if (mMenu != null)
      {
       if (mChatPager != null && mChatPager.getCurrentItem() > 0)
          {
          mMenu.setGroupVisible(R.id.menu_group_chats, true);
          mMenu.setGroupVisible(R.id.menu_group_contacts, false);
          }
       else
          {
           mMenu.setGroupVisible(R.id.menu_group_chats, false);
           mMenu.setGroupVisible(R.id.menu_group_contacts, true);
           mMenu.setGroupVisible(R.id.menu_group_otr_verified,false);
           mMenu.setGroupVisible(R.id.menu_group_otr_unverified,false);
           mMenu.setGroupVisible(R.id.menu_group_otr_off,false);
          }
    }
    mToolbar.setOnMenuItemClickListener(new OnMenuItemClickListener ()
    {
    ..........
    }
}

```

But now, they require a `Search` button in the `tool_bar`.
I managed to put it, I followed a guide [here](https://developer.android.com/training/search/setup.html#create-sa)
When I try to write something to search, the toast I had put to test the `listener` never shown. 
which indicates `listener` is not working 



```
@Override
    public boolean onCreateOptionsMenu(Menu menu) {

    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.chat_screen_menu, menu);

    SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
    mSearchView = (SearchView) MenuItemCompat.getActionView(menu.findItem(R.id.action_menu_search));
    final Toast toast = new Toast(mApp);

    if (mSearchView != null )
    {
        mSearchView.setSearchableInfo(searchManager.getSearchableInfo(getComponentName()));
        mSearchView.setIconifiedByDefault(false);

        SearchView.OnQueryTextListener queryTextListener = new SearchView.OnQueryTextListener()
        {
            public boolean onQueryTextChange(String newText)
            {
                mSearchString = newText;
                //doFilterAsync(mSearchString);
                toast.makeText(getApplicationContext(), "Test1", Toast.LENGTH_LONG).show();
                return true;
            }

            public boolean onQueryTextSubmit(String query)
            {
                mSearchString = query;
                //doFilterAsync(mSearchString);
                toast.makeText(getApplicationContext(), "Test2", Toast.LENGTH_LONG).show();

                return true;
            }
        };

        mSearchView.setOnQueryTextListener(queryTextListener);
    }

    return true;

}

```


---

You have to use `Appcompat` library for that. Which is used like below:  



**dashboard.xml**



```
<menu xmlns:android="http://schemas.android.com/apk/res/android" 
      xmlns:tools="http://schemas.android.com/tools"
      xmlns:app="http://schemas.android.com/apk/res-auto">

    <item
        android:id="@+id/action_search"
        android:icon="@android:drawable/ic_menu_search"
        app:showAsAction="always|collapseActionView"
        app:actionViewClass="androidx.appcompat.widget.SearchView"
        android:title="Search"/>
</menu>

```

**Activity file (in Java):**



```
public boolean onCreateOptionsMenu(Menu menu) {
    MenuInflater menuInflater = getMenuInflater();
    menuInflater.inflate(R.menu.dashboard, menu);

     MenuItem searchItem = menu.findItem(R.id.action_search);

    SearchManager searchManager = (SearchManager) MainActivity.this.getSystemService(Context.SEARCH_SERVICE);

    SearchView searchView = null;
    if (searchItem != null) {
        searchView = (SearchView) searchItem.getActionView();
    }
    if (searchView != null) {
        searchView.setSearchableInfo(searchManager.getSearchableInfo(MainActivity.this.getComponentName()));
    }
        return super.onCreateOptionsMenu(menu);
}

```

**Activity file (in Kotlin):**



```
override fun onCreateOptionsMenu(menu: Menu?): Boolean {
    menuInflater.inflate(R.menu.menu_search, menu)

    val searchItem: MenuItem? = menu?.findItem(R.id.action_search)
    val searchManager = getSystemService(Context.SEARCH_SERVICE) as SearchManager
    val searchView: SearchView? = searchItem?.actionView as SearchView

    searchView?.setSearchableInfo(searchManager.getSearchableInfo(componentName))
    return super.onCreateOptionsMenu(menu)
}

```

**manifest file:**



```
<meta-data 
      android:name="android.app.default_searchable" 
      android:value="com.apkgetter.SearchResultsActivity" /> 

        <activity
            android:name="com.apkgetter.SearchResultsActivity"
            android:label="@string/app_name"
            android:launchMode="singleTop" >
            <intent-filter>
                <action android:name="android.intent.action.SEARCH" />
            </intent-filter>
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
            </intent-filter>

            <meta-data
                android:name="android.app.searchable"
                android:resource="@xml/searchable" />
        </activity>

```

**searchable xml file:**



```
<?xml version="1.0" encoding="utf-8"?>
<searchable xmlns:android="http://schemas.android.com/apk/res/android"
    android:hint="@string/search_hint"
    android:label="@string/app_name" />

```

And at last, your `SearchResultsActivity` class code. for showing result of your search.



---

## Notes

- Note that now you should `import android.support.v7.widget.SearchView`
- Note the   app:actionViewClass   instead of   android:actionViewClass
- If you've migrated to androidX use: `androidx.appcompat.widget.SearchView`
- I will just link the official documentation where you can also find how to react to the query
https://developer.android.com/training/search/setup.html
- How can i return search result from SearchResultsActivity to MaiActivity?
- You should update your answer and add `app:showAsAction="always|collapseActionView"`
