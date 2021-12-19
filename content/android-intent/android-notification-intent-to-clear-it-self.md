---
metaTitle: Android Notification intent to clear it self
tags:
- notifications
title: Android Notification intent to clear it self
---

## Problem

I have read many examples of how to create notification messages.
What i wanted to achieve, is because the notification will be executed by a widget, i would like
the notification intent when clicked to clear it self when the user clicks on it.I do not have an activity to return to.
The notification for my purposes will just plainly notify, nothing else.
So what would be the code of an intent that just clear/cancel itself.
The code below is an activity launched by a button(button code not included) the notification will be fired up by a background service.



```
CharSequence title = "Hello";
CharSequence message = "Hello, Android!";
final NotificationManager notificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
final Notification notification = new Notification(R.drawable.icon,"A New Message!",System.currentTimeMillis());

notification.defaults=Notification.FLAG_ONLY_ALERT_ONCE+Notification.FLAG_AUTO_CANCEL;
Intent notificationIntent = new Intent(this, AndroidNotifications.class);
PendingIntent pendingIntent = PendingIntent.getActivity(this, 0,notificationIntent, 0);

notification.setLatestEventInfo(AndroidNotifications.this, title,message, pendingIntent);
notificationManager.notify(NOTIFICATION_ID, notification);

```

Thanks



---

## Solution

Check out [FLAG\_AUTO\_CANCEL](http://developer.android.com/intl/de/reference/android/app/Notification.html#FLAG_AUTO_CANCEL) 


Bit to be bitwise-ored into the flags field that should be set if the notification should be canceled when it is clicked by the user.


**EDIT :**



```
notification.flags |= Notification.FLAG_AUTO_CANCEL;

```


---

## Notes

- Your code uses wrong (puts in defaults field), you need to bitwise-or in the flags field like this:  `notification.flags |= Notification.FLAG_AUTO_CANCEL;`
- My code is already using FLAG_AUTO_CANCEL but actually the notification is not going away on click.
