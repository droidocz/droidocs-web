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

You are calling `getWidth()` too early. The UI has not been sized and laid out on the screen yet.


I doubt you want to be doing what you are doing, anyway -- widgets being animated do not change their clickable areas, and so the button will still respond to clicks in the original orientation regardless of how it has rotated.


That being said, you can use a [dimension resource](http://developer.android.com/guide/topics/resources/more-resources.html#Dimension) to define the button size, then reference that dimension resource from your layout file and your source code, to avoid this problem.



---

## Notes:

- * if you want negreenwood6 to be notified of your follow up, you have to start your message like I did to you (I think first three letters is enough) - CommonsWare gets notified automatically, since he wrote this response, but ngreen doesn't unless you address them.

- public void onWindowFocusChanged(boolean hasFocus) {
 // TODO Auto-generated method stub
 super.onWindowFocusChanged(hasFocus);
 //Here you can get the size!
 }


- Use this listener to get size, when is your screen ready. view.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {}


