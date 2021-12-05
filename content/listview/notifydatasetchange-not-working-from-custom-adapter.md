---
metaTitle: notifyDataSetChange not working from custom adapter
tags:
- baseadapter
- notifydatasetchanged
title: notifyDataSetChange not working from custom adapter
---

## Context

When I repopulate my `ListView`, I call a specific method from my `Adapter`.


**Problem**:


When I call `updateReceiptsList` from my `Adapter`, the data is refreshed, but my `ListView` doesn't reflect the change. 


**Question**:


Why doesn't my `ListView` show the new data when I call `notifyDataSetChanged`?


**Adapter**:



```
public class ReceiptListAdapter extends BaseAdapter {

    public List<Receipt> receiptlist;
    private Context context;
    private LayoutInflater inflater;
    private DateHelpers dateH;

    public ReceiptListAdapter(Activity activity, Context mcontext, List<Receipt> rl) {
        context = mcontext;
        receiptlist = rl;
        Collections.reverse(receiptlist);
        inflater = (LayoutInflater)activity.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        dateH = new DateHelpers();
    }

    @Override
    public int getCount() {
        try {
            int size = receiptlist.size();
            return size;
        } catch(NullPointerException ex) {
            return 0;
        }
    }

    public void updateReceiptsList(List<Receipt> newlist) {
        receiptlist = newlist;
        this.notifyDataSetChanged();
    }

    @Override
    public Receipt getItem(int i) {
        return receiptlist.get(i);
    }

    @Override
    public long getItemId(int i) {
        return receiptlist.get(i).getReceiptId() ;
    }

    private String getPuntenString(Receipt r) {
        if(r.getPoints().equals("1")) {
            return "1 punt";
        }
        return r.getPoints()+" punten";
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View vi=convertView;

        final Receipt receipt = receiptlist.get(position);
        ReceiptViewHolder receiptviewholder;
        Typeface tf_hn = Typeface.createFromAsset(context.getAssets(), "helveticaneue.ttf");        
        Typeface tf_hn_bold = Typeface.createFromAsset(context.getAssets(), "helveticaneuebd.ttf");

        if (vi == null) { //convertview==null
            receiptviewholder = new ReceiptViewHolder();
            vi = inflater.inflate(R.layout.view_listitem_receipt, null);
            vi.setOnClickListener(null);
            vi.setOnLongClickListener(null);
            vi.setLongClickable(false);
            receiptviewholder.shop = (TextView) vi.findViewById(R.id.tv_listitemreceipt_shop);
            receiptviewholder.date = (TextView) vi.findViewById(R.id.tv_listitemreceipt_date);
            receiptviewholder.price = (TextView) vi.findViewById(R.id.tv_listitemreceipt_price);
            receiptviewholder.points = (TextView) vi.findViewById(R.id.tv_listitemreceipt_points);
            receiptviewholder.shop.setTypeface(tf_hn_bold);
            receiptviewholder.price.setTypeface(tf_hn_bold);
            vi.setTag(receiptviewholder);
        }else{//convertview is not null
            receiptviewholder = (ReceiptViewHolder)vi.getTag();
        }

        receiptviewholder.shop.setText(receipt.getShop());
        receiptviewholder.date.setText(dateH.timestampToDateString(Long.parseLong(receipt.getPurchaseDate())));
        receiptviewholder.price.setText("€ "+receipt.getPrice());
        receiptviewholder.points.setText(getPuntenString(receipt));

        vi.setClickable(false);
        return vi;
    }

    public static class ReceiptViewHolder {
        public TextView shop;
        public TextView date;
        public TextView price;
        public TextView points;
    }

    public Object getFilter() {
        // XXX Auto-generated method stub
        return null;
    }

}

```

--EDIT:


**found Workaround**


Just to have some functional code i do now:



```
listview.setAdapter( new ReceiptListAdapter(activity,mcontext, -new dataset-);

```

Works, but not how it is supposed to work.



---

Change your method from 



```
public void updateReceiptsList(List<Receipt> newlist) {
    receiptlist = newlist;
    this.notifyDataSetChanged();
}

```

To



```
public void updateReceiptsList(List<Receipt> newlist) {
    receiptlist.clear();
    receiptlist.addAll(newlist);
    this.notifyDataSetChanged();
}

```

So you keep the same object as your DataSet in your Adapter.



---

## Notes:

- Can you maybe explain why the first method doesn't work and the second works with a BaseAdapter?


- can ArrayAdapters even bind to Objects other than Lists or Arrays?


- I had used the second way by clearing and add new items.


- btw, are you talking about the `ArrayAdapter` only? I would have no idea why exchanging the list object should make a problem in a `BaseAdapter`... But I can't get a BaseAdapter to work properly, without resetting the adapter instead of calling `notifyDataSetChanged`...×Comments may only be edited for 5 minutes×Comments may only be edited for 5 minutes×Comments may only be edited for 5 minutes


- I can't imagine the first solution working, because all you do is change the reference of the `receiptlist` variable. The `BaseAdapter` has no knowledge of this, so `notifyDataSetChanged()` would not change anything. You should work on your initial reference `List` and remove/add items to that `List`.


- consider having a parent object like `ReceiptListObject` instead of a `List` of objects, what can you do then to solve this problem?


- https://stackoverflow.com/questions/66827414/android-update-listview-through-baseadapter-in-postexecute-not-working


- But in 2nd Same Adapter it gives a force close says ArrayOutOfIndex and notifydatasetchanged not working


- it's about a `BaseAdapter` and this adapter does not know to which data it is binded... so if I have an custom object and use custom functions of this object (like `custObject.getCount()` and `custObject.getChildAt(int i)` for example), and I want to exchange this object, `notifyDataSetChanged` is not working... anyway, I think this problem does never occur with an `ArrayAdapter`


