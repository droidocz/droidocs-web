---
metaTitle: 'android - eclipse: display google maps using coordinates obtained using gps'
tags:
- eclipse
- gps
title: 'android - eclipse: display google maps using coordinates obtained using gps'
---

## Context

I am trying to create an app that will obtain the users location via gps, display the users location in google maps, and then update after a certain amount of time/movement. 


I currently have an app that will obtain the users location via gps and update itself every 10meters/10,000 miliseconds, but currently all it does is display what the coordinates are. I have it set up to connect to google maps, but at the minute it is simply setting the map to some coordinates that I have manually entered myself.


How do I get it so the map will display the location based on the coordinates obtained via gps?


Any help would be greatly appreciated, I am very new to all this!


EDIT: heres my code so far!



```
package com.android.basicmap;

import com.google.android.maps.MapActivity;
import android.os.Bundle;
import com.google.android.maps.MapView;
import com.google.android.maps.MapController;
import com.google.android.maps.GeoPoint;
import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;

public class BasicMapActivity extends MapActivity {

private MapView mapView;
private MapController mapController;

private LocationManager locationManager;
private LocationListener locationListener;

/** Called when the activity is first created. */
@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);  

    locationListener = new GPSLocationListener();

    locationManager.requestLocationUpdates(
      LocationManager.GPS_PROVIDER, 
      0, 
      0, 
      locationListener);

    mapView = (MapView) findViewById(R.id.mapView);
    mapView.setStreetView(true);
    mapView.setBuiltInZoomControls(true);

    mapController = mapView.getController();
    mapController.setZoom(16);
}

@Override
protected boolean isRouteDisplayed() {
  return false;
}

private class GPSLocationListener implements LocationListener 
{
  @Override
  public void onLocationChanged(Location location) {
    if (location != null) {
      GeoPoint point = new GeoPoint(
          (int) (location.getLatitude() * 1E6), 
          (int) (location.getLongitude() * 1E6));

      Toast.makeText(getBaseContext(), 
          "Latitude: " + location.getLatitude() + 
          " Longitude: " + location.getLongitude(), 
          Toast.LENGTH_SHORT).show();

      mapController.animateTo(point);
      mapController.setZoom(16);
      mapView.invalidate();
    }
  }


}

```

}



---

Assuming that you are using `MapView`, the simplest thing to do is add an instance of `MyLocationOverlay` to the map, as Android will handle displaying the user's location for you.



```
map=(MapView)findViewById(R.id.whatever_your_mapview_id_is);
map.getOverlays().add(new MyLocationOverlay(this, map));

```

If for some reason you want to do that yourself rather than use the built-in facility, you can create your own `ItemizedOverlay` to display the point, and add an instance of your own custom overlay to the `MapView`.

