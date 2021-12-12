---
metaTitle: 'Android: how to draw a border to a LinearLayout'
tags:
- draw
title: 'Android: how to draw a border to a LinearLayout'
---

## Context

I have three files. The XML, the draw function and the main Activity.
I have some `LinearLayout` in my XML file.



```
<LinearLayout android:orientation="horizontal"
              android:layout_width="fill_parent"
              android:layout_height="fill_parent"
              android:layout_weight="1">
    <LinearLayout android:layout_width="fill_parent"
                  android:layout_height="fill_parent"
                  android:layout_weight="1"
                  android:background="#ef3"
                  android:id="@+id/img01"/>
    <LinearLayout android:layout_width="fill_parent"
                  android:layout_height="fill_parent"
                  android:layout_weight="1"
                  android:background="#E8A2B4"
                  android:id="@+id/img02"/>
</LinearLayout>

```

This is the draw function:



```
public class getBorder extends TextView {
    public getBorder(Context context) {
        super(context);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Paint paint = new Paint();

        paint.setColor(android.graphics.Color.RED);

        canvas.drawLine(0, 0, this.getWidth() - 1, 0, paint);
        canvas.drawLine(0, 0, 0, this.getHeight() - 1, paint);
        canvas.drawLine(this.getWidth() - 1, 0, this.getWidth() - 1,
            this.getHeight() - 1, paint);
        canvas.drawLine(0, this.getHeight() - 1, this.getWidth() - 1,
            this.getHeight() - 1, paint);
    }
}

```

And this is the main Activity:



```
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);
    final getBorder getBorder = new getBorder(this);
    final LinearLayout img01 = (LinearLayout) findViewById(R.id.img01);
    img01.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            // TODO Auto-generated method stub
            getBorder.setWidth(100);
            getBorder.setHeight(100);
            img01.addView(getBorder);
        }
    });       
}

```

The program could draw border but the size doesn't fit the `LinearLayout`. And when I click the `LinearLayout` again, the program crashed.


Also, I want to draw two circles in the center of the `LinearLayout`, but how could I figure out the center coordinates?



---

Extend LinearLayout/RelativeLayout and use it straight on the XML



```
package com.pkg_name ;
...imports...
public class LinearLayoutOutlined extends LinearLayout {
    Paint paint;    

    public LinearLayoutOutlined(Context context) {
        super(context);
        // TODO Auto-generated constructor stub
        setWillNotDraw(false) ;
        paint = new Paint();
    }
    public LinearLayoutOutlined(Context context, AttributeSet attrs) {
        super(context, attrs);
        // TODO Auto-generated constructor stub
        setWillNotDraw(false) ;
        paint = new Paint();
    }
    @Override
    protected void onDraw(Canvas canvas) {
        /*
        Paint fillPaint = paint;
        fillPaint.setARGB(255, 0, 255, 0);
        fillPaint.setStyle(Paint.Style.FILL);
        canvas.drawPaint(fillPaint) ;
        */

        Paint strokePaint = paint;
        strokePaint.setARGB(255, 255, 0, 0);
        strokePaint.setStyle(Paint.Style.STROKE);
        strokePaint.setStrokeWidth(2);  
        Rect r = canvas.getClipBounds() ;
        Rect outline = new Rect( 1,1,r.right-1, r.bottom-1) ;
        canvas.drawRect(outline, strokePaint) ;
    }

}

```



---



```
<?xml version="1.0" encoding="utf-8"?>

<com.pkg_name.LinearLayoutOutlined
   xmlns:android="http://schemas.android.com/apk/res/android"
   android:orientation="vertical"
    android:layout_width=...
    android:layout_height=...
   >
   ... your widgets here ...

</com.pkg_name.LinearLayoutOutlined>

```


---

## Notes

- Please, don't allocate memory in `onDraw()` method, create your objects in an `init()` method, called by the constructor and reuse them in the `onDraw()` method. Allocating in `onDraw()` (called 60 times per second) leads to poor performance, battery drain, etc
