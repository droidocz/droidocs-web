---
metaTitle: How do I handle ImeOptions' done button click
tags:
- ime
title: How do I handle ImeOptions' done button click
---

## Context

I am having an `EditText` where I am setting the following property so that I can display the done button on the keyboard when user click on the EditText.



```
editText.setImeOptions(EditorInfo.IME_ACTION_DONE);

```

When user clicks the done button on the screen keyboard (finished typing) I want to change a `RadioButton` state.


How can I track done button when it is hit from screen keyboard?


![Screenshot showing the bottom right 'done' button on the software keyboard](https://i.stack.imgur.com/Y1GCZ.png)



---

Try this, it should work for what you need: 




---



```
editText.setOnEditorActionListener(new EditText.OnEditorActionListener() {
    @Override
    public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
    if (actionId == EditorInfo.IME_ACTION_DONE) {
       //do here your stuff f
       return true;
    }
    return false;
    } 
});

```


---

## Notes

- As far as I've been able to understand, HTC implemented their own soft keyboard which ignores the imeOptions.
- just to be safe, make sure that action in the code and the view matches   ``<EditText android:imeOptions="actionDone" 
    android:inputType="text"/>``
- This suffices (no need to look at event action or key code, as in accepted answer); works on my Nexus and Samsung test devices.
