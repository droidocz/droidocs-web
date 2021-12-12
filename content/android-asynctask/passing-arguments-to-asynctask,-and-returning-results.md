---
metaTitle: Passing arguments to AsyncTask, and returning results
tags:
- return
- progressdialog
title: Passing arguments to AsyncTask, and returning results
---

## Context

I have an application that does some long calculations, and I would like to show a progress dialog while this is done. So far I have found that I could do this with threads/handlers, but didn't work, and then I found out about the `AsyncTask`. 


In my application I use maps with markers on it, and I have implemented the onTap function to call a method that I have defined. The method creates a dialog with Yes/No buttons, and I would like to call an `AsyncTask` if Yes is clicked. My question is how to pass an `ArrayList<String>` to the `AsyncTask` (and work with it there), and how to get back a new `ArrayList<String>` like a result from the `AsyncTask`?


The code of the method looks like this:



```
String curloc = current.toString();
String itemdesc = item.mDescription;

ArrayList<String> passing = new ArrayList<String>();
passing.add(itemdesc);
passing.add(curloc);

ArrayList<String> result = new ArrayList<String>();

new calc_stanica().execute(passing,result);

String minim = result.get(0);
int min = Integer.parseInt(minim);

String glons = result.get(1);
String glats = result.get(2);

double glon = Double.parseDouble(glons);
double glat = Double.parseDouble(glats);

GeoPoint g = new GeoPoint(glon, glat);
String korisni_linii = result.get(3);

```

So, as you see, I would like to send the string array list "passing" to the `AsyncTask`, and to get the "result" string array list back from it. And the calc\_stanica `AssycTask` class looks like this:



```
public class calc_stanica extends AsyncTask<ArrayList<String>, Void, ArrayList<String>> {
    ProgressDialog dialog;

    @Override
    protected void onPreExecute() {
        dialog = new ProgressDialog(baraj_mapa.this);
        dialog.setTitle("Calculating...");
        dialog.setMessage("Please wait...");
        dialog.setIndeterminate(true);
        dialog.show();
    }

    protected ArrayList<String> doInBackground(ArrayList<String>... passing) {

        //Some calculations...

        return something; //???
    }

    protected void onPostExecute(Void unused) {
        dialog.dismiss();
    }

```

So my question is how to get the elements of the "passing" array list in the `AsyncTask doInBackground` method (and use them there), and how to return an array list to use in the main method (the "result" array list)?



---

Change your method to look like this:



```
String curloc = current.toString();
String itemdesc = item.mDescription;
ArrayList<String> passing = new ArrayList<String>();
passing.add(itemdesc);
passing.add(curloc);
new calc_stanica().execute(passing); //no need to pass in result list

```

And change your async task implementation



```
public class calc_stanica extends AsyncTask<ArrayList<String>, Void, ArrayList<String>> {
ProgressDialog dialog;

    @Override
    protected void onPreExecute() {
        dialog = new ProgressDialog(baraj_mapa.this);
        dialog.setTitle("Calculating...");
        dialog.setMessage("Please wait...");
        dialog.setIndeterminate(true);
        dialog.show();
    }

    protected ArrayList<String> doInBackground(ArrayList<String>... passing) {
        ArrayList<String> result = new ArrayList<String>();
        ArrayList<String> passed = passing[0]; //get passed arraylist

        //Some calculations...

        return result; //return result
    }

    protected void onPostExecute(ArrayList<String> result) {
        dialog.dismiss();
        String minim = result.get(0);
        int min = Integer.parseInt(minim);
        String glons = result.get(1);
        String glats = result.get(2);
        double glon = Double.parseDouble(glons);
        double glat = Double.parseDouble(glats);
        GeoPoint g = new GeoPoint(glon, glat);
        String korisni_linii = result.get(3);
    }

```

UPD:


If you want to have access to the task starting context, the easiest way would be to override onPostExecute in place:



```
new calc_stanica() {
    protected void onPostExecute(ArrayList<String> result) {
      // here you have access to the context in which execute was called in first place. 
      // You'll have to mark all the local variables final though..
     }
}.execute(passing);

```


---

## Notes

- Just to be clear: by "main method" I mean the module/method that initiated `doInBackground`, in your example, the first block of code, specifically the line `new calc_stanica().execute(passing);`. So you pass in data, via `passing`; how do you get data back? If I wanted to get a result back, it sounds like I'd have to store it in a field (or some kind of global variable if the main method is static)... is that right?
- I don't see in your example how `result` gets back to the main method. I just don't get it.
-  in essense, result never get's to the original method.. it is only available when onPostExecute method runs, usually when the original method returns already.
- If I define int min = Integer.parseInt(minim); for example, in the AsyncTask class onPostExecute(), how can I access it from my main class method? When I change it like this, I get "min cannot be resolved" error in the main class method.
- I get the following error when I pass an `ArrayList` on `AsyncTask.execute`: **Type safety: A generic array of ArrayList&lt;String&gt; is created for a varargs parameter.
