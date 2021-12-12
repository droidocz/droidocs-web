---
metaTitle: How to pass values between Fragments
title: How to pass values between Fragments
---

## Context

I am just trying to build a simple sample application that uses Fragments. My scenario is, I have two activities with one fragment inside each activity. The first fragment has an edittext and a button. The second fragment has a textview. When I enter a name in the edittext and click on the button, the textview in the second fragment should display the name entered in the edittext of the first fragment.


I was able to send the value from first fragment to its activity and then from that activity to second activity. Now how do I use this value inside the second fragment?


Here is the Java code:



```
package com.example.fragmentexample;

import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentManager;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class Fragment_1 extends Fragment{

    OnFragmentChangedListener mCallback;

    // Container Activity must implement this interface
    public interface OnFragmentChangedListener {
        public void onButtonClicked(String name);
    }

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);

        // This makes sure that the container activity has implemented
        // the callback interface. If not, it throws an exception
        try {
            mCallback = (OnFragmentChangedListener) activity;
        } catch (ClassCastException e) {
            throw new ClassCastException(activity.toString()
                    + " must implement OnHeadlineSelectedListener");
        }
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        // TODO Auto-generated method stub

        View view = inflater.inflate(R.layout.fragment_fragment_1, container, false);

        final EditText edtxtPersonName_Fragment = (EditText) view.findViewById(R.id.edtxtPersonName);
        Button btnSayHi_Fragment = (Button) view.findViewById(R.id.btnSayHi);

        btnSayHi_Fragment.setOnClickListener(new OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub

                String name = edtxtPersonName_Fragment.getText().toString();

                FragmentManager fm = getFragmentManager();
                Fragment_2 f2 = (Fragment_2) fm.findFragmentById(R.id.fragment_content_2);

                Activity activity = getActivity();

                if(activity != null)
                {
                    Toast.makeText(activity, "Say&ing Hi in Progress...", Toast.LENGTH_LONG).show();
                }


                if(f2 != null && f2.isInLayout())
                {
                    f2.setName(name);
                }
                else
                {
                    mCallback.onButtonClicked(name);
                }
            }
        });

        return view;


    }

}

```

### File *MainActivity.Java*



```
package com.example.fragmentexample;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;

import android.view.Choreographer.FrameCallback;
import android.view.Menu;

public class MainActivity extends Activity implements Fragment_1.OnFragmentChangedListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }

    @Override
    public void onButtonClicked(String name) {
        // TODO Auto-generated method stub

        Intent i = new Intent(this, SecondActivity.class);
        i.putExtra("", name);
        startActivity(i);
    }

}

```

### File *SecondActivity.Java*



```
package com.example.fragmentexample;

import android.app.Activity;
import android.os.Bundle;

public class SecondActivity extends Activity{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_second);

        Bundle b = getIntent().getExtras();

        Fragment_2 f2 = new Fragment_2();
        f2.setArguments(b);
    }
}

```

Fragment\_2.Java



```
package com.example.fragmentexample;

import android.app.Activity;
import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

public class Fragment_2 extends Fragment{

    View view;
    TextView txtName;


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
            Bundle savedInstanceState) {
        // TODO Auto-generated method stub

        view = inflater.inflate(R.layout.fragment_fragment_2, container, false);

            // Exception at this line
        String name = getArguments().getString("message");
        txtName = (TextView) view.findViewById(R.id.txtViewResult);
        txtName.setText(name);

        return view;
    }

    @Override
    public void onAttach(Activity activity) {
        // TODO Auto-generated method stub
        super.onAttach(activity);
    }

    public void setName(String name)
    {
        txtName.setText("Hi " + name);
    }

}

```

I get the following exception:



```
04-16 18:10:24.573: E/AndroidRuntime(713): FATAL EXCEPTION: main
04-16 18:10:24.573: E/AndroidRuntime(713): java.lang.RuntimeException: Unable to start activity ComponentInfo{com.example.fragmentexample/com.example.fragmentexample.SecondActivity}: android.view.InflateException: Binary XML file line #8: Error inflating class fragment
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:1815)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:1831)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.ActivityThread.access$500(ActivityThread.java:122)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1024)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.os.Handler.dispatchMessage(Handler.java:99)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.os.Looper.loop(Looper.java:132)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.ActivityThread.main(ActivityThread.java:4123)
04-16 18:10:24.573: E/AndroidRuntime(713):  at java.lang.reflect.Method.invokeNative(Native Method)
04-16 18:10:24.573: E/AndroidRuntime(713):  at java.lang.reflect.Method.invoke(Method.java:491)
04-16 18:10:24.573: E/AndroidRuntime(713):  at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:841)
04-16 18:10:24.573: E/AndroidRuntime(713):  at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:599)
04-16 18:10:24.573: E/AndroidRuntime(713):  at dalvik.system.NativeStart.main(Native Method)
04-16 18:10:24.573: E/AndroidRuntime(713): Caused by: android.view.InflateException: Binary XML file line #8: Error inflating class fragment
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.view.LayoutInflater.createViewFromTag(LayoutInflater.java:688)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.view.LayoutInflater.rInflate(LayoutInflater.java:724)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.view.LayoutInflater.inflate(LayoutInflater.java:479)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.view.LayoutInflater.inflate(LayoutInflater.java:391)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.view.LayoutInflater.inflate(LayoutInflater.java:347)
04-16 18:10:24.573: E/AndroidRuntime(713):  at com.android.internal.policy.impl.PhoneWindow.setContentView(PhoneWindow.java:223)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.Activity.setContentView(Activity.java:1786)
04-16 18:10:24.573: E/AndroidRuntime(713):  at com.example.fragmentexample.SecondActivity.onCreate(SecondActivity.java:13)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.Activity.performCreate(Activity.java:4397)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.Instrumentation.callActivityOnCreate(Instrumentation.java:1048)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:1779)
04-16 18:10:24.573: E/AndroidRuntime(713):  ... 11 more
04-16 18:10:24.573: E/AndroidRuntime(713): Caused by: java.lang.NullPointerException
04-16 18:10:24.573: E/AndroidRuntime(713):  at com.example.fragmentexample.Fragment_2.onCreateView(Fragment_2.java:24)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.FragmentManagerImpl.moveToState(FragmentManager.java:754)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.FragmentManagerImpl.moveToState(FragmentManager.java:956)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.FragmentManagerImpl.addFragment(FragmentManager.java:1035)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.app.Activity.onCreateView(Activity.java:4177)
04-16 18:10:24.573: E/AndroidRuntime(713):  at android.view.LayoutInflater.createViewFromTag(LayoutInflater.java:664)
04-16 18:10:24.573: E/AndroidRuntime(713):  ... 21 more

```

How do I get the value from the bundle in SecondActivity.java to the *Fragment\_2.Java* file?



---

From the [Developers website](http://developer.android.com/training/basics/fragments/communicating.html):



> 
> Often you will want one Fragment to communicate with another, for example to change the content based on a user event. All Fragment-to-Fragment communication is done through the associated Activity. Two Fragments should never communicate directly.
> 
> 
> 


You can communicate among fragments with the help of its Activity. You can communicate among activity and fragment using [this approach](http://developer.android.com/guide/components/fragments.html#CommunicatingWithActivity).


Please check [this link](http://manishkpr.webheavens.com/android-passing-data-between-fragments/) also.



---

## Notes

- The second link that you have given, shows how to communicate between fragments when they are in the same activity.
