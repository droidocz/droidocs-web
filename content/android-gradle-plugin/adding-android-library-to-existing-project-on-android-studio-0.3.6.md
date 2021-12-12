---
metaTitle: Adding Android Library to Existing Project on Android Studio 0.3.6
tags:
- android-studio
- gradle
- build.gradle
title: Adding Android Library to Existing Project on Android Studio 0.3.6
---

## Context

I am trying to add a library, <https://github.com/edmodo/cropper>, to my Android project. I am following the methods described here: [How do I add a library project to Android Studio?](https://stackoverflow.com/questions/16588064/how-do-i-add-a-library-project-to-the-android-studio)


but the Android Studio has changed since then and I can no longer "Import a Module". I can only add a new one. Here are the steps I have tried:


Copy the library into a folder named libraries.
![project structure before adding module](https://i.stack.imgur.com/cAasX.png)


Open Module Settings, and I am presented with this screen
![module settings](https://i.stack.imgur.com/pZ04s.png)


I click the + sign to add a new module and am then presented with this screen
![first add new module step](https://i.stack.imgur.com/jFNJ5.png)


I choose to fill in the content root
![content root select](https://i.stack.imgur.com/z5TKt.png)


The rest of the fields autofill to this
![autofill](https://i.stack.imgur.com/gthMC.png)


The next step...
![next step](https://i.stack.imgur.com/1HqSS.png)


I change the package
![enter image description here](https://i.stack.imgur.com/Ac44z.png)


I hit next and now my project looks like this
![project structure after new module added](https://i.stack.imgur.com/gGYS2.png)


Any idea on the correct way to add an external library in Android Studio 0.3.6+?



---

I don't use the wizard. Usually I edit the gradle files.


Create a structure like this:



```
- Blunka
    build.gradle
- cropper
    build.gradle
    src
    res
  settings.gradle

```

In settings.gradle:



```
include ':Blunka', ':cropper'

```

In cropper/build.gradle:



```
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:0.6.+'
    }
}
apply plugin: 'android-library'

android {

   compileSdkVersion 19
   buildToolsVersion "19.0.0"

   defaultConfig {
       minSdkVersion XX
       targetSdkVersion 19

   }    

   sourceSets {
            main {
                manifest.srcFile 'AndroidManifest.xml'
                java.srcDirs = ['src']
                resources.srcDirs = ['src']            
                res.srcDirs = ['res']            
            }
        }
    }

```

In Blunka/build.gradle add:



```
dependencies {
    // Libraries
    compile project(':cropper')  
  }

```


---

## Notes

- I am doing this, but when i go to import something in the src folder of cropper, it cannot find the class. There is a red circle in the project structure view of the file I want to import...
- EDIT: I marked the src directory in cropper as a source root, and the little red circle went away, but it still cannot resolve the symbol.
