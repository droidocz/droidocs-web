---
metaTitle: How can I find the latitude and longitude from address
tags:
- google-geocoder
title: How can I find the latitude and longitude from address
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

