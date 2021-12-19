---
metaTitle: How can I open a URL in Android's web browser from my application
tags:
- url
- android-browser
title: How can I open a URL in Android's web browser from my application
---

## Problem

How to open an URL from code in the built-in web browser rather than within my application?


I tried this: 



```
try {
    Intent myIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(download_link));
    startActivity(myIntent);
} catch (ActivityNotFoundException e) {
    Toast.makeText(this, "No application can handle this request."
        + " Please install a webbrowser",  Toast.LENGTH_LONG).show();
    e.printStackTrace();
}

```

but I got an Exception:



```
No activity found to handle Intent{action=android.intent.action.VIEW data =www.google.com

```


---

## Solution

### a common way to achieve this is with the next code:



```
String url = "http://www.stackoverflow.com";
Intent i = new Intent(Intent.ACTION_VIEW);
i.setData(Uri.parse(url)); 
startActivity(i); 

```

### that could be changed to a short code version ...



```
Intent intent = new Intent(Intent.ACTION_VIEW).setData(Uri.parse("http://www.stackoverflow.com"));      
startActivity(intent); 

```

### or :



```
Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.stackoverflow.com")); 
startActivity(intent);

```

### the shortest! :



```
startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("http://www.stackoverflow.com")));

```

happy coding!

