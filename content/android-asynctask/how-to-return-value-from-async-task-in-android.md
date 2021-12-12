---
metaTitle: How to return value from async task in android
title: How to return value from async task in android
---

## Context

I created an async task to call my server to get data from DB.  

I need to process the result returned from http server call.  

From my activity i calling the async task in many places. so i cant use member variable to access the result. is there any way to do? 



```
public Result CallServer(String params)
{

    try
    {
    new MainAynscTask().execute(params);
    }
    catch(Exception ex)
    {
        ex.printStackTrace();
    }
    return aResultM;//Need to get back the result

}  

    private class MainAynscTask extends AsyncTask<String, Void, Result> {


    @Override
    protected Result doInBackground(String... ParamsP) {    
        //calling server codes
        return aResultL;
    }       
    @Override
       protected void onPostExecute(Result result) {
          super.onPostExecute(result);
          //how i will pass this result where i called this task?
       }

```


---

When an asynchronous task is executed, the task goes through 4 steps:


1. onPreExecute(), invoked on the UI thread before the task is executed. This step is normally used to setup the task, for instance by showing a progress bar in the user interface.
2. doInBackground(Params...), invoked on the background thread immediately after onPreExecute() finishes executing. This step is used to perform background computation that can take a long time. The parameters of the asynchronous task are passed to this step. The result of the computation must be returned by this step and will be passed back to the last step. This step can also use publishProgress(Progress...) to publish one or more units of progress. These values are published on the UI thread, in the onProgressUpdate(Progress...) step.
3. onProgressUpdate(Progress...), invoked on the UI thread after a call to publishProgress(Progress...). The timing of the execution is undefined. This method is used to display any form of progress in the user interface while the background computation is still executing. For instance, it can be used to animate a progress bar or show logs in a text field.
4. onPostExecute(Result), **invoked on the UI thread after the background computation finishes. The result of the background computation is passed to this step as a parameter.**


Use a handler


In your activity



```
    Handler mHandler = new Handler() { 
    @Override public void handleMessage(Message msg) { 
        String s=(String)msg.obj;
        tv.setText(s);
    }
};

//result is soap object in this case.
protected void onPostExecute(SoapObject result) {
    pd.dismiss();
    if(result != null) {
        Message msg=new Message();
        msg.obj=result.getProperty(0).toString();
        mHandler.sendMessage(msg);
    }

```
