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

public class TravelRecommendPlugin extends CordovaPlugin {
	
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
	    //result = new JSONArray();
		new Thread() {
			public void run() {
				JSONObject temp = new JSONObject();
				
				TravelRecommendService travelRecommendService = new TravelRecommendService();
				
				if (action.equals("startArrangement")) {
					try {
						temp = new JSONObject(travelRecommendService.startArrangement(args));
						if(temp.getString("sessionId") != null && temp.getString("sessionId").length() > 0){
							HttpRequestUtil.sessionId = temp.getString("sessionId");//工具类的静态字段存储sessionId
							args.put(temp.getString("sessionId"));
							args.put("8");
						}
						if(travelRecommendService.setCurrentServiceType(args).equals("true"))
						{
							String productList = travelRecommendService.getOptions(args);
							result = new JSONArray(productList);
						}
						
					} catch (JSONException e) {
						e.printStackTrace();
					}			
					
					callServiceHandler.sendEmptyMessage(0);
					
				}
			}
		}.start();
	}
}
