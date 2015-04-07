package com.cloudstudio.util;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.ksoap2.serialization.SoapObject;
import android.util.Log;

public class JsonUtil {
	
	public static JSONObject parseToJsonObjectForRegisterResult(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		try {
			result.put("result", sObject.getPropertySafelyAsString("Result"));
			result.put("mobile", sObject.getPropertySafelyAsString("Mobile"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForPriceDim(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("priceDimId", sObject.getPropertySafelyAsString("ID").replaceAll("\\|", "%"));//酒店id是（房间id|票种id）的格式
			result.put("type", sObject.getPropertySafelyAsString("Type"));
			result.put("priceDimType", sObject.getPropertySafelyAsString("PriceDimType"));
			result.put("name", sObject.getPropertySafelyAsString("Name"));
			result.put("price", sObject.getPropertySafelyAsString("EstimatedPrice"));
			result.put("guaranteeType", sObject.getPropertySafelyAsString("GuaranteeType"));
			result.put("enable", sObject.getPropertySafelyAsString("Enable"));
			if(sObject.getPropertySafelyAsString("PartnerProductId").equals(""))
				result.put("partnerProductId", "0");
			else {
				result.put("partnerProductId", sObject.getPropertySafelyAsString("PartnerProductId"));
			}		
			result.put("maxAmount", sObject.getPropertySafelyAsString("MaxAmount"));
			result.put("minAmount", sObject.getPropertySafelyAsString("MinAmount"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForGetOrder(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("orderNumber", sObject.getPropertySafelyAsString("OrderNumber"));
			result.put("travellerName", sObject.getPropertySafelyAsString("TravellerName"));
			result.put("travellerMobile", sObject.getPropertySafelyAsString("TravellerMobile"));
			result.put("createdTime", sObject.getPropertySafelyAsString("CreatedTime"));
			result.put("updateTime", sObject.getPropertySafelyAsString("UpdateTime"));
			result.put("orderUser", sObject.getPropertySafelyAsString("OrderUser"));
			result.put("costPoints", sObject.getPropertySafelyAsString("CostPoints"));
			result.put("reducedPrice", sObject.getPropertySafelyAsString("ReducedPrice"));
			
			SoapObject orderItemInfos = (SoapObject) sObject.getProperty("OrderItemInfos");
			JSONArray orderItemArray = new JSONArray();
			for (int i = 0; i < orderItemInfos.getPropertyCount(); i++) {
				JSONObject obj = parseToJsonObjectForOrderItem((SoapObject) orderItemInfos.getProperty(i));
				if(obj != null)
					orderItemArray.put(obj);
			}
			result.put("orderItemInfos", orderItemArray);
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForOrderItem(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			if(sObject.getPropertySafelyAsString("IsInfo").equals("true"))
				return null;
			result.put("orderItemNumber", sObject.getPropertySafelyAsString("OrderItemNumber"));
			result.put("isInfo", sObject.getPropertySafelyAsString("IsInfo"));
			result.put("productName", sObject.getPropertySafelyAsString("ProductName"));
			if(sObject.getPropertySafelyAsString("PartnerOrderId") != "")
				result.put("partnerOrderId", sObject.getPropertySafelyAsString("PartnerOrderId"));
			result.put("belongedOrderNumber", sObject.getPropertySafelyAsString("BelongedOrderNumber"));
			result.put("productId", sObject.getPropertySafelyAsString("ProductId"));
			result.put("validTimeStart", sObject.getPropertySafelyAsString("ValidTimeStart"));
			result.put("validTimeEnd", sObject.getPropertySafelyAsString("ValidTimeEnd"));
			result.put("itemName", sObject.getPropertySafelyAsString("ItemName"));
			result.put("purchasePrice", sObject.getPropertySafelyAsString("PurchasePrice"));
			result.put("quantity", sObject.getPropertySafelyAsString("Quantity"));
			result.put("updateTime", sObject.getPropertySafelyAsString("UpdateTime"));
			result.put("status", sObject.getPropertySafelyAsString("Status"));
			result.put("paymentMethod", sObject.getPropertySafelyAsString("PaymentMethod"));
			
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForSearchProducts(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		try {
			
			result.put("isLocal", sObject.getPropertySafelyAsString("IsLocal"));
			result.put("realId", sObject.getPropertySafelyAsString("ProductId"));
			result.put("picLink", ((SoapObject)sObject.getProperty("Images")).getPropertyAsString(0));
			result.put("name", sObject.getPropertySafelyAsString("Name"));
			result.put("provider", sObject.getPropertySafelyAsString("Provider"));
			result.put("price", sObject.getPropertySafelyAsString("EstimatedPrice"));
			result.put("paymentMethod", sObject.getPropertySafelyAsString("PaymentMethod"));
			result.put("description", sObject.getPropertySafelyAsString("Introduction"));
			result.put("contactAddress", sObject.getPropertySafelyAsString("ContactAddress"));
			result.put("contactNumber", sObject.getPropertySafelyAsString("ContactNumber"));
			
			SoapObject itemInfos = (SoapObject) sObject.getProperty("Properties");
			JSONArray itemArray = new JSONArray();
			for (int i = 0; i < itemInfos.getPropertyCount(); i++) {
				JSONObject obj = parseJsonObjectForPropertyEntity((SoapObject) itemInfos.getProperty(i));
				//Log.d("b2cc", itemInfos.getProperty(i).toString());
				if(obj != null)
					itemArray.put(obj);
			}
			result.put("properties", itemArray);
			
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseJsonObjectForPropertyEntity(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("key", sObject.getPropertySafelyAsString("Key"));
			result.put("type", sObject.getPropertySafelyAsString("Type"));
			result.put("value", sObject.getPropertySafelyAsString("Value"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	public static JSONObject parseJsonObjectForGetInstance(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("instanceId", sObject.getPropertySafelyAsString("TicketId"));
			result.put("name", sObject.getPropertySafelyAsString("TicketName"));
			result.put("price", sObject.getPropertySafelyAsString("TicketPrice"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	
	public static JSONObject parseToJsonObjectForGetOrderOfStudent(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("orderNo", sObject.getPropertySafelyAsString("OrderNo"));
			result.put("date", sObject.getPropertySafelyAsString("OrderDate"));
			result.put("status", sObject.getPropertySafelyAsString("OrderStatus"));
			result.put("price", sObject.getPropertySafelyAsString("OrderCost"));
			
			SoapObject orderItemInfos = (SoapObject) sObject.getProperty("OrderItemInfoList");
			JSONArray orderItemArray = new JSONArray();
			for (int i = 0; i < orderItemInfos.getPropertyCount(); i++) {
				JSONObject obj = parseToJsonObjectForOrderItemOfStudent((SoapObject) orderItemInfos.getProperty(i));
				if(obj != null)
					orderItemArray.put(obj);
			}
			result.put("orderItemInfos", orderItemArray);
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForOrderItemOfStudent(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("productName", sObject.getPropertySafelyAsString("ProductName"));
			result.put("instanceName", sObject.getPropertySafelyAsString("TicketName"));
			result.put("quantity", sObject.getPropertySafelyAsString("Count"));
			result.put("purchasePrice", sObject.getPropertySafelyAsString("Price"));
			result.put("useDate", sObject.getPropertySafelyAsString("Deadline"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForAuditListOfTravel(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("id", sObject.getPropertySafelyAsString("ProductSharingPermissionId"));
			result.put("productName", sObject.getPropertySafelyAsString("ProductName"));
			result.put("applyName", sObject.getPropertySafelyAsString("ApplicantUsername"));//获取到的是申请者的用户名
			result.put("applyDate", sObject.getPropertySafelyAsString("CreateTime"));
			result.put("dateStart", sObject.getPropertySafelyAsString("StartDate"));
			result.put("dateEnd", sObject.getPropertySafelyAsString("EndDate"));
			result.put("recordNo", sObject.getPropertySafelyAsString("RecordNo"));
			result.put("applyPrice", sObject.getPropertySafelyAsString("Price"));
			result.put("content", sObject.getPropertySafelyAsString("Agreement"));
			int status = Integer.parseInt(sObject.getPropertySafelyAsString("Status"));
			if(status == 1)
				result.put("status", "未审核");
			else if(status == 3)
				result.put("status", "通过");
			else if (status == 4) {
				result.put("status", "拒绝");
			}
			else {
				result.put("status", "已过期");
			}
			
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForPublishedProductListOfTravel(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("islocal", sObject.getPropertySafelyAsString("IsLocal"));
			result.put("id", sObject.getPropertySafelyAsString("ProductId"));
			result.put("productName", sObject.getPropertySafelyAsString("Name"));
			result.put("applyName", sObject.getPropertySafelyAsString("Provider"));
			result.put("price", sObject.getPropertySafelyAsString("EstimatedPrice"));
			result.put("description", sObject.getPropertySafelyAsString("Introduction"));
			result.put("recordNo", sObject.getPropertySafelyAsString("RecordNo"));
			result.put("description", sObject.getPropertySafelyAsString("Introduction"));
			result.put("status", sObject.getPropertySafelyAsString("RouteApplyState"));//待定，还有子产品
			result.put("dateStart", sObject.getPropertySafelyAsString("CreateTime"));
			
			SoapObject relatedProducts = (SoapObject) sObject.getProperty("RelatedProducts");
			JSONArray orderItemArray = new JSONArray();
			for (int i = 0; i < relatedProducts.getPropertyCount(); i++) {
				JSONObject obj = parseToJsonObjectForRelatedProductOfTravel((SoapObject) relatedProducts.getProperty(i));
				if(obj != null)
					orderItemArray.put(obj);
			}
			result.put("relatedProducts", orderItemArray);
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForRelatedProductOfTravel(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("id", sObject.getPropertySafelyAsString("ProductId"));
			result.put("name", sObject.getPropertySafelyAsString("Name"));
			result.put("providerName", sObject.getPropertySafelyAsString("Provider"));
			result.put("price", sObject.getPropertySafelyAsString("EstimatedPrice"));
			result.put("status", sObject.getPropertySafelyAsString("RouteApplyState"));
			result.put("recordNo", sObject.getPropertySafelyAsString("RecordNo"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForAuditListOfEducation(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("id", sObject.getPropertySafelyAsString("Id"));
			result.put("productName", ((SoapObject)((SoapObject)sObject.getProperty("ProductInfo")).getProperty(0)).getPropertySafelyAsString("Name"));
			result.put("applyName", sObject.getPropertySafelyAsString("ApplyName"));
			result.put("applyDate", sObject.getPropertySafelyAsString("DateStart"));
			result.put("dateStart", sObject.getPropertySafelyAsString("DateStart"));
			result.put("dateEnd", sObject.getPropertySafelyAsString("DateEnd"));
			result.put("recordNo", sObject.getPropertySafelyAsString("RecordNo"));
			result.put("applyPrice", sObject.getPropertySafelyAsString("Price"));
			result.put("content", sObject.getPropertySafelyAsString("Content"));
			result.put("status", sObject.getPropertySafelyAsString("Status"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForPublishedProductListOfEducation(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("id", sObject.getPropertySafelyAsString("Id"));
			result.put("productName", sObject.getPropertySafelyAsString("ProductName"));
			result.put("price", sObject.getPropertySafelyAsString("Price"));
			result.put("description", sObject.getPropertySafelyAsString("Description"));
			result.put("recordNo", sObject.getPropertySafelyAsString("RecordNo"));
			result.put("status", sObject.getPropertySafelyAsString("Status"));
			result.put("dateStart", sObject.getPropertySafelyAsString("DateStart"));
			
			SoapObject relatedProducts = (SoapObject) sObject.getProperty("RelatedProducts");
			JSONArray orderItemArray = new JSONArray();
			for (int i = 0; i < relatedProducts.getPropertyCount(); i++) {
				JSONObject obj = parseToJsonObjectForRelatedProductOfEducation((SoapObject)((SoapObject) relatedProducts.getProperty(i)).getProperty(0));
				
				if(obj != null)
				{
					obj.put("status", ((SoapObject) relatedProducts.getProperty(i)).getPropertySafelyAsString("Status"));
					orderItemArray.put(obj);
				}
			}
			result.put("relatedProducts", orderItemArray);
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	
	public static JSONObject parseToJsonObjectForRelatedProductOfEducation(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		
		try {
			result.put("id", sObject.getPropertySafelyAsString("Id"));
			result.put("name", sObject.getPropertySafelyAsString("Name"));
			result.put("providerName", sObject.getPropertySafelyAsString("ProviderName"));
			result.put("price", sObject.getPropertySafelyAsString("Price"));
			//result.put("status", sObject.getPropertySafelyAsString("Status"));
			result.put("recordNo", sObject.getPropertySafelyAsString("RecordNo"));
			result.put("type", sObject.getPropertySafelyAsString("Type"));
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		
		return result;
	}
	/*
	public static JSONObject parseJsonObjectForSearchProductsFromTrust(SoapObject sObject)
	{
		JSONObject result = new JSONObject();
		try {
			result.put("recordNo", sObject.getPropertySafelyAsString("recordNo"));
			result.put("picLink", sObject.getPropertySafelyAsString("picLink"));
			result.put("name", sObject.getPropertySafelyAsString("productName"));
			result.put("provider", sObject.getPropertySafelyAsString("Provider"));
			result.put("productType", sObject.getPropertySafelyAsString("productType"));
			if(sObject.getPropertySafelyAsString("description") != "")
				result.put("description", sObject.getPropertySafelyAsString("description"));
			if(sObject.getPropertySafelyAsString("price") != "")
				result.put("price", sObject.getPropertySafelyAsString("price"));
			
			SoapObject itemInfos = (SoapObject) sObject.getProperty("properties");
			JSONArray itemArray = new JSONArray();
			for (int i = 0; i < itemInfos.getPropertyCount(); i++) {
				SoapObject item = (SoapObject) itemInfos.getProperty(i);
				JSONObject obj = new JSONObject();
				obj.put("key", item.getPropertySafelyAsString("displayName"));
				obj.put("value", item.getPropertySafelyAsString("value"));
				if(obj.length() > 0)
					itemArray.put(obj);
			}
			result.put("properties", itemArray);
		} catch (JSONException e) {
			Log.d("b2c", e.getMessage());
			e.printStackTrace();
		}
		return result;
	}
	*/
	
	public static int[] parseStringToInt(String[] strings)
	{
		if(strings == null || strings.length == 0)
			return null;
		int[] result = new int[strings.length];
		for(int i = 0; i < strings.length; i ++)
		{
			if(strings[i].length() > 0)
				result[i] = Integer.parseInt(strings[i]);
		}
		
		return result;
	}
}
