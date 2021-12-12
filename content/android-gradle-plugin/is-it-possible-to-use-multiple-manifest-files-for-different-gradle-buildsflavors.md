---
metaTitle: Is it possible to use multiple manifest files for different gradle builds/flavors
tags:
- gradle
- android-studio
title: Is it possible to use multiple manifest files for different gradle builds/flavors
---

## Context

Lets say I have a white label app that Im converting to be built in android studio from eclipse. This app has about 10 iterations which all use mostly the same code base with different resources that all use the same name convention how ever some of the iterations have extra activities or services that arent needed in all builds.


I want to scrap the entire lot of old hard to maintain code bases which are all essentially the same and just use one android studio project. I understand the base of this set up with all the source files and res files but I'm stuck on how to handle the different manifest files.


Can I use flavors or buildtypes to handle the switching of multiple manifest files?



---


> 
> Lets say I have a white label app that Im converting to be built in android studio from eclipse.
> 
> 
> 


I have a white label app that Im converting to be built in android studio from eclipse.


Oh, no, wait — you didn't mean that literally...


:-)



> 
> Can I use flavors or buildtypes to handle the switching of multiple manifest files?
> 
> 
> 


Absolutely. You can have manifests in the flavor and/or build type sourcesets (e.g., `src/debug/AndroidManifest.xml`). Their contents will be merged in with the manifest in `main`, the manifests in any attached AARs/Android library projects, and the various settings in `build.config` to create The One True Manifest for any given build. There is [a page that describes the merger process](https://developer.android.com/studio/build/manifest-merge.html) and how various attributes can help control it, though it's a trifle confusing.



---

## Notes

-  "So how should I structure my project if I have one java source base but multiple resource bases and manifest files?" -- well, since it appears that you are looking to have the different resources/manifest for different production builds (i.e., shippable variants from the "white label" base), product flavors would be the primary vehicle. Most of your Java code goes in `src/main/`, along with a base set of resources and a manifest. Overrides to those resources and manifest would go in flavor-specific sourcesets (e.g., `src/whiteLabelShippableVariant1/`).
-  No, it would go in `src/paid/AndroidManifest.xml`, just as the `main` source set's manifest goes in `src/main/AndroidManifest.xml`.
- Ah ha I thought I could but that documentation was quite an eyeful once I started reading through it (yes it's quite confusing at first glance). So how should I structure my project if I have one java source base but multiple resource bases and manifest files?
