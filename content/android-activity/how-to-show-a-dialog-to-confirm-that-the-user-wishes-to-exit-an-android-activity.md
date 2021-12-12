---
metaTitle: How to show a dialog to confirm that the user wishes to exit an Android Activity
tags:
- android-dialog
- activity-finish
title: How to show a dialog to confirm that the user wishes to exit an Android Activity
---

## Context

I've been trying to show a "Do you want to exit?" type of dialog when the user attempts to exit an Activity. 


However I can't find the appropriate API hooks. `Activity.onUserLeaveHint()` initially looked promising, but I can't find a way to stop the Activity from finishing.



---


```
@Override
public void onBackPressed() {
    new AlertDialog.Builder(this)
           .setMessage("Are you sure you want to exit?")
           .setCancelable(false)
           .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
               public void onClick(DialogInterface dialog, int id) {
                   ExampleActivity.super.onBackPressed();
               }
           })
           .setNegativeButton("No", null)
           .show();
}

```


---

## Notes

- Even if that's true now, it may not be true in future APIs `CustomTabActivity.super.onBackPressed`
-  Can you clarify your comment... Are you saying it's better to replace the `finish()` code with `super.onBackPressed()` ?
- It seems to most logical approach, too - to call the method you are overriding if you want the standard behaviour when user taps "No."
