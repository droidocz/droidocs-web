---
metaTitle: How to start new activity on button click
tags:
- android-intent
- android-button
- android-lifecycle
title: How to start new activity on button click
---

## Problem

In an Android application, how do you start a new activity (GUI) when a button in another activity is clicked, and how do you pass data between these two activities?



---

## Solution

When user clicks on the button, directly inside the XML like that: 



```
<Button
         android:id="@+id/button"
         android:layout_width="wrap_content"
         android:layout_height="wrap_content"
         android:text="TextButton"
         android:onClick="buttonClickFunction"/>

```

Using the attribute **`android:onClick`** we declare the method name that has to be present on the parent activity. So I have to create this method inside our activity like that:



```
public void buttonClickFunction(View v)
{
            Intent intent = new Intent(getApplicationContext(), Your_Next_Activity.class);
            startActivity(intent);
}

```
