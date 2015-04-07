//用于调用集散网提供的接口
function publishProductSuccess(message)
{
	hideLoadingDiv();
	if(parseInt(message) > 0)
	{
		Toast("服务发布成功！", 2000);
		openPublishedProduct();
	}
}

function clearPublishedProductCode()
{
	window.localStorage.publishedProductCode = "";
	$.mobile.changePage("#company_customer_comunication");
}

function getPriceDim(productId)//根据产品id获取票种信息
{
	var username = window.localStorage.username;
	var password = window.localStorage.password;
	showLoadingDiv("正在获取票种");
	cordova.exec(getPriceDimSuccess, callWebServiceError, 'TravelHubService', 'getPriceDim',[username, password, productId]);
}
function getPriceDimSuccess(message)
//格式为priceDimId,type(LOCAL,REMOTE),priceDimType(N_HOTEL,HOTEL),name,price,guaranteeType,enable,maxAmount,minAmount
{
	hideLoadingDiv();
	$("#productPriceDim").find(".container").html("");
	var tableDemo = $("#productPriceDimDemo").find(".demo_table");
	if(message == -1 || message.length == 0)
	{
		Toast("暂无可售票种,请选择其他产品!",2000);
		return;
	}
	else
	{
		var table = tableDemo.clone(true);
		for(var i = 0; i < message.length; i++)
		{
			var service_item = message[i];
			if(!service_item.enable)
				continue;
			var tr = tableDemo.find(".demo_tr").clone(true);
			
			tr.find(".name").text(service_item.name);
			tr.find(".price").text(service_item.price);
			
			tr.find(".custom").attr("value", i);
			tr.css("display","");
			table.append(tr);
		}
		$("#productPriceDim").find(".container").append(table);
		
		$("#productPriceDim").find(".commit").unbind("click");//清除之前绑定的click事件
		$("#productPriceDim").find(".commit").click(function() {
				var selectedId = $("#productPriceDim").find("input[type='radio']:checked").attr("value");
				if(selectedId != undefined && selectedId != "")
					afterChosePriceDim(message[selectedId]);
				else
					Toast("请先选择票种!",2000);
			});
		$("#productPriceDim").find(".commit").button();
		
		$.mobile.changePage("#productPriceDim");
	}
}

function afterChosePriceDim(selectedItem)
{
	arrOfDetail[1] = selectedItem.price;
	arrOfDetail[6] = selectedItem.priceDimId;
	arrOfDetail[7] = selectedItem.name;
	arrOfDetail[8] = selectedItem.type;
	arrOfDetail[9] = selectedItem.priceDimType;//HOTEL或者N_HOTEL
	arrOfDetail[10] = selectedItem.partnerProductId;
	if(arrOfDetail[8] == "LOCAL")//本地产品加上instanceId,arrOfDetail[11] = selectedItem.instanceId;
	{
		if(arrOfDetail[9] == "HOTEL")//本地酒店获得的priceDimId即为InstanceId
		{
			arrOfDetail[11] = selectedItem.priceDimId;
			startSubmitOrder(arrOfDetail);
		}
		else
		{
			getLocalPriceCalendar(arrOfDetail[5],arrOfDetail[6]);
		}
	}
	else//外部产品直接下单
	{
		startSubmitOrder(arrOfDetail);
	}
	/*
	var priceDimId = 0;
	if(arrOfDetail[6].indexOf("%") > 0)
	{
		priceDimId = arrOfDetail[6].split("%")[1];
	}
	else
		priceDimId = arrOfDetail[6];
	if(arrOfDetail[8] == "REMOTE")
		getRemotePriceCalendar(priceDimId);
	else
		getLocalPriceCalendar(arrOfDetail[5],priceDimId);
	*/
	//startSubmitOrder(arrOfDetail);
}

function getRemotePriceCalendar(priceDimId)//根据外部产品票种id获取可售日期
{
	var username = window.localStorage.username;
	var password = window.localStorage.password;
	cordova.exec(getRemotePriceCalendarSuccess, callWebServiceError, 'TravelHubService', 'getRemotePriceCalendar',[username,password,priceDimId]);
}

function getRemotePriceCalendarSuccess(message)
{
	var validDateAndPrice = message[0].split("_");
	var validDates = new Array();//用于存放可用日期的数组
	for(var i = 0; i < validDateAndPrice.length; i++)
	{
		validDates[i] = validDateAndPrice[i].split("|")[0];
	}
}

function getOrders(username,password,page,size)
{
	username = window.localStorage.username;
	password = window.localStorage.password;
	if(username == "admin")//admin对应的后台用户对应的前台用户的账号定为test，changxinglvyou对应的后台用户对应的前台用户为user
	{
		username = "test";
	}
	page = 1;
	size = 10;
	showLoadingDiv("正在搜索订单");
	cordova.exec(getOrdersSuccess, callWebServiceError, 'TravelHubService', 'getOrder',[username,password,page,size]);
}

function getOrdersSuccess(message)
{
	hideLoadingDiv();
	$("#customer_order_list").find(".tb_list_tbody").html("");
	var trDemo = $("#customer_order_list").find(".demo_tr");
	
	if(message.length == 0)
	{
		Toast("目前没有订单信息!",2000);
	}
	else if(message.length > 0)
	{	
		for(var i = 0; i < message.length; i++)
		{
			(function(arg) {
			var trItem = trDemo.clone(true);
			var service_item = arg;
			var totalPrice = 0;
			trItem.find(".createdDate").text(service_item.createdTime.substring(0,10));
			trItem.find(".status").text(service_item.orderItemInfos[0].status);
			for(var j = 0; j < service_item.orderItemInfos.length; j++)
			{
				var item = service_item.orderItemInfos[j];
				totalPrice += parseInt(item.purchasePrice) * parseInt(item.quantity);
			}
			trItem.find(".totalPrice").text(totalPrice + "元");
			trItem.find(".openDetail").click(function() {
				openOrderDetail(service_item);
			});
			trItem.find(".openComment").click(function() {
				openOrderDetail(service_item);
			});
			
			trItem.css("display","");
			$("#customer_order_list").find(".tb_list_tbody").append(trItem);
			})(message[i]);
		}
		$.mobile.changePage("#customer_order_list");
	}
	else
	{
		Toast("调用异常，请稍后再试!",2000);//实际上可能是密码错误，这里不做详细判断
	}
}

function openOrderDetail(orderDetail)
{
	if(orderDetail == undefined || orderDetail.length == 0)
		{
			Toast("数据加载失败，请稍后再试!",2000);
		}
	else
	{
		var totalPrice = 0;
		$("#customer_order_detail").find(".container").html("");
		var tableDemo = $("#orderDetailDemo").find(".orderTableDemo").clone(true);
		var tb_list_demo = $("#orderDetailDemo").find(".tb_list").clone(true);
		
		var tb_list_demo_tbody = tb_list_demo.find(".tb_list_demo_tbody");;
		
		tableDemo.find(".orderNumber").text(orderDetail.orderUser + "_" + orderDetail.orderNumber);
		var useDate = orderDetail.createdTime.substring(0,10).split("-");
		tableDemo.find(".createdTime").text(useDate[0] + "年" + useDate[1] + "月" + useDate[2] + "日");
		tableDemo.find(".travellerName").text(orderDetail.travellerName);
		tableDemo.find(".travellerMobile").text(orderDetail.travellerMobile);
		
		for(var j = 0; j < orderDetail.orderItemInfos.length; j++)
		{
			var item = orderDetail.orderItemInfos[j];
			var price = parseInt(item.purchasePrice) * parseInt(item.quantity);
			totalPrice += price;
			var tr_demo = $("#orderDetailDemo").find(".tr_demo").clone(true);
			tr_demo.find(".productName").text(item.productName+"#"+item.productId);
			tr_demo.find(".itemName").text(item.itemName);
			tr_demo.find(".quantity").text(item.quantity);
			tr_demo.find(".price").text(price + "元");
			tr_demo.find(".useDate").text(item.validTimeStart.substring(0,10));
			
			tr_demo.css("display","");
			tb_list_demo_tbody.append(tr_demo);
		}
		tableDemo.find(".totalPrice").text(totalPrice + "元");
		
		$("#customer_order_detail").find(".container").append(tableDemo);
		$("#customer_order_detail").find(".container").append("<br/>");
		$("#customer_order_detail").find(".container").append(tb_list_demo);
		
		$.mobile.changePage("#customer_order_detail");
	}
}

function callSubmitOrder(username,password,travellerName,travellerMobile,outDates,productIds,instanceIds,additionals,quanties)
{
	username = window.localStorage.username;
	password = window.localStorage.password;
	showLoadingDiv("正在为您下单");
	cordova.exec(callSubmitOrderSuccess, callWebServiceError, 'TravelHubService', 'submitOrder',[username, password, travellerName, 
	travellerMobile, outDates, productIds, instanceIds, additionals, quanties]);
}

function callSubmitOrderSuccess(message)
{
	hideLoadingDiv();
	if(message != -1 && message != 0)
	{
		Toast("恭喜您下单成功！", 2000);
		window.localStorage.itinerary = "";
		$("#payOk_div_demo").css("display", "");
		$("#page_pay_okay").find(".container").html($("#payOk_div_demo").html());
		$("#page_pay_okay").find(".returnToFristPage").attr("href", "#customer_search_service");
		$("#page_pay_okay").find(".searchOrder").unbind("click");
		$("#page_pay_okay").find(".searchOrder").click(function() {
						getOrders();
					});
		$.mobile.changePage("#page_pay_okay",{ transition: "pop"});
	}
	else
		Toast("下单失败，请稍后重试!",2000);
}

function searchProducts(username,password,productType,departure,destination,name,price,page,size)
{
	username = window.localStorage.username;
	password = window.localStorage.password;
	showLoadingDiv("正在努力加载");
	if(productType != "" && productType != 1)//不是套票的情况
	{
		$("#page_travel_service_list_for_search").find("#customer_search_for_search").removeClass("ui-btn-active ui-state-persist");
		$("#page_travel_service_list_for_search").find("#products_search_for_route").removeClass("ui-btn-active ui-state-persist");
		$("#page_travel_service_list_for_search").find("#customer_search_for_search").addClass("ui-btn-active ui-state-persist");
	}
	else
	{
		$("#page_travel_service_list_for_search").find("#customer_search_for_search").removeClass("ui-btn-active ui-state-persist");
		$("#page_travel_service_list_for_search").find("#products_search_for_route").removeClass("ui-btn-active ui-state-persist");
		$("#page_travel_service_list_for_search").find("#products_search_for_route").addClass("ui-btn-active ui-state-persist");
	}
	cordova.exec(searchProductsSuccess, callWebServiceError, 'TravelHubService', 'searchProducts',
		[username,password,productType,departure,destination,name,price,page,size]);
}

function searchProductsSuccess(message)
{
	hideLoadingDiv();
	$("#page_travel_service_list_for_search").find(".container").html("");
	var table = $("#chose_list_page_demo").find(".demo_service_table");
	if(message.length == 1 && message == -1)
	{
		Toast("数据加载失败，请稍后再试!",2000);
		$.mobile.changePage("#customer_search_service");
	}
	else if(message.length == 0)
	{
		Toast("未找到相关的产品!",2000);
		$.mobile.changePage("#customer_search_service");
	}
	else{
		for ( var i = 0; i < message.length; i++) {
			(function(arg) {
			var service_item = arg;
			var item = table.clone(true);
			item.attr("id", service_item.realId);
			item.find(".pic").attr("src", service_item.picLink);
				if(service_item.name.length > 8)
					item.find(".name").text(service_item.name.substring(0,8) + "...");
				else
					item.find(".name").text(service_item.name);
				if(service_item.description.length > 15)
					item.find(".description").text(service_item.description.substring(0,15) + "...");
				else if(service_item.description.length > 0)
					item.find(".description").text(service_item.description);
				else
					item.find(".description").text("暂无详细信息");
				item.find(".price").text(service_item.price);
				
				item.find(".kexin").click(function() {
					getSimpleDraftPermitInfoListByProductName(service_item.name);
				});
				item.find(".baike").click(function() {
					openBaiduBaike(service_item.name);
				});
				item.find(".openLink").click(function() {
					openDetailLinkForSearch(service_item);
				});
			
				$("#page_travel_service_list_for_search").find(".container").append(item);
			})(message[i]);
		}
		
		$.mobile.changePage("#page_travel_service_list_for_search");
	}
}

function openDetailLinkForSearch(service_item)
{
	var arr = new Array();
	arr[0] = service_item.name;
	arr[1] = service_item.price;
	arr[2] = service_item.picLink;
	arr[3] = service_item.description;
	arr[4] = service_item.picLink;//原本存储的为推荐系统返回的id,暂时存储图片
	arr[5] = service_item.realId;
	showTravelDetailForSearch(arr,service_item);
	arrOfDetail = arr;
}

function showTravelDetailForSearch(arr,service_item)
{
	var detail_list_page = $("#detail_list_page_for_search");
	$("#page_travel_service_detail").find(".container").html("");
	var item = detail_list_page.find(".item-temp").clone(true);
	 
	item.attr("id", arr[4]);
	item.find(".pic").attr("src",arr[2]);
	item.find(".name").text(arr[0]);
	item.find(".description").text(arr[3]);
	item.find(".price").text(arr[1]);
	
	item.find(".provider").text(service_item.provider);
	item.find(".paymentMethod").text(service_item.paymentMethod);
	if(service_item.contactAddress != ""){
		item.find(".contactAddress").text(service_item.contactAddress);
		item.find(".contactAddressTr").css("display","");
	}
	if(service_item.contactNumber){
		item.find(".contactNumber").text(service_item.contactNumber);
		item.find(".contactNumberTr").css("display","");
	}
	
	for(var i = 0; i < service_item.properties.length; i++)
	{
		var property = service_item.properties[i];
		var tr_item = detail_list_page.find(".item-temp").find(".search_tbody_td_demo").clone(true);
		if(property.type == "TEXT" && property.value != "" && property.value != "anyType{}")//复杂类型暂且不管
		{
			tr_item.find(".title").text(property.key + ":");
			tr_item.find(".value").text(property.value);
			item.find(".search_tbody").append(tr_item);
		}
	}
	item.find(".kexin").remove();
	item.find(".baike").remove();
	item.find(".addToItinerary").click(function() {
				getPriceDim(arr[5]);
			});
	item.find(".addToItinerary").button();
	
	$("#page_travel_service_detail").find(".container").append(item);
	$.mobile.changePage("#page_travel_service_detail",{ transition: "pop"});
}

function getOrderItemForSup(username,password,page,size,productName,itemName,travellerName,travellerMobile,createDateStart,createDateEnd)
{
	username = window.localStorage.username;
	password = window.localStorage.password;
	showLoadingDiv("正在搜索订单");
	cordova.exec(getOrderItemForSupSuccess, callWebServiceError, 'TravelHubService', 'getOrderItem',
		[username,password,page,size,productName,itemName,travellerName,travellerMobile,createDateStart,createDateEnd]);
}

function getOrderItemForSupSuccess(message)
{
	hideLoadingDiv();
	$("#company_order_list").find(".tbody").html("");
	var trDemo = $("#company_order_list").find(".tr_demo");
	
	if(message.length == 0)
		Toast("暂无订单数据!",2000);
	else if(message.length > 0)
	{	
		for(var i = 0; i < message.length; i++)
		{
			(function(arg) {
			var trItem = trDemo.clone(true);
			var service_item = arg;
			trItem.find(".createdDate").text(service_item.updateTime.substring(0,10));
			trItem.find(".productName").text(service_item.productName);
			trItem.find(".itemName").text(service_item.itemName);
			
			trItem.find(".price").text(service_item.purchasePrice + "元");
			trItem.find(".openLink").click(function() {
				comfirmOrder(service_item.orderItemNumber);
			});
			trItem.css("display","");
			$("#company_order_list").find(".tbody").append(trItem);
			})(message[i]);
		}
		$.mobile.changePage("#company_order_list");
	}
	else
	{
		Toast("数据加载失败，请稍后再试!",2000);
	}
}

function getOrderItemList()
{
	var productName = $("#company_data").find(".productName").val();
	var itemName = $("#company_data").find(".itemName").val();
	var startDate = $("#company_data").find(".company_order_fromDate").val();
	var endDate = $("#company_data").find(".company_order_toDate").val();
	
	var username = window.localStorage.username;
	var password = "111111";
	if(username == "user")
		getOrderItemForSup("changxinglvyou", "cxly@travelhub", "", "", productName, itemName, "", "", startDate, endDate);
	else
		getOrderItemForSup(username, password, "" ,"", productName, itemName, "", "", startDate, endDate);
	
}

function comfirmOrder(orderItemNumber)
{
	var username = window.localStorage.username;
	var password = window.localStorage.password;
	if(username == "user")
	{
		username = "changxinglvyou";
		password = "cxly@travelhub";
	}
	showLoadingDiv("订单确认中...");
	cordova.exec(comfirmOrderSuccess, callWebServiceError, 'TravelHubService', 'confirmOrder',
		[username,password,orderItemNumber]);
}

function comfirmOrderSuccess(message)
{
	hideLoadingDiv();
	if(message == "true")
	{
		Toast("订单确认成功！",2000);
		getOrderItemList();
	}
	else
		Toast("订单确认失败，请稍后重试!",2000);
}

function searchRandomProduct()//用于演示人云互找功能
{
	showLoadingDiv("正在互找");
	var username = window.localStorage.username;
	var password = "111111";
	if(username == "admin")
	{
		username = "test";
	}
	var size = 10;
	cordova.exec(searchRandomProductSuccess, callWebServiceError, 'TravelHubService', 'searchRandomProducts',[username,password,size]);
}

function searchRandomProductSuccess(message)
{
	hideLoadingDiv();
	$("#page_travel_service_list_for_search").find(".container").html("");
	var table = $("#chose_list_page_demo").find(".demo_service_table");
	
	if(message.length == 0 || message == -1)
	{
		Toast("数据加载失败，请稍后再试!",2000);
		$.mobile.changePage("#customer_more_operation");
	}
	else{
		for(var i = 0; i < message.length; i++) {
			(function(arg) {
			var service_item = arg;
			var item = table.clone(true);
			item.attr("id", service_item.realId);
			item.find(".pic").attr("src", service_item.picLink);
				if(service_item.name.length > 8)
					item.find(".name").text(service_item.name.substring(0,8) + "...");
				else
					item.find(".name").text(service_item.name);
				if(service_item.description.length > 15)
					item.find(".description").text(service_item.description.substring(0,15) + "...");
				else if(service_item.description.length > 0)
					item.find(".description").text(service_item.description);
				else
					item.find(".description").text("暂无详细信息");
				item.find(".price").text(service_item.price);
				
				item.find(".kexin").click(function() {
					getSimpleDraftPermitInfoListByProductName(service_item.name);
				});
				item.find(".baike").click(function() {
					openBaiduBaike(service_item.name);
				});
				item.find(".openLink").click(function() {
					openDetailLinkForSearch(service_item);
				});
			
				$("#page_travel_service_list_for_search").find(".container").append(item);
			})(message[i]);
		}
		$.mobile.changePage("#page_travel_service_list_for_search");
	}
}
	
function manageAgreementForTravelSuccess(message)
{
	hideLoadingDiv();
	if(message == -1)
		Toast("协议处理异常", 3000);
	else if(message == 0)
	{
		Toast("协议拒绝成功", 3000);
	}
	else
	{
		Toast("协议审核成功", 2000);
	}
	openAuditList();
}

function applyProductForTravelSuccess(message)
{
	hideLoadingDiv();
	
	if(message != -1)
	{
		Toast("代理申请已发送,请等候审核", 2000);
		openPackageList();
	}
	else
		Toast("代理申请创建失败", 3000);
}

function openAuditListForCompanySuccess(message)
{
	hideLoadingDiv();
	if(message.length == 0)
	{
		Toast("尚无代理申请数据", 2000);
		if($.mobile.activePage.attr("id") == "company_service_manager")
			return;
		else
			$.mobile.changePage("#company_service_manager");
	}
	else
		openAuditListSuccessPublicPart(message);
}

function publishPackageForTravelSuccess(message)
{
	hideLoadingDiv();
	if(message == -1)
	{
		Toast("套票发布失败，请稍后重试", 2000);
		return;
	}
	else
	{
		clearSelectedProduct();//清空已选的服务备案号列表
		Toast("套票发布成功", 2000);
		openPackageList();
	}
}
function openPackageListForTravelSuccess(message)
{
	hideLoadingDiv();
	if(message == -1)
	{
		Toast("数据加载出错", 2000);
		if($.mobile.activePage.attr("id") == "hub_data")
			return;
		else
			$.mobile.changePage("#hub_data");
	}
	else if(message.length == 0)
	{
		Toast("暂无已发布套票数据", 2000);
		if($.mobile.activePage.attr("id") == "hub_data")
			return;
		else
			$.mobile.changePage("#hub_data");
	}
	else
	{
		openPackageListPublicPart(message);
	}
}

function startArrangement(){
	var searchForm = $("#page_lv_search_pre");
	var travel_service_type = searchForm.find("#travel_service_type").val();
	var travel_start_location = searchForm.find("#travel_start_location").val();
	var travel_end_location = searchForm.find("#travel_end_location").val();
	var travel_start_time = searchForm.find("#travel_start_time").val();
	var travel_end_time = searchForm.find("#travel_end_time").val();
	var travel_budget = searchForm.find("#travel_budget").val();
	if(checkSearchParams(travel_service_type,travel_start_location,travel_end_location,travel_start_time,travel_end_time,travel_budget))
		{
			showLoadingDiv("正在努力加载");
    		if(sessionIdFlag == 1)
    		{
    			cordova.exec(getOptionsSuccess, startArrangementFail, 'GetOptionsService', 'setCurrentServiceType',
				[travel_service_type,travel_start_location,travel_end_location,travel_start_time,travel_end_time,travel_budget]);
    		}
    		else
    		{
				cordova.exec(startArrangementSuccess, startArrangementFail, 'TravelRecommendService', 'startArrangement',
				[travel_service_type,travel_start_location,travel_end_location,travel_start_time,travel_end_time,travel_budget]);
    		}
		}
}
var sessionIdFlag = 0;
function startArrangementSuccess(message){
	sessionIdFlag = 1;
	displayOptions(message);
}
function startArrangementFail(message){
	hideLoadingDiv();
	Toast("推荐失败，请稍后再试!",2000);
	$.mobile.changePage("#page_lv_search_pre",{ transition: "pop"});
}

function getOptionsSuccess(message)
{
	displayOptions(message);
}

function displayOptions(message)
{
	hideLoadingDiv();
	$("#page_travel_service_list").find(".container").html("");
	var table = $("#chose_list_page_demo").find(".demo_service_table");
	if(message.length == 0)
	{
		Toast("数据加载失败，请稍后再试!",2000);
		$.mobile.changePage("#page_lv_search_pre",{ transition: "pop"});
	}
	else{
		for ( var i = 0; i < message.length; i++) {
			(function(arg) {
				var service_item = arg;
				var item = table.clone(true);
			
				item.attr("id", service_item.id);
				item.find(".pic").attr("src", "http://www.travelhub.cn/" + service_item.picLink);
				if(service_item.name.length > 8)
					item.find(".name").text(service_item.name.substring(0,8) + "...");
				else
					item.find(".name").text(service_item.name);
				if(service_item.description.length > 15)
					item.find(".description").text(service_item.description.substring(0,15) + "...");
				else if(service_item.description.length > 0)
					item.find(".description").text(service_item.description);
				else
					item.find(".description").text("暂无详细信息");
				item.find(".price").text(service_item.price);
				
				item.find(".kexin").click(function() {
					//openTourTrust(service_item.name);
					getSimpleDraftPermitInfoListByProductName(service_item.name);
				});
				item.find(".baike").click(function() {
					openBaiduBaike(service_item.name);
				});
				item.find(".openLink").click(function() {
					openDetailLink(service_item);
				});
			
				$("#page_travel_service_list").find(".container").append(item);
			
			})(message[i]);
			
		}
		$.mobile.changePage("#page_travel_service_list");
	}
	
}
var arrOfDetail = new Array();//用来存储单项服务详细数据
function openDetailLink(service_item)
{
	var arr = new Array();
	arr[0]=service_item.name;
	arr[1]=service_item.price;
	arr[2]=service_item.picLink;
	arr[3]=service_item.description;
	arr[4] = service_item.id;
	arr[5] = service_item.realId;
	showTravelDetail(arr);
	arrOfDetail = arr;
}

function showTravelDetail(arr)
{
	var detail_list_page = $("#detail_list_page");
	var currentPage = $("#page_travel_service_detail");
	currentPage.find(".container").html("");
	var item = detail_list_page.find(".item-temp").clone(true);
			item.attr("id", arr[4]);
			item.find(".pic").attr("src","http://www.travelhub.cn/" + arr[2]);
			if(arr[0].length > 9)
				item.find(".name").text(arr[0].substring(0,9) + "...");
			else
				item.find(".name").text(arr[0]);
			item.find(".description").text(arr[3]);

			item.find(".price").text(arr[1]);
			item.find(".kexin").click(function() {
					openTourTrust(arr[0]);
				
				});
			item.find(".baike").click(function() {
					openBaiduBaike(arr[0]);
				});
			item.find(".addToItinerary").click(function() {
				getPriceDim(arr[5]);
				//startSubmitOrder(arr);
			});

			item.find(".addToItinerary").button();
			
	currentPage.find(".container").append(item);
	$.mobile.changePage("#page_travel_service_detail",{ transition: "pop"});
}

function checkSearchParams(travel_service_type,travel_start_location,travel_end_location,travel_start_time,travel_end_time,travel_budget)
{
	if(travel_start_location == undefined || travel_start_location == "")
	{
		alert("请输入出发地");
		return false;
	}
	if(travel_end_location == undefined || travel_end_location == "")
	{
		alert("请输入目的地");
		return false;
	}
	if(travel_budget == undefined || travel_budget == "" || travel_budget <= 0)
	{
		alert("请输入有效的预算");
		return false;
	}
	return true;
}
