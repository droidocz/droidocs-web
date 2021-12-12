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

In Android 2.0+ this would look like:



```
@Override
public void onBackPressed() {
    new AlertDialog.Builder(this)
        .setIcon(android.R.drawable.ic_dialog_alert)
        .setTitle("Closing Activity")
        .setMessage("Are you sure you want to close this activity?")
        .setPositiveButton("Yes", new DialogInterface.OnClickListener()
    {
        @Override
        public void onClick(DialogInterface dialog, int which) {
            finish();    
        }

    })
    .setNegativeButton("No", null)
    .show();
}

```

In earlier versions it would look like:



```
@Override
public boolean onKeyDown(int keyCode, KeyEvent event) {
    //Handle the back button
    if(keyCode == KeyEvent.KEYCODE_BACK) {
        //Ask the user if they want to quit
        new AlertDialog.Builder(this)
        .setIcon(android.R.drawable.ic_dialog_alert)
        .setTitle(R.string.quit)
        .setMessage(R.string.really_quit)
        .setPositiveButton(R.string.yes, new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialog, int which) {

                //Stop the activity
                YourClass.this.finish();    
            }

        })
        .setNegativeButton(R.string.no, null)
        .show();

        return true;
    }
    else {
        return super.onKeyDown(keyCode, event);
    }

}

```


---

## Notes

- Also in 2.0 and above there is a new onBackPressed event that is recommended over onKeyDown

http://developer.android.com/intl/zh-TW/reference/android/app/Activity.html#onBackPressed()

There is a section here talking about the changes and new recommended  approach. http://developer.android.com/intl/zh-TW/sdk/android-2.0.html
- Blog post on catching the back key here:

http://android-developers.blogspot.com/2009/12/back-and-other-hard-keys-three-stories.html

Note that this does not allow you to catch other ways the user can leave your app: pressing home, selecting a notification, receiving a phone call, etc.
- This is the method() what I am looking for but I did not know where to call this method().
- make sure to remove super.onBackPressed(); or else it will force close the app..
- This works perfectly but how do you force code execution to stop while it's being showed to the user?
-  You just need to copy and paste the onBackPressed method into whichever of your activities you need to override the 'back' behaviour for.
- found it, this is a great solution here: http://stackoverflow.com/questions/4381296/android-wait-on-user-input-from-dialog
