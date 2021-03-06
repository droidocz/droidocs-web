---
metaTitle: How to set default app launcher programmatically
tags:
- launcher
title: How to set default app launcher programmatically
---

## Problem

I am creating a launcher (kiosk) app that will be downloadable through google. When first installing this application the user has the ability of choosing which launcher (mine or the stock) will be the default. I am trying to bring this up manually if the user does not make my application the default launcher. I want the user to be forced into selecting ALWAYS instead of JUST ONCE when that dialog comes up, otherwise the dialog will continue to appear periodically with a friendly message. This is what I have attempted so far.


I created a method to check for if my application is the default



```
/**
 * method checks to see if app is currently set as default launcher
 * @return boolean true means currently set as default, otherwise false
 */ 
private boolean isMyAppLauncherDefault() {
    final IntentFilter filter = new IntentFilter(Intent.ACTION_MAIN);
    filter.addCategory(Intent.CATEGORY_HOME);

    List<IntentFilter> filters = new ArrayList<IntentFilter>();
    filters.add(filter);

    final String myPackageName = getPackageName();
    List<ComponentName> activities = new ArrayList<ComponentName>();
    final PackageManager packageManager = (PackageManager) getPackageManager();

    packageManager.getPreferredActivities(filters, activities, null);

    for (ComponentName activity : activities) {
        if (myPackageName.equals(activity.getPackageName())) {
            return true;
        }
    }
    return false;
}   

```

Then I make the attempt of launching the chooser



```
/**
 * method starts an intent that will bring up a prompt for the user
 * to select their default launcher. It comes up each time it is
 * detected that our app is not the default launcher
 */
private void launchAppChooser() {
    Log.d(TAG, "launchAppChooser()");
    Intent intent = new Intent(Intent.ACTION_MAIN);
    intent.addCategory(Intent.CATEGORY_HOME);
    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    startActivity(intent);
}

```

When I do this I am not receiving the choice between my app and the stock launcher. I tried using `startActivity(Intent.createChooser(intent, "Please set launcher settings to ALWAYS"));` and I get the choices between my app and the stock launcher, however, I don't get the options ALWAYS or JUST ONCE.


I can create a custom dialog for this instead of launching chooser but I need to know how to set the default app launcher programmatically. Thanks in advance!



---

## Solution


> 
> I want the user to be forced into selecting ALWAYS instead of JUST ONCE when that dialog comes up
> 
> 
> 


That is not possible, except perhaps on rooted devices, barring some security flaw in Android.



> 
> When I do this I am not receiving the choice between my app and the stock launcher
> 
> 
> 


Correct. If a default has already been chosen, this will simply launch the default.



> 
> I tried using startActivity(Intent.createChooser(intent, "Please set launcher settings to ALWAYS")); and I get the choices between my app and the stock launcher, however, I don't get the options ALWAYS or JUST ONCE.
> 
> 
> 


Correct. `createChooser()` forces a choice, but does not allow setting a default.



---

## Notes

-  Then sometime I will work on figuring out how they do it, then report the security flaw to Google and try to get the flaw fixed.
- What you have described is what I have been experiencing, but this is not what I have noticed from other apps. If you download Famigo app from google play store, you will see what I mean. When Famigo is not default app, a dialog comes up saying that user must set the app as default otherwise certain features cannot be accessed. Once you do that, when you go to device settings it says as default launcher that "chosen to launch app by default for some actions". Inside the Famigo app, you can undo this default setting with one button click.
- How can forcefully show my launcher as default launcher[Without any popup's even user press on Home button]
How to forcefully press on ALWAYS through programatically
