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

From android 4.1 / 4.2 / 5.0, the following [Roboto](https://material.google.com/resources/roboto-noto-fonts.html) font families are available:



```
android:fontFamily="sans-serif"           // roboto regular
android:fontFamily="sans-serif-light"     // roboto light
android:fontFamily="sans-serif-condensed" // roboto condensed
android:fontFamily="sans-serif-black"     // roboto black
android:fontFamily="sans-serif-thin"      // roboto thin (android 4.2)
android:fontFamily="sans-serif-medium"    // roboto medium (android 5.0)

```

[![enter image description here](https://i.stack.imgur.com/M2yxI.png)](https://i.stack.imgur.com/M2yxI.png)


in combination with



```
android:textStyle="normal|bold|italic"

```

this 16 variants are possible:


* Roboto regular
* Roboto italic
* Roboto bold
* Roboto bold italic
* Roboto-Light
* Roboto-Light italic
* Roboto-Thin
* Roboto-Thin italic
* Roboto-Condensed
* Roboto-Condensed italic
* Roboto-Condensed bold
* Roboto-Condensed bold italic
* Roboto-Black
* Roboto-Black italic
* Roboto-Medium
* Roboto-Medium italic


`fonts.xml`



```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="font_family_light">sans-serif-light</string>
    <string name="font_family_medium">sans-serif-medium</string>
    <string name="font_family_regular">sans-serif</string>
    <string name="font_family_condensed">sans-serif-condensed</string>
    <string name="font_family_black">sans-serif-black</string>
    <string name="font_family_thin">sans-serif-thin</string>
</resources>

```


---

## Notes:

- It would be nice if Google had this in their documentation in an easy to find place, say for the documentation of `android:fontFamily` on TextView.
- The definitive list of fonts can be found in [system_fonts.xml](https://android.googlesource.com/platform/frameworks/base/+/master/data/fonts/system_fonts.xml) as explained [here](http://stackoverflow.com/a/24072492/598094)
- I saw a variant called "black small caps" in the [roboto specimen book](http://commondatastorage.googleapis.com/androiddevelopers/design/Roboto_Specimen_Book_20111129.pdf), but I don't manage to use it. Using `android:fontFamily="sans-serif-black-small-caps"` doesnt work.
- i am not able to find any of these font-family what have you typed here .i am not able to find "sans-serif" together.
- This would be great information for, oh I don't know, how about **the `TextView` API Javadocs**. Apparently [this is the only official reference](http://developer.android.com/about/versions/android-4.1.html).
-  Best way is to look at the source: https://android.googlesource.com/platform/frameworks/base/+/lollipop-release/data/fonts/system_fonts.xml and https://android.googlesource.com/platform/frameworks/base/+/master/data/fonts/fonts.xml , which means you want to use "sans-serif-condensed-light"
- What if you use sans-serif-thin on Android 4.1?
- Where can I find in the documentation about the available font-families ?
- I cant find a way to make my app use Noto as default font family
- I have updated this answer with details of where the source of this information comes from and how to get a definitive list of `android:fontFamily` values, even vendor ones, from your devices.
- Is it accurate to say that ``fontFamily`` supercedes ``typeface``? Are we now no longer able to use serif or monospace? I don't think ``typeface`` is formally deprecated, just ignored when ``fontFamily`` is also present.
- How can I use roboto condensed light?
- To use Roboto API level 16 is required otherwise, you will get an error.
- So I guess the only font I can't get (without using the RobotoTextView library) is condensed light? right?
- You can check out this project, for checking font compatibility on TextViews and in WebViews on different platform versions
https://github.com/JeppeLeth/android_font_compat_tester
- Just a quick quesrtion, if I use android:fontFamily in versions prior to (&lt; 4.1) Jelly Bean, will it crash my app or just be ignored?
- there's a link for a full view of Roboto: https://fonts.google.com/specimen/Roboto
- List is also available here: http://androidxref.com/6.0.1_r10/xref/frameworks/base/data/fonts/system_fonts.xml
