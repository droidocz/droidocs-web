---
metaTitle: 'Android: ListView elements with multiple clickable buttons'
tags:
- button
title: 'Android: ListView elements with multiple clickable buttons'
---

## Context

I've a `ListView` where every element in the list contains a TextView and two different Buttons. Something like this:



```
ListView
--------------------
[Text]
[Button 1][Button 2]
--------------------
[Text]
[Button 1][Button 2]
--------------------
... (and so on) ...

```

With this code I can create an `OnItemClickListener` for the whole item:



```
listView.setOnItemClickListener(new OnItemClickListener() {
    @Override
    public void onItemClick(AdapterView<?> list, View view, int position, long id) {
        Log.i(TAG, "onListItemClick: " + position);

        }

    }
});

```

However, I don't want the whole item to be clickable, but only the two buttons of each list element.


So my question is, how do I implement a onClickListener for these two buttons with the following parameters:


* `int button` (which button of the element has been clicked)
* `int position` (which is the element in the list on which the button click happened)




---


**Update:** I found a solution as described in my answer below. Now I can click/tap the button via the touch screen. However, I can't manually select it with the trackball. It always selects the whole list item and from there goes directly to the next list item ignoring the buttons, even though I set `.setFocusable(true)` and `setClickable(true)` for the buttons in `getView()`.


I also added this code to my custom list adapter:



```
@Override
public boolean  areAllItemsEnabled() {
    return false;           
}

@Override
public boolean isEnabled(int position) {
        return false;
}

```

This causes that no list item is selectable at all any more. But it didn't help in making the nested buttons selectable.


Anyone an idea?



---

The solution to this is actually easier than I thought. You can simply add in your custom adapter's `getView()` method a setOnClickListener() for the buttons you're using.


Any data associated with the button has to be added with `myButton.setTag()` in the `getView()` and can be accessed in the onClickListener via `view.getTag()`


I posted a detailed solution on [my blog](http://www.geekmind.net/2009/11/android-custom-list-item-with-nested.html) as a tutorial.



---

## Notes

- Watch this talk at 11:39 there is an excellent example: http://youtu.be/wDBM6wVEO70?t=11m39s

Then do what  says...setTag() when the convertView==null and do getTag() in the onClick() method of the button's onClickListener().
- I ask it because I'm using the same custom adapter class to inflate different menus, and I wouldn't like to have my ListAdapter class full of conditionals depending on the menu I'm inflating and the button I'm tapping
- how exacly did you get the curItem.url from query, would you be more specific?
