package com.cloudstudio.ontology.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import com.cloudstudio.service.AnimaModelService;

import android.os.Handler;
import android.os.Message;

public class AnimaModelPlugin extends CordovaPlugin {
	private Handler queryServiceHandler;
	private JSONArray result;
	private String action;
	private JSONArray args;
	private AnimaModelService animaModelService;
	
	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		this.action = action;
		this.args = args;
		queryServiceHandler = new Handler() {
			@Override
			public void handleMessage(Message msg) {
				callbackContext.success(result);
			}
		};
		new Thread() {
			@Override
			public void run() {
				callService();
			}
		}.start();
		
		return true;
	}
	
	//通过调用service中的方法，可以实现灵魂模型相关操作，具体写法可以参考概念插入和获得的方法
	private void callService()
	{
		result = new JSONArray();
		animaModelService = new AnimaModelService();
		if("insertConcept".equals(action))
		{
			result.put(animaModelService.insertConcept(args));
			queryServiceHandler.sendEmptyMessage(0);
		}
		else if("getConceptById".equals(action))
		{
			result.put(animaModelService.getConceptById(args));
			queryServiceHandler.sendEmptyMessage(0);
		}
		else if("getConceptsByParentId".equals(action))
		{
			result = animaModelService.getConceptsByParentId(args);
			queryServiceHandler.sendEmptyMessage(0);
		}
	}
}
