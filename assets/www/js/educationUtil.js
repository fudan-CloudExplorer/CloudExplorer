function testSearch()//用于测试，可忽略
{
	window.localStorage.publishedTravelPackageId = ",44056";
}

function callSubmitOrderForStudent(username, password, recordNos, instanceIds, dates, quantities)
{
	showLoadingDiv("正在为您下单");
	cordova.exec(callSubmitOrderForStudentSuccess, callWebServiceError, 'EducationService', 'submitOrder',[username, password, 
	recordNos, instanceIds, dates, quantities]);
}
	
function callSubmitOrderForStudentSuccess(message)
{
	hideLoadingDiv();
	if(parseInt(message) > 0)
	{
		Toast("恭喜您下单成功！", 2000);
		window.localStorage.courseList = "";
		$("#payOk_div_demo").css("display", "");
		$("#page_pay_okay").find(".container").html($("#payOk_div_demo").html());
		$("#page_pay_okay").find(".returnToFristPage").attr("href", "#student_search_service");
		$("#page_pay_okay").find(".searchOrder").attr("href", "#");
		$("#page_pay_okay").find(".searchOrder").unbind("click");
		$("#page_pay_okay").find(".searchOrder").click(function() {
						getOrderForStudent();
					});
		$.mobile.changePage("#page_pay_okay",{ transition: "pop"});
	}
	else
		Toast("下单失败，请稍后重试!",2000);
}

function getOrderForStudent(username, password, page, size)
{
	username = window.localStorage.username;
	password = "111111";
	page = 1;
	size = 10;
	showLoadingDiv("正在为您加载");
	cordova.exec(getOrderSuccessPublicPart, callWebServiceError, 'EducationService', 'getOrders',[username, password, page, size]);
}

function getOrderItemsForTeacher(username, password, productName, studentName, mobile, start, end, page, size)
{
	showLoadingDiv("正在搜索订单");
	username = window.localStorage.username;
	password = "111111";
	if(username == "user")
	{
		hideLoadingDiv();
		Toast("您没有未处理的订单", 2000);
		return;
	}
	productName = "";
	studentName = "";
	mobile = "";
	start = "";
	end = "";
	page = 1;
	size = 10;
	cordova.exec(getOrderItemsPublicPart, callWebServiceError, 'EducationService', 'getOrderItems',[username, password, 
	productName, studentName, mobile, start, end, page, size]);
}

function comfirmOrderForTeacherSuccess(message)
{
	hideLoadingDiv();
	if(message == "true")
	{
		Toast("订单确认成功！",2000);
		getOrderItemsForTeacher();
	}
	else
		Toast("订单确认失败，请稍后重试!",2000);
}



function openAuditListForTeacherSuccess(message)
{
	hideLoadingDiv();
	if(message == -1)
	{
		Toast("openAuditForTeacher异常", 2000);
		if($.mobile.activePage.attr("id") == "teacher_service_manager")
			return;
		else
			$.mobile.changePage("#teacher_service_manager");
	}
	else if(message == 0)
	{
		Toast("尚无协议需要审核", 2000);
		if($.mobile.activePage.attr("id") == "teacher_service_manager")
			return;
		else
			$.mobile.changePage("#teacher_service_manager");
	}
	else
		openAuditListSuccessPublicPart(message);
}

function manageAgreementForEducationSuccess(message)
{
	hideLoadingDiv();
	if(message == -1)
	{
		Toast("审核教育协议异常", 3000);
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

function openPackageListForEducationSuccess(message)
{
	hideLoadingDiv();
	if(message == -1)
	{
		Toast("数据加载出错", 2000);
		if($.mobile.activePage.attr("id") == "school_data")
			return;
		else
			$.mobile.changePage("#school_data");
	}
	else if(message.length == 0)
	{
		Toast("暂无已发布套票数据", 2000);
		if($.mobile.activePage.attr("id") == "school_data")
			return;
		else
			$.mobile.changePage("#school_data");
	}
	else
	{
		openPackageListPublicPart(message);
	}
}

function publishPackageForEducationSuccess(message)
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

function applyProductForEducationSuccess(message)
{
	hideLoadingDiv();
	if(message == -1)
	{
		Toast("申请发送失败，请重试", 2000);
	}
	else if(message > 0)
	{
		Toast("申请已发送,请等候商家确认", 2000);
		openPackageList();
	}
	else{
		Toast("协议发送失败,请稍后重试", 3000);
	}
}
function localtest()
{		
	var resultPage = "#page_education_service_list";
	$(resultPage).find(".container").html("");
	var table = $("#chose_list_page_demo").find(".demo_service_table");
	var item = table.clone(true);
	var item2 = table.clone(true);
	var item3 = table.clone(true);
	item.find(".pic").attr("src","assets/img/localtest/test.gif");	
	item.find(".name").text("晨鸟移动校园");
	item.find(".description").text("晨鸟校园地图带你领略移动校园的魅力！");
	item.find(".price").text("128");
	item.find(".kexin").click(function() {
		getSimpleDraftPermitInfoListByProductName("晨鸟移动校园");
	});
	item.find(".baike").click(function(){
		openBaiduBaike("晨鸟移动校园");
	});
	item.find(".openLink").text("开始学习").click(function() {
		openChenNiaoTest(1);
	});
	$(resultPage).find(".container").append(item);
	
	item2.find(".pic").attr("src","assets/img/localtest/test.gif");	
	item2.find(".name").text("旅游集散网");
	item2.find(".description").text("读万卷书，行万里路！");
	item2.find(".price").text("138");
	item2.find(".kexin").click(function() {
		getSimpleDraftPermitInfoListByProductName("旅游集散网");
	});
	item2.find(".baike").click(function(){
		openBaiduBaike("旅游集散网");
	});
	item2.find(".openLink").text("开始学习").click(function() {
		openChenNiaoTest(2);
	});
	$(resultPage).find(".container").append(item2);
	
	item3.find(".pic").attr("src","assets/img/localtest/test.gif");	
	item3.find(".name").text("晨鸟商城");
	item3.find(".description").text("体会现代电子商务流程。");
	item3.find(".price").text("138");
	item3.find(".kexin").click(function() {
		getSimpleDraftPermitInfoListByProductName("晨鸟商城");
	});
	item3.find(".baike").click(function(){
		openBaiduBaike("晨鸟商城");
	});
	item3.find(".openLink").text("开始学习").click(function() {
		openChenNiaoTest(3);
	});
	$(resultPage).find(".container").append(item3);
	
	$.mobile.changePage(resultPage);
}
function localtest1()
{		
	var resultPage = "#page_education_service_list";
	$(resultPage).find(".container").html("");
	var table = $("#chose_list_page_demo").find(".demo_service_table");
	var item = table.clone(true);
	item.find(".pic").attr("src","assets/img/localtest/test.gif");	
	item.find(".name").text("晨鸟移动校园");
	item.find(".description").text("晨鸟校园地图带你领略移动校园的魅力！");
	item.find(".price").text("128");
	item.find(".kexin").click(function() {
		getSimpleDraftPermitInfoListByProductName("晨鸟移动校园");
	});
	item.find(".baike").click(function(){
		openBaiduBaike("晨鸟移动校园");
	});
	item.find(".openLink").text("管理课程").click(function() {
		openChenNiaoTest(2);
	});
	$(resultPage).find(".container").append(item);
	$.mobile.changePage(resultPage);
}
function modifyUserInfo(type)
{
	var page = $("#page_edit_property");
	page.find(".save").unbind("click");
	page.find(".value").val("");
	if(type == "age")
	{
		var age = window.localStorage.age;
		modifyUserInfoCommon(age, "年龄", "请输入您的真实年龄");
	}
	else if(type == "degree")
	{
		var degree = window.localStorage.degree;
		modifyUserInfoCommon(degree, "学历", "请输入您的真实学历");
	}
	else if(type == "hobby")
	{
		var interest = window.localStorage.interest;
		modifyUserInfoCommon(interest, "兴趣", "请输入您的兴趣爱好");
	}
	else if(type=="english")
	{
		if(window.localStorage.english==undefined)
			window.localStorage.english="";
		var english=window.localStorage.english;
		modifyUserInfoCommon(english, "英文水平", "请输入您的英文水平");
	}
	else if(type=="occupation")
	{
		if(window.localStorage.occupation==undefined)
			window.localStorage.occupation="";
		var occupation=window.localStorage.occupation;
		modifyUserInfoCommon(occupation, "职业", "请输入您的职业");
	}
	else if(type=="hangye")
	{
		if(window.localStorage.hangye==undefined)
			window.localStorage.hangye="";
		var hangye=window.localStorage.hangye;
		modifyUserInfoCommon(hangye, "行业", "请输入您的行业");
	}
	page.find(".save").click(function() {
		saveUserInfo(type);
	});
	$.mobile.changePage("#page_edit_property", {
	role : "dialog"
	});
}
function saveUserInfo(type) {
	var datapage=$("#education_data_user_input");
	var value = $("#page_edit_property").find(".value").val();
	if(value != undefined)
	{
		if(type=="age")
			datapage.find(".age").text(value);
		else if(type=="degree")
			datapage.find(".degree").text(value);
		else if(type=="hobby")
			datapage.find(".hobby").text(value);
		else if(type=="degree")
			datapage.find(".degree").text(value);
		else if(type=="english")
			datapage.find(".english").text(value);
		else if(type=="occupation")
			datapage.find(".occupation").text(value);
		else if(type=="hangye")
			datapage.find(".hangye").text(value);
	}	
	$("#page_edit_property").dialog("close");
}
function modifyUserInfoCommon(value, title, des)
{
	var page = $("#page_edit_property");
	if(value != undefined)
	{
		page.find(".value").val(value);
		page.find(".title").html("更改" + title);
	}
	else
		page.find(".title").html("设置" + title);
		page.find(".description").html(des);
}
function savedata() {
	var datapage=$("#education_data_user_input");
	window.localStorage.age=datapage.find(".age").text();
	window.localStorage.interest=datapage.find(".hobby").text();
	window.localStorage.degree=datapage.find(".degree").text();
	window.localStorage.english=datapage.find(".english").text();
	window.localStorage.occupation=datapage.find(".occupation").text();
	window.localStorage.hangye=datapage.find(".hangye").text();
	window.localStorage.gender=datapage.find("#flip_gender").val();
}
function refreshdata() {
	var show=$("#basic_education_data div:jqmData(role='content')");
	var gender="男";
	if(window.localStorage.gender==2)
		gender="女";
	show.find("#gender").text(gender);
	show.find("#age").text(window.localStorage.age);
	show.find("#xueli").text(window.localStorage.degree);
	show.find("#english").text(window.localStorage.english);
	show.find("#occupation").text(window.localStorage.occupation);
	show.find("#hangye").text(window.localStorage.hangye);
	show.find("#hobby").text(window.localStorage.interest);	
}
function submittext() {
	var page=$("#page_lv_answer_student")
	var value=page.find(".mymessage").val();
	var d=new Date(),str='';
	var vYear=d.getFullYear(); //获取当前年份
	var vMon=d.getMonth()+1; //获取当前月份（0——11）
	var vDay=d.getDate();
	var h=d.getHours();
	var m=d.getMinutes();
	var mytime=vYear+"-"+(vMon<10 ? "0" + vMon : vMon)+"-"+(vDay<10 ? "0"+ vDay : vDay)+"  "+(h<12 ? "上午"+h : "下午"+(h-12))+":"+(m<10 ? "0" + m : m);
	
	var tr="<tr><td></td><td><div class='time'>"+mytime+"</div><div class='you_src'><p>"+value+"</p></div></td><td><img class='self' src='' width='50' /></td></tr>";
	page.find("table").append(tr);
	page.find(".self").attr("src",window.localStorage.avatorUrl);
	
	//清空输入框
	page.find(".mymessage").val("");
}
//页面加载完成后执行
$(function (){
	refreshdata();
	//数据页加载信息
	var datapage=$("#education_data_user_input");
	datapage.find(".age").text(window.localStorage.age);
	datapage.find(".hobby").text(window.localStorage.interest);
	datapage.find(".degree").text(window.localStorage.degree);
	datapage.find(".english").text(window.localStorage.english);
	datapage.find(".occupation").text(window.localStorage.occupation);
	datapage.find(".hangye").text(window.localStorage.hangye);
	datapage.find("#flip_gender").val(window.localStorage.gender);
	//加载图片信息
	var page=$("#page_lv_answer_student")
	page.find(".self").attr("src",window.localStorage.avatorUrl);
	//日期选择框
	var opt = {
	        preset: 'date', //日期
	        theme: 'jqm', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'clickpick', //日期选择模式
	        dateFormat: 'yy-mm-dd', // 日期格式
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
	        endYear:2050 //结束年份
	    };
	page=$("#teacher_data");
	page.find('input:jqmData(role="datebox")').mobiscroll().date(opt);
})

function openVideoSoftware(swName, toId, type)//打开远程视频软件,swName表示视频软件名称，toId表示对方在该软件的注册名，type表示电话还是视频(call或者video)
{
	showLoadingDiv("正在打开" + swName);
	if(type == undefined)
		type = "call";//默认为电话，若想视频，则为video
	cordova.exec(openVideoSoftwareSuccess, callWebServiceError, 'EducationService', 'startVideoSoftware',[swName, toId, type]);
}
function openVideoSoftwareSuccess(message)
{
	hideLoadingDiv();
	if(message == 1)
		Toast("打开成功,请稍后", 2000);
	else
		Toast("打开视频软件失败", 2000);
}
