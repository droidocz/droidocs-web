---
metaTitle: How to get text on an ActionBar Icon
tags:
- actionbarsherlock
title: How to get text on an ActionBar Icon
---

## Context

I want something like this:


![enter image description here](https://i.stack.imgur.com/Bb8tW.png)


The 3rd icon is for notifications and it is just a png image now. Is it possible to do something, so that i can change the text/number ie.., 03 programatically to show the actual no.of notifications.


Thank You



---

One option is to create your own action view for this. Use `android:actionLayout` in the XML and `getActionView()` in Java after inflation to manipulate it. Your action view would be an `ImageView` (for the icon) and... something for the badge. I suspect that you will find that trying to make that badge via text will be difficult, and that you are better served with a bunch of badge images, one of which you layer on top of the icon (e.g., via `RelativeLayout` or `FrameLayout`, or by wrapping the icon in a `LayerListDrawable`).


Another option is simply to have N versions of the icon+badge, perhaps wrapped in a `LevelListDrawable`, that you choose from at runtime.



---

## Notes

-  "But actionLayout i what i see once i click on the MenuItem" -- no, the `actionLayout` is used immediately, instead of an "initial icon".
- Why are both **icon** and **actionLayout** set to the add menu item.
- Right now the default it give a Text **NOTIFICATIONS**
-  Im using support lib 7 for the ActionBar. Whats an alternative for .getActionView(); for such case
- Can we set animation when we call setNotificationCount nmethod to add count ?
- See https://github.com/commonsguy/cw-omnibus/tree/master/ActionBar/ActionBarDemo
- But it shows title of the MenuItem initially and when clicked then only it gives the **actionLayout** i set :(
