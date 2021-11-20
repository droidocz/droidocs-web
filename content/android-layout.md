---
title: "Android Layout"
---

An Android layout defines everything the user can see and touch. A layout is made up of [`View`](http://developer.android.com/guide/topics/ui/controls.html) (like buttons and text) and [`ViewGroup`](http://developer.android.com/guide/topics/ui/declaring-layout.html) (like lists, tables, or more Views) objects, all combined to make a **View Hierarchy**:  

[![View Hierarchy](https://i.stack.imgur.com/vYsMp.png)](http://developer.android.com/guide/topics/ui/overview.html#Layout)  

(from Android's [UI Overview](http://developer.android.com/guide/topics/ui/overview.html#Layout))


Designing a Layout:
-------------------


You can create your layout in any combination of these two ways:


1. **Declare UI elements in XML.**  

Android provides a straightforward XML vocabulary that corresponds to the `View` classes and subclasses, such as those for widgets and layouts.
2. **Instantiate layout elements at runtime.**  

Your application can create `View` and `ViewGroup` objects (and manipulate their properties) programmatically.


Common Layouts:
---------------


Each subclass of the ViewGroup class provides a unique way to display the views you nest within it. Below are some of the more common layout types that are built into the Android platform.


1. **Linear Layout:**
A layout that organizes its children into a single horizontal or vertical row. It creates a scrollbar if the length of the window exceeds the length of the screen.
2. **Relative Layout:**
Enables you to specify the location of child objects relative to each other (child A to the left of child B) or to the parent (aligned to the top of the parent).
3. **Constraint Layout:** 
Allows positioning children relative to each other and the parent. But also offers other powerful positioning and sizing strategies, including horizontal/vertical child "chains" with custom spacing/weighting, arbitrary horizontal/vertical "guidelines," and custom child size aspect ratios.
4. **Web View:**
Displays web pages.
5. **Frame layout:**
FrameLayout is designed to block out an area on the screen to display a single item.
6. **Grid View:**
GridView is a ViewGroup that displays items in a two-dimensional, scrollable grid.


Useful Links:


* **Android Developer Guides:**
	1. Learn the basics with [Declaring a Layout](http://developer.android.com/guide/topics/ui/index.html#Layout)
	2. [Advanced Design Topics](http://developer.android.com/guide/topics/ui/declaring-layout.html)
	3. Android's Blog about layout [Tips and tricks](http://android-developers.blogspot.co.uk/2009/02/android-layout-tricks-1.html)
	4. [Android Layouts](http://developer.android.com/guide/topics/ui/declaring-layout.html)
* **Hierarchy Viewer:**
[This tool](http://developer.android.com/tools/debugging/debugging-ui.html#HierarchyViewer) allows you to debug and optimize your layout.
