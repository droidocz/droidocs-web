---
metaTitle: Difference between Intent.FLAG_ACTIVITY_CLEAR_TASK and Intent.FLAG_ACTIVITY_TASK_ON_HOME
title: Difference between Intent.FLAG_ACTIVITY_CLEAR_TASK and Intent.FLAG_ACTIVITY_TASK_ON_HOME
---

## Problem

From the Android documentation:



> 
> FLAG\_ACTIVITY\_CLEAR\_TASK
> 
> 
> If set in an Intent passed to Context.startActivity(), this flag will
>  cause any existing task that would be associated with the activity to
>  be cleared before the activity is started. That is, the activity
>  becomes the new root of an otherwise empty task, and any old
>  activities are finished. This can only be used in conjunction with
>  FLAG\_ACTIVITY\_NEW\_TASK.
> 
> 
> 


and



> 
> FLAG\_ACTIVITY\_TASK\_ON\_HOME
> 
> 
> If set in an Intent passed to Context.startActivity(), this flag will
>  cause a newly launching task to be placed on top of the current home
>  activity task (if there is one). That is, pressing back from the task
>  will always return the user to home even if that was not the last
>  activity they saw. This can only be used in conjunction with
>  FLAG\_ACTIVITY\_NEW\_TASK.
> 
> 
> 


Consider these two snippets:



```
Intent intent = new Intent(this, Activity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
startActivity(intent);

```

and 



```
Intent intent = new Intent(this, Activity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_TASK_ON_HOME);
startActivity(intent);

```

The way I understand, in either code snippet we create a new task which has just Activity in it, and when you press back you go to the home screen. Assuming that I'm probably mistaken, What are the differences between the two? Also, if I had another snippet with `Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_TASK_ON_HOME | Intent.FLAG_ACTIVITY_CLEAR_TASK` how would that behave?



---

## Solution

There is a difference between the 2 snippets. Here's some important background information:


* A task contains a stack of activities. A task can be in the foreground or in the background.
* Tasks are also "stacked". If you are in task `A` and you start a new task `B`, task `B` is stacked on top of task `A`. If the user presses the BACK key enough times in task `B`, he will eventually end up back in task `A. This is standard Android behaviour.


Your snippet...



```
Intent intent = new Intent(this, Activity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
startActivity(intent);

```

...will do 1 of the following things, depending...


1. If `Activity` has the same task affinity as the current task (ie: the task from which this code is executing), it will clear the current task (finish all activities in the task) and launch a new instance of `Activity` into the current task. If the user presses the BACK key, this will finish `Activity` and also finish the current task (since there is only 1 activity in the task) and return the user to either the HOME screen or the task that started this task (the task that is underneath this task in the task stack).
2. If `Activity` has a different task affinity than the current task, and there is already an existing task with that task affinity (ie: an existing task that `Activity` would belong to), then that existing task is brought to the foreground, cleared (all activities in the task are finished), a new instance of `Activity` is created at the root of the task and this task is put on top of the current task (so that when `Activity` finishes, the user is dropped back into the current task).
3. If `Activity` has a different task affinity than the current task, and there is no existing task with that task affinity, a new task is created and a new instance of `Activity` is created at the root of the task and this task is put on top of the current task (so that when `Activity` finishes, the user is dropped back into the current task).




---


This code snippet...



```
Intent intent = new Intent(this, Activity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_TASK_ON_HOME);
startActivity(intent);

```

...will do 1 of the following things depending...


1. If `Activity` has the same task affinity as the current task (ie: the task from which this code is executing) and `Activity` is the root activity of the current task, this will do nothing. It will not start a new task, it will not clear any activities, it will not create a new instance of `Activity`, and it will not change the behaviour of what happens when the current task is finished (ie: if the current task was started by another task, when all activities in the current task are finished, it will drop the user back into the previous task in the task stack).
2. If `Activity` has the same task affinity as the current task (ie: the task from which this code is executing) and `Activity` is **not** the root activity of the current task, this will simply create a new instance of `Activity` and put it on top of the current activity in the current task. It will not start a new task, it will not clear any activities, and it will not change the behaviour of what happens when the current task is finished (ie: if the current task was started by another task, when all activities in the current task are finished, it will drop the user back into the previous task in the task stack).
3. If `Activity` has a different task affinity than the current task, and there is already an existing task with that task affinity (ie: an existing task that `Activity` would belong to) and `Activity` is the root activity of that existing task, then that existing task is brought to the foreground and that task is decoupled from the task stack (ie: when all activities in that task are finished, it will return the user to the HOME screen and **not** to the task that started that task).
4. If `Activity` has a different task affinity than the current task, and there is already an existing task with that task affinity (ie: an existing task that `Activity` would belong to) and `Activity` is **not** the root activity of that existing task, then that existing task is brought to the foreground and that task is decoupled from the task stack (ie: when all activities in that task are finished, it will return the user to the HOME screen and **not** to the task that started that task) and a new instance of `Activity` is created and put on top of any existing activities in that task.
5. If `Activity` has a different task affinity than the current task, and there is no existing task with that task affinity, a new task is created and a new instance of `Activity` is created at the root of the task and the new task is decoupled from the task stack (so that when `Activity` finishes, the user is returned to the HOME screen and **not** to the task that started it).




---


and finally, this snippet...



```
Intent intent = new Intent(this, Activity.class);
intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_TASK_ON_HOME);
startActivity(intent);

```

...will do 1 of the following things, depending...


1. If `Activity` has the same task affinity as the current task (ie: the task from which this code is executing), it will clear the current task (finish all activities in the task) and launch a new instance of `Activity` into the current task. If the user presses the BACK key, this will finish `Activity` and also finish the current task (since there is only 1 activity in the task) and return the user to the HOME screen.
2. If `Activity` has a different task affinity than the current task, and there is already an existing task with that task affinity (ie: an existing task that `Activity` would belong to), then that existing task is brought to the foreground, cleared (all activities in the task are finished), a new instance of `Activity` is created at the root of the task and this task is decoupled from the task stack (so that when `Activity` finishes, the user is returned to the HOME screen).
3. If `Activity` has a different task affinity than the current task, and there is no existing task with that task affinity, a new task is created and a new instance of `Activity` is created at the root of the task and this task is decoupled from the task stack (so that when `Activity` finishes, the user is returned to the HOME screen).




---


I realize that this answer is long and complicated, but there are just so many different cases. I probably haven't even covered all the possible cases (for example, if `Activity` has a special launch mode)...



---

## Notes

- Just to note that IMO, in the item 4 of flag combination NEW_TASK and ON_HOME, Activity instance is also created.
