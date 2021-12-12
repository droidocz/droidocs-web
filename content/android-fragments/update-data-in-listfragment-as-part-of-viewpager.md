---
metaTitle: Update data in ListFragment as part of ViewPager
tags:
- android-viewpager
- android-adapter
- android-listfragment
title: Update data in ListFragment as part of ViewPager
---

## Context

I'm using the v4 compatibility ViewPager in Android. My FragmentActivity has a bunch of data which is to be displayed in different ways on different pages in my ViewPager. So far I just have 3 instances of the same ListFragment, but in the future I will have 3 instances of different ListFragments. The ViewPager is on a vertical phone screen, the lists are not side-by-side.


Now a button on the ListFragment starts an separate full-page activity (via the FragmentActivity), which returns and FragmentActivity modifies the data, saves it, then attempts to update all views in its ViewPager. It is here, where I am stuck.



```
public class ProgressMainActivity extends FragmentActivity
{
    MyAdapter mAdapter;
    ViewPager mPager;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
    ...
        mAdapter = new MyAdapter(getSupportFragmentManager());

        mPager = (ViewPager) findViewById(R.id.viewpager);
        mPager.setAdapter(mAdapter);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data)
    {
        ...
        updateFragments();
        ...
    }
    public void updateFragments()
    {
        //Attempt 1:
        //mAdapter.notifyDataSetChanged();
        //mPager.setAdapter(mAdapter);

        //Attempt 2:
        //HomeListFragment fragment = (HomeListFragment) getSupportFragmentManager().findFragmentById(mAdapter.fragId[0]);
        //fragment.updateDisplay();
    }

    public static class MyAdapter extends FragmentPagerAdapter implements
         TitleProvider
    {
      int[] fragId = {0,0,0,0,0};
      public MyAdapter(FragmentManager fm)
      {
         super(fm);
      }
      @Override
      public String getTitle(int position){
         return titles[position];
      }
      @Override
      public int getCount(){
         return titles.length;
      }

      @Override
      public Fragment getItem(int position)
      {

         Fragment frag = HomeListFragment.newInstance(position);
         //Attempt 2:
         //fragId[position] = frag.getId();
         return frag;
      }

      @Override
      public int getItemPosition(Object object) {
         return POSITION_NONE; //To make notifyDataSetChanged() do something
     }
   }

    public class HomeListFragment extends ListFragment
    {
    ...
        public static HomeListFragment newInstance(int num)
        {
            HomeListFragment f = new HomeListFragment();
            ...
            return f;
        }
   ...

```

Now as you can see, my first attempt was to notifyDataSetChanged on the entire FragmentPagerAdapter, and this showed to update the data sometimes, but others I got an IllegalStateException: Can not perform this action after onSaveInstanceState. 


My second attempt involed trying to call an update function in my ListFragment, but getId in getItem returned 0. As per the docs I tried by 



> 
> acquiring a reference to the Fragment from FragmentManager, using
>  findFragmentById() or findFragmentByTag()
> 
> 
> 


but I don't know the tag or id of my Fragments! I have an android:id="@+id/viewpager" for ViewPager, and a android:id="@android:id/list" for my ListView in the ListFragment layout, but I don't think these are useful.


So, how can I either:
a) update the entire ViewPager safely in one go (ideally returning the user to the page he was on before) - it is ok that the user see the view change.
Or preferably,
b) call a function in each affected ListFragment to update the ListView manually.


Any help would be gratefully accepted!



---

Barkside's answer works with `FragmentPagerAdapter` but doesn't work with `FragmentStatePagerAdapter`, because it doesn't set tags on fragments it passes to `FragmentManager`.


With `FragmentStatePagerAdapter` it seems we can get by, using its `instantiateItem(ViewGroup container, int position)` call. It returns reference to fragment at position `position`. If `FragmentStatePagerAdapter` already holds reference to fragment in question, `instantiateItem` just returns reference to that fragment, and doesn't call `getItem()` to instantiate it again.


So, suppose, I'm currently looking at fragment #50, and want to access fragment #49. Since they are close, there's a good chance the #49 will be already instantiated. So, 



```
ViewPager pager = findViewById(R.id.viewpager);
FragmentStatePagerAdapter a = (FragmentStatePagerAdapter) pager.getAdapter();
MyFragment f49 = (MyFragment) a.instantiateItem(pager, 49)

```


---

## Notes

- ... and just in case anyone is wondering, the ViewPager does keep track of the index of the viewed fragment (ViewPager.getCurrentItem()), which is the 49 in the example above... but I've gotta say that I'm AMAZED that the ViewPager API won't return a reference to the actual Fragment directly.
- With `FragmentStatePagerAdapter`, using above code with `a.instantiateItem(viewPager, viewPager.getCurrentItem());` (to get rid of the 49) as proposed by  works perfectly.
- I would simplify that by just making "a" a PagerAdapter (PagerAdapter a = pager.getAdapter();). Or even MyFragment f49 = (MyFragment) pager.getAdapter().instantiateItem(pager, 49); instantiateItem() is from PagerAdapter, so you don't have to typecast it to call instantiateItem()
- Wait, so I have to pass the ViewPager to every fragment it contains just to be able to do things to the views in the fragment? Currently everything I do in onCreate on the current page happens on the next page.
- it's important to mention that any calls to `instantiateItem` should be surrounded by `startUpdate`/`finishUpdate` calls. details are in my answer to a similar question: http://stackoverflow.com/questions/14035090/how-to-get-existing-fragments-when-using-fragmentpageradapter/41345283#41345283
