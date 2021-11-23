---
metaTitle: Get Value of a Edit Text field
title: Get Value of a Edit Text field
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
