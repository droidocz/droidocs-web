---
metaTitle: Callback to a Fragment from a DialogFragment
tags:
- callback
- android-dialogfragment
title: Callback to a Fragment from a DialogFragment
---

## Context

Question: How does one create a callback from a DialogFragment to another Fragment. In my case, the Activity involved should be completely unaware of the DialogFragment.


Consider I have



```
public class MyFragment extends Fragment implements OnClickListener

```

Then at some point I *could* do



```
DialogFragment dialogFrag = MyDialogFragment.newInstance(this);
dialogFrag.show(getFragmentManager, null);

```

Where MyDialogFragment looks like 



```
protected OnClickListener listener;
public static DialogFragment newInstance(OnClickListener listener) {
    DialogFragment fragment = new DialogFragment();
    fragment.listener = listener;
    return fragment;
}

```

But there is no guarantee that the listener will be around if the DialogFragment pauses and resumes through its lifecycle. The only guarantees in a Fragment are those passed in through a Bundle via setArguments and getArguments.


There is a way to reference the activity if it should be the listener:



```
public Dialog onCreateDialog(Bundle bundle) {
    OnClickListener listener = (OnClickListener) getActivity();
    ....
    return new AlertDialog.Builder(getActivity())
        ........
        .setAdapter(adapter, listener)
        .create();
}

```

But I don't want the Activity to listen for events, I need a Fragment. Really, it could be any Java object that implements OnClickListener.


Consider the concrete example of a Fragment that presents an AlertDialog via DialogFragment. It has Yes/No buttons. How can I send these button presses back to the Fragment that created it?



---

Activity involved is completely unaware of the DialogFragment.


Fragment class:



```
public class MyFragment extends Fragment {
int mStackLevel = 0;
public static final int DIALOG_FRAGMENT = 1;

@Override
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    if (savedInstanceState != null) {
        mStackLevel = savedInstanceState.getInt("level");
    }
}

@Override
public void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    outState.putInt("level", mStackLevel);
}

void showDialog(int type) {

    mStackLevel++;

    FragmentTransaction ft = getActivity().getFragmentManager().beginTransaction();
    Fragment prev = getActivity().getFragmentManager().findFragmentByTag("dialog");
    if (prev != null) {
        ft.remove(prev);
    }
    ft.addToBackStack(null);

    switch (type) {

        case DIALOG_FRAGMENT:

            DialogFragment dialogFrag = MyDialogFragment.newInstance(123);
            dialogFrag.setTargetFragment(this, DIALOG_FRAGMENT);
            dialogFrag.show(getFragmentManager().beginTransaction(), "dialog");

            break;
    }
}

@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch(requestCode) {
            case DIALOG_FRAGMENT:

                if (resultCode == Activity.RESULT_OK) {
                    // After Ok code.
                } else if (resultCode == Activity.RESULT_CANCELED){
                    // After Cancel code.
                }

                break;
        }
    }
}

}

```

DialogFragment class:



```
public class MyDialogFragment extends DialogFragment {

public static MyDialogFragment newInstance(int num){

    MyDialogFragment dialogFragment = new MyDialogFragment();
    Bundle bundle = new Bundle();
    bundle.putInt("num", num);
    dialogFragment.setArguments(bundle);

    return dialogFragment;

}

@Override
public Dialog onCreateDialog(Bundle savedInstanceState) {

    return new AlertDialog.Builder(getActivity())
            .setTitle(R.string.ERROR)
            .setIcon(android.R.drawable.ic_dialog_alert)
            .setPositiveButton(R.string.ok_button,
                    new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int whichButton) {
                            getTargetFragment().onActivityResult(getTargetRequestCode(), Activity.RESULT_OK, getActivity().getIntent());
                        }
                    }
            )
            .setNegativeButton(R.string.cancel_button, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int whichButton) {
                    getTargetFragment().onActivityResult(getTargetRequestCode(), Activity.RESULT_CANCELED, getActivity().getIntent());
                }
            })
            .create();
}
}

```


---

## Notes

- I think the key here is `setTargetFragment` and `getTargetFragment`. The use of `onActivityResult` is a little unclear. It would probably be better to declare your own specific method in the Fragment caller,  and use that, instead of re-purposing onActivityResult.
-  your objection is entirely reasonable, but I think the value of onActivityResult() is that it's guaranteed to exist on any Fragment, so any Fragment can be used as the parent. If you create your own interface and have the parent Fragment implement it, then the child can only be used with parents that implement that interface. Coupling the child to that interface might come back to haunt you if you start using the child more widely later. Using the "built-in" onActivityResult() interface requires no additional coupling, so it allows you a little more flexibility.
- Used this. Instead of onActivityResult, my fragment implements DialogResultHandler#handleDialogResult (an interface I created).
- stack level variable is not used?
- also made it with a custom layout with 2 edittexts. In the onClick, add Intent addeddata = getActivity().getIntent();  You'll pass this in the getTargetFragment call instead of the one above. EditText tmp = (EditText) customlayoutview.findViewById(R.id.memberid);     
                             addeddata.putExtra(mbr_id_key, tmp.getText().toString() );
Then in the activityresult, use data.getStringExtra(MyAlertDialogFragment.mbr_id_key)
- While using of `setTargetFragment` is nice, I wonder where is an `add` or `replace` and `commit` in your `FragmentTransaction`?
- Use `getParentFragment` method instead. Problem with this code is that, it gives a fragment's reference over another fragment, which may cause `IllegalStateException` and memory leaks.
