---
metaTitle: How to use SearchView in Toolbar Android
tags:
- searchview
- android-toolbar
title: How to use SearchView in Toolbar Android
---

## Problem

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

## Solution

If you would like to setup the search facility inside your `Fragment`, just add these few lines: 


**Step 1** - Add the search field to you `toolbar`: 



```
<item
    android:id="@+id/action_search"
    android:icon="@android:drawable/ic_menu_search"
    app:showAsAction="always|collapseActionView"
    app:actionViewClass="android.support.v7.widget.SearchView"
    android:title="Search"/>

```

**Step 2** - Add the logic to your `onCreateOptionsMenu()`



```
import android.support.v7.widget.SearchView; // not the default !

@Override
public boolean onCreateOptionsMenu( Menu menu) {
    getMenuInflater().inflate( R.menu.main, menu);

    MenuItem myActionMenuItem = menu.findItem( R.id.action_search);
    searchView = (SearchView) myActionMenuItem.getActionView();
    searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
        @Override
        public boolean onQueryTextSubmit(String query) {
            // Toast like print
            UserFeedback.show( "SearchOnQueryTextSubmit: " + query);
            if( ! searchView.isIconified()) {
                searchView.setIconified(true);
            }
            myActionMenuItem.collapseActionView();
            return false;
        }
        @Override
        public boolean onQueryTextChange(String s) {
            // UserFeedback.show( "SearchOnQueryTextChanged: " + s);
            return false;
        }
    });
    return true;
}

```


---

## Notes

- This will allow you to stay on the same activity/fragment and just update a view based on the users input.
- UserFeedback ... is my Toast-alike method.
- public void onCreateOptionsMenu( Menu menu,  MenuInflater inflater) {
} you can directly call this method here you can infilate own menu, and handle this directoly from from fragment without using activity.
