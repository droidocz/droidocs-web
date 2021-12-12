---
metaTitle: Drawing a line/path on Google Maps
tags:
- overlay
- android-mapview
- draw
title: Drawing a line/path on Google Maps
---

## Context

I've been busy for a long time finding out how to draw a line between two (GPS) points on the map in HelloMapView but with no luck.


Could anyone please tell me how to do so.


Suppose I use the HelloMapView which extends MapView. Do I need to use overlays? If so do I have to override the onDraw() method of the overlay and draw a line here? I actually tried these things but with no result.


Thank you in advance!



---


```
Try this one:
Add itemizedOverlay class:

public class AndroidGoogleMapsActivity extends MapActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Displaying Zooming controls
        MapView mapView = (MapView) findViewById(R.id.mapview);
        mapView.setBuiltInZoomControls(true);


        MapController mc = mapView.getController();
        double lat = Double.parseDouble("48.85827758964043");
        double lon = Double.parseDouble("2.294543981552124");
        GeoPoint geoPoint = new GeoPoint((int)(lat * 1E6), (int)(lon * 1E6));
        mc.animateTo(geoPoint);
        mc.setZoom(15);
        mapView.invalidate(); 


        /**
         * Placing Marker
         * */
        List<Overlay> mapOverlays = mapView.getOverlays();
        Drawable drawable = this.getResources().getDrawable(R.drawable.mark_red);
        AddItemizedOverlay itemizedOverlay = 
             new AddItemizedOverlay(drawable, this);


        OverlayItem overlayitem = new OverlayItem(geoPoint, "Hello", "Sample Overlay item");

        itemizedOverlay.addOverlay(overlayitem);
        mapOverlays.add(itemizedOverlay);

    }

    @Override
    protected boolean isRouteDisplayed() {
        return false;
    }
}

```
