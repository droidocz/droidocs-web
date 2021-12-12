---
metaTitle: How to add code snippets in Android Studio IDE
title: How to add code snippets in Android Studio IDE
---

## Context

does anyone know how to add code snippets in Android Studio IDE?
I didn't found a menu entry or something like this.


I also want to know is it possible to change the existing snippets?



---

Code snippets are known as Live Templates in Android Studio


Browse the current Live Templates
=================================


Go to **File > Settings > Editor > Live Templates**. Then click on the different options to see what they do.


[![enter image description here](https://i.stack.imgur.com/Ieoow.png)](https://i.stack.imgur.com/Ieoow.png)


Here are some interesting ones:


* foreach



```
for ($i$ : $data$) {
    $cursor$
}

```
* Toast



```
android.widget.Toast.makeText($className$.this, "$text$", Toast.LENGTH_SHORT).show();

```
* todo



```
// TODO: $date$ $todo$ 

```
* logi



```
android.util.Log.i(TAG, "$METHOD_NAME$: $content$");

```


The words surrounded by `$` signs are places where things will be filled in automatically from the context or where the user can tab through to fill them in.


Use a Live Template
===================


Just type in the abbreviation and tab through anything that you need to fill in.


Example:



```
logi

```

and I'm given this



```
Log.i(TAG, "myMethodName: |");

```

with the cursor located at the position I marked with the vertical line `|`.


Make you own Live Template
==========================


Just write the code, highlight it, and go to **Tools > Save as Live Template**.


Further Study
=============


* [Creating and Editing Live Templates](https://www.jetbrains.com/help/idea/2016.2/creating-and-editing-live-templates.html) (IntelliJ docs)
* [Level-up with Android Studio Shortcuts and Live Templates](http://blog.stablekernel.com/level-up-with-android-studio-shortcuts-and-live-templates/)
* [Android Studio Live Templates](https://www.bignerdranch.com/blog/android-studio-live-templates/)
