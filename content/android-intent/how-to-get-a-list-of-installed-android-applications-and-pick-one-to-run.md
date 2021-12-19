---
metaTitle: How to get a list of installed android applications and pick one to run
title: How to get a list of installed android applications and pick one to run
---

## Problem

I asked a similar question to this earlier this week but I'm still not understanding how to get a list of all installed applications and then pick one to run. 


I've tried: 



```
Intent intent = new Intent(ACTION_MAIN);
intent.addCategory(CATEGORY_LAUNCHER);

```

and this only shows application that are preinstalled or can run the `ACTION_MAIN` Intent type.


I also know I can use `PackageManager` to get all the installed applications, but how do I use this to run a specific application?



---

## Solution

Here a good example:



```
class PInfo {
    private String appname = "";
    private String pname = "";
    private String versionName = "";
    private int versionCode = 0;
    private Drawable icon;
    private void prettyPrint() {
        Log.v(appname + "\t" + pname + "\t" + versionName + "\t" + versionCode);
    }
}

private ArrayList<PInfo> getPackages() {
    ArrayList<PInfo> apps = getInstalledApps(false); /* false = no system packages */
    final int max = apps.size();
    for (int i=0; i<max; i++) {
        apps.get(i).prettyPrint();
    }
    return apps;
}

private ArrayList<PInfo> getInstalledApps(boolean getSysPackages) {
    ArrayList<PInfo> res = new ArrayList<PInfo>();        
    List<PackageInfo> packs = getPackageManager().getInstalledPackages(0);
    for(int i=0;i<packs.size();i++) {
        PackageInfo p = packs.get(i);
        if ((!getSysPackages) && (p.versionName == null)) {
            continue ;
        }
        PInfo newInfo = new PInfo();
        newInfo.appname = p.applicationInfo.loadLabel(getPackageManager()).toString();
        newInfo.pname = p.packageName;
        newInfo.versionName = p.versionName;
        newInfo.versionCode = p.versionCode;
        newInfo.icon = p.applicationInfo.loadIcon(getPackageManager());
        res.add(newInfo);
    }
    return res; 
}

```


---

## Notes

- I mean, can you get the Intent?
