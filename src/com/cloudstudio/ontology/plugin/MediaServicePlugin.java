package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.os.Handler;
import android.os.Message;

import com.cloudstudio.service.MediaService;

public class MediaServicePlugin extends CordovaPlugin {
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
		result = new JSONArray();
		new Thread() {
			public void run() {
				MediaService mService = new MediaService();
				
				if(action.equals("getInstance"))
				{
					result.put(mService.getInstance(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("submitOrder")) {
					result.put(mService.submitOrder(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getOrders")) {
					result.put(mService.getOrders(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getOrderItems")) {
					result.put(mService.getOrderItems(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("confirmOrder")) {
					result.put(mService.confirmOrder(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getAgreements")) {
					result.put(mService.getAgreements(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("manageAgreement")) {
					result.put(mService.manageAgreement(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("applyProduct")) {
					result.put(mService.applyProduct(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("searchPackageList")) {
					result.put(mService.searchPackageList(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getApplyList")) {
					result.put(mService.getApplyList(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("publishPackageProduct")) {
					result.put(mService.publishPackageProduct(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
			}
		}.start();
	}
}
