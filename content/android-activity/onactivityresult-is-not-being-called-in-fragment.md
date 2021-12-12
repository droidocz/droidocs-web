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

Inside your fragment, call



```
this.startActivityForResult(intent, REQUEST_CODE);

```

where `this` is referring to the fragment. Otherwise do as @Clevester said:



```
Fragment fragment = this;
....
fragment.startActivityForResult(intent, REQUEST_CODE);

```

I also had to call



```
super.onActivityResult(requestCode, resultCode, data);

```

in the parent activity's `onActivityResult` to make it work.


(I adapted this answer from @Clevester's answer.)

