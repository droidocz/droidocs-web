---
metaTitle: How do I return a boolean from AsyncTask
tags:
- java
title: How do I return a boolean from AsyncTask
---

## Problem

I have some EditTexts that a user enters an ftp address, username, password, port anda testConnection button. If a connection is successfully estabished it returns a boolean value of true. 



```
boolean status = ftpConnect(_address, _username, _password,_port);
                ftpDisconnect();

                if (status == true) {
                 Toast.makeText(SiteManager.this, "Connection Succesful",
                 Toast.LENGTH_LONG).show();
                 } else {
                 Toast.makeText(SiteManager.this,
                 "Connection Failed:" + status, Toast.LENGTH_LONG).show();

                 } 

```

I'm reworking my code to use AsyncTasks to perform the various ftp operations, but how can I pass back a boolean value if a connection is successfully made?



```
testConnection.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                _name = etSitename.getText().toString();
                _address = etAddress.getText().toString();
                _username = etUsername.getText().toString();
                _password = etPassword.getText().toString();
                _port = Integer.parseInt(etPort.getText().toString());

                AsyncConnectTask task = new AsyncConnectTask(SiteManager.this,
                        _address, _username, _password, _port);
                task.execute();
                // boolean status = ftpConnect(_address, _username, _password,
                // _port);
                // ftpDisconnect();

                // if (status == true) {
                // Toast.makeText(SiteManager.this, "Connection Succesful",
                // Toast.LENGTH_LONG).show();
                // savesite.setVisibility(0);
                // } else {
                // Toast.makeText(SiteManager.this,
                // "Connection Failed:" + status, Toast.LENGTH_LONG)
                // .show();

                // }
            }
        });

```

And my AsyncTask



```
public class AsyncConnectTask extends AsyncTask<Void, Void, Void> {
    private Context mContext;
    private FTPHelper ftpHelper = new FTPHelper();
    private String _address;
    private String _user;
    private String _pass;
    private int _port;
    ProgressDialog progressDialog;

    public AsyncConnectTask(Context context, String address, String user,
            String pass, int port) {
        mContext = context;
        _address = address;
        _user = user;
        _pass = pass;
        _port = port;
    }

    // declare other objects as per your need
    @Override
    protected void onPreExecute() {
        progressDialog = ProgressDialog.show(mContext, "Please wait for ",
                "Process Description Text", true);

        // do initialization of required objects objects here
    };

    @Override
    protected Void doInBackground(Void... params) {

        boolean status = ftpHelper.ftpConnect(_address, _user, _pass, _port);
        return null;
    }

    @Override
    protected void onPostExecute(Void result) {
        super.onPostExecute(result);
        progressDialog.dismiss();
    };
}

```


---

## Solution


```
public interface MyInterface {
    public void myMethod(boolean result);
}

public class AsyncConnectTask extends AsyncTask<Void, Void, Boolean> {

    private MyInterface mListener;


    public AsyncConnectTask(Context context, String address, String user,
        String pass, int port, MyInterface mListener) {
        mContext = context;
        _address = address;
        _user = user;
        _pass = pass;
        _port = port;
        this.mListener  = mListener;
    }

    @Override
    protected Boolean doInBackground(Void... params) {
        ....
        return result;
   }


    @Override
    protected void onPostExecute(Boolean result) {
        if (mListener != null) 
            mListener.myMethod(result);
    }
}

AsyncConnectTask task = new AsyncConnectTask(SiteManager.this,
                        _address, _username, _password, _port,  new MyInterface() {
    @Override
    public void myMethod(boolean result) {
        if (result == true) {
            Toast.makeText(SiteManager.this, "Connection Succesful",
            Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(SiteManager.this, "Connection Failed:" + status, Toast.LENGTH_LONG).show();
        } 
    }
});

task.execute();

```

If you call `myMethod` from `onPostExecute` the code inside it will run on the UI Thread. Otherwise you need to post a Runnable through a `Handler`



---

## Notes

- Just change `boolean` with the type of the object you want to pass. E.g `ArrayList<String> results` or `byte[] result`
