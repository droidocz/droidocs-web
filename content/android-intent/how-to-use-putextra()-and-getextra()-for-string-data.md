---
metaTitle: How to use putExtra() and getExtra() for string data
title: How to use putExtra() and getExtra() for string data
---

## Context

Can someone please tell me how exactly to use `getExtra()` and `putExtra()` for intents? Actually I have a string variable, say str, which stores some string data. Now, I want to send this data from one activity to another activity. 



```
  Intent i = new Intent(FirstScreen.this, SecondScreen.class);   
  String keyIdentifer  = null;
  i.putExtra(strName, keyIdentifer );

```

and then in the SecondScreen.java



```
 public void onCreate(Bundle savedInstanceState) 
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.table);
        TextView userName = (TextView)findViewById(R.id.userName);
        Bundle bundle = getIntent().getExtras();

        if(bundle.getString("strName")!= null)
        {
            //TODO here get the string stored in the string variable and do 
            // setText() on userName 
        }

    }

```

I know it is very basic question but unfortunately I am stuck here. 
Please help.


Thanks,


Edit: Here the string which I am trying to pass from one screen to the other is dynamic.
That is I have an editText where I am getting string whatever user types. Then with the help of `myEditText.getText().toString()` . I am getting the entered value as a string then I have to pass this data.



---

Use this to "put" the file...



```
Intent i = new Intent(FirstScreen.this, SecondScreen.class);   
String strName = null;
i.putExtra("STRING_I_NEED", strName);

```

Then, to retrieve the value try something like:



```
String newString;
if (savedInstanceState == null) {
    Bundle extras = getIntent().getExtras();
    if(extras == null) {
        newString= null;
    } else {
        newString= extras.getString("STRING_I_NEED");
    }
} else {
    newString= (String) savedInstanceState.getSerializable("STRING_I_NEED");
}

```


---

## Notes

- is the "savedInstanceState..." and "...getSerialiable" code used to handle orientation changes? if no, what is that code used for?
- I'm using android 3.0.1 and I had to use `this.getActivity().getIntent().getExtras()`.
- If you use PendingIntents, you need to use the "PendingIntent.FLAG_UPDATE_CURRENT" flag:
https://stackoverflow.com/a/29846408/2738240

Intent intent = new Intent(context, MainActivity.class);
            intent.putExtra("button_id", 1);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.my_test_widget);
            views.setOnClickPendingIntent(R.id.my_test_widget_button_1, pendingIntent);
