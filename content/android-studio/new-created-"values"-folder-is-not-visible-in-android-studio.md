---
metaTitle: New created "values" folder is not visible in Android Studio
title: New created "values" folder is not visible in Android Studio
---

## Context

In Android Studio, I want to create the folders `values-v14` `values-v21` inside the `res` folder. 


But when I tried to make it like: right click on `res` folder select option `New >Directory`, then after creating the folder, it is not visible in Android Studio. But when I select the option `Show in Explorer`, then it is visible. 


How do I create a folder in Android Studio, so that I can change files like `styles.xml`, etc?



---

Switching from the `Android` view to the `Project` view will allow you to see the directory structure, but it is less convenient for viewing and editing Android files. 


There is a better way. Don't use `New > Directory`. 


Right click `values` and choose `New > Values resource file`. 


![enter image description here](https://i.stack.imgur.com/d5s9G.png)


Select `Version` from the list and click the `>>` button. Write `styles` as the file name and `14` as the version number and click ok. (Repeat all this for version 21.)


![enter image description here](https://i.stack.imgur.com/cRtVa.png)


Android Studio will automatically create `values-v14` and `values-v21` directories with the new `styles.xml` files in them. And in your Android project view you conveniently see all three `styles.xml` files together.


![enter image description here](https://i.stack.imgur.com/2OmCc.png)


Other directories and resource files can be similarly added.


* [Layout files](https://stackoverflow.com/a/29454804/3681880)
* [Language translations](https://stackoverflow.com/a/29454646/3681880)
