---
metaTitle: How to open standard Google Map application from my application
title: How to open standard Google Map application from my application
---

## Context

Once user presses button in my application, I would like to open standard Google Map application and to show particular location. How can I do it? (without using `com.google.android.maps.MapView`)



---

You can also simply use <http://maps.google.com/maps> as your URI



```
String uri = "http://maps.google.com/maps?saddr=" + sourceLatitude + "," + sourceLongitude + "&daddr=" + destinationLatitude + "," + destinationLongitude;
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
startActivity(intent);

```

or you can make sure that the Google Maps app only is used, this stops the intent filter (dialog) from appearing, by using 



```
intent.setPackage("com.google.android.apps.maps");

```

like so:



```
String uri = "http://maps.google.com/maps?saddr=" + sourceLatitude + "," + sourceLongitude + "&daddr=" + destinationLatitude + "," + destinationLongitude;
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
intent.setPackage("com.google.android.apps.maps");
startActivity(intent);

```

or you can add labels to the locations by adding a string inside parentheses after each set of coordinates like so:



```
String uri = "http://maps.google.com/maps?saddr=" + sourceLatitude + "," + sourceLongitude + "(" + "Home Sweet Home" + ")&daddr=" + destinationLatitude + "," + destinationLongitude + " (" + "Where the party is at" + ")";
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
intent.setPackage("com.google.android.apps.maps");
startActivity(intent);

```

To use the users current location as the starting point (unfortunately I haven't found a way to label the current location) then just drop off the `saddr` parameter as follows:



```
String uri = "http://maps.google.com/maps?daddr=" + destinationLatitude + "," + destinationLongitude + " (" + "Where the party is at" + ")";
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
intent.setPackage("com.google.android.apps.maps");
startActivity(intent);

```

For completeness, if the user doesn't have the maps app installed then it's going to be a good idea to catch the ActivityNotFoundException, as @TonyQ states, then we can start the activity again without the maps app restriction, we can be pretty sure that we will never get to the Toast at the end since an internet browser is a valid application to launch this url scheme too.



```
        String uri = "http://maps.google.com/maps?daddr=" + 12f + "," + 2f + " (" + "Where the party is at" + ")";
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
        intent.setPackage("com.google.android.apps.maps");
        try
        {
            startActivity(intent);
        }
        catch(ActivityNotFoundException ex)
        {
            try
            {
                Intent unrestrictedIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
                startActivity(unrestrictedIntent);
            }
            catch(ActivityNotFoundException innerEx)
            {
                Toast.makeText(this, "Please install a maps application", Toast.LENGTH_LONG).show();
            }
        }

```

**EDIT:**


For directions, a navigation intent is now supported with google.navigation



```
Uri navigationIntentUri = Uri.parse("google.navigation:q=" + 12f + "," + 2f);
Intent mapIntent = new Intent(Intent.ACTION_VIEW, navigationIntentUri);
mapIntent.setPackage("com.google.android.apps.maps");
startActivity(mapIntent);

```


---

## Notes

- java.util.IllegalFormatConversionException: %f can't format java.lang.String arguments exceptions
- Please post what you have replaced the first line of code with [the line that begins with String uri = string.format ]

Seems like you have a string as one of the parameters that should be a float
