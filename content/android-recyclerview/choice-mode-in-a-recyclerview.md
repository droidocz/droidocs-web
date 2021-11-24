---
metaTitle: Choice Mode in a RecyclerView
tags:
- listview
- android-checkbox
title: Choice Mode in a RecyclerView
---

## Context

I'm trying to figure out how to achieve the same effect of 


`mListView.setChoiceMode(ListView.CHOICE_MODE_SINGLE);`


in a RecyclerView implementation. Please help.



---

There is no built-in support for a "choice mode" structure with `RecyclerView`. Your options are to either roll it yourself or use a third-party library that offers it. 
The [DynamicRecyclerView library](https://github.com/ismoli/DynamicRecyclerView) offers choice modes, but I have not tried it.


[This sample app](http://github.com/commonsguy/cw-omnibus/tree/master/RecyclerView/SingleActivatedList) demonstrates implementing it yourself, in this case using the activated state to indicate which is the current choice. The overall pattern is:


* Have your `RecyclerView.ViewHolder` detect a UI operation that indicates a choice (click on a row? click on a `RadioButton` in the row? etc.).
* Keep track of the selection at the level of your `RecyclerView.Adapter`. In my case, a `ChoiceCapableAdapter` handles that, in conjunction with a `SingleChoiceMode` class that implements a `ChoiceMode` strategy.
* When a choice is made, update the newly-chosen row to reflect the choice *and* update the previously-chosen row to reflect that it is no longer chosen. `findViewHolderForPosition()` on `RecyclerView` can help here -- if you track the `position` of the last choice, `findViewHolderForPosition()` can give you the `ViewHolder` for that choice, so you can "un-choose" it.
* Keep track of the choice across configuration changes, by putting it in the saved instance state of the activity or fragment that is managing the `RecyclerView`.
