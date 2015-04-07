package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.os.Handler;
import android.os.Message;

import com.cloudstudio.service.TravelHubService;

public class TravelHubServicePlugin extends CordovaPlugin {
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
				TravelHubService tService = new TravelHubService();
				
				if (action.equals("getPriceDim")) {//获得指定产品Id的票种信息,需提供用户名、密码和产品id
					
					result = tService.getPriceDim(args);
					callServiceHandler.sendEmptyMessage(0);						
				}
				else if (action.equals("getInstance")) {//需提供用户名、密码、产品id以及使用日期
					
					result.put(true);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getLocalPriceCalendar")) {//需提供用户名、密码、产品id以及PriceDimId
					
					result = tService.getLocalPriceCalendar(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getRemotePriceCalendar")) {//需提供用户名、密码、policyId
					
					result = tService.getRemotePriceCalendar(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getOrder")) {//需提供用户名、密码、page、size
					
					result = tService.getOrders(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("submitOrder")) {//用户下订单
					
					result = tService.submitOrder(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("searchProducts"))//用户查找产品数据
				{
					result = tService.searchProducts(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("publishProduct"))//供应商发布产品
				{
					result = tService.publishProduct(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("getOrderItem"))//供应商获得订单列表
				{
					result = tService.getOrderItem(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("confirmOrder"))//供应商确认订单
				{
					result = tService.confirmOrder(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if(action.equals("searchRandomProducts"))//用于人云互找，可以随机获取多种类型的产品列表
				{
					result = tService.searchRandomProducts(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("getAuditList")) {
					result = tService.getAuditList(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("manageAgreement")) {
					result = tService.saveAuditForProvider(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("applyProduct")) {
					result = tService.applyProduct(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("publishPackageProduct")) {
					result = tService.publishPackageProduct(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
				else if (action.equals("searchPublishedProducts")) {
					result = tService.searchPublishedProducts(args);
					callServiceHandler.sendEmptyMessage(0);	
				}else if (action.equals("registerFromCloudStudio")) {
					result = tService.registerFromCloudStudio(args);
					callServiceHandler.sendEmptyMessage(0);	
				}
			}
		}.start();
	}
}
