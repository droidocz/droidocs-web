---
metaTitle: 'Asynctask: pass two or more values from doInBackground to onPostExecute'
tags:
- java
title: 'Asynctask: pass two or more values from doInBackground to onPostExecute'
---

## Context

I have an Asynctask which retrieves two int vaules and i want to pass them to onPostExecute to show them on the view.  

Here is my code:



```
    public class QueryServer extends AsyncTask <String, Void, Integer> { 

    protected Integer doInBackground(String... serverAddress) {
        Log.d("QueryServer", ""+serverAddress[0]);
        MCQuery mcQuery = new MCQuery("" + serverAddress[0] ,25565);
        QueryResponse response = mcQuery.basicStat();

        int Onlineplayers = response.getOnlinePlayers(); //first vaule
        int Maxplayers = response.getMaxPlayers();  //second vaule

        Log.d("MCQuery", "" + Onlineplayers + " OnlinePlayers");
        return Onlineplayers;

    }

    protected void onPostExecute(Integer Onlineplayers){

        TextView onlinePlayersView = (TextView) findViewById(R.id.online_players);

        onlinePlayersView.setText(""+Onlineplayers+"/"+ Maxplayers); //i need to pass Maxplayers to use it here


    }

```

Thank you in advance.



---

You can define a Wrapper class that holds two integers:



```
public class Wrapper
{
    public int onlinePlayers;
    public int maxPlayers;
}

```

and use it in place of `Integer`:



```
public class QueryServer extends AsyncTask<String, Void, Wrapper> { 

    protected Wrapper doInBackground(String... serverAddress) {
        Log.d("QueryServer", ""+serverAddress[0]);
        MCQuery mcQuery = new MCQuery("" + serverAddress[0] ,25565);
        QueryResponse response = mcQuery.basicStat();

        int onlinePlayers = response.getOnlinePlayers(); //first vaule
        int maxPlayers = response.getMaxPlayers();  //second vaule

        Log.d("MCQuery", "" + onlinePlayers + " onlinePlayers");
        Wrapper w = new Wrapper();
        w.onlinePlayers = onlinePlayers;
        w.maxPlayers = maxPlayers;
        return w;

    }

    protected void onPostExecute(Wrapper w){

        TextView onlinePlayersView = (TextView) findViewById(R.id.online_players);

        onlinePlayersView.setText(""+w.onlinePlayers+"/"+ w.maxPlayers); //i need to pass Maxplayers to use it here


    }

```
