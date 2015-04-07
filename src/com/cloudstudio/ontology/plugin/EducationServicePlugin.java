package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.os.Handler;
import android.os.Message;

import com.cloudstudio.service.EducationService;

public class EducationServicePlugin extends CordovaPlugin {
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
				EducationService eService = new EducationService();
				
				if(action.equals("getInstance"))
				{
					result = eService.getInstance(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("submitOrder"))
				{
					result = eService.submitOrder(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("getOrders"))
				{
					result = eService.getOrders(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("getOrderItems"))
				{
					result = eService.getOrderItem(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("confirmOrder"))
				{
					result = eService.confirmOrder(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("getAgreements"))
				{
					result = eService.getAgreements(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("manageAgreement"))
				{
					result = eService.handleProductApply(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("applyProduct"))
				{
					result = eService.applyProduct(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("publishPackageProduct"))
				{
					result = eService.publishPackageProduct(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("searchPackageList"))
				{
					result = eService.getPackageList(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("getApplyList"))
				{
					result = eService.getApplyList(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("startVideoSoftware"))
				{
					result.put(eService.invokeVideoSoftware(args));
					callServiceHandler.sendEmptyMessage(0);
				}
			}
		}.start();
	}
}
