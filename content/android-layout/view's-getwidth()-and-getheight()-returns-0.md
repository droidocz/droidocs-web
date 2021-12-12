---
metaTitle: View's getWidth() and getHeight() returns 0
tags:
- java
- getter
title: View's getWidth() and getHeight() returns 0
---

## Context

I am creating all of the elements in my android project dynamically. I am trying to get the width and height of a button so that I can rotate that button around. I am just trying to learn how to work with the android language. However, it returns 0. 


I did some research and I saw that it needs to be done somewhere other than in the `onCreate()` method. If someone can give me an example of how to do it, that would be great. 


Here is my current code:



```
package com.animation;

import android.app.Activity;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.RotateAnimation;
import android.widget.Button;
import android.widget.LinearLayout;

public class AnimateScreen extends Activity {


//Called when the activity is first created.
@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    LinearLayout ll = new LinearLayout(this);

    LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
    layoutParams.setMargins(30, 20, 30, 0);

    Button bt = new Button(this);
    bt.setText(String.valueOf(bt.getWidth()));

    RotateAnimation ra = new RotateAnimation(0,360,bt.getWidth() / 2,bt.getHeight() / 2);
    ra.setDuration(3000L);
    ra.setRepeatMode(Animation.RESTART);
    ra.setRepeatCount(Animation.INFINITE);
    ra.setInterpolator(new LinearInterpolator());

    bt.startAnimation(ra);

    ll.addView(bt,layoutParams);

    setContentView(ll);
}

```

Any help is appreciated.



---

As Ian states in [this Android Developers thread](http://groups.google.com/group/android-developers/browse_thread/thread/a53372e1c468ef01?pli=1):



> 
> Anyhow, the deal is that layout of the
>  contents of a window happens
>  *after* all the elements are constructed and added to their parent
>  views. It has to be this way, because
>  until you know what components a View
>  contains, and what they contain, and
>  so on, there's no sensible way you can
>  lay it out.
> 
> 
> Bottom line, if you call getWidth()
>  etc. in a constructor, it will return
>  zero. The procedure is to create all
>  your view elements in the constructor,
>  then wait for your View's
>  onSizeChanged() method to be called --
>  that's when you first find out your
>  real size, so that's when you set up
>  the sizes of your GUI elements.
> 
> 
> Be aware too that onSizeChanged() is
>  sometimes called with parameters of
>  zero -- check for this case, and
>  return immediately (so you don't get a
>  divide by zero when calculating your
>  layout, etc.). Some time later it
>  will be called with the real values.
> 
> 
> 



---

## Notes

- onWindowFocusedChanged doesn't get called in my custom view.
- this looks a good solution, but what should i always create my custom view to override onSizeChanged method?
- `Bottom line, if you call getWidth() etc. in a constructor, it will return zero.` that's a bingo.
