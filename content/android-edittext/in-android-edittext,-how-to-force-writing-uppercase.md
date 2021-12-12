---
metaTitle: In Android EditText, how to force writing uppercase
tags:
- uppercase
title: In Android EditText, how to force writing uppercase
---

## Context

In my Android application I have different `EditText` where the user can enter information. But I need to force user to write in uppercase letters.
Do you know a function to do that?



---

Android actually has a [built-in InputFilter just for this](http://developer.android.com/reference/android/text/InputFilter.AllCaps.html)!



```
edittext.setFilters(new InputFilter[] {new InputFilter.AllCaps()});

```

Be careful, `setFilters` **will reset all other attributes** which were set via XML (i.e. `maxLines`, `inputType`,`imeOptinos`...). To prevent this, add you Filter(s) to the already existing ones.



```
InputFilter[] editFilters = <EditText>.getFilters();
InputFilter[] newFilters = new InputFilter[editFilters.length + 1];
System.arraycopy(editFilters, 0, newFilters, 0, editFilters.length);
newFilters[editFilters.length] = <YOUR_FILTER>;  
<EditText>.setFilters(newFilters);

```


---

## Notes

- Or in Kotlin just `editText.filters = editText.filters + InputFilter.AllCaps()`
- Better yet: `editText.filters += InputFilter.AllCaps()`
Kotlin's wonderful!
- `maxLength`), try to append the `InputFilter.AllCaps()` to `editText.getFilters` array. See http://stackoverflow.com/a/18934659/3890983
- The code should be `edittext.setFilters(new InputFilter[] {new InputFilter.AllCaps()});` though.
- And set EditText xml property to: `android:inputType="text|textCapCharacters"`
- this should be the answer and  is right it should be `edittext.setFilters(new InputFilter[] {new InputFilter.AllCaps()});`
-  see http://android--code.blogspot.com/2015/08/android-edittext-all-caps.html.
- It works 
