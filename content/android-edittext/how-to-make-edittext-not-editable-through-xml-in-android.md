---
metaTitle: How to make EditText not editable through XML in Android
title: How to make EditText not editable through XML in Android
---

## Context

Can anyone tell me how to make an `EditText` not editable via XML? I tried setting `android:editable` to `false`, but


1. it is deprecated; and
2. it didn't work.


---

Add this to your EditText xml file:



```
<EditText ...
        android:clickable="false" 
        android:cursorVisible="false" 
        android:focusable="false" 
        android:focusableInTouchMode="false">
</EditText>

```

It will do the same effect as `android:editable="false"`. Worked for me, hope it'll work for you too.



---

## Notes

- The difference is It can be used with `TextInputLayout`
- If you want to do it in the XML ... what will be the difference between it and TextView ??
- notes.setKeyListener(null);
notes.setClickable(false);
notes.setCursorVisible(false);
notes.setFocusable(false);
notes.setFocusableInTouchMode(false);
- That does NOT has the same effect as setting editable to false, with the last you can still click on the control and select and copy its contents.
- It might work, but it won't do the same effect as `editable="false"`. This setting doesn't disable focus or clickability. If I try to set listeners for when the EditText is focused/clicked, but I don't want to allow the user to manually edit it?
- It's still has flaw, confirmed on device Redmi, by repeating tap, can still show up select-copy-paste mini-dialog. Add `enabled=false` to resolve it.
- There is not a better way?, Why change 1 line to 4. Because in older version the xml annotation `android:editable = false` did it.
- I just removed `android:clickable="false"` from your solution to do the editing on another fragment/acitivity.
