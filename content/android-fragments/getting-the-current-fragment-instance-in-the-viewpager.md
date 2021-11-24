---
metaTitle: Getting the current Fragment instance in the viewpager
tags:
- android-viewpager
title: Getting the current Fragment instance in the viewpager
---

## Context

Below is my code which has `3 Fragment classes` each embedded with each of the 3 tabs on `ViewPager`. I have a menu option. As shown in the `onOptionsItemSelected()`, by selecting an option, I need to update the fragment that is currently visible. To update that I have to call a method which is in the fragment class. Can someone please suggest how to call that method?



```
public class MainActivity  extends ActionBarActivity {

     ViewPager ViewPager;
     TabsAdapter TabsAdapter;

     @Override
        public void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);

            ViewPager = new ViewPager(this);
            ViewPager.setId(R.id.pager);
            setContentView(ViewPager);

            final ActionBar bar = getSupportActionBar();

            bar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);

            //Attaching the Tabs to the fragment classes and setting the tab title.
            TabsAdapter = new TabsAdapter(this, ViewPager);
            TabsAdapter.addTab(bar.newTab().setText("FragmentClass1"),
                    FragmentClass1.class, null);
            TabsAdapter.addTab(bar.newTab().setText("FragmentClass2"),
              FragmentClass2.class, null);
            TabsAdapter.addTab(bar.newTab().setText("FragmentClass3"),
              FragmentClass3.class, null);


            if (savedInstanceState != null) {
                bar.setSelectedNavigationItem(savedInstanceState.getInt("tab", 0));
            }

        }

        @Override
        public boolean onOptionsItemSelected(MenuItem item) {

            switch (item.getItemId()) {

            case R.id.addText:

           **// Here I need to call the method which exists in the currently visible Fragment class**

                    return true;

            }

            return super.onOptionsItemSelected(item);
        }


     @Override
     protected void onSaveInstanceState(Bundle outState) {
      super.onSaveInstanceState(outState);
            outState.putInt("tab", getSupportActionBar().getSelectedNavigationIndex());

     }

     public static class TabsAdapter extends FragmentPagerAdapter
      implements ActionBar.TabListener, ViewPager.OnPageChangeListener {

      private final Context mContext;
            private final ActionBar mActionBar;
            private final ViewPager mViewPager;
            private final ArrayList<TabInfo> mTabs = new ArrayList<TabInfo>();

            static final class TabInfo {
                private final Class<?> clss;
                private final Bundle args;

                TabInfo(Class<?> _class, Bundle _args) {
                    clss = _class;
                    args = _args;
                }
            }

      public TabsAdapter(ActionBarActivity activity, ViewPager pager) {
       super(activity.getSupportFragmentManager());
                mContext = activity;
                mActionBar = activity.getSupportActionBar();
                mViewPager = pager;
                mViewPager.setAdapter(this);
                mViewPager.setOnPageChangeListener(this);
            }

      public void addTab(ActionBar.Tab tab, Class<?> clss, Bundle args) {
                TabInfo info = new TabInfo(clss, args);
                tab.setTag(info);
                tab.setTabListener(this);
                mTabs.add(info);
                mActionBar.addTab(tab);
                notifyDataSetChanged();

            }

      @Override
      public void onPageScrollStateChanged(int state) {
       // TODO Auto-generated method stub

      }

      @Override
      public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
       // TODO Auto-generated method stub

      }

      @Override
      public void onPageSelected(int position) {
       // TODO Auto-generated method stub
       mActionBar.setSelectedNavigationItem(position);
      }

      @Override
      public void onTabReselected(Tab tab, FragmentTransaction ft) {
       // TODO Auto-generated method stub

      }

      @Override
      public void onTabSelected(Tab tab, FragmentTransaction ft) {
       Object tag = tab.getTag();
                for (int i=0; i<mTabs.size(); i++) {
                    if (mTabs.get(i) == tag) {
                        mViewPager.setCurrentItem(i);

                    }
                }

                tabPosition = tab.getPosition();
      }

      @Override
      public void onTabUnselected(Tab tab, FragmentTransaction ft) {
       // TODO Auto-generated method stub

      }

      @Override
      public Fragment getItem(int position) {
       TabInfo info = mTabs.get(position);
                return Fragment.instantiate(mContext, info.clss.getName(), info.args);
      }

      @Override
      public int getCount() {
       return mTabs.size();
      }

     }

    }

```

Suppose below is the fragment class with the method `updateList()` I want to call:



```
 public class FragmentClass1{

    ArrayList<String> originalData;


    @Override
         public View onCreateView(LayoutInflater inflater, ViewGroup container,
           Bundle savedInstanceState) {

          View fragmentView = inflater.inflate(R.layout.frag1, container, false);

          originalData = getOriginalDataFromDB();

          return fragmentView;

         }


    public void updateList(String text)
    {
       originalData.add(text);
       //Here I could do other UI part that need to added
    }
}

```


---


> 
> by selecting an option, I need to update the fragment that is
>  currently visible.
> 
> 
> 


A simple way of doing this is using a trick related to the `FragmentPagerAdapter` implementation:



```
case R.id.addText:
     Fragment page = getSupportFragmentManager().findFragmentByTag("android:switcher:" + R.id.pager + ":" + ViewPager.getCurrentItem());
     // based on the current position you can then cast the page to the correct 
     // class and call the method:
     if (ViewPager.getCurrentItem() == 0 && page != null) {
          ((FragmentClass1)page).updateList("new item");     
     } 
return true;

```

Please rethink your variable naming convention, using as the variable name the name of the class is very confusing(so no `ViewPager ViewPager`, use `ViewPager mPager` for example).

