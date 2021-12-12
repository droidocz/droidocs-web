---
metaTitle: What is the purpose of Android's <merge> tag in XML layouts
tags:
- include
- code-reuse
title: What is the purpose of Android's <merge> tag in XML layouts
---

## Context

I've read [Romain Guy's post](http://developer.android.com/training/improving-layouts/reusing-layouts.html) on the `<merge />` tag, but I still don't understand how it's useful. Is it a sort-of replacement of the `<Frame />` tag, or is it used like so:



```
<merge xmlns:android="....">
<LinearLayout ...>
    .
    .
    .
</LinearLayout>
</merge>

```

then `<include />` the code in another file?



---

`<merge/>` is useful because it can get rid of unneeded ViewGroups, i.e. layouts that are simply used to wrap other views and serve no purpose themselves.


For example, if you were to `<include/>` a layout from another file without using merge, the two files might look something like this:


layout1.xml:



```
<FrameLayout>
   <include layout="@layout/layout2"/>
</FrameLayout>

```

layout2.xml:



```
<FrameLayout>
   <TextView />
   <TextView />
</FrameLayout>

```

which is functionally equivalent to this single layout:



```
<FrameLayout>
   <FrameLayout>
      <TextView />
      <TextView />
   </FrameLayout>
</FrameLayout>

```

That FrameLayout in layout2.xml may not be useful. `<merge/>` helps get rid of it. Here's what it looks like using merge (layout1.xml doesn't change):


layout2.xml:



```
<merge>
   <TextView />
   <TextView />
</merge>

```

This is functionally equivalent to this layout:



```
<FrameLayout>
   <TextView />
   <TextView />
</FrameLayout>

```

but since you are using `<include/>` you can reuse the layout elsewhere. It doesn't have to be used to replace only FrameLayouts - you can use it to replace any layout that isn't adding something useful to the way your view looks/behaves.



---

## Notes

-  you're right, the merge tag isn't necessary in this example but that's only because there's one element in layout2.
- True, a simple TextView could be used instead in layout2, however that then would be a completely different thing and not useful as an example in the answer to this question.
- In this example you could just make layout2.xml contain just `<TextView />`, nothing else.
- In conjunction with the &lt;include&gt; tag it is always useful to use &lt;merge&gt; tag.
- If you want layout features you obviously don't use &lt;merge&gt;.
