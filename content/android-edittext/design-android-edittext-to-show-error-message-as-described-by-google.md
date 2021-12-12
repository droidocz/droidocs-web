---
metaTitle: Design Android EditText to show error message as described by google
title: Design Android EditText to show error message as described by google
---

## Context

I need an `EditText` that looks like this onError: 


![enter image description here](https://i.stack.imgur.com/ymSDq.png) 


calling onError looks like this instead : 


![enter image description here](https://i.stack.imgur.com/sBPap.png)


Note: the app is running on SDK 19 (4.4.2)


min SDK is 1


Is there a method similar to setError that does this automatically, 
or do I have to write the code for it ?


Thank you 



---

There's no need to use a third-party library since Google introduced the `TextInputLayout` as part of the `design-support-library`. 


Following a basic example:


### Layout



```
<android.support.design.widget.TextInputLayout
    android:id="@+id/text_input_layout"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:errorEnabled="true">

    <android.support.design.widget.TextInputEditText
        android:id="@+id/edit_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="Enter your name" />

</android.support.design.widget.TextInputLayout>

```

**Note:** By setting `app:errorEnabled="true"` as an attribute of the `TextInputLayout` it won't change it's size once an error is displayed - so it basically blocks the space.


### Code


In order to show the Error below the `EditText` you simply need to call `#setError` on the `TextInputLayout` (NOT on the child `EditText`):



```
TextInputLayout til = (TextInputLayout) findViewById(R.id.text_input_layout);
til.setError("You need to enter a name");

```

### Result


![picture showing the edit text with the error message](https://i.stack.imgur.com/Ldkiq.png)


To hide the error and reset the tint simply call `til.setError(null)`.




---


### Note


In order to use the `TextInputLayout` you have to add the following to your `build.gradle` dependencies:



```
dependencies {
    compile 'com.android.support:design:25.1.0'
}

```



---


### Setting a custom color


By default the line of the `EditText` will be red. If you need to display a different color you can use the following code as soon as you call `setError`.



```
editText.getBackground().setColorFilter(getResources().getColor(R.color.red_500_primary), PorterDuff.Mode.SRC_ATOP);

```

To clear it simply call the `clearColorFilter` function, like this:



```
editText.getBackground().clearColorFilter();

```


---

## Notes

- Just wanted to note, since it's such a small detail - I was having this problem by calling setError on the `EditText`, not the `TextInputLayout`. I saw this answer and still couldn't figure out what I needed to change.
-  I've been just trying to say that it should work when you're extending AppCompatActivity. Nevertheless: As of appcompat-v23 it's not necessary to set the colorFilter anymore, as soon as you're calling `textInputLayout.setError("Error messsage")` the color of the `EditText` should turn red. In order to reset it, it's enough to call `textInputLayout.setError(null)`.
- `editText.getBackground().setColorFilter(getResources().getColor(R.color.red_500_primary), PorterDuff.Mode.SRC_ATOP);` is not needed anymore with the latest support library
- How do you make the line red though ?
-  Making the line red doesn't come out of the box so you need to do it on your own.
- (suppose I wanted to move 'Enter your name' to the left and change the Line colors, etc...), Android's documentation doesn't say much (https://developer.android.com/reference/android/support/design/widget/TextInputLayout.html).
- Important: You have to `mutate` the `ColorFilter`, otherwise it'll mess with other text fields too!
- One disadvantage of attaching the error message to the TextInputLayout is that it requires more vertical layout space.
- Interesting thing is no need to setErrorEnabled(true). when you implement seterror method to non-null string, setErrorEnabled(true) called automatically.
-  not so sure what do you exactly mean by "use the appcompat functionality" as I had your set up working extending Activity, with an EditText wrapped by TextInputLayout provided by Support Design 23.1.0. The problem was on 4.4.4 once extending AppCompatActivity instead, setting the bottom line color via editText.getBackground().setColorFilter() didn't work anymore. I found a workaround in that case defining app:theme for the TextInputLayout, and there I have:
&lt;style name="OwnTheme"&gt;
&lt;item name="colorControlActivated"&gt;
&lt;/style&gt;
which controls the bottom 'normal' color.
- What would you do when trying to use this for an EditTextPreference?
-  your solution works very well, but only if your activity extends the Activity class; it doesn't work instead if your activity extends the AppCompatActivity class.
- is there support for variable error message ?
-  after setting the line to red, how do I remove the red line? I tried `editText.getBackground().clearColorFilter(); editText.invalidate()` but it's not working
-  and I've been just trying to tell you that setting the bottom line (not the text) color as you explain works only and only if you extend Activity, but it doesn't work for AppCompatActivity. Also, in my case the red is my primary color, so I need to set the error color to another color but red, so for me I still have that need.
-  That's more or less unlikely since every activity has to extend `AppCompatActivity` in order to "use" the appcompat "functionality".
-  Can you elaborate what you mean with "variable error message"?
