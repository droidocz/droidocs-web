---
metaTitle: 'Android: ListView elements with multiple clickable buttons'
tags:
- button
title: 'Android: ListView elements with multiple clickable buttons'
---

The solution to this is actually easier than I thought. You can simply add in your custom adapter's `getView()` method a setOnClickListener() for the buttons you're using.


Any data associated with the button has to be added with `myButton.setTag()` in the `getView()` and can be accessed in the onClickListener via `view.getTag()`


I posted a detailed solution on [my blog](http://www.geekmind.net/2009/11/android-custom-list-item-with-nested.html) as a tutorial.

