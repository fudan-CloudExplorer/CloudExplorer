//部分代码冗余，但为了区分不同应用，没有消除
function getMediaInstanceSuccess(message)
{
	var jsonObject = eval("(" + message + ")");
	getInstancePublicPart(jsonObject);
}
function callSubmitOrderForReader(username, password, recordNos, instanceIds, dates, quantities)
{
	showLoadingDiv("正在为您下单");
	cordova.exec(callSubmitOrderForReaderSuccess, callWebServiceError, 'MediaService', 'submitOrder',[username, password, 
	recordNos, instanceIds, dates, quantities]);
}
	
function callSubmitOrderForReaderSuccess(message)
{
	hideLoadingDiv();
	if(parseInt(message) > 0)
	{
		Toast("恭喜您下单成功！", 2000);
		window.localStorage.buyList = "";
		$("#payOk_div_demo").css("display", "");
		$("#page_pay_okay").find(".container").html($("#payOk_div_demo").html());
		$("#page_pay_okay").find(".returnToFristPage").attr("href", "#reader_search_service");
		$("#page_pay_okay").find(".searchOrder").attr("href", "#");
		$("#page_pay_okay").find(".searchOrder").unbind("click");
		$("#page_pay_okay").find(".searchOrder").click(function() {
						getOrderForReader();
					});
		$.mobile.changePage("#page_pay_okay",{ transition: "pop"});
	}
	else
		Toast("下单失败，请稍后重试!",2000);
}

function getOrderForReader(username, password, page, size)
{
	username = window.localStorage.username;
	password = "111111";
	page = 1;
	size = 10;
	showLoadingDiv("正在为您加载");
	cordova.exec(getOrderSuccessPublicPart, callWebServiceError, 'MediaService', 'getOrders',[username, password, page, size]);
}

function getOrderItemsForWriter(username, password, productName, studentName, mobile, start, end, page, size)
{
	showLoadingDiv("正在为您加载");
	username = window.localStorage.username;
	password = "111111";
	
	productName = "";
	studentName = "";
	mobile = "";
	start = "";
	end = "";
	page = 1;
	size = 10;
	cordova.exec(getOrderItemsPublicPart, callWebServiceError, 'MediaService', 'getOrderItems',[username, password, 
	productName, studentName, mobile, start, end, page, size]);
}

function comfirmOrderForWriterSuccess(message)
{
	hideLoadingDiv();

	if(message == "true")
	{
		Toast("订单确认成功！",2000);
		getOrderItemsForWriter();
	}
	else
		Toast("订单确认失败，请稍后重试!",2000);
}

function applyProductForMediaSuccess(message)//调用服务许可申请接口成功,返回的是服务的备案号
{
	hideLoadingDiv();
	if(message == -1)
	{
		Toast("申请发送失败，请重试", 2000);
	}
	else if(message.length > 0)
	{
		Toast("申请已发送,请等候商家确认", 2000);
		openPackageList();
	}
	else{
		Toast("协议发送失败,请稍后重试", 3000);
	}
}

function openAuditListForWriterSuccess(message)
{
	hideLoadingDiv();//注意在公共函数中不能重复，否则会出dom错误
	var jsonObject = eval("(" + message + ")");
	if(message == -1)
	{
		Toast("openAuditForWriter异常", 2000);
		if($.mobile.activePage.attr("id") == "writer_service_manager")
			return;
		else
			$.mobile.changePage("#writer_service_manager");
	}
	else if(message == 0)
	{
		Toast("尚无协议需要审核", 2000);
		if($.mobile.activePage.attr("id") == "writer_service_manager")
			return;
		else
			$.mobile.changePage("#writer_service_manager");
	}
	else
		openAuditListSuccessPublicPart(jsonObject);
}

function manageAgreementForMeidaSuccess(message)
{
	hideLoadingDiv();
	if(message == 0)
	{
		Toast("未找到该协议", 3000);
	}
	else if(message == 1)
	{
		Toast("协议被拒绝", 3000);
	}
	else
	{
		Toast("协议审核成功", 2000);
	}
	openAuditList();
}

function publishPackageForMediaSuccess(message)
{
	hideLoadingDiv();
	if(message != 1)
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

function openPackageListForMediaSuccess(message)
{
	hideLoadingDiv();
	var jsonObject = eval("(" + message + ")");
	if(jsonObject.length == 0 || message == 0)
	{
		Toast("暂无已发布套票数据", 2000);
		if($.mobile.activePage.attr("id") == "editor_data")
			return;
		else
			$.mobile.changePage("#editor_data");
	}
	else if(jsonObject.length > 0)
	{
		openPackageListPublicPart(jsonObject);
	}
	else
	{
		Toast("数据加载出错", 2000);
		if($.mobile.activePage.attr("id") == "editor_data")
			return;
		else
			$.mobile.changePage("#editor_data");
	}
}
