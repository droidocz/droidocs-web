---
metaTitle: Where is Android Studio layout preview
tags:
- java
title: Where is Android Studio layout preview
---

## Problem

I installed Android Studio, but when I edit my layout files, I can't find live preview! I just see an XML file. How can I see my layout in graphical view?


Update:
This is how it looks like in my case:


![enter image description here](https://i.stack.imgur.com/A6M7G.jpg)



---

## Solution

Several people seem to have the same problem. The issue is that the IDE only displays the preview if editing a layout file in the `res/layout*` directory of an Android project.


In particular, it won't show if editing a file in `build/res/layout*` since those are not **source** directory but **output** directory. In your case, you are editing a file in the `build/` directory...


The Resource folder is set automatically, and can be viewed (and changed) in Project Structure > Modules > [Module name] > Android > Resources directory.



---

## Notes

- Yeah, it seems Android Studio handles it automatically now; I believe one can not accidentally open an output file anymore.
- there is no Android tab and no Resources feature as you describe, at least in current actual Android studio 1.1.0
[link](http://screenshot.net/2rmjju8.jpg)
