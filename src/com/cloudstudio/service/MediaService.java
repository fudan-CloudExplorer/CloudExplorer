package com.cloudstudio.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import android.util.Log;

public class MediaService {
	private static final String NameSpace = "http://ws/";
	private static final String PatWSDL = "http://www.ecdata.org.cn:7040/MediaWebService/QueryConsumer";
	private static final String DocWSDL = "http://www.ecdata.org.cn:7040/MediaWebService/QueryProvider";
	private static final String HosWSDL = "http://www.ecdata.org.cn:7040/MediaWebService/QueryOperator";
	
	public String getInstance(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "GetInstance");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, PatWSDL);
	}
	
	public String submitOrder(JSONArray wsArgs)
	{
		String action = "SubmitOrder";
		SoapObject request = new SoapObject(NameSpace, action);
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			else {
				request.addProperty("arg0", "user");
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
			else {
				request.addProperty("arg1", "111111");
			}
			if(!wsArgs.getString(2).equals(""))//备案号数组
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			if(!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", wsArgs.getString(3));
			}
			if(!wsArgs.getString(4).equals(""))
			{
				request.addProperty("arg4", wsArgs.getString(4));
			}
			if(!wsArgs.getString(5).equals(""))
			{
				request.addProperty("arg5", wsArgs.getString(5));
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, PatWSDL);
	}
	
	public String getOrders(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "GetOrder");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			else {
				request.addProperty("arg0", "user");
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
			else {
				request.addProperty("arg1", "111111");
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", Integer.parseInt(wsArgs.getString(2)));
			}
			else {
				request.addProperty("arg2", 1);
			}
			if (!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", Integer.parseInt(wsArgs.getString(3)));
			}
			else {
				request.addProperty("arg3", 10);
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, PatWSDL);
	}
	
	public String getOrderItems(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "GetOrderItem");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			else {
				request.addProperty("arg0", "admin");
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
			else {
				request.addProperty("arg1", "111111");
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			if (!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", wsArgs.getString(3));
			}
			if (!wsArgs.getString(4).equals(""))
			{
				request.addProperty("arg4", wsArgs.getString(4));
			}
			if (!wsArgs.getString(5).equals(""))
			{
				request.addProperty("arg5", wsArgs.getString(5));
			}
			if (!wsArgs.getString(6).equals(""))
			{
				request.addProperty("arg6", wsArgs.getString(6));
			}
			if (!wsArgs.getString(7).equals(""))
			{
				request.addProperty("arg7", Integer.parseInt(wsArgs.getString(7)));
			}
			else {
				request.addProperty("arg7", 1);
			}
			if (!wsArgs.getString(8).equals(""))
			{
				request.addProperty("arg8", Integer.parseInt(wsArgs.getString(8)));
			}
			else {
				request.addProperty("arg8", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, DocWSDL);
	}
	
	public String confirmOrder(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "ConfirmOrder");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			else {
				request.addProperty("arg0", "admin");
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
			else {
				request.addProperty("arg1", "111111");
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			if (!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", wsArgs.getString(3));
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, DocWSDL);
	}
	
	public String getAgreements(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "GetAgreements");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", Integer.parseInt(wsArgs.getString(1)));
			}
			else {
				request.addProperty("arg1", 1);
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", Integer.parseInt(wsArgs.getString(2)));
			}
			else {
				request.addProperty("arg2", 10);
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, DocWSDL);
	}
	
	public String manageAgreement(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "ManageAgreement");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", Integer.parseInt(wsArgs.getString(1)));
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			else {
				request.addProperty("arg2", "agree");
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, DocWSDL);
	}
	
	public String applyProduct(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "ApplyProduct");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			if (!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", wsArgs.getString(3));
			}
			if (!wsArgs.getString(4).equals(""))
			{
				request.addProperty("arg4", wsArgs.getString(4));
			}
			if (!wsArgs.getString(5).equals(""))
			{
				request.addProperty("arg5", wsArgs.getString(5));
			}
			if (!wsArgs.getString(6).equals(""))
			{
				request.addProperty("arg6", wsArgs.getString(6));
			}
			if (!wsArgs.getString(7).equals(""))
			{
				request.addProperty("arg7", wsArgs.getString(7));
			}
			else {
				request.addProperty("arg7", "申请方未提供协议内容");
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, HosWSDL);
	}
	
	public String publishPackageProduct(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "PublishPackageProduct");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			if (!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", Integer.parseInt(wsArgs.getString(3)));
			}
			if (!wsArgs.getString(4).equals(""))
			{
				request.addProperty("arg4", wsArgs.getString(4));
			}
			else {
				request.addProperty("arg4", "未提供描述信息");
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, HosWSDL);
	}
	
	public String searchPackageList(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "SearchPackageList");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			if (!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", Integer.parseInt(wsArgs.getString(3)));
			}
			else {
				request.addProperty("arg3", 1);
			}
			if (!wsArgs.getString(4).equals(""))
			{
				request.addProperty("arg4", Integer.parseInt(wsArgs.getString(4)));
			}
			else {
				request.addProperty("arg4", 10);
			}
			
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, HosWSDL);
	}
	
	public String getApplyList(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "ApplyList");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			if (!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", Integer.parseInt(wsArgs.getString(1)));
			}
			else {
				request.addProperty("arg1", 1);
			}
			if (!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", Integer.parseInt(wsArgs.getString(2)));
			}
			else {
				request.addProperty("arg2", 10);
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, HosWSDL);
	}
	
	private String callWebService(SoapObject request,String wsdl)
	{
		SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
				SoapEnvelope.VER11);
		envelope.bodyOut = request;
		envelope.dotNet = false;
		
		envelope.setOutputSoapObject(request);
		HttpTransportSE ht = new HttpTransportSE(wsdl, 15000);
		try {
			ht.call(null, envelope);
			if (envelope.getResponse() != null) {
				SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
				return result.toString();
			} else {
				Log.d("b2c", "connection fail");
				return "";//返回空字符串表示没有查到数据
			}
		} catch (Exception e) {
			Log.d("b2c", e.toString());
			e.printStackTrace();
			return "-1";
		}
	}
}
