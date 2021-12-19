---
metaTitle: 'Xamarin.Forms ListView: Set the highlight color of a tapped item'
tags:
- ios
- xamarin
- xamarin.forms
title: 'Xamarin.Forms ListView: Set the highlight color of a tapped item'
---

## Problem

Using *Xamarin.Forms*, how can I define the highlight/background color of a selected/tapped ListView item?


(My list has a black background and white text color, so the default highlight color on iOS is too bright. In contrast, on Android there is no highlighting at all - up to a subtle horizontal gray line.)


**Example:** (left: iOS, right: Android; while pressing "Barn2")


![](https://i.stack.imgur.com/2VSCB.png)
![](https://i.stack.imgur.com/r8xlt.png)



---

## Solution

In Android simply edit your styles.xml file under Resources\values adding this:



```
<resources>
  <style name="MyTheme" parent="android:style/Theme.Material.Light.DarkActionBar">
   <item name="android:colorPressedHighlight">@color/ListViewSelected</item>
   <item name="android:colorLongPressedHighlight">@color/ListViewHighlighted</item>
   <item name="android:colorFocusedHighlight">@color/ListViewSelected</item>
   <item name="android:colorActivatedHighlight">@color/ListViewSelected</item>
   <item name="android:activatedBackgroundIndicator">@color/ListViewSelected</item>
  </style>
<color name="ListViewSelected">#96BCE3</color>
<color name="ListViewHighlighted">#E39696</color>
</resources>

```


---

## Notes

- The color in the question is when the item is "tapped", which i believe is different to after the tap when it then goes to "selected". This solution works for me on the selected item (after the tap) but "during" the tap i get the same faded pink as in the image in the question.
