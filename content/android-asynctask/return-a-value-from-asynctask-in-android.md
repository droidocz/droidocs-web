---
metaTitle: Return a value from AsyncTask in Android
tags:
- java
- asynchronous
- return
title: Return a value from AsyncTask in Android
---

## Context

One simple question: is it possible to return a value in `AsyncTask`?



```
//AsyncTask is a member class
private class MyTask extends AsyncTask<Void, Void, Void>{

    protected Void doInBackground(Void... params) {
         //do stuff
         return null;
    }

    @Override
    protected void onPostExecute(Void result) {
        //do stuff
        //how to return a value to the calling method?
    }
}

```

And then within my `Activity`/`Fragment`:



```
// The task is started from activity
myTask.execute()
// something like this?
myvalue = myTask.getvalue() 

```

**EDIT:
This was asked a long time ago where I wasn't familiar with Java, now that I'm better with it, I 'll do a quick summary:**


The point of async task is that the task is `asynchronous`, meaning that after you call `execute()` on the task, the task starts running on a thread of its own. returning a value from asynctask would be pointless because the original calling thread has already carried on doing other stuff (thus the task is asynchronous). 


Think of time:
At one point of time, you started a task that will run in parallel with the main thread. When the parallel-running task completed, time has also elapsed on the main thread. The parallel task cannot go back in time to return a value to the main thread.


I was coming from C so I didn't know much about this. But it seems that lots of people are having the same question so I thought I would clear it up a bit.



---

Easiest way is to pass the calling object into the async task (upon constructing it if you like):



```
public class AsyncGetUserImagesTask extends AsyncTask<Void, Void, Void> {

    private MyImagesPagerFragment mimagesPagerFragment;
    private ArrayList<ImageData> mImages = new ArrayList<ImageData>();

    public AsyncGetUserImagesTask(MyImagesPagerFragment imagesPagerFragment) {
        this.mimagesPagerFragment = imagesPagerFragment;
    }

    @Override
    public Void doInBackground(Void... records) {
        // do work here
        return null;
    }

    @Override
    protected void onPostExecute(Void result) {
        mimagesPagerFragment.updateAdapter(mImages);
    }
}

```

And the in the calling class (your activity or fragment) execute the task:



```
public class MyImagesPagerFragment extends Fragment {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        AsyncGetUserImagesTask mGetImagesTask = new AsyncGetUserImagesTask(this);
        mGetImagesTask.execute();
    }

```

And then the onPostExecuteMethod will call any method on your originating class you like, eg:



```
    public void updateAdapter(List<ImageData> images) {
        mImageAdapter.setImages(images);
        mImageAdapter.notifyDataSetChanged();
    }
}

```


---

## Notes

- Unless this is going to be reusable by other fragments, it would be simpler to just make the async task a private inner class (or anonymous) and not pass around the fragment. Also instead of using Void for results your could specify the image array. doInBackground would return the image array, and on post execute would take it in as a parameter, this would eliminate the need for a class variable to pass data around.
- Or you could make the AsyncGetUserImagesTask constructor take in an interface instead of a concrete fragment - then anything that implements the interface could use the class (i.e.
- Correct - hence the "Unless this is going to be reusable" qualification. If you wanted a reusable solution - you could create an custom fragment class with the inner asynctask class embedded - then extend fragments that need this functionality from that class.
-  that's correct but that wouldn´t be reusable either as you would have to include that inner  class in every Activity class you have. to make a reusable AsyncTask class?
