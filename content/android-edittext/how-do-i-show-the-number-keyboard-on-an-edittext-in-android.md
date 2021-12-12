---
metaTitle: How do I show the number keyboard on an EditText in android
tags:
- keyboard
title: How do I show the number keyboard on an EditText in android
---

## Context

I just basically want to switch to the number pad mode as soon a certain EditText has the focus.



---

You can configure an [`inputType`](http://developer.android.com/reference/android/R.styleable.html#Searchable_inputType) for your [`EditText`](http://developer.android.com/reference/android/widget/EditText.html):



```
<EditText android:inputType="number" ... />
```


---

## Notes

- Also note that you need to target Android 1.5 to use this (it's not available in 1.1)
- Using "number|text" does not work either. It seems if you want to show a numeric keyboard, you can't allow it switch back to text.
- Whether you can go back or not depends on the phone I think.
- I want to change keybord type number and I want paste text in edittext.
