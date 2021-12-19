---
metaTitle: Data directory has no read/write permission in Android
tags:
- android-manifest
title: Data directory has no read/write permission in Android
---

## Problem

I m using Android 1.5 my data directory doesn't have the read/write permissions 



```
System.out.println("DAta can write??--->"+Environment.getDataDirectory().canWrite());
System.out.println("DAta can read??--->"+Environment.getDataDirectory().canRead());

```

So please suggest me how to provide permissions for the data directory.


What I'm trying to do is to create a file and add some content to it in the Data storage of the emulator like as below



```
private void writeToSDCard() {
        try {

            File lroot = Environment.getDataDirectory();

            if (lroot.canWrite()){
                File lfile = new File(lroot, "samplefile.txt");
                FileWriter lfilewriter = new FileWriter(lfile);
                BufferedWriter lout = new BufferedWriter(lfilewriter);
                lout.write("XXXXXXXXXXXXXXXXXX");
                lout.close();
            }
        } catch (IOException e) {
            Log.e(m_cTAG, "Could not write file " + e.getMessage());
        }
    }

```


---

## Solution

You shouldn't be looking at the Data Directory. This is a system directory in the phone's storage - usually `/data` - and your application will never have permission to write to it.


The directory your application should write files to is returned by the [`Context.getFilesDir()` method](http://developer.android.com/reference/android/content/Context.html#getFilesDir()). It will be something like `/data/data/com.yourdomain.YourApp/files`.


If you want to write to a file in the phone's storage use the [`Context.openFileOutput()` method](http://developer.android.com/reference/android/content/Context.html#openFileOutput(java.lang.String,%20int)).


If you want the path to the SDCard then use [`Environment.getExternalStorageDirectory()` method](http://developer.android.com/reference/android/os/Environment.html#getExternalStorageDirectory()). To write to the SDCard you'll need to give your application the appropriate permissions by adding the following to your Manifest:



```
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

```

If you're going to write to the SDCard you'll also need to check its state with the `getExternalStorageState()` method.


If you're storing small files to do with your application then these can go into the phone's storage and not the SD Card, so use the `Context.openFileOutput()` and `Context.openFileInput()` methods.


So in your code consider something like:



```
OutputStream os = openFileOutput("samplefile.txt", MODE_PRIVATE);
BufferedWriter lout = new BufferedWriter(new OutputStreamWriter(os));

```


---

## Notes

- [`Environment.getExternalStorageDirectory()` is deprecated in API Level 29 onwards](https://developer.android.com/reference/android/os/Environment.html#getExternalStorageDirectory()).
- Which specific external storage states will allow a file to be written?
- Here is wat m tryng to do:

private void writeToSDCard() {
   try {
         File lroot = Environment.getDataDirectory();
         
         if (lroot.canWrite()){
             File lfile = new File(lroot, "samplefile.txt");
             FileWriter lfilewriter = new FileWriter(lfile);
             BufferedWriter lout = new BufferedWriter(lfilewriter);
             lout.write("XXXXXXXXXXXXXXXXXX");
             lout.close();
         }
     } catch (IOException e) {
         Log.e(m_cTAG, "Could not write file " + e.getMessage());
     }
    }
