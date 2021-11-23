---
metaTitle: How to hide action bar before activity is created, and then show it again
tags:
- android-3.0-honeycomb
title: How to hide action bar before activity is created, and then show it again
---

Setting `android:windowActionBar="false"` truly disables the ActionBar but then, as you say, `getActionBar();` returns null.
This is solved by:



```
public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().requestFeature(Window.FEATURE_ACTION_BAR);
    getActionBar().hide();

    setContentView(R.layout.splash); // be sure you call this AFTER requestFeature

```

This creates the ActionBar and immediately hides it before it had the chance to be displayed.


But now there is another problem. After putting `windowActionBar="false"` in the theme, the Activity draws its normal Window Title instead of an ActionBar.  

If we try to avoid this by using some of the `*.NoTitleBar` stock themes or we try to put `<item name="android:windowNoTitle">true</item>` in our own theme, it won't work.  

The reason is that the ActionBar *depends* on the Window Title to display itself - that is the ActionBar is a transformed Window Title.  

So the trick which can help us out is to add one more thing to our Activity theme xml:



```
<item name="android:windowActionBar">false</item>
<item name="android:windowTitleSize">0dp</item>

```

This will make the Window Title with zero height, thus practically invisible .


In your case, after you are done with displaying the splash screen you can simply call 



```
setContentView(R.layout.main);
getActionBar().show();

```

and you are done. The Activity will start with no ActionBar flickering, nor Window Title showing.


**ADDON:**
If you show and hide the ActionBar multiple times maybe you have noticed that the *first* showing is *not* animated. From then on showing and hiding are animated. If you want to have animation on the first showing too you can use this:



```
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    requestWindowFeature(Window.FEATURE_ACTION_BAR);

    // delaying the hiding of the ActionBar
    Handler h = new Handler();
    h.post(new Runnable() {     
        @Override
        public void run() {
            getActionBar().hide();
        }
    });

```

The same thing can be achieved with:



```
protected void onPostResume() {
    super.onPostResume();
    getActionBar().hide();

```

but it may need some extra logic to check if this is the first showing of the Activity.


The idea is to delay a little the hiding of the ActionBar. In a way we let the ActionBar be shown, but then hide it immediately. Thus we go beyond the first non-animated showing and next showing will be considered second, thus it will be animated.


As you may have guessed there is a chance that the ActionBar *could* be seen before it has been hidden by the delayed operation. This is actually the case. Most of the time nothing is seen but yet, once in a while, you can see the ActionBar flicker for a split second.


In any case this is not a pretty solution, so I welcome any suggestions.


**Addition** for v7 support actionbar user, the code will be:



```
getWindow().requestFeature(Window.FEATURE_ACTION_BAR);
getSupportActionBar().hide();

```
