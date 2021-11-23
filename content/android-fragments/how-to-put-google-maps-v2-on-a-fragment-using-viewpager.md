---
metaTitle: How to put Google Maps V2 on a Fragment using ViewPager
tags:
- google-maps
title: How to put Google Maps V2 on a Fragment using ViewPager
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

