---
metaTitle: Disable center button in MyLocation at Google Map API V2
title: Disable center button in MyLocation at Google Map API V2
---

## Problem

I searched a lot on the web, but I haven't found anything which answered my question.
When I enable MyLocation with 



> 
> gmap.setMyLocationEnabled(true)
> 
> 
> 


I automatically get a button to center the map on my current location.
I want to remove it and so I'm asking you how to do this.
I hope somebody of you can help me!



---

## Solution

After calling the following methods on your `GoogleMap` object:



```
map.setMyLocationEnabled(true);
map.getUiSettings().setMyLocationButtonEnabled(false);

```

you should see the current location indicator (the blue circle), but no control to center the map on that location.



---

## Notes

-  If you want to disable the blue dot you have to set map.setMyLocationEnabled(false). The code from the answer enables the blue dot, but disables the button.
- When I do this I still get the blue dot or a blue arrow.
