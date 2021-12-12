---
metaTitle: What's the difference between buildConfigField, resValue and manifestPlaceholders
tags:
- build.gradle
title: What's the difference between buildConfigField, resValue and manifestPlaceholders
---

## Context

I understand 'how' they are used, but want to know 'when' they are used.
For a case like using separate KEYs for different environments, we can use all three of the mentioned. So, I was curious to know why there are three things to do the same thing and if they are meant for different usages. Thanks!


[![enter image description here](https://i.stack.imgur.com/Meqbg.png)](https://i.stack.imgur.com/Meqbg.png)



---

Using `buildConfigField` will generate an actual Java constant in your app's generated `BuildConfig` class. So for your example, you would then have something like this:



```
public static class BuildConfig {
    public static final String BASE_URL = "xxxxxxxxxx";
}

```

Using `resValue` will generate a resource of the type you specify into your app's `res` (resources) directory. So for a string, you'd be able to reference it via XML with `@string/base_url` or with `getResources().getString(R.string.base_url)`.


Using `manifestPlaceholders` allows you to add a substitution in `AndroidManifest.xml`. So for example, GCM requires you to have a `<uses-permission>` tag with the name set to `X.permission.C2D_MESSAGE`, where `X` is your application ID. So if you have multiple build flavors with different application IDs, you can use a `manifestPlaceholders` tag and then use it in your `AndroidManifest.xml` where it will be replaced with the correct value, like:



```
<uses-permission android:name="${applicationId}.permission.C2D_MESSAGE" />

```

For the record, `applicationId` is automatically added as a manifest placeholder, so there's no need to define it yourself, but that's just an example.


Basically, it depends on where you need it. If it's needed for an XML resource (a layout, menu, etc.), `resValue` is what you want. If it's needed to be accessed from Java code directly, `buildConfigField` will do the trick. For substitutions in the manifest, `manifestPlaceholders` is what you want.



---

## Notes

- How about `setProperty` in Gradle build file?
