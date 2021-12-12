---
metaTitle: Passing data through intent using Serializable
tags:
- java
title: Passing data through intent using Serializable
---

## Context

I've implemented my class with serializable, but it still didn't work.


This is my class:



```
package com.ursabyte.thumbnail;

import java.io.Serializable;

import android.graphics.Bitmap;

public class Thumbnail implements Serializable {

    private static final long serialVersionUID = 1L;
    private String label = "";
    private Bitmap bitmap;

    public Thumbnail(String label, Bitmap bitmap) {
        this.label = label;
        this.bitmap = bitmap;
    }

    public void set_label(String label) {
        this.label = label;
    }

    public String get_label() {
        return this.label;
    }

    public void set_bitmap(Bitmap bitmap) {
        this.bitmap = bitmap;
    }

    public Bitmap get_bitmap(){
        return this.bitmap;
    }

    //  @Override
    //  public int compareTo(Thumbnail other) {
    //      if(this.label != null)
    //          return this.label.compareTo(other.get_label());
    //      else
    //          throw new IllegalArgumentException();
    //  }

}

```

This is what I want to be passing.



```
List<Thumbnail> all_thumbs = new ArrayList<Thumbnail>();
all_thumbs.add(new Thumbnail(string, bitmap));
Intent intent = new Intent(getApplicationContext(), SomeClass.class);
intent.putExtra("value", all_thumbs);

```

But still it didn't work. I don't know how to use Parcelable, so I use this instead.



---

Try to pass the serializable list using [Bundle.Serializable](http://developer.android.com/reference/android/os/Bundle.html#putSerializable%28java.lang.String,%20java.io.Serializable%29):



```
Bundle bundle = new Bundle();
bundle.putSerializable("value", all_thumbs);
intent.putExtras(bundle);

```

And in SomeClass Activity get it as:



```
Intent intent = this.getIntent();
Bundle bundle = intent.getExtras();

List<Thumbnail> thumbs=
               (List<Thumbnail>)bundle.getSerializable("value");

```


---

## Notes

- I got this error : java.lang.RuntimeException: Parcelable encountered IOException writing serializable object (name = com.ursabyte.thumbnail.Thumbnail)
-  : yes i got it then Change Bitmap to image url and convert relevant image in next class instead of passing more bitmaps to other Activity
- The problem is Bitmap class doesn't implement Serializabe like  said :)
- Actually I convert it into byte array.
- As I understood the following line of your code needs to be changed to: bundle.putSerializable("value", all_thumbs.get(index));
