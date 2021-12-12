---
metaTitle: How to get Toolbar from fragment
tags:
- android-actionbar
- android-support-library
- android-toolbar
title: How to get Toolbar from fragment
---

## Context

I have `ActionBarActivity` with `NavigationDrawer` and use support\_v7 `Toolbar` as ActionBar. In one of my fragments toolbar has custom view. In other fragments `Toolbar` should show title.


How get `Toolbar` instance for customizing from fragments? I can get ActionBar with `getActivity().getActionBar()`, but if I call `setTitle()` for this instance ActionBar it do nothing.


**UPD:**


In my case 


`((ActionBarActivity) getActivity()).getSupportActionBar().setTitle();`


(as MrEngineer13 said) don't work at first fragment creation because I call it from onHiddenChanged(). Now I add more one to onCreateView() and it works fine.



---

You need to cast your activity from `getActivity()` to `AppCompatActivity` first. Here's an example:



```
((AppCompatActivity) getActivity()).getSupportActionBar().setTitle();

```

The reason you have to cast it is because `getActivity()` returns a `FragmentActivity` and you need an `AppCompatActivity`


In Kotlin:



```
(activity as AppCompatActivity).supportActionBar?.title = "My Title"

```


---

## Notes

- getting 'supportActionBar' and 'toolbar' is same thing?
- If i add this, its changing the title.. But if i go back to the parent activity, how to change the title again ? I mean i have a nav drawer.
