---
metaTitle: How can I find the latitude and longitude from address
tags:
- google-geocoder
title: How can I find the latitude and longitude from address
---

## Problem

I want to show the location of an address in Google Maps.


How do I get the latitude and longitude of an address using the Google Maps API?



---

## Solution

If you want to place your address in google map then easy way to use following



```
Intent searchAddress = new  Intent(Intent.ACTION_VIEW,Uri.parse("geo:0,0?q="+address));
startActivity(searchAddress);

```

OR 


if you needed to get lat long from your address then use **Google Place Api** following


create a method that returns a **JSONObject** with the response of the **HTTP Call** like following



```
public static JSONObject getLocationInfo(String address) {
        StringBuilder stringBuilder = new StringBuilder();
        try {

        address = address.replaceAll(" ","%20");    

        HttpPost httppost = new HttpPost("http://maps.google.com/maps/api/geocode/json?address=" + address + "&sensor=false");
        HttpClient client = new DefaultHttpClient();
        HttpResponse response;
        stringBuilder = new StringBuilder();


            response = client.execute(httppost);
            HttpEntity entity = response.getEntity();
            InputStream stream = entity.getContent();
            int b;
            while ((b = stream.read()) != -1) {
                stringBuilder.append((char) b);
            }
        } catch (ClientProtocolException e) {
        } catch (IOException e) {
        }

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject = new JSONObject(stringBuilder.toString());
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return jsonObject;
    }

```

now pass that **JSONObject** to getLatLong() method like following



```
public static boolean getLatLong(JSONObject jsonObject) {

        try {

            longitute = ((JSONArray)jsonObject.get("results")).getJSONObject(0)
                .getJSONObject("geometry").getJSONObject("location")
                .getDouble("lng");

            latitude = ((JSONArray)jsonObject.get("results")).getJSONObject(0)
                .getJSONObject("geometry").getJSONObject("location")
                .getDouble("lat");

        } catch (JSONException e) {
            return false;

        }

        return true;
    }

```

I hope this helps to you nd others..!!
Thank you..!!



---

## Notes

- Those mobile operators use NAT overloading, assigning the same IP to many devices...
