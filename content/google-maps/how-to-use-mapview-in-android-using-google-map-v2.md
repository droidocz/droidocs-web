---
metaTitle: How to use MapView in android using google map V2
title: How to use MapView in android using google map V2
---

## Context

I want to show a map in on of my activity.


In google map V1 we use -



```
 <com.google.android.maps.MapView
        android:id="@+id/mapview"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:apiKey="@string/api_map_key"
        android:clickable="true"
        android:enabled="true" />

```

and extend the activity by using MapActivity class.


In Versing 2 it uses Fragment instead of mapview and have to extend activity by FragmentActivity instead normal Activity.
ex- 



```
<fragment
            android:id="@+id/map"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            class="com.google.android.gms.maps.SupportMapFragment" />

```

Now Can I use Same way to create mapview instead of Fragment using version 2 .()


Can anyone use MapView using V2?



---

yes you can use MapView in v2...
for further details you can get help from this


<https://gist.github.com/joshdholtz/4522551>




---


**`SomeFragment.java`**
=======================



```
public class SomeFragment extends Fragment implements OnMapReadyCallback{
 
    MapView mapView;
    GoogleMap map;
 
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.some_layout, container, false);
 
        // Gets the MapView from the XML layout and creates it
        mapView = (MapView) v.findViewById(R.id.mapview);
        mapView.onCreate(savedInstanceState);
 
    
        mapView.getMapAsync(this);
        
 
        return v;
    }
 
   @Override
   public void onMapReady(GoogleMap googleMap) {
       map = googleMap;
       map.getUiSettings().setMyLocationButtonEnabled(false);
       map.setMyLocationEnabled(true);
       /*
       //in old Api Needs to call MapsInitializer before doing any CameraUpdateFactory call
        try {
            MapsInitializer.initialize(this.getActivity());
        } catch (GooglePlayServicesNotAvailableException e) {
            e.printStackTrace();
        } 
       */
        
        // Updates the location and zoom of the MapView
        /*CameraUpdate cameraUpdate = CameraUpdateFactory.newLatLngZoom(new LatLng(43.1, -87.9), 10);
        map.animateCamera(cameraUpdate);*/
        map.moveCamera(CameraUpdateFactory.newLatLng(new LatLng(43.1, -87.9)));

    }

    @Override
    public void onResume() {
        mapView.onResume();
        super.onResume();
    }


    @Override
    public void onPause() {
        super.onPause();
        mapView.onPause();
    }
 
    @Override
    public void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
    }
 
    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();
    }
 
}

```



---


**`AndroidManifest.xml`**
=========================



```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example"
    android:versionCode="1"
    android:versionName="1.0" >
    
    <uses-sdk
        android:minSdkVersion="8"
        android:targetSdkVersion="15" />
    
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="com.google.android.providers.gsf.permission.READ_GSERVICES"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    
    <uses-feature
        android:glEsVersion="0x00020000"
        android:required="true"/>
    
    <permission
        android:name="com.example.permission.MAPS_RECEIVE"
        android:protectionLevel="signature"/>
    <uses-permission android:name="com.example.permission.MAPS_RECEIVE"/>
    
    <application
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        
        <meta-data
            android:name="com.google.android.maps.v2.API_KEY"
            android:value="your_key"/>
        
        <activity
            android:name=".HomeActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    
    </application>
 
</manifest>

```



---


**`some_layout.xml`**
=====================



```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent" >
    
    <com.google.android.gms.maps.MapView android:id="@+id/mapview"
        android:layout_width="fill_parent" 
        android:layout_height="fill_parent" />
 
</LinearLayout>

```


---

## Notes

- mapView.onCreate(savedInstanceState); will always re create the map if it is pop from backstack!
- i Got this type of error Declare this in manifest file    &lt;meta-data
            android:name="com.google.android.gms.version"
            android:value="
- add mapView.onResume() to display the map immediately
- that was method in old api, new it is change to getMapAsync()
Updated code without run, check it.
