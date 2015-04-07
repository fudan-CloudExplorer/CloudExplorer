$(document).bind("mobileinit",function() {
   $.support.cors = true;    
   $.mobile.allowCrossDomainPages = true;
   $.mobile.buttonMarkup.hoverDelay = "false";
});//加上这一段可以跨域发请求

$(document).on(
		'pageinit',
		function() {
		});
document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
	hideLoadingDiv();
	Toast("头像设置成功", 2000);
	window.localStorage.avatorUrl = imageData;
	$('#avata-image').attr("src", imageData);
	$("#page_buy").find(".routateDiv").css("background-image", "url(" + imageData + ")");
	$("#page_buy").find(".routateDiv").css("background-size", "30px 30px");
	$("#page_buy").find(".routateDiv").css("background-position", "center");
	$("#page_buy").find(".routateDiv").css("background-repeat", "no-repeat");
}

function onFail(message) {
	hideLoadingDiv();
	Toast(message, 3000);
}

function cleanUpPic()
{
	navigator.camera.cleanup(cleanupSuccess, cleanupFail);
}

function cleanupSuccess(message)
{
	Toast(message, 2000);
}

function cleanupFail(message)
{
	Toast(message, 2000);
} 

function takePic(type) {
	showLoadingDiv("打开摄像头");
	var successFunction = onPhotoDataSuccess;
	if(type == 1)//用于家族祠堂设置图片
		successFunction = setPhotoSuccess;
	else if(type == 2)//用于添加新成员时使用
		successFunction = setPhotoInAddPersonSuccess;
	navigator.camera.getPicture(successFunction, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI ,
        sourceType: navigator.camera.PictureSourceType.CAMERA });
}

function getPicFromPhone(type)
{
	showLoadingDiv("打开图片集");
	var successFunction = onPhotoDataSuccess;
	if(type == 1)//用于家族祠堂设置图片
		successFunction = setPhotoSuccess;
	else if(type == 2)//用于添加新成员时使用
		successFunction = setPhotoInAddPersonSuccess;
	navigator.camera.getPicture(successFunction, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI ,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
}

$(document).bind("mobileinit", function() {
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	$.mobile.useFastClick = true;
});


function getBodyInfoSuccess(message){
	$('#height').html(message.height);
	$('#weight').html(message.weight);
	$('#temperature').html("36.7");
	$('#fatRate').html("24");
	if(message.attention==""){
		$('#attention').html("50");
	}
	else{
		$('#attention').html(message.attention);
	}
	if(message.meditation == ""){
		$('#meditation').html("50");
	}
	else{
		$('#meditation').html(message.meditation);
	}
}

function getBodyInfoFail(message){
	alert('error'+message);
}

function ajaxRequest(type)
{
	$.ajax(
	{
		//此处修改为部署后的地址和端口
		url:"http://10.131.10.154:8080/cebpelprocess/cemreq",
		type:"GET",
		async:true,
		dataType:"jsonp",
		data:"phase=" + type + "&user=" + "test",
		success:function(msg){}
	});
}

function selectHealthDataUpdateHandler(obj) {
	switch (obj.value) {
	case 0:
		$.mobile.changePage("#page_lv_health_select", {
			role : "page"
		});
		break;
	case 1:
		$.mobile.changePage("#load_health_data", {
			role : "page"
		});
		break;
	case 2:
		$.mobile.changePage("#health_data_user_input", {
			role : "page"
		});
		break;
	default:
		return;

	}
}

function searchOnMap() {
	// 弹出对话框
	loadMap();
	$.mobile.changePage("#map", {
		role : "dialog"
	});
}

var map;
function loadMap() {
	map = new BMap.Map("map_container");
	pointMarker = new BMap.Point(121.52, 31.25);
	map.centerAndZoom(pointMarker, 14);
	map.addControl(new BMap.NavigationControl());
	map.addControl(new BMap.ScaleControl());
	map.addControl(new BMap.OverviewMapControl());
	map.addControl(new BMap.MapTypeControl());
	addMarker(pointMarker);
	geocodeSearch(pointMarker);
	map.addOverlay(new BMap.Marker(pointMarker));
	// 搜索
	document.getElementById("areaSearch").onclick = function() {
		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();

		var searchTxt = document.getElementById("txtarea").value;
		// 将地址解析结果显示在地图上，并调整地图视野
		myGeo.getPoint(searchTxt, function(point) {
			if (point) {
				map.centerAndZoom(point, 15);
				var pointMarker = new BMap.Point(point.lng, point.lat);
				geocodeSearch(pointMarker);

				map.addOverlay(new BMap.Marker(point));
			} else
				alert("搜索不到结果");
		}, "全国");

		map.enableScrollWheelZoom();
		map.addEventListener("click", function(e) {

			map.clearOverlays();
			var pointMarker = new BMap.Point(e.point.lng, e.point.lat); // 创建标注的坐标
			addMarker(pointMarker);
			geocodeSearch(pointMarker);
		});
	}
}

function addMarker(point) {
	var myIcon = new BMap.Icon("mk_icon.png", new BMap.Size(21, 25), {
		offset : new BMap.Size(21, 21),
		imageOffset : new BMap.Size(0, -21)
	});
	var marker = new BMap.Marker(point, {
		icon : myIcon
	});
	map.addOverlay(marker);
}
function geocodeSearch(pt) {
	var myGeo = new BMap.Geocoder();
	myGeo.getLocation(pt, function(rs) {
		var addComp = rs.addressComponents;
		document.getElementById("txtAreaCode").value = addComp.province + ", "
				+ addComp.city + ", " + addComp.district;
	});
}


function preHealthConfirm() {
	 ajaxRequest(2);
	if (conf == false) {
		pids.forEach(function(id) {
			$('#' + id).trigger('collapse');
		});
		$('#health_conf_link').attr('href', '#pay_health_service');
		$('#health_conf_link').attr('onclick', 'return true;');
		$('#conf_txt').text('Confirm The Package');

	}
}

function loadBasicHealthData() {
	$.mobile.changePage("#patient_search_service", {
		role : "page"
	});
	//loadMindwave();
}

function loadData() {
	cordova.exec(getBodyInfoSuccess,getBodyInfoFail,'PersonInfo','getBodyInfo',[]);
}


function refresh(){
	loadMindwave();
	loadData();
}

function loadMindwave(){
	cordova.exec(loadMindwaveSuccess, loadMindwaveFail, 'MindwaveService', 'connect',[]);
}
function loadMindwaveSuccess(message){
	Toast("attention:" + message[0] + "," + "meditation:" + message[1], 3000);
	if(message[0] != "" && message[1] != "")
	{
		var attention = parseInt(message[0]);
		var meditation = parseInt(message[1]);
		if(attention > 0 || meditation > 0)
		{
			//callQuestionTest(attention,meditation);
			$("#realtime_health_data_for_soul_update").find(".attention").text(attention);
			$("#realtime_health_data_for_soul_update").find(".meditation").text(meditation);
		}
		else
		{
			$("#realtime_health_data_for_soul_update").find(".attention").text("0");
			$("#realtime_health_data_for_soul_update").find(".meditation").text("0");
		}
	}
}
function loadMindwaveFail(message){
	alert("Fail:" + message);
}

function testLoadMindWave()
{
	setInterval("loadMindwave()",500);
}

function callQuestionTest(attention,meditation)
{
	$.ajax(
	{
		url:"http://www.travelhub.cn/Questionnaire/UpdateAM",
		type:"GET",
		async:true,
		dataType:"json",
		data:"attention=" + attention + "&meditation=" + meditation,
		success:function(msg){}
	});
}

function servicePublish()
{
	//此处添加对用户输入的判断
	alert("服务发布成功！");
	window.history.back(-1);
}

function uploadWsdl()
{
	alert("开启二维码扫描");
}

var count = 0;
function test()
{
	if(count == 0)
	{
		ajaxRequest(4);
		count++;
	}
}

function refreshServiceList(type)
{
	$("#" + type + "_selectTr").css("display" ,"");
}

var serviceId = new Array();
function service_add(type)
{
	if(type == undefined || type == null || type == "")
		return;
	var name = $("#" + type + "_service_name option:selected").text();
	var id = $("#" + type + "_service_name option:selected").val();
	
	if(id == -1)
	{
		alert("请选择服务！");
		return;
	}
	$("#" + type + "_selectedTr").css("display","");

	for(var i = 0; i < serviceId.length; i ++)
	{
		if(serviceId[i] == id)
		{
			alert("该服务已加入列表");
			return;
		}
	}
	
	serviceId[serviceId.length] = id;
	$("#" + type + "_selectedTd").append("<span id='span_" + type + id + "' style='font-size:10px;'>"
		+ name + "&nbsp;&nbsp;<a href='#' style='font-size:10px;color:#2489ce;' onclick='serviceCancel(\"" + type + "\"," + id + ")'>取消</a><br></span>");
}

function serviceCancel(type,id)
{
	$("#span_" + type + id + "").remove();
	for(var i = 0; i < serviceId.length; i ++)
	{
		if(serviceId[i] == id)
			serviceId[i] = -1;
	}
	if($("#" + type + "_selectedTd span").length == 0)
		$("#" + type + "_selectedTr").css("display","none");
}

function swipeLeft()
{
	var current = $("#page_buy");
	if(current.find(".table2").css("display") == "none")
	{
		current.find(".table2").css("display", "");
		current.find(".table1").css("display", "none");
		current.find(".dot1").attr("src", "assets/img/dot_normal.png");
		current.find(".dot2").attr("src", "assets/img/dot_focus.png");
	}
	else
		return;
}

function swipeRight()
{
	var current = $("#page_buy");
	if(current.find(".table1").css("display") == "none")
	{
		current.find(".table1").css("display", "");
		current.find(".table2").css("display", "none");
		current.find(".dot2").attr("src", "assets/img/dot_normal.png");
		current.find(".dot1").attr("src", "assets/img/dot_focus.png");
	}
	else
		return;
}

function globalSearch()
{
	var keyword = $("#page_buy").find(".keyword").val();
	if(keyword == undefined || keyword == "")
	{
		Toast("尚未输入关键字");
		return;
	}
	if(keyword == undefined || keyword == "")
		return;
	if(keyword.indexOf("travel") >= 0 || keyword.indexOf("旅游") >= 0 || keyword.indexOf("云游") >= 0)
		setCurrentApp("travel");
	else if(keyword.indexOf("medical") >= 0 || keyword.indexOf("医疗") >= 0 || keyword.indexOf("彩云天使") >= 0)
		setCurrentApp("medical");
	else if(keyword.indexOf("education") >= 0 || keyword.indexOf("教育") >= 0 || keyword.indexOf("云私塾") >= 0)
		setCurrentApp("education");
	else if(keyword.indexOf("media") >= 0 || keyword.indexOf("媒体") >= 0 || keyword.indexOf("文章") >= 0)
		setCurrentApp("media");
	else if(keyword.indexOf("shopping") >= 0 || keyword.indexOf("购物") >= 0)
		setCurrentApp("shopping");
	else if(keyword.indexOf("innovation") >= 0 || keyword.indexOf("创新") >= 0)
		setCurrentApp("innovation");
	else if(keyword.indexOf("tailor") >= 0 || keyword.indexOf("私人") >= 0 || keyword.indexOf("订制") >= 0)
		setCurrentApp("tailor");
}

function modifyUserInfo(type)
{
	var page = $("#page_edit_property");
	page.find(".save").unbind("click");
	page.find(".value").val("");
	
	if(type == "name")
	{
		var realName = window.localStorage.realname;
		modifyUserInfoCommon(realName, "姓名", "一个好的名字让别人难以忘怀");
	}
	else if(type == "mobile")
	{
		var mobile = window.localStorage.mobile;
		modifyUserInfoCommon(mobile, "联系方式", "请输入您的联系方式");
	}
	else if(type == "email")
	{
		var email = window.localStorage.email;
		modifyUserInfoCommon(email, "邮箱", "请输入您的常用邮箱");
	}
	else if(type == "age")
	{
		var age = window.localStorage.age;
		modifyUserInfoCommon(age, "年龄", "请输入您的真实年龄");
	}
	else if(type == "address")
	{
		var address = window.localStorage.address;
		modifyUserInfoCommon(address, "地址", "请输入您的真实地址");
	}
	else if(type == "degree")
	{
		var degree = window.localStorage.degree;
		modifyUserInfoCommon(degree, "学历", "请输入您的真实学历");
	}
	else if(type == "zongjiao")
	{
		var zongjiao = window.localStorage.zongjiao;
		modifyUserInfoCommon(zongjiao, "宗教", "请输入您的宗教信仰");
	}
	else if(type == "interest")
	{
		var interest = window.localStorage.interest;
		modifyUserInfoCommon(interest, "兴趣", "请输入您的兴趣爱好");
	}
	page.find(".save").click(function() {
			saveUserInfo(type);
		});
	$.mobile.changePage("#page_edit_property", {
		role : "dialog"
	});
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

function saveUserInfo(type)
{
	var value = $("#page_edit_property").find(".value").val();
	if(value != "")
	{
		if(type == "name")
			window.localStorage.realname = value;
		else if(type == "mobile")
			window.localStorage.mobile = value;
		else if(type == "email")
			window.localStorage.email = value;
		else if(type == "age")
			window.localStorage.age = value;
		else if(type == "address")
			window.localStorage.address = value;
		else if(type == "degree")
			window.localStorage.degree = value;
		else if(type == "zongjiao")
			window.localStorage.zongjiao = value;
		else if(type == "interest")
			window.localStorage.interest = value;
	}
	else
	{
		Toast("你尚未填写");
		return;
	}
	$("#page_edit_property").dialog("close");
}
function modifyUserGender()
{
	window.localStorage.gender = $("#flip_gender").val();
}
