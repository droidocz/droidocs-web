---
metaTitle: onActivityResult is not being called in Fragment
tags:
- android-fragments
title: onActivityResult is not being called in Fragment
---

## Context

The activity hosting this fragment has its `onActivityResult` called when the camera activity returns.


My fragment starts an activity for a result with the intent sent for the camera to take a picture. The picture application loads fine, takes a picture, and returns. The `onActivityResult` however is never hit. I've set breakpoints, but nothing is triggered. Can a fragment have `onActivityResult`? I'd think so since it's a provided function. Why isn't this being triggered?



```
ImageView myImage = (ImageView)inflatedView.findViewById(R.id.image);
myImage.setOnClickListener(new OnClickListener() {
    @Override
    public void onClick(View view) {
        Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(cameraIntent, 1888);
    }
});

@Override
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    if( requestCode == 1888 ) {
        Bitmap photo = (Bitmap) data.getExtras().get("data");
        ((ImageView)inflatedView.findViewById(R.id.image)).setImageBitmap(photo);
    }
}

```


---

The hosting activity overrides `onActivityResult()`, but it did not make a call to `super.onActivityResult()` for unhandled result codes. Apparently, even though the fragment is the one making the `startActivityForResult()` call, the activity gets the first shot at handling the result. This makes sense when you consider the modularity of fragments. Once I implemented `super.onActivityResult()` for all unhandled results, the fragment got a shot at handling the result.


And also from @siqing answer:


To get the result in your fragment make sure you call `startActivityForResult(intent,111);` instead of `getActivity().startActivityForResult(intent,111);` inside your fragment.



---

## Notes:

-  Make sure you call startActivityForResult() and not getActivity().startActivityForResult() from your fragment.
- Also note that if you are using nested fragments, the child fragment should call `getParentFragment().startActivityForResult` so that the parent fragment will have its onActivityResult method called.
- There appears to be a related bug, where the support library is being used http://code.google.com/p/android/issues/detail?id=15394
- For this, you'd better call getParentFragment().startActivityForResult(), and in that parent fragment, then, you can implement onActivityResult() and in that method deliver the result to the child fragmen, ie: childFragment.getParentFragment().onActivityResult(requestCode, resultCode, data)
- I have super.onActivityResult in both Fragment and Activity.
-  but then there is the issue with the wrong request code being returned.
- I find that calling `startActivityForResult()` from my Fragment then having `super.onActivityResult()` in my `FragmentActivity` makes ALL fragments in the `getFragmentManager()` have their `onActivityResult()` called. Ensuring that ALL requestCodes are unique.
- I believe that if the Activity extends android.app.Activity and not FragmentActivity, the `onActivityResult` base method does nothing. Even in API 24.
- was this issue fixed on newer support library versions?
- This problem certainly could have cost me hours.
-  Did you call `startActivityForResult()` in your fragments? I guess if you call that method in activity, it won't notify its fragments... Just guessing...
- I wanted to start intent in my adapter, and i tried every method but didn't work, at last i declared a callback interface in my adapter and i start intent in my fragment and its fixed.
- If you are using ViewPager, apart from doing what this answer says, you also need to do what  Kropachov says. Combining both approaches solved my problem.
-  adding super.onActivityResult(requestCode, result, intent) in Activity not working for me.
- This got me close to solving my problem, but i already had `super.onActivityResult()` in my host activity.
- Also, note that if you are handling sending the result in onBackPressed() method then you shouldn't call `super.onBackPressed()`
- what to do if I want to call startActivityForResult from static method in my fragment?
- Sorry but it's nor working for me... 
 public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }
wont send onActivityResult to my fragments...
