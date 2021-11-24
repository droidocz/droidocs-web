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

