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

You need to do following things.


* when you want to use **AsyncTask**, extend that in other class say **MyCustomTask**.
* in constructor of new class, pass **Context**


Example



```
public class MyCustomTask extends AsyncTask<Void, Void, Long> {

    private Context mContext;

    public MyCustomTask (Context context){
         mContext = context;
    }

    //other methods like onPreExecute etc.
    protected void onPostExecute(Long result) {
         Toast.makeText(mContext,"Subiendo la foto. ¡Tras ser moderada empezara a ser votada!: ", Toast.LENGTH_LONG).show(); 
    }
}

```

And instantiate class by following.



```
MyCustomTask task = new MyCustomTask(context);
task.execute(..);

```


---

## Notes

- note that would be lot better to use non-nested or static class and hold mContext in a WeakReference to avoid memory leaks
- Find a way to solve memory leak, Context should be a WeakReference class.
- Its public class and needs to be defined separate then activity.
- A static field will leak contexts.Non-static inner classes have an implicit reference to their outer class. If that outer class is for example a Fragment or Activity, then this reference means that the long-running handler/loader/task will hold a reference to the activity which prevents it from getting garbage collected. Similarly, direct field references to activities and fragments from these longer running instances can cause leaks. ViewModel classes should never point to Views or non-application Contexts
