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

I ended up with a combination of Roberts and chirags answers:



```
((EditText)findViewById(R.id.search_field)).setOnEditorActionListener(
        new EditText.OnEditorActionListener() {
    @Override
    public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        // Identifier of the action. This will be either the identifier you supplied,
        // or EditorInfo.IME_NULL if being called due to the enter key being pressed.
        if (actionId == EditorInfo.IME_ACTION_SEARCH
                || actionId == EditorInfo.IME_ACTION_DONE
                || event.getAction() == KeyEvent.ACTION_DOWN
                && event.getKeyCode() == KeyEvent.KEYCODE_ENTER) {
            onSearchAction(v);
            return true;
        }
        // Return true if you have consumed the action, else false.
        return false;
    }
});

```

**Update:**
The above code would some times activate the callback twice. Instead I've opted for the following code, which I got from the Google chat clients:



```
public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
    // If triggered by an enter key, this is the event; otherwise, this is null.
    if (event != null) {
        // if shift key is down, then we want to insert the '\n' char in the TextView;
        // otherwise, the default action is to send the message.
        if (!event.isShiftPressed()) {
            if (isPreparedForSending()) {
                confirmSendMessageIfNeeded();
            }
            return true;
        }
        return false;
    }

    if (isPreparedForSending()) {
        confirmSendMessageIfNeeded();
    }
    return true;
}

```


---

## Notes

- After I also looked for ACTION_DOWN and KEYCODE_ENTER it finally triggered onEditorAction(). Since I see no difference in the built-in keyboard (I expected the Enter key to be highlighted) I wonder what the point is of using android:imeOptions="actionSend" for the EditText XML layout.
- What is `isPreparedForSending()` and why the second method returns `true`?
- http://developer.android.com/reference/android/widget/TextView.OnEditorActionListener.html (Description of what an 'event' is affirms same.)
-  It is probably a function to check against invalid strings before sending. IE, is the text in the EditText null / empty. Just a guess, but it makes logical sense.
- But this can't work as multiline textView!,In this U can't create the multiline TextView witch using in chat..
