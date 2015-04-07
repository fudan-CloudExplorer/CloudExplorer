package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.Handler;
import android.os.Message;
import com.cloudstudio.service.TravelRecommendService;
import com.cloudstudio.util.HttpRequestUtil;

public class GetOptionsPlugin extends CordovaPlugin {

	private Handler queryServiceHandler;
	private Handler callServiceHandler;
	private JSONArray result;
	private String action;
	private JSONArray args;

	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		// TODO Auto-generated method stub
		this.action = action;
		this.args = args;
		queryServiceHandler = new Handler() {

			@Override
			public void handleMessage(Message msg) {
				// TODO Auto-generated method stub
				callService();
			}

		};
		callServiceHandler = new Handler() {

			@Override
			public void handleMessage(Message msg) {
				// TODO Auto-generated method stub
				callbackContext.success(result);
			}

		};
		new Thread() {

			@Override
			public void run() {
				// TODO Auto-generated method stub
				queryServiceHandler.sendEmptyMessage(0);
			}

		}.start();

		return true;
	}

	private void callService() {
		new Thread() {
			public void run() {
				JSONObject temp = new JSONObject();
				
				TravelRecommendService travelRecommendService = new TravelRecommendService();
				
				if (action.equals("setCurrentServiceType")) {
					if(HttpRequestUtil.sessionId != null && HttpRequestUtil.sessionId.length() > 0){
						args.put(HttpRequestUtil.sessionId);
						args.put("10");
					}
					try {
						if(travelRecommendService.setCurrentServiceType(args).equals("true"))
						{
							String productList = travelRecommendService.getOptions(args);
							result = new JSONArray(productList);
						}
					} catch (Exception e) {
					}
					
					callServiceHandler.sendEmptyMessage(0);
				}
			}
		}.start();
	}
}
