package com.cloudstudio.util;

import java.util.List;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.content.pm.PackageManager.NameNotFoundException;
import android.net.Uri;

import com.cloudstudio.CloudStudioApplication;

public class OpenAppUtil {
	private static CloudStudioApplication applicationContext = CloudStudioApplication.getInstance();
	public static int openOtherApp(String packageName, String params)
	{
		PackageInfo packageinfo = null;
		try {
			packageinfo = applicationContext.getPackageManager().getPackageInfo(packageName, 0);
		} catch (NameNotFoundException e) {
			System.out.println("app启动失败");
			e.printStackTrace();
		}
		if(packageinfo == null)
		{
			System.out.println("未找到app");
			return 0;
		}
		Intent resolveIntent = new Intent(Intent.ACTION_MAIN, null);
	    resolveIntent.addCategory(Intent.CATEGORY_LAUNCHER);
	    resolveIntent.setPackage(packageinfo.packageName);
	    List<ResolveInfo> resolveinfoList = applicationContext.getPackageManager()
	            .queryIntentActivities(resolveIntent, 0);
	    ResolveInfo resolveinfo = resolveinfoList.iterator().next();
	    if (resolveinfo != null) {
	        String newPackageName = resolveinfo.activityInfo.packageName;
	        //该APP的LAUNCHER的Activity[组织形式：packagename.mainActivityname]
	        String className = resolveinfo.activityInfo.name;
	        Intent intent = new Intent(Intent.ACTION_MAIN);
	        intent.addCategory(Intent.CATEGORY_LAUNCHER);
	        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
	        // 设置ComponentName参数1:packagename参数2:mainActivity的路径
	        ComponentName cn = new ComponentName(newPackageName, className);
	        intent.setComponent(cn);
	        applicationContext.startActivity(intent);
	        return 1;
	    }
	    return 0;
	}
	
	public static int initiateSkypeUri(String mySkypeUri) 
	{
		if (!isSkypeClientInstalled(applicationContext)) {
			goToMarket(applicationContext);
		    return 0;
		  }

		Uri skypeUri = Uri.parse(mySkypeUri);
		Intent myIntent = new Intent(Intent.ACTION_VIEW, skypeUri);
		List<ResolveInfo> resolveinfoList = applicationContext.getPackageManager().queryIntentActivities(myIntent, 0);
		ResolveInfo resolveinfo = resolveinfoList.iterator().next();
		if (resolveinfo != null) {
			String newPackageName = resolveinfo.activityInfo.packageName;
		    String className = resolveinfo.activityInfo.name;
		    myIntent.setComponent(new ComponentName(newPackageName, className));
		    myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		}
		applicationContext.startActivity(myIntent);
		return 1;
	}
		
	public static boolean isSkypeClientInstalled(Context myContext) 
	{
		PackageManager myPackageMgr = myContext.getPackageManager();
		try {
		  myPackageMgr.getPackageInfo("com.skype.rover", PackageManager.GET_ACTIVITIES);
		}
		catch (PackageManager.NameNotFoundException e) {
		  return false;
		}
		return true;
	}
	
	public static void goToMarket(Context myContext) 
	{
		Uri marketUri = Uri.parse("market://details?id=com.skype.rover");
		Intent myIntent = new Intent(Intent.ACTION_VIEW, marketUri);
		myIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
		myContext.startActivity(myIntent);
		return;
	}
}
