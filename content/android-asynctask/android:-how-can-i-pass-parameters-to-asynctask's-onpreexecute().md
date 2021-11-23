---
metaTitle: 'Android: How can I pass parameters to AsyncTask''s onPreExecute()'
tags:
- methods
- parameters
title: 'Android: How can I pass parameters to AsyncTask''s onPreExecute()'
---

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
