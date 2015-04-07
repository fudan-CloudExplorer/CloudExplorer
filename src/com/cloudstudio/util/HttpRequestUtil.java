package com.cloudstudio.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

public class HttpRequestUtil {
	public static String sessionId = "";
	public static String postRequest(String actionUrl , Map<String, String> parameters)
	{
		String result = "";
		
		HttpURLConnection urlConnection = null;
		
		URL url = null;
		try {
			url = new URL(actionUrl);
			
			urlConnection = (HttpURLConnection) url.openConnection();
			
			urlConnection.setRequestMethod("POST");  
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		} 
        
        urlConnection.setDoOutput(true);  
        urlConnection.setDoInput(true);  
        urlConnection.setUseCaches(false);  
		
        if (parameters != null) {  
            String param = "";  
            for (String key : parameters.keySet()) {  
                param += "&" + key + "=" + parameters.get(key);
            }  
            if(param.length() > 0)
            	param = param.substring(1);
            try {
				urlConnection.getOutputStream().write(param.getBytes());
				urlConnection.getOutputStream().flush();  
		        urlConnection.getOutputStream().close();  
			} catch (IOException e) {
				e.printStackTrace();
				return "";
			}  
        }  
        
        BufferedReader reader = null;
        String line = null;
        try {
			reader = new BufferedReader(new InputStreamReader(
			        urlConnection.getInputStream()));
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
        
        try {
			while ((line = reader.readLine()) != null) {
				result += line;
			}
		} catch (IOException e) {
			e.printStackTrace();
			return "";
		}
        
		return result;
	}
}
