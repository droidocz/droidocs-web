---
metaTitle: 'Android Google Maps v2: How to add marker with multiline snippet'
title: 'Android Google Maps v2: How to add marker with multiline snippet'
---

## Context

Does anybody know how to add multiline snippet to Google Maps marker? That's my code for adding markers:



```
map.getMap().addMarker(new MarkerOptions()
    .position(latLng()).snippet(snippetText)
    .title(header).icon(icon));

```

I want snippet to look like this:



```
| HEADER |
|foo     |
|bar     |

```

but when I'm trying to set snippetText to "foo \n bar", I see just `foo bar` and I don't have any ideas how to make it multiline. Can you help me?



---

I have done with easiest way like below:



```
private GoogleMap mMap;

```

While **adding** **marker** on **Google Map**:



```
LatLng mLatLng = new LatLng(YourLatitude, YourLongitude);

mMap.addMarker(new MarkerOptions().position(mLatLng).title("My Title").snippet("My Snippet"+"\n"+"1st Line Text"+"\n"+"2nd Line Text"+"\n"+"3rd Line Text").icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED)));

```

After that put below code for **InfoWindow** **adapter** on **Google Map**:



```
mMap.setInfoWindowAdapter(new GoogleMap.InfoWindowAdapter() {

      @Override
      public View getInfoWindow(Marker arg0) {
         return null;
      }

      @Override
      public View getInfoContents(Marker marker) {

        LinearLayout info = new LinearLayout(mContext);
        info.setOrientation(LinearLayout.VERTICAL);

        TextView title = new TextView(mContext);
        title.setTextColor(Color.BLACK);
        title.setGravity(Gravity.CENTER);
        title.setTypeface(null, Typeface.BOLD);
        title.setText(marker.getTitle());

        TextView snippet = new TextView(mContext);
        snippet.setTextColor(Color.GRAY);
        snippet.setText(marker.getSnippet());

        info.addView(title);
        info.addView(snippet);

      return info;
    }
});

```

Hope it will help you.



---

## Notes

- even I like `mMap` variable name because that also I haven't changed.
- +1 for adding a code sample.
- +1 for `snippet`.
- Warning: I replace "MapsActivity.this" instead of mContext to run with no error.
