---
metaTitle: How to hide underbar in EditText
tags:
- textview
title: How to hide underbar in EditText
---

## Context

How can I hide the EditText underbar (the prompt line with little serifs at the ends)?


There might be a better way to do what I want: I have a layout with an EditText. Normally, this displays fine where the user can tap on it and begin entering or editing text.


Sometimes, however, I would like to use the same layout (simplifies other logic) to display the same data in a read-only manner. I want the presentation to be similar - it should have the same height and same font, but not have the underbar.


As a stop-gap measure, I'm going to implement this by removing the EditText and substituting a TextView. I think that will give the desired results, but it seems like a roundabout an expensive way to do something that ought to be easy to do by changing attributes.



---

You can set the `EditText` to have a custom transparent drawable or just use 



```
android:background="@android:color/transparent"

```

or



```
android:background="@null"

```

or Programmatically



```
editText.setBackgroundResource(android.R.color.transparent);

```


---

## Notes:

- use this  : `android:background="
- In Android 19, using `android:background=" causes the same loss of margins issue... Is there an example anywhere of somebody creating such a custom drawable?
- Start with the 9-patch that is used for normal EditText fields.
- what if I am already having background of other color, lets say gray, how to remove underbar / underline in that case?
- What is the default background, if we want to return it to default?
- The syntax for this has been changed. To do it programmatically: myedittext.setBackgroundResource(R.color.fui_transparent);. I used to set the Visibility to false to nix the underbar and send a performclick message if the user clicked my custom textbox, but this has been more reliable.
