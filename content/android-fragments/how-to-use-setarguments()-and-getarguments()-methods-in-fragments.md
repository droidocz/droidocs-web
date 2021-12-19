---
metaTitle: How to use setArguments() and getArguments() methods in Fragments
title: How to use setArguments() and getArguments() methods in Fragments
---

## Problem

I have 2 fragments: (1)Frag1 (2)Frag2.


Frag1
=====



```
bundl = new Bundle();
bundl.putStringArrayList("elist", eList);

Frag2 dv = new Frag2();
dv.setArguments(bundl);
FragmentTransaction ft = getFragmentManager().beginTransaction();
ft.replace(R.id.the_fragg,dv);
ft.show(getFragmentManager().findFragmentById(R.id.the_fragg)); 
ft.addToBackStack(null);
ft.commit();

```

How do I get this data in Frag2?



---

## Solution

Just call `getArguments()` in your `Frag2`'s `onCreateView()` method:



```
public class Frag2 extends Fragment {

     public View onCreateView(LayoutInflater inflater,
         ViewGroup containerObject,
         Bundle savedInstanceState){
         //here is your arguments
         Bundle bundle=getArguments(); 

        //here is your list array 
        String[] myStrings=bundle.getStringArray("elist");   
     }
}

```


---

## Notes

- It is returning null in my case, any idea why this is happening ?
-   Why are you using `getArguments()`  in `onCreateView`, not in `onCreate`?
- It will call only when the fragment is destroyed or newly created time.
- You're putting **ArrayList** into the bundle, but getting a String Array. You should do `bundle.getStringArrayList("elist");`
- You forgot the return statement: `return super.onCreateView(inflater, container, savedInstanceState);`
