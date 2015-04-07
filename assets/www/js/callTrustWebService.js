//本文件用于调用可信平台的接口
function getSimpleRecordInfoListByComName(comName)//根据企业名称获得备案列表
	{
		cordova.exec(getSimpleRecordInfoListByComNameSuccess, callWebServiceError, 'TrustService', 'getSimpleRecordInfoListByComName',[comName]);
	}
function getSimpleRecordInfoListByComNameSuccess(message)
	{
		var jsonObject = eval("(" + message + ")");//将获得的json字符串转换为json对象
	}
	
function getRecordInfoByRecordNo(recordNo)//根据企业备案号获得企业详细信息
	{
		cordova.exec(getRecordInfoByRecordNoSuccess, callWebServiceError, 'TrustService', 'getRecordInfoByRecordNo',[recordNo]);
	}
function getRecordInfoByRecordNoSuccess(message)
	{
		var jsonObject = eval("(" + message + ")");
	}
	
function getSimpleDraftPermitInfoListByProductName(productName)//根据产品名称获得产品列表
	{
		cordova.exec(getSimpleDraftPermitInfoListByProductNameSuccess, callWebServiceError, 'TrustService', 'getSimpleDraftPermitInfoListByProductName',[productName]);
	}
function getSimpleDraftPermitInfoListByProductNameSuccess(message)
	{
		var jsonObject = eval("(" + message + ")");
		var currentPage = $("#productListFromTrust");
		/*无法实现动态添加data-role（每个应用的html将出现冗余代码），可能和动态渲染有关
		if(currentPage.data("role") == undefined)
		{
			currentPage.data("role", "page");
			currentPage.trigger('create');
			alert(currentPage.data("role"));
		}
		*/
		currentPage.find(".container").html("");
		var table = $("#productListFromTrustDemo").find(".demo_table_for_trust");
		if(jsonObject.length == 0)
		{
			Toast("数据加载失败，请稍后再试!",2000);
			return;
		}
		else{
			for(var i = 0; i < jsonObject.length; i++)
			{
				(function(arg) {
				var service_item = arg;
				var item = table.clone(true);
				
				if(service_item.productName.length > 15)
					item.find(".name").text(service_item.productName.substring(0,15) + "...");
				else
					item.find(".name").text(service_item.productName);
				var recordTime = service_item.recordTime; 
				
				item.find(".date").text((parseInt(recordTime.year)+1900) + "年" + (parseInt(recordTime.month)+1) + "月" + parseInt(recordTime.date) + "日");	
				item.find(".company").text(service_item.companyDesc);
				item.find(".manufacturer").text(service_item.manufacturer);
				item.find(".company").click(function() {
					openCompanyTrustByNo(service_item.recordNo);
				});
				
				item.find(".openLink").click(function() {
					openProductTrustById(service_item.templateId,service_item.draftId);
				});
				
				currentPage.find(".container").append(item);
				})(jsonObject[i]);
			}
			
			$.mobile.changePage("#productListFromTrust", {role:"page"});
		}
	}
	
function getDraftPermitByProductCode(productCode)//根据产品编码获得产品详细信息
	{
		cordova.exec(getDraftPermitByProductCodeSuccess, callWebServiceError, 'TrustService', 'getDraftPermitByProductCode',[productCode]);
	}
function getDraftPermitByProductCodeSuccess(message)
	{
		var jsonObject = eval("(" + message + ")");
	}
	
function getProductsByProductNameAndComNameWithJson(comName, productName)
{
	showLoadingDiv("正在努力加载");
	var comName = window.localStorage.myCompanyName;
	if(productName == undefined || productName == null || productName == "" || productName.length == 0)
		cordova.exec(getProductsByProductNameAndComNameWithJsonPublicPart, callWebServiceError, 'TrustService', 'getProductsByProductNameAndComNameWithJson',
			[comName]);
	else
	{
		cordova.exec(getProductsByProductNameAndComNameWithJsonPublicPart, callWebServiceError, 'TrustService', 'getProductsByProductNameAndComNameWithJson',
			[comName, productName]);
	}
}

function getProductsByProductNameAndComNameWithJsonPublicPart(message)
{
	var providerName = window.localStorage.providerName;
	var fieldName = window.localStorage.fieldName;
	hideLoadingDiv();
	var jsonObject = eval("(" + message + ")");
	if(fieldName == "travel")
		window.localStorage.trustProductListForTravel = message;
	else if(fieldName == "eduaction")
		window.localStorage.trustProductListForEducation = message;
	else if(fieldName == "medical")
		window.localStorage.trustProductListForMedical = message;
	else if(fieldName == "shopping")
		window.localStorage.trustProductListForShopping = message;
	else if(fieldName == "media")
		window.localStorage.trustProductListForMedia = message;
	else if(fieldName == "tailor")
		window.localStorage.trustProductListForTailor = message;
	else
	{
		Toast("参数出现错误", 2000);
		return;
	}
	var currentPage = $("#" + providerName + "_publish_service");
	currentPage.find(".table_container").html("");
		var table = $("#productListFromTrustDemo").find(".demo_table_for_trust");
		if(message == -1)
		{
			Toast("网络异常，请稍后再试",2000);
			$.mobile.changePage("#" + providerName + "_service_manager");
		}
		else if(jsonObject.length == 0)
		{
			Toast("没有找到相关的数据!",2000);
			$.mobile.changePage("#" + providerName + "_service_manager");
		}
		else{
			var productCodeList = window.localStorage.publishedProductCode;
			if(productCodeList == undefined)
				productCodeList = "";
			var hasProduct = false;
			for(var i = 0; i < jsonObject.length; i++)
			{
				(function(arg) {
				var service_item = arg;
				if(productCodeList.indexOf(service_item.productCode) == -1 && service_item.templateId != 487)
				{
					var item = table.clone(true);
				
					if(service_item.productName.length > 15)
						item.find(".name").text(service_item.productName.substring(0,15) + "...");
					else
						item.find(".name").text(service_item.productName);
					var recordTime = service_item.recordTime; 
				
					item.find(".date").text((parseInt(recordTime.year)+1900) + "年" + (parseInt(recordTime.month)+1) + "月" + parseInt(recordTime.date) + "日");	
					item.find(".company").text(service_item.companyDesc);
					item.find(".manufacturer").text(service_item.manufacturer);
					item.find(".company").click(function() {
						openCompanyTrustByNo(service_item.recordNo);
					});
				
					item.find(".openLink").text("发布服务");
					item.find(".openLink").click(function() {
						publishProduct(service_item.productCode);
					});
					currentPage.find(".table_container").append(item);
					
					hasProduct = true;
				}
			})(jsonObject[i]);
			}
			if(!hasProduct)
			{
				Toast("没有找到相关产品", 2000);
			}
			else
				$.mobile.changePage("#" + providerName + "_publish_service");
		}
}

function searchProductFromTrust()
{
	var comName = window.localStorage.myCompanyName;
	var providerName = window.localStorage.providerName;
	var productName = $("#" + providerName + "_publish_service").find(".keyword").val();
	getProductsByProductNameAndComNameWithJson(comName,productName);
}

function displayProductFromTrustForHub(again)//again表示是否是该领域下的又一次查询
{
	var fieldName = window.localStorage.fieldName;
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service");
	var divDemo = $("#publish_service_demo_for_operator").clone(true);
	currentPage.find(".container").html("");
	currentPage.find(".container").append(divDemo);
	if(again == undefined)
	{
		window.localStorage.selectProductCodeList = "";//每次发布不同领域的套票时都会重新设置已选产品code列表
		window.localStorage.selectProductNameAndPriceList = "";
		currentPage.find(".keyword").val("");
		currentPage.find(".demo_table_for_trust").remove();
		currentPage.find(".selectedService").find(".tip").css("display","");
		
		currentPage.find(".publish").unbind("click");
		currentPage.find(".publish").click(function() {
					startPublishRoute();
				});
	}
	showLoadingDiv("正在搜索服务");
	
	var keyword = currentPage.find(".keyword").val();
	var page = 1;
	var size = 10;
	var productType = -1;
	
	if(fieldName == "shopping")//等待可信平台更新web service后此行去掉
		productType = 493;
	if(fieldName == "media")//等待可信平台更新web service后此行去掉
		productType = 491;
	if(fieldName == "tailor")//等待可信平台更新web service后此行去掉
		productType = 493;
	
	var areaId = "";
	currentPage.find(".searchA").unbind("click");
	currentPage.find(".searchA").click(function() {
					displayProductFromTrustForHub(true);
				});
	cordova.exec(getProductFromTrustOfFieldSuccess, callWebServiceError, 'TrustService', 'getProductsForSearch',[fieldName, productType, keyword, areaId, page, size]);
}

function getProductFromTrustOfFieldSuccess(message)
{
	hideLoadingDiv();
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service");
	var selectProductCodeList = window.localStorage.selectProductCodeList;
	if(selectProductCodeList == undefined)
		selectProductCodeList = "";
	
	var trustProductList =  eval("(" + message + ")");
	if(trustProductList == -1)
	{
		Toast("数据加载失败，请稍后再试!",2000);
		return;
	}
	else if(trustProductList.length == 0)
	{
		Toast("未找到相关产品!",2000);
		return;
	}
	
	currentPage.find(".productServiceList").html("");
	var table = $("#productListFromTrustDemo").find(".demo_table_for_trust");
	if(trustProductList != undefined && trustProductList != "")
	{
		for(var i = 0; i < trustProductList.length; i++)
		{
			(function(arg) {
				var service_item = arg;
				var item = table.clone(true);
				if(selectProductCodeList.indexOf(service_item.recordNo) == -1)
				{
					if(service_item.productName.length > 15)
						item.find(".name").text(service_item.productName.substring(0,15) + "...");
					else
						item.find(".name").text(service_item.productName);
					var recordTime = service_item.recordTime; 
					item.find(".date").text((parseInt(recordTime.year)+1900) + "年" + (parseInt(recordTime.month)+1) + "月" + parseInt(recordTime.date) + "日");	
					item.find(".company").text(service_item.companyDesc);
					if(service_item.provider != "")
						item.find(".manufacturer").text(service_item.provider);
					else
						item.find(".manufacturer").text(service_item.companyDesc);
					item.find(".company").click(function() {
						openCompanyTrustByNo(service_item.recordNo);
					});
					item.attr("class",item.attr("class") + " " + service_item.recordNo);
				
					item.find(".openLink").text("选择服务");
					item.find(".openLink").click(function() {
						selectProduct(service_item);
					});
				
					currentPage.find(".productServiceList").append(item);
				}
			})(trustProductList[i]);
		}
		$.mobile.changePage("#" + operatorName + "_publish_service");
	}
	else
		Toast("没有可发布服务!",2000);
}

function selectProduct(productItem)
{
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service");
	var selectProductCodeList = window.localStorage.selectProductCodeList;
	if(selectProductCodeList == undefined)
		selectProductCodeList = "";
	var selectProductNameAndPriceList = window.localStorage.selectProductNameAndPriceList;
	if(selectProductNameAndPriceList == undefined)//存储所选产品的名称、价格以及供应商
		selectProductNameAndPriceList = "";
		
	var selectTable = currentPage.find(".productServiceList").find("." + productItem.recordNo);
	currentPage.find(".productServiceList").find("." + productItem.recordNo).css("display","none");
	currentPage.find(".selectedService").find(".tip").css("display","none");
	currentPage.find(".selectedService").append(selectTable);
	currentPage.find(".selectedService").find("." + productItem.recordNo).css("display","");
	currentPage.find(".selectedService").find("." + productItem.recordNo).find(".openLink").text("取消选择");
	currentPage.find(".selectedService").find("." + productItem.recordNo).find(".openLink").unbind("click");
	currentPage.find(".selectedService").find("." + productItem.recordNo).find(".openLink").click(function() {
						unSelectProduct(productItem);
					});
	
	/* 此处将user和admin作为演示用户，将其公司名称写死,实际上应该为通过服务接口获得名称 */
	var username = window.localStorage.username;
	var providerName;
	if(username == "user")
		providerName = "上海旅游中心,上海晨鸟科技有限公司,在线医疗中心,彩云超市,灵感工艺设计室";
	else if(username == "admin")
		providerName = "上海莫言信息科技有限公司,在线教育中心,彩云医疗有限公司,在线购物中心,腾飞工作室";
	if(selectProductCodeList.indexOf(productItem.recordNo) == -1)
		selectProductCodeList += productItem.recordNo + ",";
	if(selectProductNameAndPriceList.indexOf(productItem.recordNo) == -1)
	{
		if(providerName.indexOf(productItem.companyDesc) != -1)
			selectProductNameAndPriceList += productItem.productName + "," + productItem.price + "," + 
				productItem.companyDesc + "," + productItem.recordNo + "," + "可用" + "-";
		else
			selectProductNameAndPriceList += productItem.productName + "," + productItem.price + "," + 
				productItem.companyDesc + "," + productItem.recordNo + "," + "申请" + "-";
	}
	window.localStorage.selectProductCodeList = selectProductCodeList;
	window.localStorage.selectProductNameAndPriceList = selectProductNameAndPriceList;
}

function unSelectProduct(productItem)
{
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service");
	var selectProductCodeList = window.localStorage.selectProductCodeList;
	var selectProductNameAndPriceList = window.localStorage.selectProductNameAndPriceList;
	
	var selectTable = currentPage.find(".selectedService").find("." + productItem.recordNo);
	currentPage.find(".selectedService").find("." + productItem.recordNo).css("display","none");
	
	if(selectProductCodeList.split(",").length == 2)
		currentPage.find(".selectedService").find(".tip").css("display","");
	
	currentPage.find(".productServiceList").append(selectTable);//暂定附加到尾部
	currentPage.find(".productServiceList").find("." + productItem.recordNo).css("display","");
	currentPage.find(".productServiceList").find("." + productItem.recordNo).find(".openLink").text("选择服务");
	currentPage.find(".productServiceList").find("." + productItem.recordNo).find(".openLink").unbind("click");
	currentPage.find(".productServiceList").find("." + productItem.recordNo).find(".openLink").click(function() {
						selectProduct(productItem);
					});
	//此处从存储中删除该选项
	var newSelectProductCodeList = "";
	if(selectProductCodeList != undefined)
	{
		var list = selectProductCodeList.split(",");
		for(var j = 0; j < list.length; j++)
		{
			if(list[j] != "")
			{
				if(list[j] != productItem.recordNo)
					newSelectProductCodeList += list[j] + ",";
			}
		}
	}
	window.localStorage.selectProductCodeList = newSelectProductCodeList;
	
	var newSelectProductNameAndPriceList = "";
	if(selectProductNameAndPriceList != undefined)
	{
		var list = selectProductNameAndPriceList.split("-");
		for(var j = 0; j < list.length; j++)
		{
			if(list[j] != "")
			{
				if(list[j].split(",")[3] != productItem.recordNo)
					newSelectProductNameAndPriceList += list[j] + "-";
			}
		}
	}
	window.localStorage.selectProductNameAndPriceList = newSelectProductNameAndPriceList;
}

function startPublishRoute()
{
	var needApply = false;
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service_second_step");
	var username = window.localStorage.username;
	var myProviderName = window.localStorage.myCompanyName;
	var selectProductCodeList = window.localStorage.selectProductCodeList;
	var divDemo = $("#demo_for_operator_publish_service_second_step");
	currentPage.find(".container").html("");
	divDemo.find(".tbody_list").html("");
	divDemo.find(".hub_serviceName").val("");
	divDemo.find(".hub_servicePrice").val("");
	divDemo.find(".hub_serviceDescription").val("");
	
	var tr = divDemo.find(".tr_demo");
	var selectProductNameAndPriceList = window.localStorage.selectProductNameAndPriceList;
	if(selectProductCodeList == undefined || selectProductCodeList == "")
	{
		Toast("尚未选择服务", 2000);
		return;
	}
	else
	{
		var trustProductList = selectProductNameAndPriceList.split("-");
		for(var i = 0; i < trustProductList.length - 1; i++)
		{
			var trustProduct = trustProductList[i].split(",");
			if(trustProduct != "" && trustProduct.length > 0)
			{
				var myTr = tr.clone(true);
				myTr.find(".productName").text(trustProduct[0]);
				if(trustProduct[1] != 0)
					myTr.find(".price").text(trustProduct[1]);
				else
					myTr.find(".price").text(Math.floor(Math.random() * 200) + 40);
				myTr.find(".manufacturer").text(trustProduct[2]);
				if(trustProduct[2] == myProviderName)
					myTr.find(".state").text("可用");
				else{
					myTr.find(".state").text("需申请");
					needApply = true;
				}
				myTr.css("display","");
				divDemo.find(".tbody_list").append(myTr);
			}
		}
		currentPage.find(".container").append(divDemo);
		currentPage.find(".publish").unbind("click");
		currentPage.find(".publish").click(function() {
					commitPublishRoute(needApply);
				});
		$.mobile.changePage("#" + operatorName + "_publish_service_second_step");
	}
}

function commitPublishRoute(needApply)
{
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service_second_step");
	var fieldName = window.localStorage.fieldName;
	var productName = currentPage.find(".hub_serviceName").val();
	var price = currentPage.find(".hub_servicePrice").val();
	var description = currentPage.find(".hub_serviceDescription").val();
	
	if(productName == "" || price == "")
	{
		Toast("套票名称和价格不能为空！", 2000);
		return;
	}
	var selectProductCodeList =  window.localStorage.selectProductCodeList;
	var username = window.localStorage.username;
	var password = "111111";
	var recordNos = "";
	
	if(selectProductCodeList != undefined && selectProductCodeList != "")
	{
		recordNos = selectProductCodeList;
	}
	showLoadingDiv("正在发布套票");
	
	if(fieldName == "travel")
	{
		if(username == "user")
		{
			username = "changxinglvyou";
			password = "cxly@travelhub";
		}
		cordova.exec(publishPackageForTravelSuccess, callWebServiceError, 'TravelHubService', 'publishPackageProduct',
			[username, password, 0, recordNos, productName, price, description]);
		
	}
	else if(fieldName == "medical")
	{
		cordova.exec(publishPackageForMedicalSuccess, callWebServiceError, 'MedicalService', 'publishPackageProduct',
			[username, recordNos, productName, price, description]);
	}
	else if(fieldName == "education")
	{
		cordova.exec(publishPackageForEducationSuccess, callWebServiceError, 'EducationService', 'publishPackageProduct',
			[username, recordNos, productName, price, description]);
	}
	else if(fieldName == "shopping")
	{
		cordova.exec(publishPackageForShoppingSuccess, callWebServiceError, 'ShoppingService', 'publishPackageProduct',
			[username, recordNos, productName, price, description]);
	}
	else if(fieldName == "media")
	{
		cordova.exec(publishPackageForMediaSuccess, callWebServiceError, 'MediaService', 'publishPackageProduct',
			[username, recordNos, productName, price, description]);
	}
	else if(fieldName == "tailor")
	{
		cordova.exec(publishPackageForTailorSuccess, callWebServiceError, 'TailorService', 'publishPackageProduct',
			[username, recordNos, productName, price, description]);
	}
	else
	{
		Toast("发布出错，请退出重试！", 2000);
		hideLoadingDiv();
	}
}

function publishHubService(productInfo)
{
	var fieldName = window.localStorage.fieldName;
	var providerRecordNo = window.localStorage.myCompanyRecordNo;
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service_detail");
	var productName = productInfo.productName;
	var price = productInfo.price;
	var description = productInfo.description;
	var externalLink = "http://www.ecdata.org.cn";
	var recordNos = "";
	for(var i = 0; i < productInfo.relatedProducts.length; i++)
	{
		recordNos += productInfo.relatedProducts[i].recordNo + ";";
	}
	var needApply = false;
	var stateList = currentPage.find(".tbody_list").find(".state");
	for(var i = 0; i < stateList.length; i++)
	{
		var state = stateList[i];
		if(state.innerHTML != "已授权")
			needApply = true;
	}

	if(needApply)
		Toast("关联服务未得到全部授权", 2000);
	else{
		showLoadingDiv("正在为您备案");
		var publishedIds;
		if(fieldName == "travel")//将已发布的套票id存储在本地，使得套票详情页面不再显示备案到可信平台的按钮
		{
			publishedIds = window.localStorage.publishedTravelPackageId;
			if(publishedIds == undefined)
				publishedIds = "";
			window.localStorage.publishedTravelPackageId = publishedIds + "," + productInfo.id;
		}
		else if(fieldName == "medical")
		{
			publishedIds = window.localStorage.publishedMedicalPackageId;
			if(publishedIds == undefined)
				publishedIds = "";
			window.localStorage.publishedMedicalPackageId = publishedIds + "," + productInfo.id;
		}
		else if(fieldName == "education")
		{
			publishedIds = window.localStorage.publishedMedicalPackageId;
			if(publishedIds == undefined)
				publishedIds = "";
			window.localStorage.publishedEducationPackageId = publishedIds + "," + productInfo.id;
		}
		else if(fieldName == "shopping")
		{
			publishedIds = window.localStorage.publishedShoppingPackageId;
			if(publishedIds == undefined)
				publishedIds = "";
			window.localStorage.publishedShoppingPackageId = publishedIds + "," + productInfo.id;
		}
		else if(fieldName == "media")
		{
			publishedIds = window.localStorage.publishedMediaPackageId;
			if(publishedIds == undefined)
				publishedIds = "";
			window.localStorage.publishedMediaPackageId = publishedIds + "," + productInfo.id;
		}
		else if(fieldName == "tailor")
		{
			publishedIds = window.localStorage.publishedTailorPackageId;
			if(publishedIds == undefined)
				publishedIds = "";
			window.localStorage.publishedTailorPackageId = publishedIds + "," + productInfo.id;
		}
		cordova.exec(publishPackageToTrustSuccess, callWebServiceError, 'TrustService', 'publishPackageProduct',
			[providerRecordNo, productName, price, description, externalLink, recordNos.substring(0, recordNos.length - 1)]);
	}
}

function publishPackageToTrustSuccess(message)
{
	hideLoadingDiv();
	var jsonObject = eval("(" + message + ")");
	if(jsonObject.code == "0000")
	{
		Toast("请到可信平台完善信息,待审核", 2000);
		openPackageList();
	}
	else if(jsonObject.code == "0001")
		Toast("企业备案号错误", 3000);
	else if(jsonObject.code == "0002")
		Toast("数据库操作出错", 3000);
}

function searchProductsFromTrust(productType, keyword, areaId, page, size)
{
	var fieldName = window.localStorage.fieldName;
	showLoadingDiv("正在为您搜索");
	
	 //$.mobile.loadPage('../index.html',{prefetch:"true"});
	 //alert($("#chose_list_page_demo").html());
	if(productType == 487 || productType == 489 || productType == 490 || productType == 492 || productType == 494)//套餐搜索
	{//套票情况下标签未被选中
		$("#page_" + fieldName + "_service_list_for_search").find(".customer_search_service").removeClass("ui-btn-active ui-state-persist");
		$("#page_" + fieldName + "_service_list_for_search").find(".customer_my_itinerary").addClass("ui-btn-active ui-state-persist");
		cordova.exec(searchProductsFromTrustSuccess, callWebServiceError, 'TrustService', 'getProductsForSearch',
			["",productType,keyword,areaId]);
	}	
	else
	{
		$("#page_" + fieldName + "_service_list_for_search").find(".customer_my_itinerary").removeClass("ui-btn-active ui-state-persist");
		$("#page_" + fieldName + "_service_list_for_search").find(".customer_search_service").addClass("ui-btn-active ui-state-persist");
		cordova.exec(searchProductsFromTrustSuccess, callWebServiceError, 'TrustService', 'getProductsForSearch',
			[fieldName,productType,keyword,areaId]);
	}
}

function searchProductsFromTrustSuccess(message)
{
	var fieldName = window.localStorage.fieldName;
	var consumerName = window.localStorage.consumerName;
	hideLoadingDiv();
	var fristPage = "#" + consumerName + "_search_service";
	var resultPage = "#page_" + fieldName + "_service_list_for_search";
	
	var jsonObject = eval("(" + message + ")");
	$(resultPage).find(".container").html("");
	
	var table = $("#chose_list_page_demo").find(".demo_service_table");
	if(fieldName=="education")
		table=$("#education_chose_list_page_demo").find(".demo_service_table");
	if(message.length == 1 && message == -1)
	{
		Toast("数据加载失败，请稍后再试!",2000);
		$.mobile.changePage(fristPage);
	}
	else if(jsonObject.length == 0)
	{
		Toast("未找到相关的产品!",2000);
		$.mobile.changePage(fristPage);
	}
	else{
		for(var i = 0; i < jsonObject.length; i++)
		{
			(function(arg) {
			var service_item = arg;
			var item = table.clone(true);
			
			item.find(".pic").attr("src", "http://www.ecdata.org.cn:7050/srv/viewDownloadAction.action?fileName=publishedFile/"
				+ service_item.picLink.substring(0,service_item.picLink.indexOf(";")) + "&location=null");
			if(service_item.productName.length > 8)
				item.find(".name").text(service_item.productName.substring(0,8) + "...");
			else
				item.find(".name").text(service_item.productName);
			if(service_item.description.length > 15)
				item.find(".description").text(service_item.description.substring(0,15) + "...");
			else if(service_item.description.length > 0)
				item.find(".description").text(service_item.description);
			else
				item.find(".description").text("暂无详细信息");
			if(service_item.price == undefined || service_item.price == 0)
				item.find(".price").text("--");
			else
				item.find(".price").text(service_item.price);
				
			item.find(".kexin").click(function() {
				getSimpleDraftPermitInfoListByProductName(service_item.productName);
			});
			item.find(".baike").click(function() {
				openBaiduBaike(service_item.productName);
			});
			item.find(".openLink").click(function() {
				openProductDetail(service_item);
			});
			if(fieldName=="education")
				{
					var SkypeID;
					for(var i = 0; i < service_item.properties.length; i++)
					{
						var property = service_item.properties[i];
						if(property.displayName=='SkypeID')
							SkypeID=property.value;
					}
					
					item.find(".call").click(function(){
						openVideoSoftware('skype', SkypeID, 'call');
					})
					item.find(".video").click(function(){
						openVideoSoftware('skype', SkypeID, 'video');
					})
				}
			$(resultPage).find(".container").append(item);
				
		})(jsonObject[i]);
		}
		
		$.mobile.changePage(resultPage);
	}
}

function openProductDetail(service_item)
{
	var arr = new Array();
	arr[0] = service_item.productName;
	if(service_item.price == undefined || service_item.price == 0)
		arr[1] = "--";
	else
		arr[1] = service_item.price;
	arr[2] = "http://www.ecdata.org.cn:7050/srv/viewDownloadAction.action?fileName=publishedFile/"
			+ service_item.picLink.substring(0,service_item.picLink.indexOf(";")) + "&location=null";
	arr[3] = service_item.description;
	arr[4] = service_item.recordNo;//存储可信平台备案号
	arr[5] = service_item.recordNo;
	displayProductDetail(arr, service_item);
	arrOfDetail = arr;
}

function displayProductDetail(arr,service_item)
{
	var fieldName = window.localStorage.fieldName;
	var detail_list_page = $("#detail_list_page_for_search");
	var currentPage = $("#page_" + fieldName + "_service_detail");
	currentPage.find(".container").html("");
	var item = detail_list_page.find(".item-temp").clone(true);
	var providerName = window.localStorage.providerName;
	item.find(".pic").attr("src",arr[2]);
	item.find(".name").text(arr[0]);
	item.find(".description").text(arr[3]);
	if(arr[1] != "--")
		item.find(".price").text(arr[1]);
	else
	{
		item.find(".money").css("display","none");
	}
	if(service_item.provider != "")
		item.find(".provider").text(service_item.provider);
	else if(providerName != "")
		item.find(".provider").text(providerName);
	else
		item.find(".provider").text("未填写");
	item.find(".payMethod").css("display","none");
	
	for(var i = 0; i < service_item.properties.length; i++)
	{
		var property = service_item.properties[i];
		var tr_item = detail_list_page.find(".item-temp").find(".search_tbody_td_demo").clone(true);
		if(property.value != "" && property.displayName != "产品荣誉" && property.displayName != "产品备案号列表")//产品荣誉是图片，暂不显示
		{
			tr_item.find(".title").text(property.displayName + ":");
			tr_item.find(".value").text(property.value);
			item.find(".search_tbody").append(tr_item);
		}
	}
	
	item.find(".kexin").remove();
	item.find(".baike").remove();
	item.find(".addToItinerary").click(function() {
				getPriceDimByRecordNo(arr[5]);
			});
	item.find(".addToItinerary").button();
	
	currentPage.find(".container").append(item);
	$.mobile.changePage("#page_" + fieldName + "_service_detail",{ transition: "pop"});
}

function getPriceDimByRecordNo(recordNo)
{
	var fieldName = window.localStorage.fieldName;
	if(fieldName == "travel")
	{
		Toast("无可售票种,请选择其他产品", 2000);
	}
	else if(fieldName == "education")
	{
		showLoadingDiv("正在获取票种");
		cordova.exec(getInstancePublicPart, callWebServiceError, 'EducationService', 'getInstance',[recordNo]);
	}
	else if(fieldName == "medical")
	{
		showLoadingDiv("正在获取票种");
		cordova.exec(getMedicalInstanceSuccess, callWebServiceError, 'MedicalService', 'getInstance',[recordNo]);
	}
	else if(fieldName == "shopping")
	{
		showLoadingDiv("正在获取票种");
		cordova.exec(getShoppingInstanceSuccess, callWebServiceError, 'ShoppingService', 'getInstance',[recordNo]);
	}
	else if(fieldName == "media")
	{
		showLoadingDiv("正在获取票种");
		cordova.exec(getMediaInstanceSuccess, callWebServiceError, 'MediaService', 'getInstance',[recordNo]);
	}
	else if(fieldName == "tailor")
	{
		showLoadingDiv("正在获取票种");
		cordova.exec(getTailorInstanceSuccess, callWebServiceError, 'TailorService', 'getInstance',[recordNo]);
	}
}

