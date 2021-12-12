---
metaTitle: Why do I want to avoid non-default constructors in fragments
title: Why do I want to avoid non-default constructors in fragments
---

## Context

I am creating an app with `Fragments` and in one of them, I created a non-default constructor and got this warning:



```
Avoid non-default constructors in fragments: use a default constructor plus Fragment#setArguments(Bundle) instead

```

Can someone tell me why this is not a good idea? 


Can you also suggest how I would accomplish this:



```
public static class MenuFragment extends ListFragment {
    public ListView listView1;
    Categories category;

    //this is my "non-default" constructor
    public MenuFragment(Categories category){
        this.category = category;
    }....

```

Without using the non-default constructor? 



---

It seems like none of the answers actually answer "why use bundle for passing parameters rather than non default constructors"


The reason why you should be passing parameters through bundle is because when the system restores a `fragment` (e.g on config change), it will automatically restore your `bundle`. 


The callbacks like `onCreate` or `onCreateView` should read the parameters from the `bundle` - this way you are guaranteed to restore the state of the `fragment` correctly to the same state the `fragment` was initialised with (note this state can be different from the `onSaveInstanceState bundle` that is passed to the `onCreate/onCreateView`)


The recommendation of using the static `newInstance()` method is just a recommendation. You can use a non default constructor but make sure you populate the initialisation parameters in the `bundle` inside the body of that constructor. And read those parameters in the `onCreate()` or `onCreateView()` methods.



---

## Notes

- No longer can you use non-default constructor (for whatever reason)....  it gives a compiler error (used to be a warning).
