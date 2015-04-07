package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.os.Handler;
import android.os.Message;

import com.cloudstudio.service.TrustService;

public class TrustServicePlugin extends CordovaPlugin {
	
	private Handler queryServiceHandler;
	private Handler callServiceHandler;
	private JSONArray result;
	private String action;
	private JSONArray args;

	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		this.action = action;
		this.args = args;
		queryServiceHandler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				callService();
			}
		};
		callServiceHandler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				callbackContext.success(result);
			}

		};
		new Thread() {
			@Override
			public void run() {
				queryServiceHandler.sendEmptyMessage(0);
			}
		}.start();
		return true;
	}

	private void callService() {
		result = new JSONArray();
		new Thread() {
			public void run() {
				TrustService trustService = new TrustService();
				
				if (action.equals("getSimpleRecordInfoListByComName")) {
					result.put(trustService.getSimpleRecordInfoListByComName(args));
					callServiceHandler.sendEmptyMessage(0);						
				}
				else if(action.equals("getRecordInfoByRecordNo"))
				{
					result.put(trustService.getRecordInfoByRecordNo(args));
					callServiceHandler.sendEmptyMessage(0);		
				}
				else if(action.equals("getSimpleDraftPermitInfoListByProductName"))
				{
					result.put(trustService.getSimpleDraftPermitInfoListByProductName(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("getDraftPermitByProductCode"))
				{
					result.put(trustService.getDraftPermitByProductCode(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("getProductsByProductNameAndComNameWithJson"))
				{
					result.put(trustService.getProductListByProductNameAndComName(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getProductsForSearch")) {//用于自主点餐以及套餐页面查询产品列表
					result.put(trustService.getProductListForSearch(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("publishPackageProduct")) {//用于发布套票
					result.put(trustService.publishPackageProduct(args));
					callServiceHandler.sendEmptyMessage(0);	
				}
			}
		}.start();
	}
}