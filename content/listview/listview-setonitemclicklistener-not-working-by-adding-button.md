---
metaTitle: ListView setOnItemClickListener not working by adding button
title: ListView setOnItemClickListener not working by adding button
---

## Context

I have a list view with text and button in each row, list view setOnItemClickListener() is not working. is it possible to handle item click and button click events differently(item click should call ActivityA and button click should call ActivityB). Does anyone have a solution



```
    private ArrayList<String> userIDArr = null;
    private ArrayList<String> userNameArr = null;
    private DatabaseHelper dbHelper = null;
    private ListView userListView=null; 


    public void onCreate(Bundle savedInstanceState) 
        {
          super.onCreate(savedInstanceState);         
          setContentView(R.layout.list_view);         
          dbHelper = new DatabaseHelper(this.getApplicationContext());        
          Map<String,ArrayList<String>> displayMap = dbHelper.getUserListToDisplay();
          userIDArr = displayMap.get("UserID");
          userNameArr = displayMap.get("FirstName1");           


          userListView = (ListView) findViewById(R.id.listView2);
          userListView.setAdapter(new UserListAdapter(this,userIDArr));


          userListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
              @Override
              public void onItemClick(AdapterView<?> arg0, View arg1, int position, long arg3) {

                  Toast.makeText(usersListActivity.this,
                            "Item in position " + position + " clicked", Toast.LENGTH_LONG).show();
              }
            });
     }


    public class UserListAdapter extends ArrayAdapter<String>
    {
        Activity context;
        public UserListAdapter(Activity context, ArrayList<String> names) {
            super(context, R.layout.list_item, names);
            this.context = context;
        }
        private class ViewHolder {
            public TextView UserNameAndID;
            public TextView Description;
            public Button  UploadBtn;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolder holder;
            View rowView = convertView;
            if (rowView == null) {
                LayoutInflater inflater = context.getLayoutInflater();
                rowView = inflater.inflate(R.layout.list_item, null, true);
                holder = new ViewHolder();
                holder.UserNameAndID = (TextView) rowView.findViewById(R.id.User_detailsTxt);
                holder.Description = (TextView) rowView.findViewById(R.id.User_status);
                holder.UploadBtn = (Button) rowView.findViewById(R.id.uploadbutton);
                holder.UploadBtn.setOnClickListener(new View.OnClickListener() {  

                        public void onClick(View v) {  
                        Toast.makeText(usersListActivity.this," Button clicked",Toast.LENGTH_SHORT).show();
                        }   
                    }); 
                    rowView.setTag(holder);
            } else {
                holder = (ViewHolder) rowView.getTag();
            }
            String s = userNameArr.get(position)+","+userIDArr.get(position);
            holder.UserNameAndID.setText(s);
            holder.Description.setText("U r in middle");
            return rowView;
        }
    }
}`

```


---

Sometimes the List will still not be able to make the Click Listener to pass. And at this case you might have to add one more attribute. 



```
android:descendantFocusability="blocksDescendants" 

```

And this attribute has to be added to the top most layout of your XML where you have provided the ListView elements.



---

## Notes

- The OnItemClickListener works without affecting the descendant events.
- I wrote "android:clickable="false"" in RadioButton.
