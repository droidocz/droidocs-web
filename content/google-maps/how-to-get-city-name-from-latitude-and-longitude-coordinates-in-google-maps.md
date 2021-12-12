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

I am using this code. You can also your this for getting city and other details about a Latitude and longitude :



```
public class getReverseGeoCoding {
    private String Address1 = "", Address2 = "", City = "", State = "", Country = "", County = "", PIN = "";
    
    public void getAddress() {
        Address1 = "";
        Address2 = "";
        City = "";
        State = "";
        Country = "";
        County = "";
        PIN = "";
        
        try {
            
            JSONObject jsonObj = parser_Json.getJSONfromURL("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + Global.curLatitude + ","
                    + Global.curLongitude + "&sensor=true&key=YOUR_API_KEY");
            String Status = jsonObj.getString("status");
            if (Status.equalsIgnoreCase("OK")) {
                JSONArray Results = jsonObj.getJSONArray("results");
                JSONObject zero = Results.getJSONObject(0);
                JSONArray address_components = zero.getJSONArray("address_components");
                
                for (int i = 0; i < address_components.length(); i++) {
                    JSONObject zero2 = address_components.getJSONObject(i);
                    String long_name = zero2.getString("long_name");
                    JSONArray mtypes = zero2.getJSONArray("types");
                    String Type = mtypes.getString(0);
                    
                    if (TextUtils.isEmpty(long_name) == false || !long_name.equals(null) || long_name.length() > 0 || long_name != "") {
                        if (Type.equalsIgnoreCase("street_number")) {
                            Address1 = long_name + " ";
                        } else if (Type.equalsIgnoreCase("route")) {
                            Address1 = Address1 + long_name;
                        } else if (Type.equalsIgnoreCase("sublocality")) {
                            Address2 = long_name;
                        } else if (Type.equalsIgnoreCase("locality")) {
                            // Address2 = Address2 + long_name + ", ";
                            City = long_name;
                        } else if (Type.equalsIgnoreCase("administrative_area_level_2")) {
                            County = long_name;
                        } else if (Type.equalsIgnoreCase("administrative_area_level_1")) {
                            State = long_name;
                        } else if (Type.equalsIgnoreCase("country")) {
                            Country = long_name;
                        } else if (Type.equalsIgnoreCase("postal_code")) {
                            PIN = long_name;
                        }
                    }
                    
                    // JSONArray mtypes = zero2.getJSONArray("types");
                    // String Type = mtypes.getString(0);
                    // Log.e(Type,long_name);
                }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }
    
    public String getAddress1() {
        return Address1;
        
    }
    
    public String getAddress2() {
        return Address2;
        
    }
    
    public String getCity() {
        return City;
        
    }
    
    public String getState() {
        return State;
        
    }
    
    public String getCountry() {
        return Country;
        
    }
    
    public String getCounty() {
        return County;
        
    }
    
    public String getPIN() {
        return PIN;
        
    }
    
}

```

[For more detail on how to get Google Map Api key](https://developers.google.com/maps/documentation/geocoding/get-api-key)


**JSON PARSER CLASS**



```
public class parser_Json {
    public static JSONObject getJSONfromURL(String url) {

        // initialize
        InputStream is = null;
        String result = "";
        JSONObject jObject = null;

        // http post
        try {
            HttpClient httpclient = new DefaultHttpClient();
            HttpPost httppost = new HttpPost(url);
            HttpResponse response = httpclient.execute(httppost);
            HttpEntity entity = response.getEntity();
            is = entity.getContent();

        } catch (Exception e) {
            Log.e("log_tag", "Error in http connection " + e.toString());
        }

        // convert response to string
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(is, "iso-8859-1"), 8);
            StringBuilder sb = new StringBuilder();
            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line + "\n");
            }
            is.close();
            result = sb.toString();
        } catch (Exception e) {
            Log.e("log_tag", "Error converting result " + e.toString());
        }

        // try parse the string to a JSON object
        try {
            jObject = new JSONObject(result);
        } catch (JSONException e) {
            Log.e("log_tag", "Error parsing data " + e.toString());
        }

        return jObject;
    }

}

```

You can get more info from this question : [Get the particular address using latitude and longitude](https://stackoverflow.com/questions/16515682/get-the-particular-address-using-latitude-and-longitude/16515848#16515711)



---

## Notes

-  You can do like this in your service ** new getReverseGeoCoding().getCity(); ** this will return you the current City or lat, long which is from a Global class.
- I used you code but it returns an error which says 
{"error_message":"You must use an API key to authenticate each request to Google Maps Platform APIs. For additional information, please refer to http:\/\/g.co\/dev\/maps-no-account","results":[],"status":"REQUEST_DENIED"}
How should I fix it?
