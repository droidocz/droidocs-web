---
metaTitle: How to use the TextWatcher class in Android
tags:
- textwatcher
title: How to use the TextWatcher class in Android
---

## Problem

Can anyone tell me how to mask the **substring** in `EditText` or how to change `EditText` **substring input to password type** or **replace** by another **character** like this 123xxxxxxxxx3455



```
 String contents = et1.getText().toString();
 et1.setText(contents.replace.substring(0, contents.length()-2),"*");

```

Please, tell me how I can use the `TextWatcher` method in Android.



---

## Solution

Supplemental answer
===================


Here is a visual supplement to the other answers. My fuller answer with the code and explanations is [here](https://stackoverflow.com/a/47263021/3681880).


* Red: text about to be deleted (replaced)
* Green: text that was just added (replacing the old red text)


[![enter image description here](https://i.stack.imgur.com/yhv4A.gif)](https://i.stack.imgur.com/yhv4A.gif)

