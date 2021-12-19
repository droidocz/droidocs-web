---
metaTitle: How to hide underbar in EditText
tags:
- textview
title: How to hide underbar in EditText
---

## Problem

How can I hide the EditText underbar (the prompt line with little serifs at the ends)?


There might be a better way to do what I want: I have a layout with an EditText. Normally, this displays fine where the user can tap on it and begin entering or editing text.


Sometimes, however, I would like to use the same layout (simplifies other logic) to display the same data in a read-only manner. I want the presentation to be similar - it should have the same height and same font, but not have the underbar.


As a stop-gap measure, I'm going to implement this by removing the EditText and substituting a TextView. I think that will give the desired results, but it seems like a roundabout an expensive way to do something that ought to be easy to do by changing attributes.



---

## Solution

Here's a way to hide it, without ruining the default padding:



```
fun View.setViewBackgroundWithoutResettingPadding(background: Drawable?) {
    val paddingBottom = this.paddingBottom
    val paddingStart = ViewCompat.getPaddingStart(this)
    val paddingEnd = ViewCompat.getPaddingEnd(this)
    val paddingTop = this.paddingTop
    ViewCompat.setBackground(this, background)
    ViewCompat.setPaddingRelative(this, paddingStart, paddingTop, paddingEnd, paddingBottom)
}

```

usage:



```
editText.setViewBackgroundWithoutResettingPadding(null)

```



---


Update:


If you find yourself always passing null, you can codify that in the method (and then you might as well overload EditText itself)



```
fun EditText.removeUnderline() {
    val paddingBottom = this.paddingBottom
    val paddingStart = ViewCompat.getPaddingStart(this)
    val paddingEnd = ViewCompat.getPaddingEnd(this)
    val paddingTop = this.paddingTop
    ViewCompat.setBackground(this, null)
    ViewCompat.setPaddingRelative(this, paddingStart, paddingTop, paddingEnd, paddingBottom)
}

// usage:
editText.removeUnderline()

```


---

## Notes

- It can remove background without removing default padding.
