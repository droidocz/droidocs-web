---
metaTitle: Disable soft keyboard on NumberPicker
tags:
- android-layout
- android-widget
- android-softkeyboard
title: Disable soft keyboard on NumberPicker
---

## Context

I'm trying to deactivate the soft keyboard when using a NumberPicker to enter numerical values (for aesthetic reasons). This is my layout-xml-code:



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical" >

    <LinearLayout
        android:id="@+id/linearLayout2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:layout_marginBottom="30dp"
        android:layout_marginTop="30dp" >

        <NumberPicker
            android:id="@+id/repetitionPicker"
            android:layout_width="40dp"
            android:layout_height="wrap_content" />

        <TextView
            android:id="@+id/textView1"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:text="@string/repetitions_short_divider"
            android:textAppearance="?android:attr/textAppearanceMedium" />

        <NumberPicker
            android:id="@+id/weightPicker"
            android:layout_width="40dp"
            android:layout_height="wrap_content"
            android:layout_marginLeft="40dp" />

        <TextView
            android:id="@+id/textView2"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_vertical"
            android:text="@string/pounds"
            android:textAppearance="?android:attr/textAppearanceMedium" />
    </LinearLayout>


    <Button
        android:id="@+id/saveButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center_horizontal"
        android:text="@string/save" />

</LinearLayout>

```

And finally this is the code where I try to block the keyboard in the onCreate()-method:



```
// hide keyboard
View.OnClickListener disableKeyBoardListener = new View.OnClickListener() {
    public void onClick(View v) {
        ((InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE))
                .hideSoftInputFromWindow(v.getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
    }
};

((EditText) weightPicker.getChildAt(1)).setInputType(InputType.TYPE_NULL);
((EditText) repetitionPicker.getChildAt(1)).setInputType(InputType.TYPE_NULL);

((EditText) weightPicker.getChildAt(1)).setOnClickListener(disableKeyBoardListener);
//((EditText) repetitionPicker.getChildAt(1)).setOnClickListener(disableKeyBoardListener);
//weightPicker.setOnClickListener(disableKeyBoardListener);
//repetitionPicker.setOnClickListener(disableKeyBoardListener);     

getWindow().setSoftInputMode(
        WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN); 

```

Sadly, the soft keyboard still shows up when clicking on a NumberPicker. Any ideas?



---

Just found this and it works like a charm:


`myNumberPicker.setDescendantFocusability(NumberPicker.FOCUS_BLOCK_DESCENDANTS);`


You can also set this in XML:



```
android:descendantFocusability="blocksDescendants" 

```


---

## Notes

- Unless I'm missing something, this removes the ability to type in a value for the NumberPicker. It's not necessarily a bad thing, depending on how you are using the picker, but it does appear to be a limitation of the solution.
- Only the programmatic version worked for me with androidx 1.2.0-rc2, and I combined it with `isClickable=true` and `isFocusable=true` (Kotlin)
