---
metaTitle: getting context in AsyncTask
tags:
- toast
- android-context
title: getting context in AsyncTask
---

## Context

I am trying to get the context in my AsyncTask of the class called Opciones(this class is the only one that call that task) but I don't know how to do it, I saw some code like this:



```
      protected void onPostExecute(Long result) {

    Toast.makeText(Opciones.this,"Subiendo la foto. ¡Tras ser moderada empezara a ser votada!: ", Toast.LENGTH_LONG).show(); 
}

```

But it doesn't work for me it says: `"No enclosing instance of the type Opciones in scope"`



---

Holding a weak reference to the host Activity will prevent memory leaks.



```
static class MyTask extends AsyncTask<Void, Void, Void> {
    // Weak references will still allow the Activity to be garbage-collected
    private final WeakReference<Activity> weakActivity;

    MyTask(Activity myActivity) {
      this.weakActivity = new WeakReference<>(myActivity);
    }

    @Override
    public Void doInBackground(Void... params) {
      // do async stuff here
    }

    @Override
    public void onPostExecute(Void result) {
      // Re-acquire a strong reference to the activity, and verify
      // that it still exists and is active.
      Activity activity = weakActivity.get();
      if (activity == null
          || activity.isFinishing()
          || activity.isDestroyed()) {
        // activity is no longer valid, don't do anything!
        return;
      }

      // The activity is still valid, do main-thread stuff here
    }
  }

```


---

## Notes

-  Weak references will still allow the Activity to be garbage-collected thus preventing a memory leak.
- What about when we switch between activies ( stopping and resuming asyntask), and then come back , Is the weakreference still active?
