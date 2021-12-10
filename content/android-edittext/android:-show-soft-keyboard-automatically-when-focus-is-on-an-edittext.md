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


---

## Notes

- **I RETRACT MY COMMENT ABOVE** I found out that if you can't get the focus right, take a look at your XML! If you see the tag *&lt;requestFocus&gt;&lt;/requestFocus&gt;* in there - remove it.
- I really don't understand why this is not the default behavior in the SDK.
-  you can get the dialog from the builder by using `final AlertDialog dialog = builder.create()` and then `show`on the dialog instead of the builder.
- How would I do it using the AlertDialog.Builder?
- My dialog contains a ListView and I add this listener from its Adapter.
- I find that if I have a dialog which extends AlertDialog and I try to show the dialog using `dialog.show()` after constructing the dialog object using the constructor. However, if I switch to using `AlertDialog.Builder()` and attach my view to it using `Builder.setView()` all the EditText's in my dialog automatically show the soft keyboard when needed.
- For example, if you create a EditText in code and add that to the builder using setView, and then, after builder.create(), use your code above it works fine. **However, if I inflate a custom layout (that has a EditText), and add that to the builder using setView, and then try to attach the setOnFocusChangeListener to the EditText in my layout (after retrieving the EditText with findViewById), it won't work.
- "MyAlertDialog.getWindow()." doesn't have "setSoftInputMode" function!
