package com.cloudstudio.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

import com.cloudstudio.util.JsonUtil;

import android.util.Log;

public class TravelHubService {
	private static final String NameSpace = "http://cloudexplorer.cn/";
	private static final String CusWSDL = "http://www.travelhub.cn/WS.CloudStudio/CustomerService.asmx";
	private static final String SupWSDL = "http://www.travelhub.cn/WS.CloudStudio/SupplierService.asmx";
	
	//RN为根据可信平台备案号进行操作的web服务地址
	private static final String CusRNWSDL = "http://www.travelhub.cn/WS.CloudStudio/CustomerServiceRN.asmx";
	private static final String SupRNWSDL = "http://www.travelhub.cn/WS.CloudStudio/SupplierServiceRN.asmx";
	private static final String OpeRNWSDL = "http://www.travelhub.cn/WS.CloudStudio/OperatorServiceRN.asmx";
	
	public JSONArray registerFromCloudStudio(JSONArray args)
	{
		String action = "RegisterFromCloudStudio";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if (!args.getString(0).equals(""))
			{
				request.addProperty("mobile", args.getString(0));
			}
			else {
				request.addProperty("mobile", "15011119999");
			}
			if (!args.getString(1).equals(""))
			{
				request.addProperty("password", args.getString(1));
			}
			else {
				request.addProperty("password", "111111");
			}
			if (!args.getString(2).equals(""))
			{
				request.addProperty("coporationName", args.getString(2));
			}
			else {
				request.addProperty("coporationName", "卞景浩");
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusRNWSDL);
	}
	
	public JSONArray getPriceDim(JSONArray args)
	{
		String action = "GetPriceDim";
		SoapObject request = new SoapObject(NameSpace, action);
		try {
			if (!args.getString(2).equals("")){
				request.addProperty("username", args.getString(0));
				request.addProperty("password", args.getString(1));
				request.addProperty("productId", args.getString(2));
			} else {
				return null;
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusWSDL);
	}
	
	public JSONArray getLocalPriceCalendar(JSONArray args)
	{
		String action = "GetLocalPriceCalendar";
		SoapObject request = new SoapObject(NameSpace, action);
		try {
			if (!args.getString(2).equals("") && !args.getString(3).equals(""))
			{
				request.addProperty("username", args.getString(0));
				request.addProperty("password", args.getString(1));
				request.addProperty("productId", args.getString(2));
				request.addProperty("priceDimId", args.getString(3));
			}
			else {
				return null;
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusWSDL);
	}
	
	public JSONArray getRemotePriceCalendar(JSONArray args)
	{
		String action = "GetRemotePriceCalendar";
		SoapObject request = new SoapObject(NameSpace, action);
		try {
			if (!args.getString(2).equals(""))
			{
				request.addProperty("username", args.getString(0));
				request.addProperty("password", args.getString(1));
				request.addProperty("policyId", args.getString(2));
			}
			else {
				return null;
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusWSDL);
	}
	
	public JSONArray submitOrder(JSONArray args)//参数顺序：旅游者、联系电话、本地or外部产品、是否酒店、产品id数组、实例id数组（本地）、附加信息数组（外部）、数量数组
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
			if(!args.getString(2).equals("") && !args.getString(3).equals(""))
			{
				request.addProperty("travellerName", args.getString(2));
				request.addProperty("travellerMobile", args.getString(3));
			}
			else {
				request.addProperty("travellerName", "陈昊");
				request.addProperty("travellerMobile", "15116217765");
			}
			if(!args.getString(4).equals(""))//对于酒店而言的outDate数组
			{
				SoapObject stringArray = new SoapObject(NameSpace, action);
				for(String i:args.getString(4).split(",")){
					stringArray.addProperty("string", i);
				}
				request.addProperty("outDates", stringArray);
			}
			if(!args.getString(5).equals(""))
			{
				SoapObject intArray = new SoapObject(NameSpace, action);
				for(int i:JsonUtil.parseStringToInt(args.getString(5).split(","))){
					intArray.addProperty("int", i);
				}
				request.addProperty("productIds",intArray);
			}
			if(!args.getString(6).equals(""))
			{
				SoapObject intArray = new SoapObject(NameSpace, action);
				for(int i:JsonUtil.parseStringToInt(args.getString(6).split(","))){
					intArray.addProperty("int", i);
				}
				request.addProperty("instanceIds",intArray);
			}
			if(!args.getString(7).equals(""))
			{
				SoapObject stringArray = new SoapObject(NameSpace, action);//封装复杂数据类型的方法,实际上参数均是string类型传过去，再经过接口解析
				for(String i:args.getString(7).split(",")){
					stringArray.addProperty("string", i);
				}
				request.addProperty("additionals",stringArray);
			}
			if(!args.getString(8).equals(""))
			{
				SoapObject intArray = new SoapObject(NameSpace, action);
				for(int i:JsonUtil.parseStringToInt(args.getString(8).split(","))){
					intArray.addProperty("int", i);
				}
				request.addProperty("quntities",intArray);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusWSDL);
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
				request.addProperty("size", 5);
			}
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusWSDL);
	}
	
	public JSONArray searchProducts(JSONArray args)
	{
		String action = "SearchProducts";
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
			if (!args.getString(2).equals(""))
			{
				request.addProperty("productType",Integer.parseInt(args.getString(2)));
			}
			else {
				request.addProperty("productType",1);
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("departure",args.getString(3));
			}
			else {
				request.addProperty("departure","");
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("destination",args.getString(3));
			}
			else {
				request.addProperty("destination","");
			}
			
			if (!args.getString(5).equals(""))
			{
				request.addProperty("name",args.getString(5));
			}
			else {
				request.addProperty("name","");
			}
			if (!args.getString(6).equals(""))
			{
				request.addProperty("price",Integer.parseInt(args.getString(6)));
			}
			else {
				request.addProperty("price",3000);
			}
			if (!args.getString(7).equals(""))
			{
				request.addProperty("page",Integer.parseInt(args.getString(7)));
			}
			else {
				request.addProperty("page",1);
			}
			if (!args.getString(8).equals(""))
			{
				request.addProperty("size",Integer.parseInt(args.getString(8)));
			}
			else {
				request.addProperty("size",10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusWSDL);
	}
	
	public JSONArray publishProduct(JSONArray args)
	{
		String action = "PublishProduct";
		SoapObject request = new SoapObject(NameSpace, action);

		try {
			if (!args.getString(0).equals(""))
			{
				request.addProperty("recordNo", args.getString(0));
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SupWSDL);
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
			if (!args.getString(2).equals("") && !args.getString(3).equals(""))
			{
				request.addProperty("page",Integer.parseInt(args.getString(2)));
				request.addProperty("size", Integer.parseInt(args.getString(3)));
			}
			else {
				request.addProperty("page",1);
				request.addProperty("size", 20);
			}
			if(!args.getString(4).equals(""))
				request.addProperty("productName",args.getString(4));
			else {
				request.addProperty("productName","");
			}
			if(!args.getString(5).equals(""))
				request.addProperty("itemName",args.getString(5));
			else {
				request.addProperty("itemName","");
			}
			if(!args.getString(6).equals(""))
				request.addProperty("travellerName",args.getString(6));
			else {
				request.addProperty("travellerName","");
			}
			if(!args.getString(7).equals(""))
				request.addProperty("travellerMobile",args.getString(7));
			else {
				request.addProperty("travellerMobile","");
			}
			if(!args.getString(8).equals(""))
				request.addProperty("createDateStart",args.getString(8));
			else {
				request.addProperty("createDateStart","");
			}
			if(!args.getString(9).equals(""))
				request.addProperty("createDateEnd",args.getString(9));
			else {
				request.addProperty("createDateEnd","");
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SupWSDL);
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
		return callWebService(action, request, SupWSDL);
	}
	
	public JSONArray searchRandomProducts(JSONArray args)
	{
		String action = "SearchRandomProducts";
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
			if (!args.getString(2).equals(""))
			{
				request.addProperty("size", Integer.parseInt(args.getString(2)));
			}
			else {
				request.addProperty("size", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, CusWSDL);
		
	}
	
	public JSONArray getAuditList(JSONArray args)//获得代理申请列表
	{
		String action = "AuditList";
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
				request.addProperty("applyCorporationName", args.getString(2));
			}
			else {
				request.addProperty("applyCorporationName", "");
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("applyProductName", args.getString(3));
			}
			else {
				request.addProperty("applyProductName", "");
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("applyDateFrom", args.getString(4));
			}
			else {
				request.addProperty("applyDateFrom", "");
			}
			if (!args.getString(5).equals(""))
			{
				request.addProperty("applyDateTo", args.getString(5));
			}
			else {
				request.addProperty("applyDateTo", "");
			}
			if (!args.getString(6).equals(""))
			{
				request.addProperty("applyStatus", Integer.parseInt(args.getString(6)));
			}
			else {
				request.addProperty("applyStatus", 1);
			}
			if (!args.getString(7).equals(""))
			{
				request.addProperty("page", Integer.parseInt(args.getString(7)));
			}
			else {
				request.addProperty("page", 1);
			}
			if (!args.getString(8).equals(""))
			{
				request.addProperty("size", Integer.parseInt(args.getString(8)));
			}
			else {
				request.addProperty("size", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SupRNWSDL);
	}
	
	public JSONArray saveAuditForProvider(JSONArray args)
	{
		String action = "SaveAudit";
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
				request.addProperty("productSharingPermissionId", Integer.parseInt(args.getString(2)));
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("auditResult", Integer.parseInt(args.getString(3)));
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("revisionSuggestion", args.getString(4));
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, SupRNWSDL);
	}
	
	public JSONArray applyProduct(JSONArray args)
	{
		String action = "SaveApply";
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
				request.addProperty("productSharingPermissionId", Integer.parseInt(args.getString(2)));
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("recordNo", args.getString(3));
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("startDate", args.getString(4));
			}
			if (!args.getString(5).equals(""))
			{
				request.addProperty("endDate", args.getString(5));
			}
			if (!args.getString(6).equals(""))
			{
				request.addProperty("Price", Integer.parseInt(args.getString(6)));
			}
			else {
				request.addProperty("Price", 100);
			}
			if (!args.getString(7).equals(""))
			{
				request.addProperty("maxPerDay", Integer.parseInt(args.getString(7)));
			}
			else {
				request.addProperty("maxPerDay", 10);
			}
			if (!args.getString(8).equals(""))
			{
				request.addProperty("agreement", args.getString(8));
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, OpeRNWSDL);
	}
	
	
	public JSONArray publishPackageProduct(JSONArray args)
	{
		String action = "PublishCombinedProduct";
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
				request.addProperty("productId", Integer.parseInt(args.getString(2)));
			}
			else {
				request.addProperty("productId", 0);
			}
			if(!args.getString(3).equals(""))
			{
				SoapObject stringArray = new SoapObject(NameSpace, action);//封装复杂数据类型的方法
				for(String i:args.getString(3).split(",")){
					if(!i.equals(""))
						stringArray.addProperty("string", i);
				}
				request.addProperty("relatedRecordNos",stringArray);
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("name", args.getString(4));
			}
			if (!args.getString(5).equals(""))
			{
				request.addProperty("estimatedPrice", Integer.parseInt(args.getString(5)));
			}
			if (!args.getString(6).equals(""))
			{
				request.addProperty("introduction", args.getString(6));
			}
			request.addProperty("contactAddress", "上海市浦东新区");
			request.addProperty("contactNumber", "15116217767");
			request.addProperty("trafficType", "大巴");
			request.addProperty("departure", "上海市浦东新区蔡伦路1159号");
			request.addProperty("departureDetail", "无");
			request.addProperty("routeDetail", "无");
			request.addProperty("days", 60);
			
			SoapObject stringArray = new SoapObject(NameSpace, action);
			stringArray.addProperty("string", "成人票");
			stringArray.addProperty("string", "学生票");
			
			SoapObject floatArray = new SoapObject(NameSpace, action);
			floatArray.addProperty("int", Integer.parseInt(args.getString(5)));
			floatArray.addProperty("int", Integer.parseInt(args.getString(5))/2);
			
			SoapObject intArray = new SoapObject(NameSpace, action);
			intArray.addProperty("int", 50);
			intArray.addProperty("int", 30);
			
			request.addProperty("orderedTicketTypes", stringArray);
			request.addProperty("orderedTicketPrices", floatArray);
			request.addProperty("orderedTicketAvailableNumbers", intArray);
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, OpeRNWSDL);
	}
	
	public JSONArray searchPublishedProducts(JSONArray args)
	{
		String action = "SearchPublishedProducts";
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
				request.addProperty("productType", Integer.parseInt(args.getString(2)));
			}
			else {
				request.addProperty("productType", 1);
			}
			if (!args.getString(3).equals(""))
			{
				request.addProperty("name", args.getString(3));
			}
			else {
				request.addProperty("name", "");
			}
			if (!args.getString(4).equals(""))
			{
				request.addProperty("page", Integer.parseInt(args.getString(4)));
			}
			else {
				request.addProperty("page", 1);
			}
			if (!args.getString(5).equals(""))
			{
				request.addProperty("size", Integer.parseInt(args.getString(5)));
			}
			else {
				request.addProperty("size", 10);
			}
			
		} catch (JSONException e1) {
			Log.d("b2c", e1.getMessage());
			e1.printStackTrace();
		}
		return callWebService(action, request, OpeRNWSDL);
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
				if(action.equals("RegisterFromCloudStudio"))//调用的是GetLocalPriceCalendar
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					resultJsonArray.put(JsonUtil.parseToJsonObjectForRegisterResult(result));
				}
				else if(action.equals("GetPriceDim")){//调用的是GetPriceDim，JsonUtil中对应不同的方法
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForPriceDim((SoapObject) result.getProperty(i)));
						//Log.d("b2c", result.getProperty(i).toString());
					}
				}
				else if(action.equals("GetLocalPriceCalendar"))//调用的是GetLocalPriceCalendar
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					resultJsonArray.put(result.toString());
				}
				else if(action.equals("GetRemotePriceCalendar"))//调用的是GetRemotePriceCalendar
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					resultJsonArray.put(result.toString());
					//Log.d("b2c", result.toString());
				}
				else if(action.equals("GetOrder"))
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForGetOrder((SoapObject) result.getProperty(i)));
						//Log.d("b2c", result.getProperty(i).toString());
					}
				}
				else if(action.equals("SubmitOrder"))//返回的是一个long值
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
						//Log.d("b2c", result.toString());
					}
				}
				else if(action.equals("SearchProducts"))
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					if(result != null && result.getPropertyCount() > 0)
					{
						for (int i = 0; i < result.getPropertyCount(); i++) {
							//Log.d("b2c", result.getProperty(i).toString());
							resultJsonArray.put(JsonUtil.parseToJsonObjectForSearchProducts((SoapObject)result.getProperty(i)));
						}
					}
				}
				else if(action.equals("PublishProduct"))
				{
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
						//Log.d("b2c", result.toString());
					}
				}
				else if(action.equals("GetOrderItem"))
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						resultJsonArray.put(JsonUtil.parseToJsonObjectForOrderItem((SoapObject) result.getProperty(i)));
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
				else if(action.equals("SearchRandomProducts"))
				{
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						//Log.d("b2c", result.getProperty(i).toString());
						resultJsonArray.put(JsonUtil.parseToJsonObjectForSearchProducts((SoapObject)result.getProperty(i)));
					}
				}
				else if (action.equals("AuditList")) {
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						//Log.d("b2c", result.getProperty(i).toString());
						resultJsonArray.put(JsonUtil.parseToJsonObjectForAuditListOfTravel((SoapObject)result.getProperty(i)));
					}
				}
				else if (action.equals("SaveAudit")) {
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if (action.equals("SaveApply")) {
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if (action.equals("PublishCombinedProduct")) {
					SoapPrimitive result = (SoapPrimitive) envelope.getResponse();
					if(result != null)
					{
						resultJsonArray.put(result.toString());
					}
				}
				else if (action.equals("SearchPublishedProducts")) {
					SoapObject result = (SoapObject) envelope.getResponse();
					for (int i = 0; i < result.getPropertyCount(); i++) {
						//Log.d("b2c", result.getProperty(i).toString());
						resultJsonArray.put(JsonUtil.parseToJsonObjectForPublishedProductListOfTravel((SoapObject)result.getProperty(i)));
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
	
}
