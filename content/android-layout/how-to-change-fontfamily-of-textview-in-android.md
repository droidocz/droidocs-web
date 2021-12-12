---
metaTitle: How to change fontFamily of TextView in Android
tags:
- textview
- typeface
title: How to change fontFamily of TextView in Android
---

## Context

So I'd like to change the `android:fontFamily` in Android but I don't see any pre-defined fonts in Android. How do I select one of the pre-defined ones? I don't really need to define my own TypeFace but all I need is something different from what it shows right now.



```
<TextView
    android:id="@+id/HeaderText"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_alignParentTop="true"
    android:layout_centerHorizontal="true"
    android:layout_marginTop="52dp"
    android:gravity="center"
    android:text="CallerBlocker"
    android:textSize="40dp"
    android:fontFamily="Arial"
 />

```

It seems what I did up there won't really work! BTW `android:fontFamily="Arial"` was a stupid attempt!



---

This is the way to set the font programmatically:



```
TextView tv = (TextView) findViewById(R.id.appname);
Typeface face = Typeface.createFromAsset(getAssets(),
            "fonts/epimodem.ttf");
tv.setTypeface(face);

```

put the font file in your assets folder. In my case I created a subdirectory called fonts.


**EDIT:** If you wonder where is your assets folder see [this question](https://stackoverflow.com/questions/18302603/where-to-place-assets-folder-in-android-studio)



---

## Notes

- While this does work, please note that [this can create a memory leak](https://code.google.com/p/android/issues/detail?id=9904). It can be fixed using [this answer](https://stackoverflow.com/a/16902532/823952).
-  i get this error when i use your solution. Error : Font asset not found gothic.ttf
- Right now in example you are applying it only on on textview
