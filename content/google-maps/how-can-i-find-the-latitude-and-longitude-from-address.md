---
metaTitle: How can I find the latitude and longitude from address
tags:
- google-geocoder
title: How can I find the latitude and longitude from address
---

## Context

I want to show the location of an address in Google Maps.


How do I get the latitude and longitude of an address using the Google Maps API?



---


```
public GeoPoint getLocationFromAddress(String strAddress){

Geocoder coder = new Geocoder(this);
List<Address> address;
GeoPoint p1 = null;

try {
    address = coder.getFromLocationName(strAddress,5);
    if (address==null) {
       return null;
    }
    Address location=address.get(0);
    location.getLatitude();
    location.getLongitude();

    p1 = new GeoPoint((double) (location.getLatitude() * 1E6),
                      (double) (location.getLongitude() * 1E6));

    return p1;
    }
}

```

`strAddress` is a string containing the address. The `address` variable holds the converted addresses.



---

## Notes

- Check out the answer by  below, i don't think there is a `GeoPoint` class in the new libraries. Instead use `LatLng`. http://stackoverflow.com/a/27834110/2968401
- You need the right permissions to be able to access the service.
- i already gave those permission and include the library...i can get map view...it throws that IOException  at geocoder...
- 09-02 16:32:22.861: ERROR/Exception(722):     at android.os.Looper.loop(Looper.java:123)
09-02 16:32:22.861: ERROR/Exception(722):     at android.app.ActivityThread.main(ActivityThread.java:4627)
09-02 16:32:22.861: ERROR/Exception(722):     at java.lang.reflect.Method.invokeNative(Native Method)
09-02 16:32:22.861: ERROR/Exception(722):     at java.lang.reflect.Method.invoke(Method.java:521)
09-02 16:32:22.861: ERROR/Exception(722):     at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:868)
-  classes are changed with google maps api version V2 in place of GeoPoint new class is LatLang. you need google maps api in your project with key. and you just need to pass string address to this method to get lat,lang
- 09-02 16:32:22.861: ERROR/Exception(722):     at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:626)
09-02 16:32:22.861: ERROR/Exception(722):     at dalvik.system.NativeStart.main(Native Method)
-  which API version you are using ?
- I call the method like "GeoPoint point= getLocationFromAddress("colombo,sri lanka");" but give null value.
- You might check a way through deal with this problem  http://code.google.com/p/android/issues/detail?id=8816#c21 its pretty puch the same as geocoder
- the logcat error was
09-02 16:32:22.861: ERROR/Exception(722): Service not Available
09-02 16:32:22.861: ERROR/Exception(722): java.io.IOException: Service not Available
09-02 16:32:22.861: ERROR/Exception(722):     at android.location.Geocoder.getFromLocationName(Geocoder.java:159)
09-02 16:32:22.861: ERROR/Exception(722):     at pack.sample.map.SampleMapApplication.onCreate(SampleMapApplication.java:36)
09-02 16:32:22.861: ERROR/Exception(722):     at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1047)
- 09-02 16:32:22.861: ERROR/Exception(722):     at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2627)
09-02 16:32:22.861: ERROR/Exception(722):     at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2679)
09-02 16:32:22.861: ERROR/Exception(722):     at android.app.ActivityThread.access$2300(ActivityThread.java:125)
09-02 16:32:22.861: ERROR/Exception(722):     at android.app.ActivityThread$H.handleMessage(ActivityThread.java:2033)
09-02 16:32:22.861: ERROR/Exception(722):     at android.os.Handler.dispatchMessage(Handler.java:99)
- which android api version you are building application you need to have google api available i have build with google api 8. check that google api folder is there in your project. and in your manifest file add uses library com.google.android.maps
- Is there any solution to this problem?
