---
metaTitle: How to put Google Maps V2 on a Fragment using ViewPager
tags:
- google-maps
title: How to put Google Maps V2 on a Fragment using ViewPager
---

## Context

I am trying to do a tab layout same in Play Store. I got to display the [tab layout using a fragments and viewpager from androidhive.](http://www.androidhive.info/2013/10/android-tab-layout-with-swipeable-views-1/) However, I can't implement [google maps v2](http://wptrafficanalyzer.in/blog/driving-distance-and-travel-time-duration-between-two-locations-in-google-map-android-api-v2/) on it. I searched the internet for hours already, but I can't find a tutorial on how to do it. Can some one please show me how?



---

**By using this code we can setup MapView anywhere, inside any ViewPager or Fragment or Activity.**


***In the latest update of Google for Maps, only MapView is supported for fragments. MapFragment & SupportMapFragment doesn't work. I might be wrong but this is what I saw after trying to implement MapFragment & SupportMapFragment.***


Setting up the layout for showing the map in the file `location_fragment.xml`:



```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <com.google.android.gms.maps.MapView
        android:id="@+id/mapView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>

```

Now, we code the Java class for showing the map in the file `MapViewFragment.java`:



```
public class MapViewFragment extends Fragment {

    MapView mMapView;
    private GoogleMap googleMap;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.location_fragment, container, false);

        mMapView = (MapView) rootView.findViewById(R.id.mapView);
        mMapView.onCreate(savedInstanceState);

        mMapView.onResume(); // needed to get the map to display immediately

        try {
            MapsInitializer.initialize(getActivity().getApplicationContext());
        } catch (Exception e) {
            e.printStackTrace();
        }

        mMapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(GoogleMap mMap) {
                googleMap = mMap;

                // For showing a move to my location button
                googleMap.setMyLocationEnabled(true);

                // For dropping a marker at a point on the Map
                LatLng sydney = new LatLng(-34, 151);
                googleMap.addMarker(new MarkerOptions().position(sydney).title("Marker Title").snippet("Marker Description"));

                // For zooming automatically to the location of the marker
                CameraPosition cameraPosition = new CameraPosition.Builder().target(sydney).zoom(12).build();
                googleMap.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));
            }
        });

        return rootView;
    }

    @Override
    public void onResume() {
        super.onResume();
        mMapView.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        mMapView.onPause();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mMapView.onDestroy();
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mMapView.onLowMemory();
    }
}

```

*Finally you need to get the API Key for your app by registering your app at [Google Cloud Console](https://cloud.google.com/console). Register your app as Native Android App.*



---

## Notes:

- i am getting error while using this method .please help  

PID: 16260
 java.lang.NullPointerException
 at com.example.imran.maps.MeFragment.setUpMapIfNeeded(MeFragment.java:115)
 at com.example.imran.maps.MeFragment.onCreateView(MeFragment.java:72)


code is here :


googleMap = ((SupportMapFragment) MainActivity.fragmentManager
 .findFragmentById(R.id.map)).getMap();


- I get an errore "NullPointerException" on mMap = ((SupportMapFragment) MainActivity.fragmentManager
 .findFragmentById(R.id.location\_map)).getMap();


- The example code piece:
mMap = ((SupportMapFragment) MainActivity.fragmentManager
 .findFragmentById(R.id.location\_map)).getMap();
will crash in getMap() if findFragmentById() returns null.


- Yeah this doesn't work: `java.lang.NullPointerException: Attempt to invoke interface method 'void com.google.maps.api.android.lib6.impl.bo.o()' on a null object reference`


- `<uses-library android:name="com.google.android.maps" android:required="true" />` is for Maps V1, not Maps V2. Having this line in your manifest will prevent you from running on such devices, and this line is not required for Maps V2 use. For example, the 17 projects at https://github.com/commonsguy/cw-omnibus/tree/master/MapsV2 do not have this `<uses-library>` element and work fine.


- https://developer.android.com/training/location/receive-location-updates.html
https://developers.google.com/maps/documentation/android-api/location


- : Authorization Failure means that the API key you have provided is incorrect. Refer to this link on how to generate the API Key properly: https://developers.google.com/maps/documentation/android/start


- There is an error on this line " mMap = ((SupportMapFragment) MainActivity.fragmentManager
 .findFragmentById(R.id.map)).getMap();".


- I am getting null pointer exception when I add view to the view pager.


- make sure that you are using android.support.v4.app.Fragment


- compile 'com.google.android.gms:play-services-maps:15.0.1' in Gradle.properties(App) dependencies


- If i want to override onLocationChanged(), where shout i put it and how?


- I'm missing just one thing: How and where do you add the LocationFragment to the activity? fragmentManager.beginTransaction().add(R.id.layoutToAddFragmentTo, mapFragment).commit(); ?


- : please check this link: https://developers.google.com/maps/documentation/android-api/start


- I get an Authorization failure in the Logcat (my app does not crash though, so the code must be right). Now I'm starting to think because I renamed my package name a couple of times, that might be part of it. Even though I changed it in the SHA1 code I input in API Console, and I even uninstalled my app from my phone and reran it, but still the same Authorization error and blank map.


- Yes now it does not require the `"com.google.android.maps"` now the Maps library is in the Google Play Services


- I must have gone to a Console page that was for my apps in general to get my key (strange) because the Console link from that link you posted sent me to a different looking Console page, specially for my registered project (app).


- I just want to ask your concern is that the fragment which you have made above (MAP FRAGMENT), how it can be used as a View Pager Item ?


- : For using as a ViewPager item just set it as normal fragment in the ViewPager. For more info refer this link : http://tamsler.blogspot.in/2011/10/android-viewpager-and-fragments.html


- After successful integration of google map i have got a problem and the problem is when i try to close the app clicking back button the app shows a Unfortunately app has stopped.. <<don't know what is the problem..


- Hey Man, the code is now clean but I encounter an error when changing tabs. http://shrib.com/nullfragment


- I have set networkMarkerManager.setOnMarkerClickListener(this); in OnMapready. I dont know why marker click listener not working. Its working before above code add.


- My map displays a blank white space, with the Google logo in the bottom left.


- : The sample code here supports fragments for markers. You can find relevant examples in the [link](https://developers.google.com/maps/documentation/android-sdk/map-with-marker) here.


- I am using android studio, at `googleMap.setMyLocationEnabled(true);` it's showing me a red line and when i hover over it , it says some `permission checks`, as a newbie i don't know what to do?


- : main.xml can be any layout design file. You can also directly add the LocationFragment.class, then you won't need any layout for the MainActivity.class


- Have you added the latest android-support-v4.jar library? Also the MainActivity must extend a FragmentActivity


- Hi is there any solution to this problem.. android.view.InflateException: Binary XML file line #8: Error inflating class fragment


- : Please check if you have enabled Maps for Android V2 in API Console, then generate an API Key.


