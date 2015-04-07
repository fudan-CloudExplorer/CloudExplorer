package com.cloudstudio.service;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import com.cloudstudio.CloudStudioApplication;
import com.cloudstudio.util.JsonUtil;
import com.cloudstudio.util.OpenAppUtil;

import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.ResolveInfo;
import android.util.Log;

public class EducationService {
	private static final String NameSpace = "http://eb.fudan.edu.cn/";
	private static final String StuWSDL = "http://www.chenniao.com/caiyunge/ConsumerService.asmx";
	private static final String TeaWSDL = "http://www.chenniao.com/caiyunge/UserService.asmx";
	private static final String SchWSDL = "http://www.chenniao.com/caiyunge/SchoolService.asmx";
	
	public JSONArray getInstance(JSONArray args)
	{
		String action = "GetInstance";
		SoapObject request = new SoapObject(NameSpace, action);
		
		try {
			if (!args.getString(0).equals(""))
			{
				request.addProperty("productRecordNo", args.getString(0));
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, StuWSDL);
	}
	
	public JSONArray submitOrder(JSONArray args)
	{
		String action = "SubmitOrder";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if (!args.getString(0).equals("") && !args.getString(1).equals(""))
			{
				request.addProperty("username", args.getString(0));
				request.addProperty("password", args.getString(1));
			}
			else {
				request.addProperty("username", "user");
				request.addProperty("password", "111111");
			}
			if(!args.getString(2).equals(""))
			{
				SoapObject stringArray = new SoapObject(NameSpace, action);
				for(String i:args.getString(2).split(",")){
					stringArray.addProperty("string", i);
				}
				request.addProperty("recordNos", stringArray);
			}
			if(!args.getString(3).equals(""))
			{
				SoapObject intArray = new SoapObject(NameSpace, action);
				for(int i:JsonUtil.parseStringToInt(args.getString(3).split(","))){
					intArray.addProperty("int", i);
				}
				request.addProperty("instanceIds",intArray);
			}
			if(!args.getString(4).equals(""))
			{
				SoapObject stringArray = new SoapObject(NameSpace, action);//封装复杂数据类型的方法
				for(String i:args.getString(4).split(",")){
					stringArray.addProperty("string", i);
				}
				request.addProperty("dates",stringArray);
			}
			if(!args.getString(5).equals(""))
			{
				SoapObject intArray = new SoapObject(NameSpace, action);
				for(int i:JsonUtil.parseStringToInt(args.getString(5).split(","))){
					intArray.addProperty("int", i);
				}
				request.addProperty("quntities",intArray);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, StuWSDL);
	}
	
	public JSONArray getOrders(JSONArray args)
	{
		String action = "GetOrder";
		SoapObject request = new SoapObject(NameSpace, action);
		
		try {
			if(!args.getString(0).equals("") && !args.getString(1).equals(""))
			{
				request.addProperty("username",args.getString(0));
				request.addProperty("password", args.getString(1));
			}
			else {
				request.addProperty("username", "user");
				request.addProperty("password", "111111");
			}
			if (!args.getString(2).equals("") && !args.getString(3).equals(""))
			{
				request.addProperty("page",Integer.parseInt(args.getString(2)));
				request.addProperty("size", Integer.parseInt(args.getString(3)));
			}
			else {
				request.addProperty("page",1);
				request.addProperty("size", 10);
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, StuWSDL);
	}
	
	public JSONArray getOrderItem(JSONArray args)
	{
		String action = "GetOrderItem";
		SoapObject request = new SoapObject(NameSpace, action);
		
		try {
			if(!args.getString(0).equals("") && !args.getString(1).equals(""))
			{
				request.addProperty("username",args.getString(0));
				request.addProperty("password", args.getString(1));
			}
			else {
				request.addProperty("username", "admin");
				request.addProperty("password", "111111");
			}
			if(!args.getString(2).equals(""))
				request.addProperty("productName",args.getString(2));
			else {
				request.addProperty("productName","");
			}
			if(!args.getString(3).equals(""))
				request.addProperty("studentName",args.getString(3));
			else {
				request.addProperty("studentName","");
			}
			if(!args.getString(4).equals(""))
				request.addProperty("studentMobile",args.getString(4));
			else {
				request.addProperty("studentMobile","");
			}
			if(!args.getString(5).equals(""))
				request.addProperty("createDateStart",args.getString(5));
			else {
				request.addProperty("createDateStart","");
			}
			if(!args.getString(6).equals(""))
				request.addProperty("createDateEnd",args.getString(6));
			else {
				request.addProperty("createDateEnd","");
			}
			if (!args.getString(7).equals("") && !args.getString(8).equals(""))
			{
				request.addProperty("page",Integer.parseInt(args.getString(7)));
				request.addProperty("size", Integer.parseInt(args.getString(8)));
			}
			else {
				request.addProperty("page",1);
				request.addProperty("size", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, TeaWSDL);
	}
	
	public JSONArray confirmOrder(JSONArray args) 
	{
		String action = "ConfirmOrder";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if(!args.getString(0).equals("") && !args.getString(1).equals(""))
			{
				request.addProperty("username",args.getString(0));
				request.addProperty("password", args.getString(1));
			}
			else {
				request.addProperty("username", "admin");
				request.addProperty("password", "111111");
			}
			if (!args.getString(2).equals(""))
			{
				request.addProperty("orderItemId", Integer.parseInt(args.getString(2)));
			}
			request.addProperty("addtionalInfo", "");
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, TeaWSDL);
	}
	
	public JSONArray getAgreements(JSONArray args) //教师获得所有申请列表（他人发送的）
	{
		String action = "QueryProductApplyList";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if(!args.getString(0).equals(""))
			{
				request.addProperty("username",args.getString(0));
			}
			if (!args.getString(1).equals(""))
			{
				request.addProperty("productName", args.getString(1));
			}
			else {
				request.addProperty("productName", "");
			}
			if (!args.getString(2).equals(""))
			{
				request.addProperty("status", args.getString(2));
			}
			else {
				request.addProperty("status", "未审核");
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("applyName", args.getString(3));
			}
			else {
				request.addProperty("applyName", "");
			}
			if (!args.getString(4).equals("") && !args.getString(5).equals(""))
			{
				request.addProperty("page",Integer.parseInt(args.getString(4)));
				request.addProperty("size", Integer.parseInt(args.getString(5)));
			}
			else {
				request.addProperty("page",1);
				request.addProperty("size", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, TeaWSDL);
	}
	
	public JSONArray handleProductApply(JSONArray args) //教师审核用户的申请
	{
		String action = "HandleProductApply";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if(!args.getString(0).equals(""))
			{
				request.addProperty("username",args.getString(0));
			}
			if (!args.getString(1).equals(""))
			{
				request.addProperty("agreementId", Integer.parseInt(args.getString(1)));
			}
			if (!args.getString(2).equals(""))
			{
				request.addProperty("method", args.getString(2));
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, TeaWSDL);
	}
	
	public JSONArray applyProduct(JSONArray args) //私塾向教师发出产品销售申请
	{
		String action = "ApplyProduct";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if(!args.getString(0).equals(""))
			{
				request.addProperty("providerName",args.getString(0));
			}
			if (!args.getString(1).equals(""))
			{
				request.addProperty("recordNo", args.getString(1));
			}
			if (!args.getString(2).equals(""))
			{
				request.addProperty("productName", args.getString(2));
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("applyName", args.getString(3));
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("applyPrice", Integer.parseInt(args.getString(4)));
			}
			if (!args.getString(5).equals(""))
			{
				request.addProperty("dateStart", args.getString(5));
			}
			if (!args.getString(6).equals(""))
			{
				request.addProperty("dateEnd", args.getString(6));
			}
			if (!args.getString(7).equals(""))
			{
				request.addProperty("content", args.getString(7));
			}
			else {
				request.addProperty("content", "暂无详细协议说明");
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SchWSDL);
	}
	
	public JSONArray publishPackageProduct(JSONArray args) //私塾发布课程套票
	{
		String action = "PublishPackage";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if(!args.getString(0).equals(""))
			{
				request.addProperty("username",args.getString(0));
			}
			if (!args.getString(1).equals(""))
			{
				request.addProperty("relatedRecordNos", args.getString(1).substring(0, args.getString(1).length() - 1));
			}
			if (!args.getString(2).equals(""))
			{
				request.addProperty("productName", args.getString(2));
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("price", Integer.parseInt(args.getString(3)));
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("description", args.getString(4));
			}
			else {
				request.addProperty("description", "暂无详细说明");
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SchWSDL);
	}
	
	public JSONArray getPackageList(JSONArray args) //私塾获得已发布套餐列表
	{
		String action = "QueryPackageList";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if(!args.getString(0).equals(""))
			{
				request.addProperty("username",args.getString(0));
			}
			if (args.length() > 1)
			{
				request.addProperty("packageName", args.getString(1));
			}
			
			if (args.length() > 2)
			{
				request.addProperty("productName", args.getString(2));
			}
			if (args.length() > 3)
			{
				request.addProperty("status", args.getString(3));
			}
			if (!args.getString(4).equals("") && !args.getString(5).equals(""))
			{
				request.addProperty("page",Integer.parseInt(args.getString(4)));
				request.addProperty("size", Integer.parseInt(args.getString(5)));
			}
			else {
				request.addProperty("page",1);
				request.addProperty("size", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SchWSDL);
	}
	
	public JSONArray getApplyList(JSONArray args) //私塾获得自己发布的申请列表
	{
		String action = "QueryApplyList";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if(!args.getString(0).equals(""))
			{
				request.addProperty("username",args.getString(0));
			}
			if (args.length() > 1)
			{
				request.addProperty("productName", args.getString(1));
			}
			if (!args.getString(2).equals(""))
			{
				request.addProperty("status", args.getString(2));
			}
			if (args.length() > 3)
			{
				request.addProperty("providerName", args.getString(3));
			}
			if (!args.getString(4).equals("") && !args.getString(5).equals(""))
			{
				request.addProperty("page",Integer.parseInt(args.getString(4)));
				request.addProperty("size", Integer.parseInt(args.getString(5)));
			}
			else {
				request.addProperty("page",1);
				request.addProperty("size", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SchWSDL);
	}
	
	private JSONArray callWebService(String action,SoapObject request,String wsdl)//作为调用的公共部分
	{
		String SOAPAction = NameSpace + action;
		JSONArray resultJsonArray = new JSONArray();
		SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
				SoapEnvelope.VER11);
		envelope.bodyOut = request;
		envelope.dotNet = true;
		
		envelope.setOutputSoapObject(request);
		HttpTransportSE ht = new HttpTransportSE(wsdl, 15000);
		try {
			ht.call(SOAPAction, envelope);
			if (envelope.getResponse() != null) {		
				if(action.equals("GetInstance"))
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseJsonObjectForGetInstance((SoapObject) result.getProperty(i)));
						//Log.d("b2c", result.getProperty(i).toString());
					}
				}
				else if (action.equals("SubmitOrder")) {
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if (action.equals("GetOrder")) {
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForGetOrderOfStudent((SoapObject)result.getProperty(i)));
						//Log.d("b2c", result.getProperty(i).toString());
					}
				}
				else if(action.equals("GetOrderItem"))
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForOrderItemOfStudent((SoapObject) result.getProperty(i)));
						//Log.d("b2c", result.getProperty(i).toString());
					}
				}
				else if(action.equals("ConfirmOrder"))
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if(action.equals("QueryProductApplyList"))//需要教师审核申请的列表
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForAuditListOfEducation((SoapObject) result.getProperty(i)));
						//Log.d("b2c", result.getProperty(i).toString());
					}
				}
				else if(action.equals("HandleProductApply"))
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if(action.equals("ApplyProduct"))
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if(action.equals("PublishPackage"))
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if(action.equals("QueryApplyList"))//自己发布的申请列表
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForAuditListOfEducation((SoapObject) result.getProperty(i)));
						//Log.d("b2c", result.getProperty(i).toString());
					}
				}
				else if(action.equals("QueryPackageList"))
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForPublishedProductListOfEducation((SoapObject) result.getProperty(i)));
					}
				}
			} else {
				Log.d("b2c", "connection fail");
			}
			
			return resultJsonArray;//返回空字符串则表示没有查到有效数据
		} catch (Exception e) {
			Log.d("b2c", e.toString());
			resultJsonArray.put(-1);
			return resultJsonArray;//发生异常返回-1的jsonarray以防止程序退出
		}
	}
	
	/*用于打开视频软件，如skype，arg0可以作为软件名称，arg1等可以作为参数  */
	public int invokeVideoSoftware(JSONArray args)
	{
		try {
			if(args == null || args.length() == 0 || args.getString(0).equals(""))
			{
				System.out.println("未指定视频软件名称");
				return -1;
			}
			else {
				if(args.getString(0).equals("skype") && !args.getString(1).equals(""))//采用skype作为远程视频软件
				{
					String skypeUri = "skype:" + args.getString(1) + "?call";
					if(args.getString(2).equals("video"))
						skypeUri += "&video=true";
					return OpenAppUtil.initiateSkypeUri(skypeUri);
				}
			}
		} catch (JSONException e) {
			System.out.println("远程视频教学开启失败");
			e.printStackTrace();
		}
		return 0;
	}
}
