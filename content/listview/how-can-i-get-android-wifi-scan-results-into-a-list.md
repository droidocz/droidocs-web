---
metaTitle: How can I get Android Wifi Scan Results into a list
tags:
- java
- android-wifi
title: How can I get Android Wifi Scan Results into a list
---

## Problem

I know how to get a `<List>` of Android Wifi Scans but I can not figure out the best way to make a list adapter out of them. I would like to just bind SSID and BSSID from a `<List>` of scans to text1 and text2.


Samples of what I have been doing 



```
wifi.startScan();
        // get list of the results in object format ( like an array )
        List<ScanResult> results = wifi.getScanResults();`

        // loop that goes through list
        for (ScanResult result : results) {
            Toast.makeText(this, result.SSID + " " + result.level,
                    Toast.LENGTH_SHORT).show();

```

And:



```
private void fillDataFromDb() {
        Cursor scanCursor = Db.fetchAllScans();
        startManagingCursor(scanCursor);`

        // Create an array to specify the fields we want to display in the list
        // (only TITLE)
        String[] from = new String[] { WifiDbAdapter.KEY_BSSID,
                WifiDbAdapter.KEY_SSID };

        // and an array of the fields we want to bind those fields to (in this
        // case just text1)
        int[] to = new int[] { R.id.text1, R.id.text2 };

        // Now create a simple cursor adapter and set it to display
        SimpleCursorAdapter scansdb = new SimpleCursorAdapter(this,
                R.layout.scan_row, scanCursor, from, to);
        setListAdapter(scansdb);
    }

```


---

## Solution

Wrap an `ArrayAdapter` around your `List<ScanResult>`. Override `getView()` to populate your rows with the `ScanResult` data. [Here is a free excerpt](http://commonsware.com/Android/excerpt.pdf) from one of my books that covers how to create custom `ArrayAdapters` like this.

