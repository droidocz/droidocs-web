---
metaTitle: How to set custom ActionBar color / style
tags:
- colors
- background
- navigation-drawer
title: How to set custom ActionBar color / style
---

## Context

I am using `Android Navigation bar` in my project,
I want to change the top color in action bar to something red, How can i do that?
I have something like this,


![top black](https://i.stack.imgur.com/KYxlA.png)


and i want something like this,


![top red](https://i.stack.imgur.com/evZdw.png)


how can i achieve that?



---

You can define the color of the ActionBar (and other stuff) by **creating a custom Style**:


Simply edit the **res/values/styles.xml** file of your Android project.


For example like this:



```
<resources>
    <style name="MyCustomTheme" parent="@android:style/Theme.Holo.Light">
        <item name="android:actionBarStyle">@style/MyActionBarTheme</item>
    </style>

    <style name="MyActionBarTheme" parent="@android:style/Widget.Holo.Light.ActionBar">
        <item name="android:background">ANY_HEX_COLOR_CODE</item>
    </style>
</resources>

```

**Then set "MyCustomTheme" as the Theme of your Activity that contains the ActionBar.**


You can also set a color for the ActionBar like this:



```
ActionBar actionBar = getActionBar();
actionBar.setBackgroundDrawable(new ColorDrawable(Color.RED)); // set your desired color

```

Taken from here: [How do I change the background color of the ActionBar of an ActionBarActivity using XML?](https://stackoverflow.com/questions/8024706/how-do-i-change-the-background-color-of-the-actionbar-of-an-actionbaractivity-us)



---

## Notes

- what about remaining valuesv14 and valuesv21 styles.xml files in android
- What do you mean by "Then set "MyCustomTheme" as the Theme of your Activity that contains the ActionBar."
-  use ```setTheme(R.style.MyCustomTheme)```  in the onCreate method of your activity.
- How would one go about changing the title textStyle?
