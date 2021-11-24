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
