---
metaTitle: 'Android: show soft keyboard automatically when focus is on an EditText'
tags:
- keyboard
- soft-keyboard
title: 'Android: show soft keyboard automatically when focus is on an EditText'
---

## Context

I'm showing an input box using `AlertDialog`. The `EditText` inside the dialog itself is automatically focused when I call `AlertDialog.show()`, but the soft keyboard is not automatically shown.


How do I make the soft keyboard automatically show when the dialog is shown? (and there is no physical/hardware keyboard). Similar to how when I press the Search button to invoke the global search, the soft keyboard is automatically shown.



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
