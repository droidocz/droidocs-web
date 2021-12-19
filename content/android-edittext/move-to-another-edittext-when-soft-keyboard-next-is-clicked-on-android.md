---
metaTitle: Move to another EditText when Soft Keyboard Next is clicked on Android
title: Move to another EditText when Soft Keyboard Next is clicked on Android
---

## Problem

When I press the 'Next', the focus on the User EditText must be move to the Password. Then, from Password, it must move to the right and so on. Can you help me on how to code it?


![enter image description here](https://i.stack.imgur.com/8hEHF.png)



```
<LinearLayout
    android:id="@+id/LinearLayout01"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="horizontal" >

    <TextView
        android:id="@+id/username"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="User Name*" />

    <EditText
        android:id="@+id/txt_User"
        android:layout_width="290dp"
        android:layout_height="33dp"
        android:singleLine="true" />

</LinearLayout>


<LinearLayout
    android:id="@+id/LinearLayout02"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:orientation="horizontal" >

    <TextView
        android:id="@+id/password"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Password*" />

    <EditText
        android:id="@+id/txt_Password"
        android:layout_width="290dp"
        android:layout_height="33dp"
        android:singleLine="true"
        android:password="true" />

    <TextView
        android:id="@+id/confirm"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Password*" />

    <EditText
        android:id="@+id/txt_Confirm"
        android:layout_width="290dp"
        android:layout_height="33dp"
        android:singleLine="true"
        android:password="true" />

</LinearLayout>

```


---

## Solution


```
android:inputType="text"

```

should bring the same effect. After hiting next to bring the focus to the next element.



```
android:nextFocusDown="@+id/.."

```

use this in **addition** if you dont want the next view to get the focus 

