---
metaTitle: 'Android: How can I validate EditText input'
title: 'Android: How can I validate EditText input'
---

Why don't you use `TextWatcher` ?


Since you have a number of `EditText` boxes to be validated, I think the following shall suit you :


1. Your activity implements `android.text.TextWatcher` interface
2. You add TextChanged listeners to you EditText boxes



```
txt1.addTextChangedListener(this);
txt2.addTextChangedListener(this);
txt3.addTextChangedListener(this);

```

3. Of the overridden methods, you could use the `afterTextChanged(Editable s)` method as follows



```
@Override
public void afterTextChanged(Editable s) {
    // validation code goes here
}

```

The `Editable s` doesn't really help to find which EditText box's text is being changed. But you could directly check the contents of the EditText boxes like



```
String txt1String = txt1.getText().toString();
// Validate txt1String

```

in the same method. I hope I'm clear and if I am, it helps! :)


**EDIT:** For a cleaner approach refer to [Christopher Perry's answer](https://stackoverflow.com/a/11838715/154325) below.

