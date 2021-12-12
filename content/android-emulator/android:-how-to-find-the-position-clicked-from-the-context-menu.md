---
metaTitle: 'Android: How to find the position clicked from the context menu'
title: 'Android: How to find the position clicked from the context menu'
---

## Context

I have a list view filled with data. I set up a context menu for the `listview` using the following code:



```
list.setOnCreateContextMenuListener
(
  new View.OnCreateContextMenuListener() 
  {
        public void onCreateContextMenu(ContextMenu menu, View view, ContextMenu.ContextMenuInfo menuInfo) 
        {
       AdapterContextMenuInfo mi =(AdapterContextMenuInfo) menuInfo;
       menu.add(0, 0, 0, "Delete item");                
    }
   }
);

```

I have the following method override to control de contextmenu menuitem selected:



```
@Override
public boolean onContextItemSelected(MenuItem item) 
{
  switch(item.getItemId()) 
  { 
  case 0: 
    ShowAlert("hello from delete item");
    break; 
  default: 
  return super.onContextItemSelected(item); 
  } 
  return true; 
}

```

In this overridden method, how could I find the item of the list view that was clicked?



---


```
private static final int EDIT_ID = Menu.FIRST + 3;
private static final int DELETE_ID = Menu.FIRST + 4;
 @Override
    public void onCreateContextMenu(ContextMenu menu, View v,
            ContextMenu.ContextMenuInfo menuInfo) {
        menu.add(Menu.NONE, EDIT_ID, Menu.NONE, "Edit").setAlphabeticShortcut(
                'e');
        menu.add(Menu.NONE, DELETE_ID, Menu.NONE, "Delete")
                .setAlphabeticShortcut('d');
    }

    @Override
    public boolean onContextItemSelected(MenuItem item) {
        AdapterView.AdapterContextMenuInfo info = (AdapterView.AdapterContextMenuInfo) item
                .getMenuInfo();
        switch (item.getItemId()) {
        case EDIT_ID:

            edit(info.id);
            return (true);
        case DELETE_ID:

            delete(info.id);
            return (true);
        }

        return (super.onOptionsItemSelected(item));
    }

```
