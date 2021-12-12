---
metaTitle: Changing background color of ListView items on Android
tags:
- colors
title: Changing background color of ListView items on Android
---

## Context

How can I change background color of `ListView` items on a per-item basis. When I use `android:backgroundColor` in the `ListView` item layout I can achieve this, however the list selector is no longer visible. I can make the selector visible again by setting `drawSelectorOnTop` to true but then the selector overlays the whole item.


Any ideas how to change those background colors and keep the selector?


PS I would rather not change the selector itself.


EDIT: Authors of GMail application have managed to achieve exactly this so it's definitely possible.



---

Take a look at [List14 example](http://developer.android.com/resources/samples/ApiDemos/src/com/example/android/apis/view/List14.html). In `getView()` you can call `convertView.setBackgroundDrawable()` for each entry. You could have a class member counter to decide which background to call it with to get alternating backgrounds, for example.



---

## Notes

- Change your `android:drawSelectorOnTop` to be `false`.
- Setting BackgroundDrawable has the same effect as setting BackgroundColor - the selector is drawn first so it's hidden.
