---
metaTitle: Connecting to GitLab repositories on Android Studio
tags:
- git
- gitlab
- googleio
title: Connecting to GitLab repositories on Android Studio
---

## Context

I'm trying to connect to a GitLab repository using the I/O preview of Android Studio. Does anyone know how to do this/if it is possible yet?



---

How to add an Android Studio project to GitLab
==============================================


This answer shows how to do it using the Android Studio GUI.


1. Create a new project on [GitLab](https://gitlab.com)
-------------------------------------------------------


Chose the `+` button on the menu bar. Add a project name and then click "Create project".


[![enter image description here](https://i.stack.imgur.com/I4oLD.png)](https://i.stack.imgur.com/I4oLD.png)


This will give you a new project address. Choose the https version.


[![enter image description here](https://i.stack.imgur.com/YOcmq.png)](https://i.stack.imgur.com/YOcmq.png)


It will look something like this:



```
https://gitlab.com/MyUserName/my-project.git

```

### 2. Create a Git repository in Android Studio


In the Android Studio menu go to **VCS > Import into Version Control > Create Git Repository...**


[![enter image description here](https://i.stack.imgur.com/Vxy7U.png)](https://i.stack.imgur.com/Vxy7U.png)


Select the root directory of your project. (It will be automatically selected if you already have it highlighted in the Project view. Otherwise you will have to browse up to find it.)


### 3. Add remote


Go to **VCS > Git > Remotes...**. Then paste in the https address you got from GitLab in step one.


[![enter image description here](https://i.stack.imgur.com/hEArD.png)](https://i.stack.imgur.com/hEArD.png)


You may need to log in with your GitLab username and password.


### 4. Add, commit, and push your files


Make sure you have the top level of the project selected. If you are in the Android view you can switch it to the Project view.


[![enter image description here](https://i.stack.imgur.com/YQVRE.png)](https://i.stack.imgur.com/YQVRE.png)


* *Add:* Go to **VCS > Git > Add**.
* *Commit:* After adding, do **VCS > Git > Commit Directory**. (You will need to write a commit message, something like `initial commit`.)
* *Push:* Finally, go to **VCS > Git > Push**.


### Finished!


You should be able to view your files in GitLab now.


See also
========


There is a plugin that would probably streamline the process. Check it out [here](https://plugins.jetbrains.com/plugin/7975-gitlab-projects). 



---

## Notes

-  Sir I am getting url like this http://192.168.0.52/pvijayalakshmi/eEmployee.git from step 1: But When I enter this url in android studio, It is giving me this Error:Remote URL test failed: Unable to find remote helper for 'http'
- i got this error Remote URL test failed: Authentication failed for 'https://gitlab.com/codenex/shopping.git/
