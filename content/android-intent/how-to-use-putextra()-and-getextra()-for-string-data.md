---
metaTitle: How to use putExtra() and getExtra() for string data
title: How to use putExtra() and getExtra() for string data
---

Use this to "put" the file...



```
Intent i = new Intent(FirstScreen.this, SecondScreen.class);   
String strName = null;
i.putExtra("STRING_I_NEED", strName);

```

Then, to retrieve the value try something like:



```
String newString;
if (savedInstanceState == null) {
    Bundle extras = getIntent().getExtras();
    if(extras == null) {
        newString= null;
    } else {
        newString= extras.getString("STRING_I_NEED");
    }
} else {
    newString= (String) savedInstanceState.getSerializable("STRING_I_NEED");
}

```
