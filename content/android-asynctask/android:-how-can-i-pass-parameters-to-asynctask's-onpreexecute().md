---
metaTitle: 'Android: How can I pass parameters to AsyncTask''s onPreExecute()'
tags:
- methods
- parameters
title: 'Android: How can I pass parameters to AsyncTask''s onPreExecute()'
---

## Problem

I use an `AsyncTask` for loading operations that I implemented as an inner class. 


In `onPreExecute()` I show a loading dialog which I then hide again in `onPostExecute()`. But for some of the loading operations I know in advance that they will finish very quickly so I don't want to display the loading dialog. 


I wanted to indicate this by a boolean parameter that I could pass to `onPreExecute()` but apparently for some reason `onPreExecute()` doesn't take any parameters.


The obvious workaround would probably be to create a member field in my AsyncTask or in the outer class which I would have to set before every loading operation but that does not seem very elegant. Is there a better way to do this?



---

## Solution

You can override the constructor. Something like:



```
private class MyAsyncTask extends AsyncTask<Void, Void, Void> {

    public MyAsyncTask(boolean showLoading) {
        super();
        // do stuff
    }

    // doInBackground() et al.
}

```

Then, when calling the task, do something like:



```
new MyAsyncTask(true).execute(maybe_other_params);

```



---


**Edit:** this is more useful than creating member variables because it simplifies the task invocation. Compare the code above with:



```
MyAsyncTask task = new MyAsyncTask();
task.showLoading = false;
task.execute();

```


---

## Notes

- I still need a member variable but in the AsyncTask and not the outer class if that's what you mean.
