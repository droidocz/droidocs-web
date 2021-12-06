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


---

## Notes:

-  My gut instinct tells me this needs to change to `findViewHolderForAdapterPosition()`, as that seems to be a bit more conservative than is `findViewHolderForLayoutPosition()`. The now-deprecated `findViewHolderForPosition()` actually has the same behavior as `findViewHolderForLayoutPosition()`, so the latter would work, but it won't take into account any in-flight data set changes.
- Speaking about the support library, I find really confusing that the LayoutManager gets a chance to save its state while the Adapter does not.
-  Presumably, call `onChecked(0, true)` in `onCreate()` after you create the adapter.
- could someone post the dependencies required to compile the library for "DynamicRecyclerView"
-  Well, according to the docs, `findViewHolderForAdapterPosition()` will return `null` if there is an outstanding `notifyDataSetChanged()` call that has not yet been applied. `findViewHolderForLayoutPosition()` works solely off of the actual visible children of the `RelativeLayout`.
- I'll open a new question thread and try to explain exactly what I need
- Hm seems that both `findViewHolderForAdapterPosition()` and `findViewHolderForLayoutPosition()` have the same effect in your sample app which works fine but I don't understand the difference between them
-  i was able to use your demo project, but i am lacking one functionality as per my requirement that is if i want to make first item selected initially.
- Cool thanks  I think I'm gonna go with the `findViewHolderForLayoutPosition()` in my case cause I need to have a item returned everytime no matter if `notifyDataSetChanged()` has been applied or not
