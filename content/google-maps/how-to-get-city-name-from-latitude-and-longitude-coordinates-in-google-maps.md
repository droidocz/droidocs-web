---
metaTitle: How to get city name from latitude and longitude coordinates in Google Maps
tags:
- reverse-geocoding
title: How to get city name from latitude and longitude coordinates in Google Maps
---

## Context

How might I obtain the city name in Google Maps if I have latitude and longitude coordinates of a town or area?


I tried using the latitude, longitude and I got country but I don't know how to get city name.



---

From a [`Geocoder`](http://developer.android.com/reference/android/location/Geocoder.html) object, you can call the [`getFromLocation(double, double, int)`](http://developer.android.com/reference/android/location/Geocoder.html#getFromLocation(double,%20double,%20int)) method. It will return a list of [`Address`](http://developer.android.com/reference/android/location/Address.html) objects that have a method [`getLocality()`](http://developer.android.com/reference/android/location/Address.html#getLocality()).



```
Geocoder gcd = new Geocoder(context, Locale.getDefault());
List<Address> addresses = gcd.getFromLocation(lat, lng, 1);
if (addresses.size() > 0) {
    System.out.println(addresses.get(0).getLocality());
}
else {
   // do your stuff
}

```


---

## Notes

- sometimes getLocality() returns null and city name stays at mAdminArea
- For addresses in the USA (and some other countries) use getAdminArea() to return the state
- I am getting error which says "Timed out waiting for response from server".
- `getLocality()` sometimes return **null**. `getAdminArea()` gives the province or state in Canada while `getSubAdminAread()` gives the city but it's weird e.g.
- It throws exception on many devices and requires restart to work again properly.
- I tested your code on multiple devices but it returns glpc error.
- Always returns null to me .=
