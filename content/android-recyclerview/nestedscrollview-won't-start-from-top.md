---
metaTitle: NestedScrollview won't start from top
tags:
- nestedscrollview
title: NestedScrollview won't start from top
---

## Context

I have a Recyclerview in a NestedScrollview.. everything is working fine except one thig. I have total three view in NestedScrollview First two are LinearLayout then Recyclerview. when i run my app the Activity don't show top two layout it starts from top of the Recyclerview.


How its show my layout:


[![How its show my layout](https://i.stack.imgur.com/4BvgF.jpg)](https://i.stack.imgur.com/4BvgF.jpg)


How its suppose to show:


[![How its suppose to show](https://i.stack.imgur.com/9GmMp.jpg)](https://i.stack.imgur.com/9GmMp.jpg)


And i am loading this enite layout under a viewpager and my viewpager is a child of Coordinator Layout.



```
<?xml version="1.0" encoding="utf-8"?>
<android.support.v4.widget.NestedScrollView
android:id="@+id/scrollView"
android:layout_width="match_parent"
android:layout_height="match_parent"
android:background="@color/home_layout_background">

<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="horizontal">

        <com.daimajia.slider.library.SliderLayout
            android:id="@+id/image_slider"
            android:layout_width="match_parent"
            android:layout_height="@dimen/image_slider_height"
            android:layout_marginTop="@dimen/image_slider_top_margin" />
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="@dimen/popular_fragment_side_padding"
        android:layout_marginRight="@dimen/popular_fragment_side_padding"
        android:layout_marginTop="@dimen/popular_fragment_side_padding"
        android:orientation="horizontal"
        android:weightSum="4">

        <RelativeLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1">

            <RelativeLayout
                android:id="@+id/free_delivery"
                android:layout_width="76dp"
                android:layout_height="76dp"
                android:layout_centerInParent="true"
                android:background="@color/white">

                <RelativeLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_centerInParent="true">

                    <ImageView
                        android:id="@+id/btnImageViewFreeDelivery"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_centerHorizontal="true"
                        android:background="@drawable/icon_free_delivery" />

                    <TextView
                        android:id="@+id/btnTextFreeDelivery"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_below="@+id/btnImageViewFreeDelivery"
                        android:layout_centerHorizontal="true"
                        android:layout_marginTop="2dp"
                        android:text="@string/free_delivery_txt"
                        android:textColor="@color/popular_fragment_four_btn_txt"
                        android:textSize="@dimen/popular_fragment_four_btn_txt_size" />
                </RelativeLayout>

            </RelativeLayout>

        </RelativeLayout>

        <RelativeLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1">

            <RelativeLayout
                android:id="@+id/flash_deals"
                android:layout_width="76dp"
                android:layout_height="76dp"
                android:layout_centerInParent="true"
                android:background="@color/white">


                <RelativeLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_centerInParent="true">

                    <ImageView
                        android:id="@+id/btnImageViewFlashDeals"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_centerHorizontal="true"
                        android:background="@drawable/icon_flash_deals" />

                    <TextView
                        android:id="@+id/btnTextFlashDeals"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_below="@+id/btnImageViewFlashDeals"
                        android:layout_centerHorizontal="true"
                        android:layout_marginTop="2dp"
                        android:text="@string/flash_deals_txt"
                        android:textColor="@color/popular_fragment_four_btn_txt"
                        android:textSize="@dimen/popular_fragment_four_btn_txt_size" />
                </RelativeLayout>

            </RelativeLayout>

        </RelativeLayout>

        <RelativeLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1">

            <RelativeLayout
                android:id="@+id/for_you"
                android:layout_width="76dp"
                android:layout_height="76dp"
                android:layout_centerInParent="true"
                android:background="@color/white">

                <RelativeLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_centerInParent="true">

                    <ImageView
                        android:id="@+id/btnImageViewForYou"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_centerHorizontal="true"
                        android:background="@drawable/icon_for_you" />

                    <TextView
                        android:id="@+id/btnTextForYou"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_below="@+id/btnImageViewForYou"
                        android:layout_centerHorizontal="true"
                        android:layout_marginTop="2dp"
                        android:text="@string/for_you_txt"
                        android:textColor="@color/popular_fragment_four_btn_txt"
                        android:textSize="@dimen/popular_fragment_four_btn_txt_size" />
                </RelativeLayout>


            </RelativeLayout>
        </RelativeLayout>

        <RelativeLayout
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1">

            <RelativeLayout
                android:id="@+id/shake_deals"
                android:layout_width="76dp"
                android:layout_height="76dp"
                android:layout_centerInParent="true"
                android:background="@color/white">

                <RelativeLayout
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content"
                    android:layout_centerInParent="true">

                    <ImageView
                        android:id="@+id/btnImageViewShakeDeals"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_centerHorizontal="true"
                        android:background="@drawable/icon_shake_deals" />

                    <TextView
                        android:id="@+id/btnTextShakeDeals"
                        android:layout_width="wrap_content"
                        android:layout_height="wrap_content"
                        android:layout_below="@+id/btnImageViewShakeDeals"
                        android:layout_centerHorizontal="true"
                        android:layout_marginTop="2dp"
                        android:text="@string/shake_deals"
                        android:textColor="@color/popular_fragment_four_btn_txt"
                        android:textSize="@dimen/popular_fragment_four_btn_txt_size" />
                </RelativeLayout>

            </RelativeLayout>
        </RelativeLayout>
    </LinearLayout>

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recycler_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_marginLeft="@dimen/popular_fragment_side_padding"
        android:layout_marginRight="@dimen/popular_fragment_side_padding"
        android:layout_marginTop="18dp"
        android:scrollbars="none" />

</LinearLayout>

</android.support.v4.widget.NestedScrollView>

```

My ViewPager Layout



```
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout
xmlns:android="http://schemas.android.com/apk/res/android"
xmlns:tools="http://schemas.android.com/tools"
xmlns:app="http://schemas.android.com/apk/res-auto"
android:id="@+id/main_content"
android:layout_width="match_parent"
android:layout_height="match_parent">

<android.support.v4.view.ViewPager
    android:id="@+id/viewPager"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/home_layout_background"
    app:layout_behavior="@string/appbar_scrolling_view_behavior"/>

<android.support.design.widget.AppBarLayout
    android:id="@+id/appbar"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <android.support.v7.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:layout_gravity="center"
        android:background="@drawable/toolbar_background"
        app:layout_scrollFlags="scroll|enterAlways">

        <TextView
            android:id="@+id/toolbar_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:text="@string/title_home"
            android:textColor="@color/toolbar_title_txt_color"
            android:textSize="@dimen/toolbar_txt_size"
            android:textStyle="bold" />

    </android.support.v7.widget.Toolbar>


    <android.support.design.widget.TabLayout android:id="@+id/tabs"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/white"
        app:tabMode="scrollable"
        app:tabTextColor="@color/tab_bar_txt"
        app:tabIndicatorColor="@color/tab_bar_txt_selected"
        app:tabSelectedTextColor="@color/tab_bar_txt_selected"
        app:tabTextAppearance="@style/TabTextAppeareance"/>

</android.support.design.widget.AppBarLayout>



</android.support.design.widget.CoordinatorLayout>

```


---

I had the same problem, and I fixed it the following way.


Add `android:descendantFocusability="blocksDescendants"` to the Linear Layout which is the only child of the Nested Scroll View.


This allows the Nested Scroll View to start from the top with minimal change to code. 



---

## Notes

- while `android:focusableInTouchMode="true"` make view look like if it is clicked.
- This would make the app completely not accessible!
- I have a fragment that basically has a `NestedScrollView` (with a `LinearLayout` as child) inside a `CoordinatorLayout` that sets `app:layout_behavior=" Sometimes, for instance when the host activity of the fragment was paused and resumed later on, the `NestedScrollView` did not scroll to the top layout of its child (i.e. `LinearLayout`), but was strangely offset. Setting `android:descendantFocusability="blocksDescendants"` to the `LinearLayout`solved my problem :)
