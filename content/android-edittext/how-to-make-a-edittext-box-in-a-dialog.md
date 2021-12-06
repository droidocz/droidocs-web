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

Use Activtiy Context


Replace this



```
  final EditText input = new EditText(this);

```

By



```
  final EditText input = new EditText(MainActivity.this);  
  LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                        LinearLayout.LayoutParams.MATCH_PARENT,
                        LinearLayout.LayoutParams.MATCH_PARENT);
  input.setLayoutParams(lp);
  alertDialog.setView(input); // uncomment this line

```


---

## Notes:

- Hi Raghu, If I want to put left margin & right margin to this edittext box then what should I write ?
- http://stackoverflow.com/questions/7747268/edittext-seterror-not-working-in-android
- Like `Dialog dialog = new Dialog(MainActivity.this)`. I think you copied your code from else where i guess
- Toast toast = Toast.makeText(MainActivity.this,"Please Enter Password! ", Toast.LENGTH_LONG);
         toast.setGravity(Gravity.CENTER, 0, 0);
         toast.show();  this worked for me to get the toast in centre.
- `public void onClick(DialogInterface dialog` its the dialoginterface. using that is not a problem you click the negative button to dismiss the alertdialog.
-  you can use custom toast or set error to edittext.
- public void onClick(DialogInterface dialog, int which) {
        // Write your code here to execute after dialog
        dialog.cancel();
- should i use dialog.dismiss() ?
- sir what can i do if i want to display a message on empty textbox or wrong password entered. i want to display it in the dialog box insted in toast.
- setView() requires API level 21
- The edit field should also be a one liner (edittext.setSingleLine();) in a password request (because it is) and that makes pressing enter on an attached physical (BT) keyboard (or a Chromebook) making the focus jump to the next item, the positive button. meaning that after entering the text, pushing enter twice the dialogue is positively ended.
- Android is not Windows, and there is no need for a cancel button like it is a must in Win32, there is the OS "Back" button that serves as Cancel/No. So my suggestion is skipping the negative button on a password request dialog, and the positive button should not be "Yes" but should be "OK" (and get it localized by using android.R.string.ok). See more in my answer on the https://stackoverflow.com/questions/11459827/how-can-i-set-the-order-of-the-positive-and-negative-buttons-in-alertdialog/53422599#53422599 topic.
