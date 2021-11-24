---
metaTitle: Get Value of a Edit Text field
title: Get Value of a Edit Text field
---

## Context

I am learning how to create UI elements. I have created a few EditText input fields. On the click of a Button I want to capture the content typed into that input field.



```
<EditText android:id="@+id/name" android:width="220px" />

```

That's my field. How can I get the content?



---

By using getText():



```
Button   mButton;
EditText mEdit;

/** Called when the activity is first created. */
@Override
public void onCreate(Bundle savedInstanceState)
{
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    mButton = (Button)findViewById(R.id.button);
    mEdit   = (EditText)findViewById(R.id.edittext);

    mButton.setOnClickListener(
        new View.OnClickListener()
        {
            public void onClick(View view)
            {
                Log.v("EditText", mEdit.getText().toString());
            }
        });
}

```
