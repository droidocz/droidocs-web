---
metaTitle: 'Android: How can I validate EditText input'
title: 'Android: How can I validate EditText input'
---

## Problem

I need to do form input validation on a series of EditTexts. I'm using OnFocusChangeListeners to trigger the validation after the user types into each one, but this doesn't behave as desired for the last EditText.


If I click on the "Done" button while typing into the final EditText then the InputMethod is disconnected, but technically focus is never lost on the EditText (and so validation never occurs).


What's the best solution?


Should I be monitoring when the InputMethod unbinds from each EditText rather than when focus changes? If so, how?



---

## Solution

Updated approach - TextInputLayout:
-----------------------------------


Google has recently launched design support library and there is one component called [**TextInputLayout**](https://developer.android.com/reference/android/support/design/widget/TextInputLayout.html) and it supports showing an error via `setErrorEnabled(boolean)` and `setError(CharSequence)`.


**How to use it?**


Step 1: Wrap your EditText with TextInputLayout:



```
  <android.support.design.widget.TextInputLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:id="@+id/layoutUserName">

    <EditText
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:hint="hint"
      android:id="@+id/editText1" />

  </android.support.design.widget.TextInputLayout>

```

Step 2: Validate input



```
// validating input on a button click
public void btnValidateInputClick(View view) {

    final TextInputLayout layoutUserName = (TextInputLayout) findViewById(R.id.layoutUserName);
    String strUsername = layoutLastName.getEditText().getText().toString();

    if(!TextUtils.isEmpty(strLastName)) {
        Snackbar.make(view, strUsername, Snackbar.LENGTH_SHORT).show();
        layoutUserName.setErrorEnabled(false);
    } else {
        layoutUserName.setError("Input required");
        layoutUserName.setErrorEnabled(true);
    }
}

```

I have created an example over my [Github repository](https://github.com/PareshMayani/DesignSupportLibraryExamples/tree/master/TextInputLayoutDemo), checkout the example if you wish to!



---

## Notes

- Best answer, but I had to use `com.google.android.material.textfield.TextInputLayout` (notice the **material** change). Got it from this answer: https://stackoverflow.com/a/56753953/900394
