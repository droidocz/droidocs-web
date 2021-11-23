---
metaTitle: 'Android: show soft keyboard automatically when focus is on an EditText'
tags:
- keyboard
- soft-keyboard
title: 'Android: show soft keyboard automatically when focus is on an EditText'
---

You can create a focus listener on the `EditText` on the `AlertDialog`, then get the `AlertDialog`'s `Window`. From there you can make the soft keyboard show by calling `setSoftInputMode`.



```
final AlertDialog dialog = ...;

editText.setOnFocusChangeListener(new View.OnFocusChangeListener() {
    @Override
    public void onFocusChange(View v, boolean hasFocus) {
        if (hasFocus) {
            dialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE);
        }
    }
});

```
