package com.cloudstudio.service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONException;
import com.cloudstudio.util.HttpRequestUtil;

public class TravelRecommendService {
	private static String apiDomain = "http://www.travelhub.cn:8888/TravelhubAgent/";
	
	public String startArrangement(JSONArray args)
	{
		String actionUrl = apiDomain + "startTripArrangement.action";
		
		Map<String, String> params = new HashMap<String, String>();
		
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date nowDate = new Date();
		
		params.put("username", "user");
		params.put("startLocationId", "4466");//args.getString(1)
		params.put("destinationId", "4396");
		try {
			if(args.getString(3).equals("") || args.getString(4).equals(""))
			{
				params.put("startDate", dateFormat.format(nowDate));
				params.put("endDate", dateFormat.format(new Date(nowDate.getTime() + 3*24*60*60*1000)));
			}
			else {
				params.put("startDate", args.getString(3));
				params.put("endDate", args.getString(4));
			}
			if(!args.getString(5).equals(""))
				params.put("budget", args.getString(5));
			else {
				params.put("budget", "1000");
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}

		params.put("hasElders", "0");
		params.put("hasChildren", "0");
		
		return HttpRequestUtil.postRequest(actionUrl, params);
	}
	
	public String setCurrentServiceType(JSONArray args)
	{
		String actionUrl = apiDomain + "setCurrentServiceType.action";
		Map<String, String> params = new HashMap<String, String>();
		try {
			if(args.getString(6).equals(""))
				return null;
			params.put("sessionId", args.getString(6));
			if(args.getString(0).equals(""))
				params.put("type", "景点");
			else {
				params.put("type", args.getString(0));
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		return HttpRequestUtil.postRequest(actionUrl, params);
	}
	
	public String getOptions(JSONArray args)
	{
		String actionUrl = apiDomain + "getOptions.action";
		Map<String, String> params = new HashMap<String, String>();
		try {
			if(args.getString(6).equals(""))
				return null;
			params.put("sessionId", args.getString(6));
			if(!args.getString(7).equals(""))
				params.put("amount", args.getString(7));
			else {
				params.put("amount", ""+10);//默认获取10条数据
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return HttpRequestUtil.postRequest(actionUrl, params);
	}
}
