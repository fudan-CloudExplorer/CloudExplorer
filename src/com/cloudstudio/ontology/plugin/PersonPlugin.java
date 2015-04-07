package com.cloudstudio.ontology.plugin;

import org.apache.cordova.CordovaArgs;
import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.os.Handler;
import android.os.Message;

public class PersonPlugin extends CordovaPlugin {
	private Handler handler;
	private JSONArray result;
	private String action;
	private JSONArray args;
	
	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		this.action = action;
		this.args = args;
		
		handler = new Handler()
		{
			@Override
			public void handleMessage(Message msg) {
				callbackContext.success(result);
			}
		};
		
		new Thread()
		{
			@Override
			public void run() {
				callService();
			}
		}.start();
		return true;
	}
	
	private void callService()
	{
		result = new JSONArray();
		
	}
}
