---
metaTitle: How to make a edittext box in a dialog
tags:
- dialog
title: How to make a edittext box in a dialog
---

## Context

I am trying to make a edittext box in a dialog box for entering a password.
and when I am doing I am not able to do. I am a beginner in it.
Please help me in this.



```
public class MainActivity extends Activity {

Button create, show, setting;
//String pass="admin";String password;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    create = (Button)findViewById(R.id.amcreate);
    setting = (Button)findViewById(R.id.amsetting);
    show = (Button)findViewById(R.id.amshow);
    //input = (EditText)findViewById(R.id.this);

    setting.setVisibility(View.INVISIBLE);

    create.setOnClickListener(new View.OnClickListener() {
        public void onClick(View view) {
            Intent myIntent1 = new Intent(view.getContext(), Create.class);
            startActivityForResult(myIntent1, 0);
        }

    });

    show.setOnClickListener(new View.OnClickListener() {
        //@SuppressWarnings("deprecation")
        public void onClick(final View view) {

            // Creating alert Dialog with one Button
            AlertDialog.Builder alertDialog = new AlertDialog.Builder(MainActivity.this);

            //AlertDialog alertDialog = new AlertDialog.Builder(MainActivity.this).create();

            // Setting Dialog Title
            alertDialog.setTitle("PASSWORD");

            // Setting Dialog Message
            alertDialog.setMessage("Enter Password");
            **final EditText input = new EditText(this);**
            //alertDialog.setView(input);

            // Setting Icon to Dialog
            alertDialog.setIcon(R.drawable.key);

            // Setting Positive "Yes" Button
            alertDialog.setPositiveButton("YES",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog,int which) {
                            // Write your code here to execute after dialog
                            Toast.makeText(getApplicationContext(),"Password Matched", Toast.LENGTH_SHORT).show();
                            Intent myIntent1 = new Intent(view.getContext(), Show.class);
                            startActivityForResult(myIntent1, 0);
                        }
                    });
            // Setting Negative "NO" Button
            alertDialog.setNegativeButton("NO",
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int which) {
                            // Write your code here to execute after dialog
                            dialog.cancel();
                        }
                    });

            // closed

            // Showing Alert Message
            alertDialog.show();
        }

    }); 

```

Image 


![enter image description here](https://i.stack.imgur.com/wBnYD.png)


I want to get as 


![enter image description here](https://i.stack.imgur.com/p0NVC.png)



```
 AlertDialog.Builder alertDialog = new AlertDialog.Builder(MainActivity.this);
 alertDialog.setTitle("PASSWORD");
 alertDialog.setMessage("Enter Password");

 final EditText input = new EditText(MainActivity.this);
 LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
     LinearLayout.LayoutParams.MATCH_PARENT,
     LinearLayout.LayoutParams.MATCH_PARENT);
 input.setLayoutParams(lp);
 alertDialog.setView(input);
 alertDialog.setIcon(R.drawable.key);

 alertDialog.setPositiveButton("YES",
     new DialogInterface.OnClickListener() {
         public void onClick(DialogInterface dialog, int which) {
             password = input.getText().toString();
             if (password.compareTo("") == 0) {
                 if (pass.equals(password)) {
                     Toast.makeText(getApplicationContext(),
                         "Password Matched", Toast.LENGTH_SHORT).show();
                     Intent myIntent1 = new Intent(view.getContext(),
                         Show.class);
                     startActivityForResult(myIntent1, 0);
                 } else {
                     Toast.makeText(getApplicationContext(),
                         "Wrong Password!", Toast.LENGTH_SHORT).show();
                 }
             }
         }
     });

 alertDialog.setNegativeButton("NO",
     new DialogInterface.OnClickListener() {
         public void onClick(DialogInterface dialog, int which) {
             dialog.cancel();
         }
     });

 alertDialog.show();
 }

 });

```


---

Simplest of all would be.


* Create xml layout file for dialog . Add whatever view you want like
EditText , ListView , Spinner etc.


Inflate this view and set this to AlertDialog


Lets start with Layout file first.



```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center_horizontal"
    android:orientation="vertical">


    <EditText
        android:id="@+id/etComments"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:gravity="top"
        android:hint="Enter comments(Optional)"
        android:inputType="textMultiLine"
        android:lines="8"
        android:maxLines="3"
        android:minLines="6"
        android:scrollbars="vertical" />

</LinearLayout>

```



---



```
final View view = layoutInflater.inflate(R.layout.xml_file_created_above, null);
AlertDialog alertDialog = new AlertDialog.Builder(ct).create();
alertDialog.setTitle("Your Title Here");
alertDialog.setIcon("Icon id here");
alertDialog.setCancelable(false);
Constant.alertDialog.setMessage("Your Message Here");


final EditText etComments = (EditText) view.findViewById(R.id.etComments);

alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK", new OnClickListener() {
    @Override
    public void onClick(DialogInterface dialog, int which) {

    }
});


alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "Cancel", new OnClickListener() {
    @Override
    public void onClick(DialogInterface dialog, int which) {
        alertDialog.dismiss()
    }
});


alertDialog.setView(view);
alertDialog.show();

```


---

## Notes

- I found the reason I crashed was I missed the 'view' on the findViewById. Now I just need to know how to handle a check box so I can show or hide the password WHILE the dialog is still alive. Tried the multi item approach but it added its own check box in addition to the one in my layout!
