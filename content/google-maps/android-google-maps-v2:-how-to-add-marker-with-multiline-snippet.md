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

