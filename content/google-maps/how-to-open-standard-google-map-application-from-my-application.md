---
metaTitle: How to open standard Google Map application from my application
title: How to open standard Google Map application from my application
---

You should create an `Intent` object with a geo-URI:



```
String uri = String.format(Locale.ENGLISH, "geo:%f,%f", latitude, longitude);
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
context.startActivity(intent);

```

If you want to specify an address, you should use another form of geo-URI: `geo:0,0?q=address`.


reference : <https://developer.android.com/guide/components/intents-common.html#Maps>

