---
metaTitle: Move to another EditText when Soft Keyboard Next is clicked on Android
title: Move to another EditText when Soft Keyboard Next is clicked on Android
---

## Context

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

Focus Handling
--------------


Focus movement is based on an algorithm which finds the nearest
neighbor in a given direction. In rare cases, the default algorithm may not match the intended behavior of the developer. 


Change default behaviour of directional navigation by using following XML attributes:



```
android:nextFocusDown="@+id/.."  
android:nextFocusLeft="@+id/.."    
android:nextFocusRight="@+id/.."    
android:nextFocusUp="@+id/.."  

```

Besides directional navigation you can use tab navigation. For this you need to use



```
android:nextFocusForward="@+id/.."

```

To get a particular view to take focus, call 



```
view.requestFocus()

```

To listen to certain changing focus events use a [`View.OnFocusChangeListener`](http://developer.android.com/reference/android/view/View.OnFocusChangeListener.html)




---


Keyboard button
---------------


You can use [`android:imeOptions`](http://developer.android.com/reference/android/widget/TextView.html#attr_android:imeOptions) for handling that extra button on your keyboard.



> 
> Additional features you can enable in an IME associated with an editor
>  to improve the integration with your application. The constants here
>  correspond to those defined by imeOptions. 
> 
> 
> 


The constants of imeOptions includes a variety of actions and flags, see the link above for their values. 


**Value example**


[ActionNext](http://developer.android.com/reference/android/view/inputmethod/EditorInfo.html#IME_ACTION_NEXT) : 



> 
> the action key performs a "next" operation, taking the user to the
>  next field that will accept text.
> 
> 
> 


[ActionDone](http://developer.android.com/reference/android/view/inputmethod/EditorInfo.html#IME_MASK_ACTION) :



> 
> the action key performs a "done" operation, typically meaning there is nothing more to input and the IME will be closed.
> 
> 
> 


**Code example:**



```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity" >

    <EditText
        android:id="@+id/editText1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_alignParentTop="true"
        android:layout_marginLeft="32dp"
        android:layout_marginTop="16dp"
        android:imeOptions="actionNext"
        android:maxLines="1"
        android:ems="10" >

        <requestFocus />
    </EditText>

    <EditText
        android:id="@+id/editText2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignLeft="@+id/editText1"
        android:layout_below="@+id/editText1"
        android:layout_marginTop="24dp"
        android:imeOptions="actionDone"
        android:maxLines="1"
        android:ems="10" />

</RelativeLayout>

```

If you want to listen to imeoptions events use a [`TextView.OnEditorActionListener`](http://developer.android.com/reference/android/widget/TextView.OnEditorActionListener.html). 



```
editText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
    @Override
    public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        if (actionId == EditorInfo.IME_ACTION_SEARCH) {
            performSearch();
            return true;
        }
        return false;
    }
});

```



---



---

## Notes

- I put `android:imeOptions="actionNext"` to all my EditTexts and the problem is gone.
- In my case `android:nextFocusForward=" did the trick.
- For my app, just using android:imeOptions="actionNext" didn't work.
- Is there a function to get the next view's id to be focused, if the user would press the NEXT key ?
- If I wanted that functionality, I would set nextFocusDown attribute.
- You can set the next view id by, `android:nextFocusDown="
-  Yes, You can get the next view's id to be focused by `<editText1>.getNextFocusDownId();`
-  Even if the view is on the right, you need to set it as nextFocusDown in order to focus changed by pressing NEXT. So by manually changing nextFocusDown parameter, we can override that behavior.
- and, is there a function to get the next view's id to be focused, if the user would press the NEXT key ?
- i used same for next focus but issue with EditText with password inputType ,when i press next button from keyboard focus goes to passwordToggle(hide and show) eye  icon.
- I was using AutocompleteTextView, there it didn't work, later on I had to change field type to EditText to make it work.
-  What would happen if the other EditText doesn't have ID, or if it has an ID, but we just didn't set the attribute of "android:nextFocusDown" ?
- How to get the next view that will get the focus...
