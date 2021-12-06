---
metaTitle: How can I show current location on a Google Map on Android Marshmallow
tags:
- google-maps-android-api-2
title: How can I show current location on a Google Map on Android Marshmallow
---

## Context

I want google maps to show the location of the user. I tried this code, but it did not work on Android 6.



```
private GoogleMap map;
LocationManager lm;
LocationListener ll;
Location l;

LatLng pos;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.start_layout);

    lm = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
    ll = new LocationListener() {
        @Override
        public void onLocationChanged(Location location) {
            l = (Location) location;
        }

        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {}

        @Override
        public void onProviderEnabled(String provider) {}

        @Override
        public void onProviderDisabled(String provider) {}
    };

    SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
            .findFragmentById(R.id.nMap);
    mapFragment.getMapAsync(this);
}

@Override
public void onMapReady(GoogleMap googleMap) {
    map = googleMap;

    if(ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
        lm.requestLocationUpdates(lm.NETWORK_PROVIDER, 0, 0, ll);
    }

    pos = new LatLng(l.getLatitude(), l.getLongitude());

    // Add a marker in Sydney and move the camera
    map.setMyLocationEnabled(true);
    map.addMarker(new MarkerOptions().position(pos).title("Marker in Sydney"));
    map.moveCamera(CameraUpdateFactory.newLatLng(pos));
}

```

Here are the permissions I've set:



```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />

```


---

**For using FusedLocationProviderClient with Google Play Services 11 and higher:** 


see here:
[How to get current Location in GoogleMap using FusedLocationProviderClient](https://stackoverflow.com/questions/44992014/how-to-get-current-location-in-googlemap-using-fusedlocationproviderclient)


**For using (now deprecated) FusedLocationProviderApi:**


If your project uses Google Play Services 10 or lower, using the FusedLocationProviderApi is the optimal choice.


The [FusedLocationProviderApi](https://developers.google.com/android/reference/com/google/android/gms/location/FusedLocationProviderApi) offers less battery drain than the old open source LocationManager API.
Also, if you're already using Google Play Services for Google Maps, there's no reason not to use it.


Here is a full Activity class that places a Marker at the current location, and also moves the camera to the current position.


It also checks for the Location permission at runtime for Android 6 and later (Marshmallow, Nougat, Oreo).
In order to properly handle the Location permission runtime check that is necessary on Android M/Android 6 and later, you need to ensure that the user has granted your app the Location permission before calling `mGoogleMap.setMyLocationEnabled(true)` and also before requesting location updates.



```
public class MapLocationActivity extends AppCompatActivity
        implements OnMapReadyCallback,
        GoogleApiClient.ConnectionCallbacks,
        GoogleApiClient.OnConnectionFailedListener,
        LocationListener {

    GoogleMap mGoogleMap;
    SupportMapFragment mapFrag;
    LocationRequest mLocationRequest;
    GoogleApiClient mGoogleApiClient;
    Location mLastLocation;
    Marker mCurrLocationMarker;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getSupportActionBar().setTitle("Map Location Activity");

        mapFrag = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        mapFrag.getMapAsync(this);
    }

    @Override
    public void onPause() {
        super.onPause();

        //stop location updates when Activity is no longer active
        if (mGoogleApiClient != null) {
            LocationServices.FusedLocationApi.removeLocationUpdates(mGoogleApiClient, this);
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap)
    {
        mGoogleMap=googleMap;
        mGoogleMap.setMapType(GoogleMap.MAP_TYPE_HYBRID);

        //Initialize Google Play Services
        if (android.os.Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)
                    == PackageManager.PERMISSION_GRANTED) {
                //Location Permission already granted
                buildGoogleApiClient();
                mGoogleMap.setMyLocationEnabled(true);
            } else {
                //Request Location Permission
                checkLocationPermission();
            }
        }
        else {
            buildGoogleApiClient();
            mGoogleMap.setMyLocationEnabled(true);
        }
    }

    protected synchronized void buildGoogleApiClient() {
        mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
        mGoogleApiClient.connect();
    }

    @Override
    public void onConnected(Bundle bundle) {
        mLocationRequest = new LocationRequest();
        mLocationRequest.setInterval(1000);
        mLocationRequest.setFastestInterval(1000);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION)
                == PackageManager.PERMISSION_GRANTED) {
            LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this);
        }
    }

    @Override
    public void onConnectionSuspended(int i) {}

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {}

    @Override
    public void onLocationChanged(Location location)
    {
        mLastLocation = location;
        if (mCurrLocationMarker != null) {
            mCurrLocationMarker.remove();
        }

        //Place current location marker
        LatLng latLng = new LatLng(location.getLatitude(), location.getLongitude());
        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(latLng);
        markerOptions.title("Current Position");
        markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_MAGENTA));
        mCurrLocationMarker = mGoogleMap.addMarker(markerOptions);

        //move map camera
        mGoogleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng,11));

    }

    public static final int MY_PERMISSIONS_REQUEST_LOCATION = 99;
    private void checkLocationPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {

            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                    Manifest.permission.ACCESS_FINE_LOCATION)) {

                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
                new AlertDialog.Builder(this)
                        .setTitle("Location Permission Needed")
                        .setMessage("This app needs the Location permission, please accept to use location functionality")
                        .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialogInterface, int i) {
                                //Prompt the user once explanation has been shown
                                ActivityCompat.requestPermissions(MapLocationActivity.this,
                                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                                        MY_PERMISSIONS_REQUEST_LOCATION );
                            }
                        })
                        .create()
                        .show();


            } else {
                // No explanation needed, we can request the permission.
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                        MY_PERMISSIONS_REQUEST_LOCATION );
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case MY_PERMISSIONS_REQUEST_LOCATION: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                    // permission was granted, yay! Do the
                    // location-related task you need to do.
                    if (ContextCompat.checkSelfPermission(this,
                            Manifest.permission.ACCESS_FINE_LOCATION)
                            == PackageManager.PERMISSION_GRANTED) {

                        if (mGoogleApiClient == null) {
                            buildGoogleApiClient();
                        }
                        mGoogleMap.setMyLocationEnabled(true);
                    }

                } else {

                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                    Toast.makeText(this, "permission denied", Toast.LENGTH_LONG).show();
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request
        }
    }

}

```

activity\_main.xml:



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:map="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"
        tools:context=".MapLocationActivity"
        android:name="com.google.android.gms.maps.SupportMapFragment"/>

</LinearLayout>

```

**Result:**


Show permission explanation if needed using an AlertDialog (this happens if the user denies a permission request, or grants the permission and then later revokes it in the settings):


[![enter image description here](https://i.stack.imgur.com/CWSkM.png)](https://i.stack.imgur.com/CWSkM.png)


Prompt the user for Location permission by calling `ActivityCompat.requestPermissions()`:


[![enter image description here](https://i.stack.imgur.com/o1cmu.png)](https://i.stack.imgur.com/o1cmu.png)


Move camera to current location and place Marker when the Location permission is granted:


[![enter image description here](https://i.stack.imgur.com/qpxoy.png)](https://i.stack.imgur.com/qpxoy.png)



---

## Notes:

-  Make sure your import is `import com.google.android.gms.location.LocationListener;`, see here for the imports: http://stackoverflow.com/a/31448567/4409409
- LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this); - II tried your solution, I got stuck with this line of code saying "cannot resolve requestLocationUpdates"
-  For an example of this code in a Fragment, see here: http://stackoverflow.com/a/41754169/4409409
- It can be either WiFi or cellular, but you need an active data connection.
-  For doing this inside a Fragment, see my other answer here: http://stackoverflow.com/a/41754169/4409409
- **I recommend to use
//move map camera and zoom**
`mGoogleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(latLng,11));`
Insted of those 2 lines. It reduce 1 code line and works better. His 2 lines not allways move camera to the current location.
- "java.lang.IllegalStateException: GoogleApiClient is not connected yet." - Whenever I try to launch application,I'm getting this issue,Could't figure out what was wrong
-  for prompting the user to enable Location Mode, take a look at this answer: http://stackoverflow.com/a/31816683
- When the app doesn't already have the Location Permission , and GPS is turned OFF, the Map doesn't zoom in to my Location or shows a marker (even when the permission are enabled ). Isn't that what onConnected in the above code do ?
-  You can add as many Markers as you want to as long as you have the lat/lon. Just use the `map.addMarker()` method for each Marker.
- I had never really understood how the check permissions worked and in my research, this answer and this [video](https://www.youtube.com/watch?v=scySXsk9yRc) have been informative.
- It will work with WiFi off and GPS enabled, but it will probably take longer to get the first location update since GPS actually needs to use satellites to locate you.
- Yes already did it inside onstart method. But still the app crashes.
- How would you show location that would be shown like in google maps app?
- I sometimes got delay to find current location with your codes.
- Even I am getting the same error **`GoogleApiClient is not connected yet.`**.
-  Do I have to enable wifi on mobile when using this?
- I mean I m not getting my Location..
- I think we need to disconnect google api client in life cycle to reduce resource usage
-  See here for the relevant imports: http://stackoverflow.com/questions/31448001/maps-api-only-loads-with-location-setting-gps/31448567#31448567
- Still image type is found.. I m using Sony Xperia 18API.
-  I'm still getting error can't resolve symbol for both.
-  I don't know what's the problem with my code but in the location package only I can see places and * to import, can't import LocationRequest and LocationServices.
- I'm getting error "can't resolve LocationRequest and LocationServices". I'm using this version of play-services  in my app gradle "compile 'com.google.android.gms:play-services-maps:10.2.4'".
-  resolved that error by adding compile 'com.google.android.gms:play-services-location:10.2.4 in dependencies. but I'm getting another error " can't resolve method" for this line LocationServices.FusedLocationApi.requestLocationUpdates(mGoogleApiClient, mLocationRequest, this). I'm using this code in a fragment.
-  Be sure you're importing the correct class: `import com.google.android.gms.location.LocationRequest;`
-  I'm using Geocoder class in the Android framework location APIs to locate Geo-locations. I think that's the reason my app doesn't work when WiFi is not enabled. Is this correct that Geocoder uses internet to fetch the address?
-  Be sure that you have the call to `mGoogleApiClient.connect();`
