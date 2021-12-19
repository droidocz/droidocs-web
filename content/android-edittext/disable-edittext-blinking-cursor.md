---
metaTitle: Disable EditText blinking cursor
title: Disable EditText blinking cursor
---

## Problem

Does anyone know how to disable the blinking cursor in an `EditText` view?



---

## Solution

You can use either the xml attribute `android:cursorVisible="false"` or programatically:


* java: `view.setCursorVisible(false)`
* kotlin: `view.isCursorVisible = false`


---

## Notes

-  is there a way to hide the blue marker so I can disable the paste, but keep the cursor visible so the user will see where is he in the field?
