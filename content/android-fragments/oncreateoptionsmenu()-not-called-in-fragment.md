---
metaTitle: OnCreateOptionsMenu() not called in Fragment
title: OnCreateOptionsMenu() not called in Fragment
---

## Context

I have an app which got one activity with 2 fragments placed horizontally.


In my activity I inflated menu using `onCreateOptionsMenu()` using which I am able to display actionbar options menu. But when I try to update the action bar menu items from one of my fragment, the `onCreateoptionsmenu()` is not called. So, I'm not able to update the action bar options menu.


The code in my activity is as below: 


**myActivity.java**



```
package com.andr.androidtablelist;

import java.io.IOException;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.Toast;

import com.andr.fragments.ListLeftFragment;
import com.andr.utils.DBHelper;

      public class TabletActivity extends Activity {
    ActionBar actionBar = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        DBHelper dbhelper;
        dbhelper = new DBHelper(this);
        try {
            dbhelper.createDatabase();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        setContentView(R.layout.activity_tablet);
        actionBar = getActionBar();
        actionBar.setDisplayHomeAsUpEnabled(false);
        getFragmentManager().beginTransaction()
                .replace(R.id.master, ListLeftFragment.newInstance()).commit();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.tablet, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
        case android.R.id.home:
            Toast.makeText(
                    getApplicationContext(),
                    "Back Stack Count::"
                            + getFragmentManager().getBackStackEntryCount(),
                    Toast.LENGTH_LONG).show();
            if (getFragmentManager().getBackStackEntryCount() == 1) {
                actionBar.setDisplayHomeAsUpEnabled(false);
            }
            if (getFragmentManager().getBackStackEntryCount() > 1) {
                getFragmentManager().popBackStack();

            }
            return true;

        }
        return super.onOptionsItemSelected(item);
    }

}
      // http://www.vogella.com/articles/AndroidListView/article.html

```

**myFragment.java**



```
      package com.andr.fragments;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.TextView;

import com.andr.androidtablelist.R;
import com.andr.helper.LazyHelper;

   public class ListLeftFragment extends Fragment{
    private static ListLeftFragment listFragment = null;

    public static ListLeftFragment newInstance(){
        listFragment = new ListLeftFragment();      
        return listFragment;
    }

     @Override
    public void onCreate(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onCreate(savedInstanceState);


    }

     @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
         View v =  inflater.inflate(R.layout.fragment_listlayout, container,false);
         getActivity().invalidateOptionsMenu();
         ListView lv = (ListView)v.findViewById(R.id.lview);
         String[] values = new String[] { "Android", "iPhone", "WindowsMobile",
                    "Blackberry", "WebOS", "Ubuntu", "Windows7", "Max OS X",
                    "Linux", "OS/2", "Ubuntu", "Windows7", "Max OS X", "Linux",
                    "OS/2", "Ubuntu", "Windows7", "Max OS X", "Linux", "OS/2",
                    "Android", "iPhone", "WindowsMobile" };
         getActivity().getActionBar().setTitle("LeftList");

          ArrayList<String> list = new ArrayList<String>();
         LazyHelper lHelper = new LazyHelper(getActivity());
         list = lHelper.getLazyDetials();

           /* for (int i = 0; i < values.length; ++i) {
              list.add(values[i]);
            }
            final StableArrayAdapter adapter = new StableArrayAdapter(getActivity(),
                android.R.layout.simple_list_item_1, list);*/
            LeftListAdapter lAdapter = new LeftListAdapter(getActivity(),list);
            lv.setAdapter(lAdapter);
            lv.setOnItemClickListener(new OnItemClickListener()
            {

                @Override
                public void onItemClick(AdapterView<?> arg0, View arg1,
                        int pos, long arg3) {
                    final String clickedData = (String)arg0.getItemAtPosition(pos);
                    Bundle bundle = new Bundle();
                    bundle.putString("clickedItemName", clickedData);
                    Fragment detailFragment = DetailFormRightFragment.newInstance();
                    detailFragment.setArguments(bundle);
                    getActivity().getFragmentManager().beginTransaction().replace(R.id.details, detailFragment).addToBackStack(null).commit();
                }

            }
                    );
         return v;
    }


     @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        super.onCreateOptionsMenu(menu, inflater);
        getActivity().getMenuInflater().inflate(R.menu.search, menu);
        SearchView searchView=(SearchView)menu.findItem(R.id.search);
        searchView.setIconifiedByDefault(true);
    } 

     @Override
    public boolean onOptionsItemSelected(MenuItem item) {

         super.onOptionsItemSelected(item);
         return false;
    }


     @Override
    public void onPrepareOptionsMenu(Menu menu) {
         super.onPrepareOptionsMenu(menu);
        /*MenuItem item;
        menu.clear();
        getActivity().getMenuInflater().inflate(R.menu.search, menu);
        SearchView searchView=(SearchView)menu.findItem(R.id.search);
        searchView.setIconifiedByDefault(true);*/
    }

     private class StableArrayAdapter extends ArrayAdapter<String> {

            HashMap<String, Integer> mIdMap = new HashMap<String, Integer>();

            public StableArrayAdapter(Context context, int textViewResourceId,
                List<String> objects) {
              super(context, textViewResourceId, objects);
              for (int i = 0; i < objects.size(); ++i) {
                mIdMap.put(objects.get(i), i);
              }
            }

            @Override
            public long getItemId(int position) {
              String item = getItem(position);
              return mIdMap.get(item);
            }

            @Override
            public boolean hasStableIds() {
              return true;
            }

          }

     private class LeftListAdapter extends BaseAdapter implements OnClickListener {
         private Context mcontext;
         ArrayList<String> listData;
         private  LayoutInflater inflater=null;
         public LeftListAdapter(Context context, ArrayList<String> listItems) {
              mcontext=context;
              listData=listItems;
              inflater = (LayoutInflater)mcontext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
         }

        @Override
        public int getCount() {
            return listData.size();
        }

        @Override
        public Object getItem(int arg0) {
            return null;
        }

        @Override
        public long getItemId(int arg0) {
            // TODO Auto-generated method stub
            return 0;
        }

        @Override
        public View getView(int position, View view, ViewGroup arg2) {
            // create a ViewHolder reference
            View vi=view;
            if(vi==null){
                vi = inflater.inflate(R.layout.item, null);
            }
            TextView text=(TextView)vi.findViewById(R.id.text);
            text.setText(listData.get(position));
            vi.setOnClickListener(this);
            return vi;
        }

        @Override
        public void onClick(View vi) {
            TextView text=(TextView)vi.findViewById(R.id.text);
            Bundle bundle = new Bundle();
            bundle.putString("clickedItemName", text.getText().toString());
            Fragment detailFragment = DetailFormRightFragment.newInstance();
            detailFragment.setArguments(bundle);
            getActivity().getFragmentManager().beginTransaction().replace(R.id.details, detailFragment).addToBackStack(null).commit();          
        }

     }
   }

```


---

In your fragment's `onCreateView()` method, you need to call `setHasOptionsMenu(true)` to tell the host activity that your fragment has menu options that it wants to add.



---

## Notes

- If you are using `Toolbar` in your Activity's layout, make sure that you call `setSupportActionBar(your_toolbar)` in your Activity. Otherwise `setHasOptionsMenu` has no effect.
- Also you have to use the void type for onCreateOptionsMenu(Menu menu, MenuInflater inflater) the Boolean type won't work
- forgot to add getActionView() for searchView.
- I made the change,but app crashes with 11-27 01:55:34.468: E/AndroidRuntime(12294): Caused by: java.lang.ClassCastException: com.android.internal.view.menu.MenuItemImpl cannot be cast to android.widget.SearchView
