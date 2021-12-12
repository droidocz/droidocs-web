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

To show keyboard, for me, I had to do the following


[Android TextField : set focus + soft input programmatically](https://stackoverflow.com/questions/8080579/android-textfield-set-focus-soft-input-programmatically/29229865#29229865)


Essentially the solution is the following



```
@Override
public void onResume() {
    super.onResume();
    //passwordInput.requestFocus(); <-- that doesn't work
    passwordInput.postDelayed(new ShowKeyboard(), 325); //250 sometimes doesn't run if returning from LockScreen
}

```

Where `ShowKeyboard` is



```
private class ShowKeyboard implements Runnable {
    @Override
    public void run() {
        passwordInput.setFocusableInTouchMode(true);
        //passwordInput.requestFocusFromTouch(); //this gives touch event to launcher in background -_-
        passwordInput.requestFocus();
        getActivity().getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_VISIBLE);
        ((InputMethodManager) getActivity().getSystemService(Context.INPUT_METHOD_SERVICE)).showSoftInput(passwordInput, 0);
    }
}

```

After a successful input, I also make sure I hide the keyboard



```
getActivity().getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
((InputMethodManager) getActivity().getSystemService(Context.INPUT_METHOD_SERVICE))
                    .hideSoftInputFromWindow(getView().getWindowToken(), 0);

```
