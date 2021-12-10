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

Do you really need to do that programmatically?


Just considering the title: You could use a ShapeDrawable as android:background…


For example, let's define `res/drawable/my_custom_background.xml` as:



```
<shape xmlns:android="http://schemas.android.com/apk/res/android"
       android:shape="rectangle">
  <corners
      android:radius="2dp"
      android:topRightRadius="0dp"
      android:bottomRightRadius="0dp"
      android:bottomLeftRadius="0dp" />
  <stroke
      android:width="1dp"
      android:color="@android:color/white" />
</shape>

```

and define android:background="@drawable/my\_custom\_background".


I've not tested but it should work.


**Update:**


I think that's better to leverage the xml shape drawable resource power if that fits your needs. With a "from scratch" project (for android-8), define res/layout/main.xml



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/border"
    android:padding="10dip" >
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hello World, SOnich"
        />
    [... more TextView ...]
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Hello World, SOnich"
        />
</LinearLayout>

```

and a `res/drawable/border.xml`



```
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
       android:shape="rectangle">
   <stroke
        android:width="5dip"
        android:color="@android:color/white" />
</shape>

```

Reported to work on a gingerbread device. Note that you'll need to relate `android:padding` of the LinearLayout to the `android:width` shape/stroke's value. Please, do not use `@android:color/white` in your final application but rather a project defined color.


You could apply `android:background="@drawable/border" android:padding="10dip"` to each of the LinearLayout from your provided sample.


As for your other posts related to display some circles as LinearLayout's background, I'm playing with Inset/Scale/Layer drawable resources ([see Drawable Resources](http://developer.android.com/guide/topics/resources/drawable-resource.html) for further information) to get something working to display perfect circles in the background of a LinearLayout but failed at the moment…


Your problem resides clearly in the use of `getBorder.set{Width,Height}(100);`. Why do you do that in an onClick method?


I need further information to not miss the point: why do you do that programmatically? Do you need a dynamic behavior? Your input drawables are png or ShapeDrawable is acceptable? etc.


To be continued (maybe tomorrow and as soon as you provide more precisions on what you want to achieve)…



---

## Notes

- Not certain why it was the case, but when I used this on a `LinearLayout` I got a solid fill from the border color, unless I added the following child to the `shape` element: `<solid android:color=" />`
- For me it was the same I had to add a, `<solid android:color=" />` otherwise I got a black background
- This method perfectly works; however, it creates two layer "Overdraw" which is really bad for performance, even if you set the background to "null" or "transparent".
- http://stackoverflow.com/questions/8227948/android-how-to-implement-canvas-draws-into-a-exist-view-in-xml/8228572#8228572
-  It may be possible by retrieving the ShapeDrawable resource, getting the Paint (getPaint), then use setColor etc.
- what if i need to have padding and inside the padding add the border, instead of border and inside of it have the padding? do i really have to create a layout with padding, and then inside it a layout with the background (which also has padding but inside the drawable xml file)?
-  I want to do the same thing but in Xamarin.Android, so I have to convert the Java Code. Can you give me a simple but complete solution of your sample code (even in Java), so I can work on it, because I wasn't able to implement this code.
