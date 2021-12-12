---
metaTitle: Google Maps Android API v2 - detect touch on map
tags:
- maps
- touch
- google-maps-api-2
title: Google Maps Android API v2 - detect touch on map
---

## Context

I can't find an example on how to intercept the map touch on the new Google Maps API v2.


I need to know when the user touches the map in order to stop a thread (the centering of the map around my current location).



---

@ape wrote an answer here on how to intercept the map clicks, but I need to intercept the touches, and then he suggested the following link in a comment of its answer, [How to handle onTouch event for map in Google Map API v2?](https://stackoverflow.com/questions/13722869/how-to-handle-ontouch-event-for-map-in-google-map-api-v2).


That solution seems to be a possible workaround, but the suggested code was incomplete. For this reason I rewrote and tested it, and now it works.


Here it is the working code:


I created the class MySupportMapFragment.java



```
import com.google.android.gms.maps.SupportMapFragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

public class MySupportMapFragment extends SupportMapFragment {
    public View mOriginalContentView;
    public TouchableWrapper mTouchView;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
        mOriginalContentView = super.onCreateView(inflater, parent, savedInstanceState);
        mTouchView = new TouchableWrapper(getActivity());
        mTouchView.addView(mOriginalContentView);
        return mTouchView;
    }

    @Override
    public View getView() {
        return mOriginalContentView;
    }
}

```

I even created the class TouchableWrapper.java:



```
import android.content.Context;
import android.view.MotionEvent;
import android.widget.FrameLayout;

public class TouchableWrapper extends FrameLayout {

    public TouchableWrapper(Context context) {
        super(context);
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent event) {

        switch (event.getAction()) {

            case MotionEvent.ACTION_DOWN:
                  MainActivity.mMapIsTouched = true;
                  break;

            case MotionEvent.ACTION_UP:
                  MainActivity.mMapIsTouched = false;
                  break;
        }
        return super.dispatchTouchEvent(event);
    }
}

```

In the layout I declare it this way:



```
<fragment xmlns:android="http://schemas.android.com/apk/res/android"
          android:id="@+id/mapFragment"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:layout_alignParentBottom="true"
          android:layout_below="@+id/buttonBar"
          class="com.myFactory.myApp.MySupportMapFragment"
/>

```

Just for test in the main Activity I wrote only the following:



```
public class MainActivity extends FragmentActivity {
    public static boolean mMapIsTouched = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}

```


---

## Notes

- Voted up, because that's not what the user needed but that's what he asked.
-  I had to improve a bit on that solution, mainly by using a custom listener instead of using a public static variable.
- http://dimitar.me/how-to-detect-a-user-pantouchdrag-on-android-map-v2/comment-page-1/
