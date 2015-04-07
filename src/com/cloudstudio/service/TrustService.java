package com.cloudstudio.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import android.util.Log;

public class TrustService {
	private static final String WSDLForRecord = "http://www.ecdata.org.cn:9020/pim_service/wsRecordInfoService";
	
	private static final String WSDLForProduct = "http://www.ecdata.org.cn:9020/pim_service/wsDraftPermitService";
	
	private static final String NameSpace = "http://web.service.ebtrust.com/";
	
	public String getSimpleRecordInfoListByComName(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "getSimpleRecordInfoListByComNameWithJson");
		try {
			if (!wsArgs.getString(0).equals(""))
				request.addProperty("arg0", wsArgs.getString(0));
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
		}
		return callWebService(request, WSDLForRecord);
	}
	
	public String getRecordInfoByRecordNo(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "getRecordInfoByRecordNo");
		try {
			if (!wsArgs.getString(0).equals(""))
				request.addProperty("arg0", wsArgs.getString(0));
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
		}
		return callWebService(request, WSDLForRecord);
	}
	
	public String getSimpleDraftPermitInfoListByProductName(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "getSimpleDraftPermitInfoListByProductNameWithJson");
		try {
			if (!wsArgs.getString(0).equals(""))
				request.addProperty("arg0", wsArgs.getString(0));
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
		}
		return callWebService(request, WSDLForProduct);
	}
	
	public String getDraftPermitByProductCode(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "getDraftPermitByProductCodeWithJson");
		try {
			if (!wsArgs.getString(0).equals(""))
				request.addProperty("arg0", wsArgs.getString(0));
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
		}
		return callWebService(request, WSDLForProduct);
	}
	
	public String getProductListByProductNameAndComName(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "getProductsByProductNameAndComNameWithJson");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));//第一个参数为企业名称
			}
			if(wsArgs.length() > 1 && !wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", wsArgs.getString(1));
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
		}
		return callWebService(request, WSDLForProduct);
	}
	
	public String publishPackageProduct(JSONArray wsArgs)
	{
		SoapObject request = new SoapObject(NameSpace, "insertTaoPiao");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));//第一个参数为企业名称
			}
			JSONObject jsonInfo = new JSONObject();
			
			if(!wsArgs.getString(1).equals(""))//套票名称
			{
				jsonInfo.put("productName", wsArgs.getString(1));
			}
			jsonInfo.put("nameEn", "package product");
			jsonInfo.put("images", "512_images_1.gif");
			
			if(!wsArgs.getString(2).equals(""))//套票价格
			{
				jsonInfo.put("producingRegion", Integer.parseInt(wsArgs.getString(2)));
			}
			if(!wsArgs.getString(3).equals(""))//套票简介
			{
				jsonInfo.put("description", wsArgs.getString(3));
			}
			jsonInfo.put("notes", "无");
			if(!wsArgs.getString(4).equals(""))//套票网站链接
			{
				jsonInfo.put("externalLink", wsArgs.getString(4));
			}
			if(!wsArgs.getString(5).equals(""))//套票所包含的产品备案号列表，以;分割
			{
				jsonInfo.put("model", wsArgs.getString(5));
			}
			
			request.addProperty("arg1", jsonInfo.toString());//第二个参数为套票信息json字符串
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
		}
		return callWebService(request, WSDLForProduct);
	}
	
	public String getProductListForSearch(JSONArray wsArgs)//用于根据产品类别获取备案产品列表，参数为：fieldName,productType,keyword,areaId,page,size
	{
		SoapObject request = new SoapObject(NameSpace, "getProductsWithJson");
		try {
			if (!wsArgs.getString(0).equals(""))
			{
				request.addProperty("arg0", wsArgs.getString(0));
			}
			if(!wsArgs.getString(1).equals(""))
			{
				request.addProperty("arg1", Integer.parseInt(wsArgs.getString(1)));
			}
			if(!wsArgs.getString(2).equals(""))
			{
				request.addProperty("arg2", wsArgs.getString(2));
			}
			if(!wsArgs.getString(3).equals(""))
			{
				request.addProperty("arg3", wsArgs.getString(3));
			}
			if(wsArgs.length() > 4 && !wsArgs.getString(4).equals(""))
			{
				request.addProperty("arg4", Integer.parseInt(wsArgs.getString(4)));
			}
			else {
				request.addProperty("arg4", 1);
			}
			if(wsArgs.length() > 5 && !wsArgs.getString(5).equals(""))
			{
				request.addProperty("arg5", Integer.parseInt(wsArgs.getString(5)));
			}
			else {
				request.addProperty("arg5", 10);
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.toString());
			e1.printStackTrace();
			return "-1";//返回-1表示出现异常
		}
		return callWebService(request, WSDLForProduct);
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
