---
metaTitle: Android check null or empty string in Android
tags:
- android-fragmentactivity
title: Android check null or empty string in Android
---

## Problem

In my trying `AsyncTask` I get email address from my server. In `onPostExecute()` I have to check is email address `empty` or `null`. I used following code to check it:



```
if (userEmail != null && !userEmail.isEmpty()) {
    Toast.makeText(getActivity(), userEmail, Toast.LENGTH_LONG).show();
    UserEmailLabel.setText(userEmail);
}

```

But in my `Toast` I see `null` is printed. My full code:



```
private class LoadPersonalData extends AsyncTask<String, Void, Void> {
    @Override
    protected void onPreExecute() {
        super.onPreExecute();
    }

    protected Void doInBackground(String... res) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        params.add(new BasicNameValuePair("user_id", PrefUserName));
        params.add(new BasicNameValuePair("type", type_data));
        JSONObject json = jsonParser.makeHttpRequest(Url, "POST", params);
        String result = "";
        try {
            result = json.getString("message");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        if (result.equals("success")) {
            try {
                userEmail = json.getString("email");
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return null;
    }

    @Override
    protected void onPostExecute(Void result) {
        // TODO Auto-generated method stub
        super.onPostExecute(result);            
        if (userEmail != null && !userEmail.isEmpty()) {
            Toast.makeText(getActivity(), userEmail, Toast.LENGTH_LONG).show();
            UserEmailLabel.setText(userEmail);
        }
    }

```

How can I check for `null` and `empty` string? 



---

## Solution

### Use [`TextUtils.isEmpty( someString )`](https://developer.android.com/reference/android/text/TextUtils.html#isEmpty(java.lang.CharSequence))



```
String myString = null;

if (TextUtils.isEmpty(myString)) {
    return; // or break, continue, throw
}

// myString is neither null nor empty if this point is reached
Log.i("TAG", myString);

```

**Notes**


* The [documentation](https://developer.android.com/reference/android/text/TextUtils.html#isEmpty(java.lang.CharSequence)) states that both null and zero length are checked for. No need to reinvent the wheel here.
* A good practice to follow is [early return](https://softwareengineering.stackexchange.com/a/18473/186547).
