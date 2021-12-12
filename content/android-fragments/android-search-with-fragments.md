---
metaTitle: Android search with Fragments
tags:
- java
- sqlite
- android-searchmanager
title: Android search with Fragments
---

## Context

Does somebody know of a tutorial or an example of how to implement the standard [Android search interface](http://developer.android.com/guide/topics/search/index.html) with `Fragment`s? In other words, is it possible to put a standard search with a `SearchManager` in a Fragment?



---

In short, you can't. There are a couple of reasons why creating a search interface within a `Fragment` is not possible.


1. When creating a searchable interface, you must specify a default "searchable activity" in your Android manifest. As I'm sure you know, a `Fragment` cannot exist without a parent `Activity` and thus, this separation is not possible.
2. If you already figured out #1 already, I assume you asked this question in hopes that there is some magical "hack" out there that can get the job done. However, the documentation states that,



> 
> When the user executes a search in the search dialog or widget, the
>  system starts your searchable activity and delivers it the search
>  query in an Intent with the ACTION\_SEARCH action. Your searchable
>  activity retrieves the query from the intent's QUERY extra, then
>  searches your data and presents the results.
> 
> 
> 


The underlying, internal system that is responsible for providing search results expects an `Activity`, not a `Fragment`; thus, implementing a search interface that is completely independent of an `Activity` is not possible, as it would require changes to the *underlying system itself*. Check out the source code for the [**`SearchableInfo`**](http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.2_r1.1/android/app/SearchableInfo.java) class if you don't believe me :).


That being said, it doesn't seem like it would be too difficult to achieve something similar to what you are describing. For instance, you might consider implementing your searchable-Activity so that it will accept the `android.intent.action.SEARCH` intent and (instead of immediately displaying the results in a `ListView`, for example) will pass the search query to your `Fragment`s. For instance, consider the following searchable Activity:



```
public class SearchableActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (Intent.ACTION_SEARCH.equals(getIntent().getAction())) {
          String query = intent.getStringExtra(SearchManager.QUERY);
          doMySearch(query);
        }
    }

    /**
     * Performs a search and passes the results to the container
     * Activity that holds your Fragments.
     */
    public void doMySearch(String query) {
        // TODO: implement this
    }
}

```

When a search-request is made, the system will launch your searchable activity, perform the query, and will pass the results to some container Activity (based on your implementation of `doMySearch`). The container Activity will then pass these results to the contained searchable `Fragment`, in which the results will be displayed. The implementation requires a bit more work than what you were probably hoping for, but I'm sure there are ways that you can make it more modular, and it seems like this might be the best that you can do.


p.s. If you use this approach, you might have to pay special attention to which Activitys are added/removed to the backstack. See this [post](https://stackoverflow.com/q/7307234/844882) for some more information on how this might be done.


p.p.s. You might also forget about the standard search interface completely and just implement a simple search within a `Fragment` as described in [**Raghav's post below**](https://stackoverflow.com/a/10479208/844882).



---

## Notes

- For delivering Search Results, I've implemented something similar to what you suggested, delivering the intent to the Activity which delivers it to the right fragment if it's visible. The toughest part was repopulating the Suggestions Table on fragment load with the right data to let me handle displaying suggestions as well as to handle search submit and clicking on suggestions.
-  yeah, I mean you'd have to re-implement the entire `SearchManager` for `Fragment`s right?
- I found this to be a better answer: http://stackoverflow.com/questions/6938952/android-create-custom-searchview-search-action/6939735#6939735  This will allow "searching" from within Fragments.
-  It's definitely possible to implement the standard Android search interface using fragments.
