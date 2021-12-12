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

Found an addendum to this question:


If you want to change the visibility of your menu items on the go you just need to set a member variable in your activity to remember that you want to hide the menu and call `invalidateOptionsMenu()` and hide the items in your overridden `onCreateOptionsMenu(...)` method.



```
//anywhere in your code
...
mState = HIDE_MENU; // setting state
invalidateOptionsMenu(); // now onCreateOptionsMenu(...) is called again
...

@Override
public boolean onCreateOptionsMenu(Menu menu)
{
    // inflate menu from xml
    MenuInflater inflater = getSupportMenuInflater();
    inflater.inflate(R.menu.settings, menu);

    if (mState == HIDE_MENU)
    {
        for (int i = 0; i < menu.size(); i++)
            menu.getItem(i).setVisible(false);
    }
}

```

In my example I've hidden all items.



---

## Notes

- Instead of looping through each item here, you could just do: `if (HIDE_MENU) { return false; } else { getSupportMenuInflater().inflate(R.menu.menu_settings, menu); return true; }` The docs state: "You must return true for the menu to be displayed; if you return false it will not be shown".
- `onPrepareOptionsMenu()` should be used for show/hide logic instead of  `onCreateOptionsMenu()` as it is only called once so not useful if you want to change the menu items after its initialization. So inflate in onCreate, but show/hide in onPrepare.
- by calling invalidateOptionMenu() onCreateOptionMenu() called and I handle my conditions in onCreateOptionMenu().
