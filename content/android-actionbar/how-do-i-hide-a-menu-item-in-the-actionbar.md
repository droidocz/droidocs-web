---
metaTitle: How do I hide a menu item in the actionbar
tags:
- menuitem
- android-menu
title: How do I hide a menu item in the actionbar
---

## Context

I have an action bar with a menuitem. How can I hide/show that menu item?


This is what I'm trying to do:



```
MenuItem item = (MenuItem) findViewById(R.id.addAction);
item.setVisible(false);
this.invalidateOptionsMenu();

```


---

I was looking for an answer with a little more context. Now that I have figured it out, I will add that answer.


Hide button by default in menu xml
==================================


By default the share button will be hidden, as set by `android:visible="false"`.


[![enter image description here](https://i.stack.imgur.com/cQWRl.png)](https://i.stack.imgur.com/cQWRl.png)


*main\_menu.xml*



```
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto">

    <!-- hide share button by default -->
    <item
        android:id="@+id/menu_action_share"
        android:icon="@drawable/ic_share_white_24dp"
        android:visible="false"     
        android:title="Share"
        app:showAsAction="always"/>

    <item
        android:id="@+id/menu_action_settings"
        android:icon="@drawable/ic_settings_white_24dp"
        android:title="Setting"
        app:showAsAction="ifRoom"/>

</menu>

```

Show button in code
===================


But the share button can optionally be shown based on some condition.


[![enter image description here](https://i.stack.imgur.com/6nfyr.png)](https://i.stack.imgur.com/6nfyr.png)


*MainActivity.java*



```
public boolean onCreateOptionsMenu(Menu menu) {
    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.main_menu, menu);
    MenuItem shareItem = menu.findItem(R.id.menu_action_share);

    // show the button when some condition is true
    if (someCondition) {        
        shareItem.setVisible(true);
    }

    return true;
}

```

See also
========


* [Setting Up the App Bar](https://developer.android.com/training/appbar/setting-up.html) (Android docs for help getting the app/action bar set up)


---

## Notes

- onPrepareOptionsMenu() should be used for show/hide logic instead of onCreateOptionsMenu() as it is only called once so not useful if you want to change the menu items after its initialization. So inflate in onCreate, but show/hide in onPrepare, then use `invalidateOptionsMenu()` to refresh the menu.
