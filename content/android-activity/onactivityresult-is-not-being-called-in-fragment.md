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

