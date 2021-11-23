---
metaTitle: Download a file with Android, and showing the progress in a ProgressDialog
tags:
- java
- download
title: Download a file with Android, and showing the progress in a ProgressDialog
---

There are many ways to download files. Following I will post most common ways; it is up to you to decide which method is better for your app.


1. Use `AsyncTask` and show the download progress in a dialog
=============================================================


This method will allow you to execute some background processes and update the UI at the same time (in this case, we'll update a progress bar).


Imports:



```
import android.os.PowerManager;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;

```

This is an example code:



```
// declare the dialog as a member field of your activity
ProgressDialog mProgressDialog;

// instantiate it within the onCreate method
mProgressDialog = new ProgressDialog(YourActivity.this);
mProgressDialog.setMessage("A message");
mProgressDialog.setIndeterminate(true);
mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
mProgressDialog.setCancelable(true);

// execute this when the downloader must be fired
final DownloadTask downloadTask = new DownloadTask(YourActivity.this);
downloadTask.execute("the url to the file you want to download");

mProgressDialog.setOnCancelListener(new DialogInterface.OnCancelListener() {

    @Override
    public void onCancel(DialogInterface dialog) {
        downloadTask.cancel(true); //cancel the task
    }
});

```

The `AsyncTask` will look like this:



```
// usually, subclasses of AsyncTask are declared inside the activity class.
// that way, you can easily modify the UI thread from here
private class DownloadTask extends AsyncTask<String, Integer, String> {

    private Context context;
    private PowerManager.WakeLock mWakeLock;

    public DownloadTask(Context context) {
        this.context = context;
    }

    @Override
    protected String doInBackground(String... sUrl) {
        InputStream input = null;
        OutputStream output = null;
        HttpURLConnection connection = null;
        try {
            URL url = new URL(sUrl[0]);
            connection = (HttpURLConnection) url.openConnection();
            connection.connect();

            // expect HTTP 200 OK, so we don't mistakenly save error report
            // instead of the file
            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                return "Server returned HTTP " + connection.getResponseCode()
                        + " " + connection.getResponseMessage();
            }

            // this will be useful to display download percentage
            // might be -1: server did not report the length
            int fileLength = connection.getContentLength();

            // download the file
            input = connection.getInputStream();
            output = new FileOutputStream("/sdcard/file_name.extension");

            byte data[] = new byte[4096];
            long total = 0;
            int count;
            while ((count = input.read(data)) != -1) {
                // allow canceling with back button
                if (isCancelled()) {
                    input.close();
                    return null;
                }
                total += count;
                // publishing the progress....
                if (fileLength > 0) // only if total length is known
                    publishProgress((int) (total * 100 / fileLength));
                output.write(data, 0, count);
            }
        } catch (Exception e) {
            return e.toString();
        } finally {
            try {
                if (output != null)
                    output.close();
                if (input != null)
                    input.close();
            } catch (IOException ignored) {
            }

            if (connection != null)
                connection.disconnect();
        }
        return null;
    }

```

The method above (`doInBackground`) runs always on a background thread. You shouldn't do any UI tasks there. On the other hand, the `onProgressUpdate` and `onPreExecute` run on the UI thread, so there you can change the progress bar:



```
    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        // take CPU lock to prevent CPU from going off if the user 
        // presses the power button during download
        PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
        mWakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK,
             getClass().getName());
        mWakeLock.acquire();
        mProgressDialog.show();
    }

    @Override
    protected void onProgressUpdate(Integer... progress) {
        super.onProgressUpdate(progress);
        // if we get here, length is known, now set indeterminate to false
        mProgressDialog.setIndeterminate(false);
        mProgressDialog.setMax(100);
        mProgressDialog.setProgress(progress[0]);
    }

    @Override
    protected void onPostExecute(String result) {
        mWakeLock.release();
        mProgressDialog.dismiss();
        if (result != null)
            Toast.makeText(context,"Download error: "+result, Toast.LENGTH_LONG).show();
        else
            Toast.makeText(context,"File downloaded", Toast.LENGTH_SHORT).show();
    }

```

For this to run, you need the WAKE\_LOCK permission.



```
<uses-permission android:name="android.permission.WAKE_LOCK" />

```

2. Download from Service
========================


The big question here is: *how do I update my activity from a service?*. In the next example we are going to use two classes you may not be aware of: `ResultReceiver` and `IntentService`. `ResultReceiver` is the one that will allow us to update our thread from a service; `IntentService` is a subclass of `Service` which spawns a thread to do background work from there (you should know that a `Service` runs actually in the same thread of your app; when you extends `Service`, you must manually spawn new threads to run CPU blocking operations).


Download service can look like this:



```
public class DownloadService extends IntentService {
    public static final int UPDATE_PROGRESS = 8344;

    public DownloadService() {
        super("DownloadService");
    }
    @Override
    protected void onHandleIntent(Intent intent) {

        String urlToDownload = intent.getStringExtra("url");
        ResultReceiver receiver = (ResultReceiver) intent.getParcelableExtra("receiver");
        try {

            //create url and connect
            URL url = new URL(urlToDownload);
            URLConnection connection = url.openConnection();
            connection.connect();

            // this will be useful so that you can show a typical 0-100% progress bar
            int fileLength = connection.getContentLength();

            // download the file
            InputStream input = new BufferedInputStream(connection.getInputStream());

            String path = "/sdcard/BarcodeScanner-debug.apk" ;
            OutputStream output = new FileOutputStream(path);

            byte data[] = new byte[1024];
            long total = 0;
            int count;
            while ((count = input.read(data)) != -1) {
                total += count;

                // publishing the progress....
                Bundle resultData = new Bundle();
                resultData.putInt("progress" ,(int) (total * 100 / fileLength));
                receiver.send(UPDATE_PROGRESS, resultData);
                output.write(data, 0, count);
            }

            // close streams 
            output.flush();
            output.close();
            input.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        Bundle resultData = new Bundle();
        resultData.putInt("progress" ,100);

        receiver.send(UPDATE_PROGRESS, resultData);
    }
}

```

Add the service to your manifest:



```
<service android:name=".DownloadService"/>

```

And the activity will look like this:



```
// initialize the progress dialog like in the first example

// this is how you fire the downloader
mProgressDialog.show();
Intent intent = new Intent(this, DownloadService.class);
intent.putExtra("url", "url of the file to download");
intent.putExtra("receiver", new DownloadReceiver(new Handler()));
startService(intent);

```

Here is were `ResultReceiver` comes to play:



```
private class DownloadReceiver extends ResultReceiver{

    public DownloadReceiver(Handler handler) {
        super(handler);
    }

    @Override
    protected void onReceiveResult(int resultCode, Bundle resultData) {

        super.onReceiveResult(resultCode, resultData);

        if (resultCode == DownloadService.UPDATE_PROGRESS) {

            int progress = resultData.getInt("progress"); //get the progress
            dialog.setProgress(progress);

            if (progress == 100) {
                dialog.dismiss();
            }
        }
    }
}

```

2.1 Use Groundy library
-----------------------


[**Groundy**](http://github.com/casidiablo/groundy) is a library that basically helps you run pieces of code in a background service, and it is based on the `ResultReceiver` concept shown above. This library is **deprecated** at the moment. This is how the **whole** code would look like:


The activity where you are showing the dialog...



```
public class MainActivity extends Activity {

    private ProgressDialog mProgressDialog;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        findViewById(R.id.btn_download).setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                String url = ((EditText) findViewById(R.id.edit_url)).getText().toString().trim();
                Bundle extras = new Bundler().add(DownloadTask.PARAM_URL, url).build();
                Groundy.create(DownloadExample.this, DownloadTask.class)
                        .receiver(mReceiver)
                        .params(extras)
                        .queue();

                mProgressDialog = new ProgressDialog(MainActivity.this);
                mProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
                mProgressDialog.setCancelable(false);
                mProgressDialog.show();
            }
        });
    }

    private ResultReceiver mReceiver = new ResultReceiver(new Handler()) {
        @Override
        protected void onReceiveResult(int resultCode, Bundle resultData) {
            super.onReceiveResult(resultCode, resultData);
            switch (resultCode) {
                case Groundy.STATUS_PROGRESS:
                    mProgressDialog.setProgress(resultData.getInt(Groundy.KEY_PROGRESS));
                    break;
                case Groundy.STATUS_FINISHED:
                    Toast.makeText(DownloadExample.this, R.string.file_downloaded, Toast.LENGTH_LONG);
                    mProgressDialog.dismiss();
                    break;
                case Groundy.STATUS_ERROR:
                    Toast.makeText(DownloadExample.this, resultData.getString(Groundy.KEY_ERROR), Toast.LENGTH_LONG).show();
                    mProgressDialog.dismiss();
                    break;
            }
        }
    };
}

```

A `GroundyTask` implementation used by **Groundy** to download the file and show the progress:



```
public class DownloadTask extends GroundyTask {    
    public static final String PARAM_URL = "com.groundy.sample.param.url";

    @Override
    protected boolean doInBackground() {
        try {
            String url = getParameters().getString(PARAM_URL);
            File dest = new File(getContext().getFilesDir(), new File(url).getName());
            DownloadUtils.downloadFile(getContext(), url, dest, DownloadUtils.getDownloadListenerForTask(this));
            return true;
        } catch (Exception pokemon) {
            return false;
        }
    }
}

```

And just add this to the manifest:



```
<service android:name="com.codeslap.groundy.GroundyService"/>

```

It couldn't be easier I think. Just grab the latest jar [from Github](https://github.com/casidiablo/groundy/downloads) and you are ready to go. Keep in mind that **Groundy**'s main purpose is to make calls to external REST apis in a background service and post results to the UI with easily. If you are doing something like that in your app, it could be really useful.


2.2 Use <https://github.com/koush/ion>
--------------------------------------


3. Use `DownloadManager` class (`GingerBread` and newer only)
=============================================================


GingerBread brought a new feature, `DownloadManager`, which allows you to download files easily and delegate the hard work of handling threads, streams, etc. to the system.


First, let's see a utility method:



```
/**
 * @param context used to check the device version and DownloadManager information
 * @return true if the download manager is available
 */
public static boolean isDownloadManagerAvailable(Context context) {

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.GINGERBREAD) {
        return true;
    }
    return false;
}

```

Method's name explains it all. Once you are sure `DownloadManager` is available, you can do something like this:



```
String url = "url you want to download";
DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));
request.setDescription("Some descrition");
request.setTitle("Some title");
// in order for this if to run, you must use the android 3.2 to compile your app
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB) {
    request.allowScanningByMediaScanner();
    request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
}
request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "name-of-the-file.ext");

// get download service and enqueue file
DownloadManager manager = (DownloadManager) getSystemService(Context.DOWNLOAD_SERVICE);
manager.enqueue(request);

```

Download progress will be showing in the notification bar.


Final thoughts
==============


First and second methods are just the tip of the iceberg. There are lots of things you have to keep in mind if you want your app to be robust. Here is a brief list:


* You must check whether user has an internet connection available
* Make sure you have the right permissions (`INTERNET` and `WRITE_EXTERNAL_STORAGE`); also `ACCESS_NETWORK_STATE` if you want to check internet availability.
* Make sure the directory were you are going to download files exist and has write permissions.
* If download is too big you may want to implement a way to resume the download if previous attempts failed.
* Users will be grateful if you allow them to interrupt the download.


Unless you need detailed control of the download process, then consider using `DownloadManager` (3) because it already handles most of the items listed above.


But also consider that your needs may change. For example, `DownloadManager` [does no response caching](https://stackoverflow.com/questions/35191718). It will blindly download the same big file multiple times. There's no easy way to fix it after the fact. Where if you start with a basic `HttpURLConnection` (1, 2), then all you need is to add an `HttpResponseCache`. So the initial effort of learning the basic, standard tools can be a good investment.



> 
> This class was deprecated in API level 26. ProgressDialog is a modal
>  dialog, which prevents the user from interacting with the app. Instead
>  of using this class, you should use a progress indicator like
>  ProgressBar, which can be embedded in your app's UI. Alternatively,
>  you can use a notification to inform the user of the task's progress. For more details [Link](https://developer.android.com/reference/android/app/ProgressDialog)
> 
> 
> 

