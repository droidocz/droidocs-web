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

As I have already explained the reasons behind this issue and also how to handle it in a different answer thread [Here](https://stackoverflow.com/a/20479071/1084174). Still i am sharing the solution summary here.


One of the main reasons `notifyDataSetChanged()` won't work for you - is, 


**Your adapter loses reference to your list**. 


When creating and adding a new list to the `Adapter`. Always follow these guidelines: 


1. Initialise the `arrayList` while declaring it globally.
2. Add the List to the adapter directly with out checking for null and empty
values . Set the adapter to the list directly (don't check for any
condition). Adapter guarantees you that wherever you make
changes to the data of the `arrayList` it will take care of it, but never loose the
reference.
3. Always modify the data in the arrayList itself (if your data is completely new
than you can call `adapter.clear()` and `arrayList.clear()` before
actually adding data to the list) but don't set the adapter i.e If
the new data is populated in the `arrayList` than just
`adapter.notifyDataSetChanged()`


Hope this helps.



---

## Notes

- https://stackoverflow.com/questions/66827414/android-update-listview-through-baseadapter-in-postexecute-not-working
