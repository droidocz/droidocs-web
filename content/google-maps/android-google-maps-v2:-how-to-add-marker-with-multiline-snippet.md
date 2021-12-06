---
metaTitle: 'Android Google Maps v2: How to add marker with multiline snippet'
title: 'Android Google Maps v2: How to add marker with multiline snippet'
---

## Context

Does anybody know how to add multiline snippet to Google Maps marker? That's my code for adding markers:



```
map.getMap().addMarker(new MarkerOptions()
    .position(latLng()).snippet(snippetText)
    .title(header).icon(icon));

```

I want snippet to look like this:



```
| HEADER |
|foo     |
|bar     |

```

but when I'm trying to set snippetText to "foo \n bar", I see just `foo bar` and I don't have any ideas how to make it multiline. Can you help me?



---

It looks like you will need to create your own "info window" contents to make that work:


1. Create an implementation of `InfoWindowAdapter` that overrides `getInfoContents()` to return what you want to go into the `InfoWindow` frame
2. Call `setInfoWindowAdapter()` on your `GoogleMap`, passing an instance of your `InfoWindowAdapter`


[This sample project](https://github.com/commonsguy/cw-omnibus/tree/master/MapsV2/Popups) demonstrates the technique. Replacing my snippets with `"foo\nbar"` correctly processes the newline. However, more likely, you will just come up with a layout that avoids the need for the newline, with separate `TextView` widgets for each line in your desired visual results.



---

## Notes:

-  Call `setText()` on the `TextViews`, no different than `TextViews` in an activity, fragment, `ListView` row, etc.
-  Normally, when you use a layout resource with a `RelativeLayout` as the root, when you inflate it, you want to use the three-parameter `inflate()` method, passing in the parent `ViewGroup` and `false` for the last two parameters. However, we are not passed a parent in `getInfoContents()`, so we cannot do that. While I am a bit surprised about a `NullPointerException`, I am not surprised at all that the `RelativeLayout` does not work correctly. I would have expected some of the layout rules for the `RelativeLayout`'s children to be ignored or otherwise misbehave.
- I've got the code from the sample project working. so I have a custom infowindow but I am stuck on how to add multiple lines still. I've added in extra textviews after title and snippet in the xml layout but how do I get text to appear in the new textviews?
- If you do use getInfoWindow() to return an entirely customized view, note that there seems to be a bug when using a RelativeLayout for it. I could only get mine to work when switching to a LinearLayout. I filed a bug report:
http://code.google.com/p/gmaps-api-issues/issues/detail?id=4874
- That's what I thought but it's not working for me for some reason :/ all I'm doing is putting a second textview in the xml after snippet, then identifying it and setting the text of it within getInfoContents.
-  I'm reading the `Maps V2 Chapter` from your 4.6 book and I have a question that is on topic with this question so I think is a good place to ask. I wander if is there any way to set a distinct `infoWindow` for each marker, as long as `setInfoWindowAdapter()` is applied to hole map?
