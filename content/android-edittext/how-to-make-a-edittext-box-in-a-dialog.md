---
metaTitle: How to make a edittext box in a dialog
tags:
- dialog
title: How to make a edittext box in a dialog
---

I know its too late to answer this question but for others who are searching for some thing similar to this here is a simple code of an alertbox with an edittext



```
AlertDialog.Builder alert = new AlertDialog.Builder(this); 

```

or 



```
new AlertDialog.Builder(mContext, R.style.MyCustomDialogTheme);

```

if you want to change the theme of the dialog.



```
final EditText edittext = new EditText(ActivityContext);
alert.setMessage("Enter Your Message");
alert.setTitle("Enter Your Title");

alert.setView(edittext);

alert.setPositiveButton("Yes Option", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dialog, int whichButton) {
        //What ever you want to do with the value
        Editable YouEditTextValue = edittext.getText();
        //OR
        String YouEditTextValue = edittext.getText().toString();
    }
});

alert.setNegativeButton("No Option", new DialogInterface.OnClickListener() {
    public void onClick(DialogInterface dialog, int whichButton) {
        // what ever you want to do with No option.
    }
});

alert.show();

```
