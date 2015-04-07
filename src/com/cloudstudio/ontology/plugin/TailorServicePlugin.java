package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.os.Handler;
import android.os.Message;

import com.cloudstudio.service.ShoppingService;
import com.cloudstudio.service.TailorService;

public class TailorServicePlugin extends CordovaPlugin {
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
				TailorService tService = new TailorService();
				
				if(action.equals("getInstance"))
				{
					result.put(tService.getInstance(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("submitOrder")) {
					result.put(tService.submitOrder(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getOrders")) {
					result.put(tService.getOrders(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getOrderItems")) {
					result.put(tService.getOrderItems(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("confirmOrder")) {
					result.put(tService.confirmOrder(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getAgreements")) {
					result.put(tService.getAgreements(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("manageAgreement")) {
					result.put(tService.manageAgreement(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("applyProduct")) {
					result.put(tService.applyProduct(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("searchPackageList")) {
					result.put(tService.searchPackageList(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getApplyList")) {
					result.put(tService.getApplyList(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("publishPackageProduct")) {
					result.put(tService.publishPackageProduct(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
			}
		}.start();
	}
}
