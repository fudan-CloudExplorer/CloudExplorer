//公共js文件
function callWebServiceError(message)
{
	hideLoadingDiv();
	Toast("调用远程服务失败！",2000);
}

function onPageload()
{
	$.mobile.loadPage("common.html",{prefetch:"true"});//将公有html加入当前应用的dom中
  	document.addEventListener("deviceready", onDeviceReady, false);
  	if(window.localStorage.fieldName == "medical")
  	{
  		initPicScaleForMedical();
  	}
}

function initPicScaleForMedical()
{
	$('#basic_health_data').on(
					'pagebeforeshow',
					function(e, data) {
						$('#basic_health_data .3-href-img-in-a-line').each(
								function(index, element) {
									var width = $(element).parent().parent()
											.width();
									if (width < 138) {
										$(element).css("height", "80px").css(
												"width", "80px");
									}
								});
						$('#basic_health_data .2-href-img-in-a-line').each(
								function(index, element) {
									var width = $(element).parent().parent()
											.width();
									if (width < 168) {
										$(element).css("height", "100px").css(
												"width", "100px");
									}
								})
					});
		
			$('#realtime_health_data').on(
					'pagebeforeshow',
					function(e, data) {
						$('#realtime_health_data .3-href-img-in-a-line').each(
								function(index, element) {
									var width = $(element).parent().parent()
											.width();
									if (width < 138) {
										$(element).css("height", "80px").css(
												"width", "80px");
									}
								});
					});
}

function onDeviceReady() {
    document.addEventListener("backbutton", back, false);
}
function back()
{
	window.history.back(-1);
}

function getInstancePublicPart(jsonObject)
{
	hideLoadingDiv();
	$("#productPriceDim").find(".container").html("");
	$("#productPriceDim").find(".container").append($("#productPriceDimDemo").find(".welcome").clone());
	var tableDemo = $("#productPriceDimDemo").find(".demo_table");
	if(jsonObject == -1)
	{
		Toast("数据加载失败，请稍后再试!",2000);
		return;
	}
	else if(jsonObject.length > 0){
		var table = tableDemo.clone(true);
		for(var i = 0; i < jsonObject.length; i++)
		{
			(function(arg) {
			var service_item = arg;
			var tr = tableDemo.find(".demo_tr").clone(true);
			
			tr.find(".name").text(service_item.name);
			tr.find(".price").text(service_item.price);
			
			tr.find(".custom").attr("value", i);
			tr.css("display","");
			table.append(tr);
			
		})(jsonObject[i]);
		}
	$("#productPriceDim").find(".container").append(table);
		
		$("#productPriceDim").find(".commit").unbind("click");//清除之前绑定的click事件
		$("#productPriceDim").find(".commit").click(function() {
				var selectedId = $("#productPriceDim").find("input[type='radio']:checked").attr("value");
				if(selectedId != undefined && selectedId != "")
					afterChoseInstance(jsonObject[selectedId]);
				else
					Toast("请先选择票种!",2000);
			});
		$("#productPriceDim").find(".commit").button();
	
	$.mobile.changePage("#productPriceDim");
	}
	else
	{
		Toast("未找到相关的产品!",2000);
		return;
	}
}

function afterChoseInstance(selectedItem)
{
	var fieldName = window.localStorage.fieldName;
	arrOfDetail[1] = selectedItem.price;
	if(fieldName == "travel")
	{
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
	}
	else
	{
		arrOfDetail[6] = selectedItem.instanceId;
		arrOfDetail[7] = selectedItem.name;
		startSubmitOrder(arrOfDetail);
	}
}

function getLocalPriceCalendar(productId,priceDimId)//根据本地产品id和票种id获取可售日期
{
	var username = window.localStorage.username;
	var password = window.localStorage.password;
	cordova.exec(getLocalPriceCalendarSuccess, callWebServiceError, 'TravelHubService', 'getLocalPriceCalendar',[username,password,productId,priceDimId]);
}

function getLocalPriceCalendarSuccess(message)
{
	arrOfDetail[11] = message[0];//存放本地产品的可售信息
	startSubmitOrder(arrOfDetail);
}

function startSubmitOrder(arr)
{

	var fieldName = window.localStorage.fieldName;
	var currentPage = $("#page_" + fieldName + "_service_buy");
	currentPage.find(".container").find(".demo").remove();
	var page_travel_service_buy = $("#page_product_service_buy_demo").find(".demo").clone(true);
	page_travel_service_buy.find(".productName").text(arr[0]);
	page_travel_service_buy.find(".productPrice").text(arr[1]);
	page_travel_service_buy.find(".priceDimName").text(arr[7]);
	//按钮需要渲染才能正常显示
	page_travel_service_buy.find(".productNumberMinus").button();
	page_travel_service_buy.find(".productNumberAdd").button();
	page_travel_service_buy.find(".productNumber").textinput();
	page_travel_service_buy.find(".productUseDate").textinput();
	
	page_travel_service_buy.find(".productNumberMinus").unbind("click");
	page_travel_service_buy.find(".productNumberMinus").click(function(){
		productNumberMinus();
	});
	page_travel_service_buy.find(".productNumberAdd").unbind("click");
	page_travel_service_buy.find(".productNumberAdd").click(function(){
		productNumberAdd();
	});
	page_travel_service_buy.find(".productNumber").unbind("change");
	page_travel_service_buy.find(".productNumber").change(function(){
		numberChange();
	});
	
	var productNumber = page_travel_service_buy.find(".productNumber").val();
	page_travel_service_buy.find(".productTotalPrice").text(parseInt(arr[1]) * parseInt(productNumber));
	
	currentPage.find(".container").append(page_travel_service_buy);
	currentPage.find(".addToItinerary").unbind("click");
	currentPage.find(".addToItinerary").click(function() {
	var productUseDate = page_travel_service_buy.find(".productUseDate").val();
		if(productUseDate == "")
		{
			Toast("请选择使用日期!",1000);
			return;
		}
		if(fieldName == "travel")
		{
			addToItinerary(arr,parseInt(page_travel_service_buy.find(".productNumber").val()),productUseDate);
		}
		else
		{
			addToMyList(arr,parseInt(page_travel_service_buy.find(".productNumber").val()), productUseDate);
		}
		
	});
	
	$.mobile.changePage("#page_" + fieldName + "_service_buy");
}
function productNumberMinus()
{
	var fieldName = window.localStorage.fieldName;
	var page_service_buy = $("#page_" + fieldName + "_service_buy");
	var productNumber = page_service_buy.find(".productNumber").val();
	if(parseInt(productNumber) > 1){
		page_service_buy.find(".productNumber").val(parseInt(productNumber) - 1);
		numberChange();
	}
	else{
		Toast("商品数量最少为1!",1000);
		return;
	}
}
function productNumberAdd()
{
	var fieldName = window.localStorage.fieldName;
	var page_service_buy = $("#page_" + fieldName + "_service_buy");
	var productNumber = page_service_buy.find(".productNumber").val();
	page_service_buy.find(".productNumber").val(parseInt(productNumber) + 1);
	numberChange();
}

function numberChange()
{
	var fieldName = window.localStorage.fieldName;
	var page_service_buy = $("#page_" + fieldName + "_service_buy");
	var productNumber = page_service_buy.find(".productNumber").val();
	var price = page_service_buy.find(".productPrice").text();
	page_service_buy.find(".productTotalPrice").text(parseInt(price) * parseInt(productNumber));
}

function addToMyList(arr, quantity, productUseDate)
{
	var fieldName = window.localStorage.fieldName;
	var storage = window.localStorage;
	var oldList;
	if(fieldName == "medical")
		oldList = storage.medicalList;
	else if(fieldName == "education")
		oldList = storage.courseList;
	else if(fieldName == "shopping")
		oldList = storage.buyList;
	else if(fieldName == "media")
		oldList = storage.readList;
	else if(fieldName == "tailor")
		oldList = storage.orderList;
		
	if(oldList == undefined)
		oldList = "";
		
	var products = oldList.split("#");
	var newList = "";
	var added = false;
	 for (i = 0; i < products.length; i++) {
        if (products[i] == "") {
            continue;
        }
        //该项内容适用于私人导游外的应用，私人导游在shoppingcart.js中，格式为：recordNo|name|price|quantity|useDate|instanceId|instanceName#
        var product = products[i].split("|");
        var recordNo = product[0];
        var name = product[1];
        var price = parseInt(product[2]);
        var q = parseInt(product[3]);
        var useDate = product[4];
        var instanceId = product[5];
        var instanceName = product[6];

        //如果该产品已经在单中，则直接增加数量，否则直接略过
        if (recordNo == arr[5] && name == arr[0] && instanceName == arr[7] && useDate == productUseDate && !added) {
            added = true;
            var sum = parseInt(q) + parseInt(quantity);
            if (sum < 1) {
                sum = 1;
            }
            newList += recordNo + "|" + name + "|" + price + "|" + sum + "|" + productUseDate + "|" + instanceId + "|" + instanceName + "#";
        } else {
            newList += products[i] + "#";
        }
	 }
    if (added) {
    	if(fieldName == "medical")
			storage.medicalList = newList;
		else if(fieldName == "education")
			storage.courseList = newList;
		else if(fieldName == "shopping")
			storage.buyList = newList;
        else if(fieldName == "media")
			storage.readList = newList;
		else if(fieldName == "tailor")
			storage.orderList = newList;
    } else {
    	var listInfo = oldList + arr[5] + "|" + arr[0] + "|" + arr[1] + "|" + quantity + "|" + productUseDate + "|" + arr[6] + "|"
        			   + arr[7] + "#";
    	if(fieldName == "medical")
			storage.medicalList = listInfo;
		else if(fieldName == "education")
			storage.courseList = listInfo;
		else if(fieldName == "shopping")
			storage.buyList = listInfo;
		else if(fieldName == "media")
			storage.readList = listInfo;
		else if(fieldName == "tailor")
			storage.orderList = listInfo;
        
    }
    Toast("加入成功，在更多操作中查看", 2000)
    $.mobile.changePage("#page_" + fieldName + "_service_list_for_search");//加入后返回至产品列表
}

function clearMyList()
{
	var fieldName = window.localStorage.fieldName;
	if(fieldName == "medical")
		window.localStorage.medicalList = "";
	else if(fieldName == "education")
		window.localStorage.courseList = "";
	else if(fieldName == "shopping")
		window.localStorage.buyList = "";
	else if(fieldName == "media")
		window.localStorage.readList = "";
	else if(fieldName == "tailor")
		window.localStorage.orderList = "";
	openMyList();
}

function openMyList()//打开**单
{
	var fieldName = window.localStorage.fieldName;
	var oldList;
	var consumerName = window.localStorage.consumerName;
	if(fieldName == "medical")
	{
		oldList= window.localStorage.medicalList;
	}
	else if(fieldName == "education")
	{
		oldList= window.localStorage.courseList;
	}
	else if(fieldName == "shopping")
		oldList= window.localStorage.buyList;
	else if(fieldName == "media")
		oldList= window.localStorage.readList;
	else if(fieldName == "tailor")
		oldList= window.localStorage.orderList;
	var currentPage = $("#" + consumerName + "_my_itinerary");
	var container = currentPage.find(".container");
	container.find(".contentDiv").empty();
	
	if(oldList == undefined || oldList == "")
	{
		container.find(".tipDiv").css("display","");
		container.find(".contentDiv").css("display","none");
		container.find(".submitOrder").css("display","none");
		container.find(".totalSpan").css("display","none");
		$.mobile.changePage(currentPage);
	}
	else{
		var totalMoney = 0;
		var products = oldList.split("#");
		
		for (i = 0; i < products.length - 1; i++) {
			(function(arg) {
				if(arg != ""){	
        			var product = arg.split("|");//获得商品单中的产品列表
        			container.find(".tipDiv").css("display","none");
					container.find(".contentDiv").css("display","");
					//$("#itemDivDemo").find(".itemDiv").trigger('create');
					var item = $("#itemDivDemo").find(".itemDiv").clone(true);
					item.attr("class",item.attr("class") + " itemDiv" + product[0]);
					
					item.find(".productName").text(product[1]);
					item.find(".priceDimName").text(product[6]);
					item.find(".productTotalPrice").text(parseInt(product[2]) * parseInt(product[3]));
					item.find(".productUseDate").text(product[4]);
					item.find(".productPrice").text(product[2]);
					item.find(".productNumber").val(product[3]);
					totalMoney += parseInt(product[2]) * parseInt(product[3]);
					
					item.find(".itemDivH").click(function() {
						if(item.find(".itemDivH").is(".ui-collapsible-heading-collapsed"))
							item.trigger('collapse');
						else
							item.trigger('expand');
					});
					
					item.find(".productNumberMinus").click(function() {
						
						productNumberMinusInMedicalList(product);
					});
					item.find(".productNumberAdd").click(function() {
						productNumberAddInMedicalList(product);
					});
					item.find(".productNumber").change(function() {
						numberChangeInMedicalList(product);
					});
					item.find(".deleteItem").click(function() {
						removeFromMyList(product);
					});
					item.find(".productNumber").textinput();
					item.find(".productNumberMinus").button();
					item.find(".productNumberAdd").button();
					item.find(".deleteItem").button();
					item.trigger('create');//渲染div
					item.show();
					container.find(".contentDiv").append(item);
				}
				})(products[i]);
			}
		
    	container.find(".submitOrder").css("display","");
    	container.find(".totalSpan").css("display","");
    	container.find(".totalMoney").html(totalMoney);
    	
    	currentPage.find(".contentDiv").trigger('create');
		$.mobile.changePage("#" + consumerName + "_my_itinerary");
	}
}

function refreshMyList(recordNo,priceDimId, productName, quantity)
{
	var fieldName = window.localStorage.fieldName;
	var consumerName = window.localStorage.consumerName;
	var storage = window.localStorage;
	var oldList;
	if(fieldName == "medical")
		oldList = storage.medicalList;
	else if(fieldName == "education")
		oldList = storage.courseList;
	else if(fieldName == "shopping")
		oldList = storage.buyList;
	else if(fieldName == "media")
		oldList = storage.readList;
	else if(fieldName == "tailor")
		oldList = storage.orderList;
	var products = oldList.split("#");
	var newList = "";
	var totalMoney = 0;
	
	 for (i = 0; i < products.length; i++) {
        if (products[i] == "") {
            continue;
        }
        //格式为：recordNo|name|price|quantity|useDate|instanceId|instanceName#
        var product = products[i].split("|");
        var rNo = product[0];
        var name = product[1];
        var price = parseInt(product[2]);
        var q = parseInt(product[3]);
        var useDate = product[4];
        var instanceId = product[5];
        var instanceName = product[6];
		
        if (rNo == recordNo && name == productName && instanceId == priceDimId) {
        	totalMoney += parseInt(price) * parseInt(quantity);
            newList += rNo + "|" + name + "|" + price + "|" + quantity + "|" + useDate + "|" + instanceId + "|" + instanceName + "#";
        } else {
            newList += products[i] + "#";
            totalMoney += parseInt(price) * parseInt(q);
        }
        
	 }
	
	 if(fieldName == "medical")
	 {
		storage.medicalList = newList;
	 }
	 else if(fieldName == "education")
	 {
		storage.courseList = newList;
	 }
	 else if(fieldName == "shopping")
	 	storage.buyList = newList;
	 else if(fieldName == "media")
	 	storage.readList = newList;
	 else if(fieldName == "tailor")
	 	storage.orderList = newList;
	$("#" + consumerName + "_my_itinerary").find(".container").find(".totalMoney").html(totalMoney);
}

function removeFromMyList(productItem)
{
	var fieldName = window.localStorage.fieldName;
	var recordNo = productItem[0];
	var priceDimId = productItem[5];
	var useDate = productItem[4];
    if (recordNo == undefined || recordNo == "") {
        return;
    }
    var storage = window.localStorage;
    var oldList;
    if(fieldName == "medical")
		oldList = storage.medicalList;
	else if(fieldName == "education")
		oldList = storage.courseList;
	else if(fieldName == "shopping")
		oldList = storage.buyList;
	else if(fieldName == "media")
		oldList = storage.readList;
	else if(fieldName == "tailor")
		oldList = storage.orderList;
    if (oldList == undefined) {
        oldList = "";
    }
    var products = oldList.split("#");
    var i = 0;
    var newList = "";
    var removed = false;
    for (i = 0; i < products.length; i++) {
        if (products[i] == "") {
            continue;
        }
        var product = products[i].split("|");
        var rNo = product[0];
        var productUseDate = product[4];//删除时可以考虑加上使用时间
        var priceDid = product[5];
        
        if (rNo == recordNo && priceDid == priceDimId && useDate == productUseDate && !removed) {
            removed = true;
        } else {
            newList += products[i] + "#";
        }
    }
    if(fieldName == "medical")
		storage.medicalList = newList;
	else if(fieldName == "education")
		storage.courseList = newList;
    else if(fieldName == "shopping")
    	storage.buyList = newList;
    else if(fieldName == "media")
    	storage.readList = newList;
    else if(fieldName == "tailor")
    	storage.orderList = newList;
    openMyList();
}

function productNumberAddInMedicalList(product)
{
	var consumerName = window.localStorage.consumerName;
	var item = $("#" + consumerName + "_my_itinerary").find(".itemDiv" + product[0]);
	var productNumber = item.find(".productNumber").val();
	item.find(".productNumber").val(parseInt(productNumber) + 1);
	numberChangeInMedicalList(product);
}

function productNumberMinusInMedicalList(product)
{
	var consumerName = window.localStorage.consumerName;
	var item = $("#" + consumerName + "_my_itinerary").find(".itemDiv" + product[0]);
	var productNumber = item.find(".productNumber").val();
	if(parseInt(productNumber) > 1){
		item.find(".productNumber").val(parseInt(productNumber) - 1);
		numberChangeInMedicalList(product);
	}
	else{
		Toast("商品数量最少为1!",1000);
		return;
	}
}

function numberChangeInMedicalList(product)
{
	var consumerName = window.localStorage.consumerName;
	var recordNo = product[0];
	var priceDimId = product[5];
	var item = $("#" + consumerName + "_my_itinerary").find(".itemDiv" + recordNo);
	var productNumber = item.find(".productNumber").val();
	var price = item.find(".productPrice").text();
	item.find(".productTotalPrice").text(parseInt(price) * parseInt(productNumber));
	var productName = item.find(".productName").text();
	refreshMyList(recordNo,priceDimId, productName, productNumber);
}

function submitOrder()//从localStorage中读出数据即可
{
	var consumerName = window.localStorage.consumerName;
	var item = $("#page_pay");
	var demoTable = $("#pay_page_table_demo").find(".demo_table").clone(true);
	item.find(".container").html("");
	var totalMoney = $("#" + consumerName + "_my_itinerary").find(".container").find(".totalMoney").text();
	var username = window.localStorage.username;
	var realname = window.localStorage.realname;
	var mobile = window.localStorage.mobile;
	if(realname != undefined && realname != null)
		$("#travellerName").val(realname);
	if(mobile != undefined && mobile != null)
		$("#travellerMobile").val(mobile);
	
	demoTable.find(".paynumber").text(totalMoney);
	
	item.find(".paySubmit").click(function() {
		if(consumerName == "customer")
		{
			payFinishedForTravel();
		}
		else
		{
			payFinished();
		}	
	});
	item.find(".container").append(demoTable);
	$.mobile.changePage("#page_pay",{ transition: "pop"});
}

function payFinishedForTravel()//在此函数中处理支付完成的操作，如清空行程单、调用订单生成和二维码服务等
{
	var itinerary = window.localStorage.itinerary;
	var products = itinerary.split("#");//realID|name|price|quantity|useDate|priceDimId|priceDimName|partnerProductId|instanceId
	
	var username = window.localStorage.username;
	if(username == "admin")
		username = "test";
	var password = "111111";
	var productIds = "";
	var instanceIds = "";
	var outDates = "";
	var additionals = "";
	var quanties = "";
	
	for(var i = 0; i < products.length; i ++)
	{
		var product = products[i];
		if(product != "")
		{
			var productInfo = product.split("|");
			productIds += productInfo[0] + ",";
			quanties += productInfo[3] + ",";
			outDates += "2014-12-25,";
			if(parseInt(productInfo[7]) > 0)//外部产品，后期还需分酒店和 非酒店
			{
				if(productInfo[5].indexOf("%") > 0)
					productInfo[5] = productInfo[5].replace("%","|");
				additionals += productInfo[7] + "|" + productInfo[5] + "|" + productInfo[6] + "|" + productInfo[4] + "|" + productInfo[2] + ",";
			instanceIds += "0,";
			}
			else//本地产品
			{
				instanceIds += productInfo[8] + ",";//第9项存储instanceId，暂时还没有
				additionals += ",";
			}
		}
	}
	var travellerName = $("#travellerName").val();
	var travellerMobile = $("#travellerMobile").val();
	
	if(travellerName == "" || travellerMobile == "")
	{
		Toast("出行人及联系电话不能为空！", 2000);
		return;
	}
	callSubmitOrder(username, password, travellerName, travellerMobile, outDates, productIds, instanceIds, additionals, quanties);
}

function payFinished()
{
	var fieldName = window.localStorage.fieldName;
	var productList;
	if(fieldName == "medical")
		productList = window.localStorage.medicalList;
	else if(fieldName == "education")
		productList = window.localStorage.courseList;
	else if(fieldName == "shopping")
		productList = window.localStorage.buyList;
	else if(fieldName == "media")
		productList = window.localStorage.readList;
	else if(fieldName == "tailor")
		productList = window.localStorage.orderList;
	var products = productList.split("#");

	var recordNos = "";
	var instanceIds = "";
	var dates = "";
	var quantities = "";
	
	for (i = 0; i < products.length; i++) {
        if (products[i] == "") {
            continue;
        }
        var product = products[i].split("|");
        //格式为：recordNo|name|price|quantity|useDate|instanceId|instanceName#
        
        recordNos += product[0] + ",";
        instanceIds += product[5] + ",";
        dates += product[4] + ",";
        quantities += product[3] + ",";
	 }
	 
	var patientName = $("#travellerName").val();
	var patientMobile = $("#travellerMobile").val();
	var username = window.localStorage.username;
	var password = "111111";
	
	if(patientName == "" || patientMobile == "")
	{
		Toast("病人姓名和联系电话不能为空！", 2000);
		return;
	}
	
	if(fieldName == "medical")
		callSubmitOrderForPatient(username, password, recordNos, instanceIds, dates, quantities);
	else if(fieldName == "education")
		callSubmitOrderForStudent(username, password, recordNos, instanceIds, dates, quantities);
	else if(fieldName == "shopping")
		callSubmitOrderForBuyer(username, password, recordNos, instanceIds, dates, quantities);
	else if(fieldName == "media")
		callSubmitOrderForReader(username, password, recordNos, instanceIds, dates, quantities);
	else if(fieldName == "tailor")
		callSubmitOrderForBuyer(username, password, recordNos, instanceIds, dates, quantities);
}


function getOrderSuccessPublicPart(message)
{
	var consumerName = window.localStorage.consumerName;
	var fieldName = window.localStorage.fieldName;
	hideLoadingDiv();
	var currentPage = $("#" + consumerName + "_order_list");
	currentPage.find(".tb_list_tbody").html("");
	
	var trDemo = $("#demo_for_order_list").find(".demo_tr");
	var jsonObject;
	if(fieldName == "medical" || fieldName == "shopping" || fieldName == "media" || fieldName == "tailor")//彩云天使接口用java编写，获取到的是json字符串，需要先转换成json对象
	{
		jsonObject = eval("(" + message + ")");
	}
	else if(fieldName == "education")
		jsonObject = message;
	if(jsonObject.length == 0 || message == 0)
	{
		Toast("尚无订单数据", 2000);
		return;
	}
	else if(jsonObject.length > 0)
	{	
		for(var i = 0; i < jsonObject.length; i++)
		{
			(function(arg) {
			var trItem = trDemo.clone(true);
			var service_item = arg;
			var totalPrice = 0;
			trItem.find(".createdDate").text(service_item.date.substring(0,10));
			
			if(fieldName == "medical" || fieldName == "shopping" || fieldName == "media" || fieldName == "tailor")
			{
				trItem.find(".status").text(service_item.status);
			}
			else if(fieldName == "education")
			{
				if(service_item.status == "OK")
					trItem.find(".status").text("待确认");
			}
			for(var j = 0; j < service_item.orderItemInfos.length; j++)
				{
					var item = service_item.orderItemInfos[j];
					totalPrice += parseInt(item.purchasePrice) * parseInt(item.quantity);
				}
			trItem.find(".totalPrice").text(totalPrice + "元");
			trItem.find(".openDetail").click(function() {
				openOrderDetailForConsumer(service_item);
			});
			
			trItem.css("display","");
			currentPage.find(".tb_list_tbody").append(trItem);
			})(jsonObject[i]);

		}
		$.mobile.changePage(currentPage);
	}
	else
	{
		Toast("数据异常，请稍后再试", 2000);
		return;
	}
}

function openOrderDetailForConsumer(orderDetail)
{
	var consumerName = window.localStorage.consumerName;
	var fieldName = window.localStorage.fieldName;
	var currentPage = $("#" + consumerName + "_order_detail");
	if(orderDetail == undefined || orderDetail.length == 0)
		{
			Toast("数据加载失败，请稍后再试!",2000);
		}
	else
	{
		var totalPrice = 0;
		currentPage.find(".container").html("");
		
		var tableDemo = $("#orderDetailDemo").find(".orderTableDemo").clone(true);
		var tb_list_demo = $("#orderDetailDemo").find(".tb_list").clone(true);
		
		var tb_list_demo_tbody = tb_list_demo.find(".tb_list_demo_tbody");;
		
		if(fieldName == "medical" || fieldName == "shopping" || fieldName == "media" || fieldName == "tailor")
		{
			tableDemo.find(".orderNumber").text(orderDetail.username + "_" + orderDetail.id);
			tableDemo.find(".travellerMobile").text(orderDetail.tel);
		}
		else if(fieldName == "education")
		{
			tableDemo.find(".orderNumber").text("user_" + orderDetail.orderNo);
			tableDemo.find(".travellerMobile").text("15201823477");
		}
		for(var j = 0; j < orderDetail.orderItemInfos.length; j++)
			{
				var item = orderDetail.orderItemInfos[j];
				var price = parseInt(item.purchasePrice) * parseInt(item.quantity);
				totalPrice += price;
				var tr_demo = $("#orderDetailDemo").find(".tr_demo").clone(true);
				tr_demo.find(".productName").text(item.productName);
				tr_demo.find(".itemName").text(item.instanceName);
				tr_demo.find(".quantity").text(item.quantity);
				tr_demo.find(".price").text(price + "元");
				tr_demo.find(".useDate").text(item.useDate.substring(0,10));
			
				tr_demo.css("display","");
				tb_list_demo_tbody.append(tr_demo);
			}
		var useDate = orderDetail.date.substring(0,10).split("-");
		tableDemo.find(".createdTime").text(useDate[0] + "年" + useDate[1] + "月" + useDate[2] + "日");
		tableDemo.find(".travellerName").text("张大山");
		
		tableDemo.find(".totalPrice").text(totalPrice + "元");
		
		currentPage.find(".container").append(tableDemo);
		currentPage.find(".container").append("<br/>");
		currentPage.find(".container").append(tb_list_demo);
		
		$.mobile.changePage(currentPage);
	}
}

function getOrderItemsPublicPart(message)
{
	var providerName = window.localStorage.providerName;
	var fieldName = window.localStorage.fieldName;
	var currentPage = $("#" + providerName + "_order_list");
	hideLoadingDiv();
	currentPage.find(".tbody").html("");

	var trDemo = $("#order_list_demo_for_provider").find(".tr_demo");
	var jsonObject;
	if(fieldName == "medical" || fieldName == "shopping" || fieldName == "media" || fieldName == "tailor")//彩云天使、云购物和私媒体获取到的是json字符串(java)
		jsonObject = eval("(" + message + ")");
	else if(fieldName == "education")//云私塾获取到的是jsonObject(C#)
		jsonObject = message;
	if(jsonObject.length == 0 || message == 0)
	{
		Toast("暂无订单数据!",2000);
		if($.mobile.activePage.attr("id") == providerName + "_data")
			return;
		else
		$.mobile.changePage("#" + providerName + "_data");
	}
	else if(jsonObject.length > 0)
	{	
		for(var i = 0; i < jsonObject.length; i++)
		{
			(function(arg) {
			var trItem = trDemo.clone(true);
			var service_item = arg;
			trItem.find(".createdDate").text(service_item.useDate.substring(0,10));
			trItem.find(".productName").text(service_item.productName);
			trItem.find(".itemName").text(service_item.instanceName);
			
			trItem.find(".price").text(service_item.purchasePrice + "元");
			if(fieldName == "medical" || fieldName == "shopping" || fieldName == "media" || fieldName == "tailor")
			{
				trItem.find(".openLink").click(function() {
					comfirmOrderForProvider(service_item.orderItemId);
				});
			}
			else if(fieldName == "education")
			{
				trItem.find(".openLink").click(function() {
					comfirmOrderForProvider(service_item.quantity);//云私塾接口的订单项中未返回id，暂用数量表示
				});
			}
			trItem.css("display","");
			currentPage.find(".tbody").append(trItem);
			})(jsonObject[i]);
		}
		$.mobile.changePage("#" + providerName + "_order_list");
	}
	else
	{
		Toast("数据加载失败，请稍后再试!",2000);
		if($.mobile.activePage.attr("id") == providerName + "_data")
			return;
		else
		$.mobile.changePage("#" + providerName + "_data");
	}
}

function comfirmOrderForProvider(orderId)
{
	var fieldName = window.localStorage.fieldName;
	showLoadingDiv("订单确认中...");
	var username = window.localStorage.username;
	var password = "111111";
	var addInfo = "";
	if(fieldName == "medical")
		cordova.exec(comfirmOrderForDoctorSuccess, callWebServiceError, 'MedicalService', 'confirmOrder',[username, password, orderId, addInfo]);
	else if(fieldName == "education")
		cordova.exec(comfirmOrderForTeacherSuccess, callWebServiceError, 'EducationService', 'confirmOrder',[username, password, orderId, addInfo]);
	else if(fieldName == "shopping")
		cordova.exec(comfirmOrderForShopSuccess, callWebServiceError, 'ShoppingService', 'confirmOrder',[username, password, orderId, addInfo]);
	else if(fieldName == "media")
		cordova.exec(comfirmOrderForWriterSuccess, callWebServiceError, 'MediaService', 'confirmOrder',[username, password, orderId, addInfo]);
	else if(fieldName == "tailor")
		cordova.exec(comfirmOrderForShopSuccess, callWebServiceError, 'TailorService', 'confirmOrder',[username, password, orderId, addInfo]);
}

function openPublishedProduct()
{
	var providerName = window.localStorage.providerName;
	var fieldName = window.localStorage.fieldName;
	var publishedProductCode = window.localStorage.publishedProductCode;
	var trustProductList;
	if(fieldName == "travel")
		trustProductList = eval("(" + window.localStorage.trustProductListForTravel + ")");
	else if(fieldName == "education")
		trustProductList = eval("(" + window.localStorage.trustProductListForEducation + ")");
	else if(fieldName == "medical")
		trustProductList = eval("(" + window.localStorage.trustProductListForMedical + ")");
	else if(fieldName == "shopping")
		trustProductList = eval("(" + window.localStorage.trustProductListForShopping + ")");
	else if(fieldName == "media")
		trustProductList = eval("(" + window.localStorage.trustProductListForMedia + ")");
	else if(fieldName == "tailor")
		trustProductList = eval("(" + window.localStorage.trustProductListForTailor + ")");
		
	if(trustProductList != undefined && trustProductList.length > 0 && publishedProductCode != undefined && publishedProductCode.length > 0)
	{
		var currentPage = $("#"+ providerName + "_service_list");
		currentPage.find(".container").html("");
		var table = $("#productListFromTrustDemo").find(".demo_table_for_trust");
		var hasProduct = false;
		for(var i = 0; i < trustProductList.length; i++)
		{
			(function(arg) {
				var service_item = arg;
				
				if(publishedProductCode.indexOf(service_item.productCode) >= 0)
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
				
					item.find(".openLink").text("备案详情");
					item.find(".openLink").click(function() {
						openProductTrustById(service_item.templateId,service_item.draftId);
					});
					
				currentPage.find(".container").append(item);
				hasProduct = true;
				}
				
				})(trustProductList[i]);
		}
		if(hasProduct)
			$.mobile.changePage("#"+ providerName + "_service_list");
		else
			Toast("尚未发布产品!",2000);
	}
	else
	{
		Toast("尚未发布产品!",2000);
	}
}

function publishProduct(productCode)
{
	var fieldName = window.localStorage.fieldName;
	showLoadingDiv("正在发布产品");
	if(window.localStorage.publishedProductCode == undefined) 
		window.localStorage.publishedProductCode = "";
	
	if(window.localStorage.publishedProductCode.indexOf(productCode) == -1)
		window.localStorage.publishedProductCode += productCode + ",";
	
	if(fieldName == "travel")
	{
		hideLoadingDiv();
		Toast("服务发布成功",2000);
		openPublishedProduct();
		//cordova.exec(publishProductSuccess, callWebServiceError, 'TravelHubService', 'publishProduct',[productCode]);
	}
	else if(fieldName == "education" || fieldName == "shopping" || fieldName == "media" || fieldName == "medical" || fieldName == "tailor")
	{
		hideLoadingDiv();
		Toast("服务发布成功",2000);
		openPublishedProduct();
	}
	else
	{
		hideLoadingDiv();
		Toast("publishProduct参数错误",2000);
	}
}

function openAuditList()//打开许可申请列表
{
	var fieldName = window.localStorage.fieldName;
	var username = window.localStorage.username;
	var password = "111111";
	var applyCorporationName = "";//旅游接口提供根据申请企业名称等条件查询
	var applyProductName = "";
	var applyDateFrom = "";
	var applyDateTo = "";
	var applyStatus = "";
	var page = 1;
	var size = 10;
	showLoadingDiv("正在搜索申请");
	if(fieldName == "travel"){
		if(username == "user")
		{
			username = "changxinglvyou";
			password = "cxly@travelhub";
		}
		
		cordova.exec(openAuditListForCompanySuccess, callWebServiceError, 'TravelHubService', 'getAuditList',[username, password, 
			applyCorporationName, applyProductName, applyDateFrom, applyDateTo, applyStatus, page, size]);
	}
	else if(fieldName == "education"){

		cordova.exec(openAuditListForTeacherSuccess, callWebServiceError, 'EducationService', 'getAgreements',
			[username, applyProductName, applyStatus, applyCorporationName, page, size]);
	}
	else if(fieldName == "medical"){

		cordova.exec(openAuditListForDoctorSuccess, callWebServiceError, 'MedicalService', 'getAgreements',[username, page, size]);
	}
	else if(fieldName == "shopping"){

		cordova.exec(openAuditListForShopSuccess, callWebServiceError, 'ShoppingService', 'getAgreements',[username, page, size]);
	}
	else if(fieldName == "media"){

		cordova.exec(openAuditListForWriterSuccess, callWebServiceError, 'MediaService', 'getAgreements',[username, page, size]);
	}
	else if(fieldName == "tailor"){

		cordova.exec(openAuditListForShopSuccess, callWebServiceError, 'TailorService', 'getAgreements',[username, page, size]);
	}
	else{
		hideLoadingDiv();
		Toast("openAuditList参数错误", 3000);
		return;
	}
}

function openAuditListSuccessPublicPart(auditList)
{
	var providerName = window.localStorage.providerName;
	var currentPage = $("#" + providerName + "_service_audit_list");
	currentPage.find(".tb_list").find(".tbody").html("");
	var trDemo = $("#audit_list_tr_demo").find(".tr_demo");
	
	if(auditList.length == 0 || auditList == 0 || auditList == -1)
	{
		Toast("没有申请协议!",2000);
		$.mobile.changePage("#" + providerName + "_service_manager");
	}
	else
	{	
		for(var i = 0; i < auditList.length; i++)
		{
			(function(arg) {
			var trItem = trDemo.clone(true);
			var service_item = arg;
			trItem.find(".productName").text(service_item.productName);
			if(providerName == "company" && service_item.applyName == "admin")//旅游集散网返回的是用户名，不是企业名称
			{
				trItem.find(".applyName").text(getProviderName("travel", service_item.applyName));
			}
			else
				trItem.find(".applyName").text(service_item.applyName);
			trItem.find(".applyDate").text(service_item.dateStart.substring(0, 10));
			if(service_item.status != undefined)
				trItem.find(".applyStatus").text(service_item.status);
			else
				trItem.find(".applyStatus").text("未审核");
			
			//trItem.find(".openDetail").button();//本语句可以使查看位于一个按钮包裹之下
			trItem.find(".openDetail").click(function() {
					openAgreementDetail(service_item);//打开协议详情页面
				});
			
			trItem.css("display","");
			currentPage.find(".tb_list").find(".tbody").append(trItem);
			})(auditList[i]);
		}
		$.mobile.changePage("#" + providerName + "_service_audit_list");
	}
}

function openAgreementDetail(service_item)
{
	var fieldName = window.localStorage.fieldName;
	var providerName = window.localStorage.providerName;
	var currentPage = $("#" + providerName + "_service_audit_detail");
	var demoTable = $("#table_demo_of_audit_detail_for_provider").find(".audit_detail_demo_table").clone(true);
	currentPage.find(".container").html("");
	
	demoTable.find(".productName").html(service_item.productName);
	if(fieldName == "travel" && service_item.applyName == "admin")
		demoTable.find(".applyName").html(getProviderName(fieldName, service_item.applyName));
	else
		demoTable.find(".applyName").html(service_item.applyName);
	demoTable.find(".applyPrice").html(service_item.applyPrice);
	var dateStart = service_item.dateStart;
	var dateEnd = service_item.dateEnd;
	demoTable.find(".dateStart").html(dateStart.substring(0,4) + "年" + dateStart.substring(6,7) + "月" + dateStart.substring(9,10) + "日");
	demoTable.find(".dateEnd").html(dateEnd.substring(0,4) + "年" + dateEnd.substring(6,7) + "月" + dateEnd.substring(9,10) + "日");
	
	if(service_item.content == "anyType{}" || service_item.content == "")
		demoTable.find(".content").html("未提供协议详情");
	else
		demoTable.find(".content").html(service_item.content);
	
	currentPage.find(".container").append(demoTable);
	currentPage.find(".agreeButton").unbind("click");
	currentPage.find(".agreeButton").click(function(){
		manageAgreement(service_item.id, "agree");
	});
	currentPage.find(".disagreeButton").unbind("click");
	currentPage.find(".disagreeButton").click(function(){
		manageAgreement(service_item.id, "reject");
	});
	
	if(service_item.status == undefined || service_item.status == "未审核")
	{
		currentPage.find(".operatorDiv").css("display", "");
	}
	else
		currentPage.find(".operatorDiv").css("display", "none");
	
	$.mobile.changePage("#" + providerName + "_service_audit_detail");
}

function manageAgreement(agreementId, result)
{
	var fieldName = window.localStorage.fieldName;
	var username = window.localStorage.username;
	var operatorName = window.localStorage.operatorName;
	var password = "111111";
	var reason = "";
	showLoadingDiv("正在审核协议");
	if(fieldName == "travel"){//对于旅游而言，auditResult为3是同意，4是拒绝
		if(username == "user")
		{
			username = "changxinglvyou";
			password = "cxly@travelhub";
		}
		var auditResult;
		if(result == "agree")
		{
			auditResult = 1;
		}
		else if(result == "reject")
		{
			auditResult = -1;
			reason = $("#" + operatorName + "_service_apply_detail").find(".reason").val();
		}
		
		cordova.exec(manageAgreementForTravelSuccess, callWebServiceError, 'TravelHubService', 'manageAgreement',
			[username, password, agreementId, auditResult, reason]);
	}
	else if(fieldName == "education")
	{
		cordova.exec(manageAgreementForEducationSuccess, callWebServiceError, 'EducationService', 'manageAgreement',
			[username, agreementId, result]);
	}
	else if(fieldName == "medical")
	{
		cordova.exec(manageAgreementForMedicalSuccess, callWebServiceError, 'MedicalService', 'manageAgreement',
			[username, agreementId, result]);
	}
	else if(fieldName == "shopping")
	{
		cordova.exec(manageAgreementForShoppingSuccess, callWebServiceError, 'ShoppingService', 'manageAgreement',
			[username, agreementId, result]);
	}
	else if(fieldName == "media")
	{
		cordova.exec(manageAgreementForMediaSuccess, callWebServiceError, 'MediaService', 'manageAgreement',
			[username, agreementId, result]);
	}
	else if(fieldName == "tailor")
	{
		cordova.exec(manageAgreementForShoppingSuccess, callWebServiceError, 'TailorService', 'manageAgreement',
			[username, agreementId, result]);
	}
	else
	{
		hideLoadingDiv();
		Toast("manageAgreement参数错误", 3000);
		return;
	}
}

function openPackageList()
{
	var fieldName = window.localStorage.fieldName;
	var username = window.localStorage.username;
	var password = "111111";
	var productName = "";//根据包含服务名称查询
	var page = 1;
	var size = 10;
	var packageName = "";//根据套票名称查询
	var status = "";//根据状态查询
	showLoadingDiv("正在努力加载");
	if(fieldName == "travel")
	{
		if(username == "user")
		{
			username = "changxinglvyou";
			password = "cxly@travelhub";
		}
		cordova.exec(openPackageListForTravelSuccess, callWebServiceError, 'TravelHubService', 'searchPublishedProducts',
			[username, password, 1, packageName, page, size]);
	}
	else if(fieldName == "medical")
	{
		cordova.exec(openPackageListForMedicalSuccess, callWebServiceError, 'MedicalService', 'searchPackageList',
			[username, packageName, productName, page, size]);
	}
	else if(fieldName == "education")
	{
		cordova.exec(openPackageListForEducationSuccess, callWebServiceError, 'EducationService', 'searchPackageList',
			[username, packageName, productName, status, page, size]);
	}
	else if(fieldName == "shopping")
	{
		cordova.exec(openPackageListForShoppingSuccess, callWebServiceError, 'ShoppingService', 'searchPackageList',
			[username, packageName, productName, page, size]);
	}
	else if(fieldName == "media")
	{
		cordova.exec(openPackageListForMediaSuccess, callWebServiceError, 'MediaService', 'searchPackageList',
			[username, packageName, productName, page, size]);
	}
	else if(fieldName == "tailor")
	{
		cordova.exec(openPackageListForShoppingSuccess, callWebServiceError, 'TailorService', 'searchPackageList',
			[username, packageName, productName, page, size]);
	}
	else{
		hideLoadingDiv();
		Toast("openPackageList参数有误", 3000);
		return;
	}
}

function openPackageListPublicPart(packagesInfo)
{
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_service_list");
	currentPage.find(".tb_productList").css("display","");
	currentPage.find(".tb_productList").find(".tbody").html("");
	
	var trDemo = $("#tr_demo_of_service_list_for_operator").find(".tr_demo");
	
	if(packagesInfo != "")
	{
		for(var i = 0 ; i < packagesInfo.length; i++)
		{
			(function(arg) {
				var trItem = trDemo.clone(true);
				trItem.css("display", "");
				var packageItem = arg;
			
				trItem.find(".publishDate").text(packageItem.dateStart.substring(0,10));
				trItem.find(".productName").text(packageItem.productName);
				trItem.find(".productState").text(packageItem.status);
		
				trItem.find(".openDetail").unbind("click");
				trItem.find(".openDetail").click(function() {
					openPackageDetail(packageItem);
				});
				
				currentPage.find(".tb_productList").find(".tbody").append(trItem);
			})(packagesInfo[i]);
		}
	}
	else
	{
		Toast("尚未发布任何套票", 3000);
		return;
	}
	$.mobile.changePage("#" + operatorName + "_service_list");
}

function openPackageDetail(productInfo)
{
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_publish_service_detail");
	var demoDiv = $("#table_demo_of_service_detail_for_operator").clone(true);
	currentPage.find(".container").html("");
	var fieldName = window.localStorage.fieldName;
	var publishedPackageId = "";
	if(fieldName == "travel")//将存储在本地的已发布的套票id读出，使得套票详情页面不再显示备案到可信平台的按钮
		publishedPackageId = window.localStorage.publishedTravelPackageId;
	else if(fieldName == "medical")
		publishedPackageId = window.localStorage.publishedMedicalPackageId;
	else if(fieldName == "education")
		publishedPackageId = window.localStorage.publishedEducationPackageId;
	else if(fieldName == "shopping")
		publishedPackageId = window.localStorage.publishedShoppingPackageId;
	else if(fieldName == "media")
		publishedPackageId = window.localStorage.publishedMediaPackageId;
	else if(fieldName == "tailor")
		publishedPackageId = window.localStorage.publishedTailorPackageId;
		
	var productName = productInfo.productName;
	var price = productInfo.price;
	var description = productInfo.description;
	
	demoDiv.find(".tbody_list").html("");
	demoDiv.find(".hub_serviceName").text("");
	demoDiv.find(".hub_servicePrice").text("");
	demoDiv.find(".hub_serviceDescription").text("");
	
	var tr = demoDiv.find(".tr_demo");
	
	demoDiv.find(".hub_serviceName").text(productName);
	demoDiv.find(".hub_servicePrice").text(price + " 元");
	if(description == "")
		demoDiv.find(".hub_serviceDescription").text("暂无描述");
	else
		demoDiv.find(".hub_serviceDescription").text(description);
	
	var relatedProducts = productInfo.relatedProducts;
	
	if(relatedProducts.length > 0)
	{
		for(var i = 0; i < relatedProducts.length; i++)
		{
			(function(arg) {
				var trustProduct = arg;
				var myTr = tr.clone(true);
				myTr.find(".productName").text(trustProduct.name);
				if(trustProduct.price != undefined && trustProduct.price != 0 && fieldName != "education")//教育产品的虚构价格为10000，暂且忽略
					myTr.find(".price").text(trustProduct.price);
				else
					myTr.find(".price").text(Math.floor(Math.random() * 200) + 40);//相关产品不存在价格信息，用随机数代替
				myTr.find(".manufacturer").text(trustProduct.providerName);
				
				if(trustProduct.status == "未授权"){
					myTr.find(".state").css("color", "#08C");
					myTr.find(".state").text("申请");
					myTr.find(".state").click(function() {
						startApplyProduct(trustProduct);
					});
				}
				else
					myTr.find(".state").text(trustProduct.status);
				myTr.css("display","");
				demoDiv.find(".tbody_list").append(myTr);
				
			})(relatedProducts[i]);
		}
		currentPage.find(".container").append(demoDiv);
		currentPage.find(".publishAndRecord").css("display", "");
		var isPublished= false;
		if(publishedPackageId != undefined && publishedPackageId != "" && publishedPackageId.indexOf(",") != -1)
		{
			var publishedPackageIds = publishedPackageId.split(",");
			for(var j = 0; j < publishedPackageIds.length; j++)
			{
				if(publishedPackageIds[j] == productInfo.id)
					isPublished = true;
			}
		}
		if(isPublished)
			currentPage.find(".publishAndRecord").css("display", "none");
		currentPage.find(".publishAndRecord").unbind("click");
		currentPage.find(".publishAndRecord").click(function() {
					publishHubService(productInfo);
				});
		$.mobile.changePage("#" + operatorName + "_publish_service_detail");
	}
	else
		Toast("openPackageDetail出现异常",2000);
}

function startApplyProduct(productItem)
{//productItem的包含id,name,price,providerName,recordNo,status
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_service_apply");
	var demoTable = $("#demo_for_service_apply").find(".demo_table").clone(true);
	currentPage.find(".container").html("");
	var username = window.localStorage.username;;
	var applyName = window.localStorage.myCompanyName;
	demoTable.find(".productName").val(productItem.name);
	demoTable.find(".applyName").val(applyName);
	demoTable.find(".providerName").val(productItem.providerName);
	demoTable.find(".applyPrice").val("");
	demoTable.find(".applyStartDate").val("");
	demoTable.find(".applyEndDate").val("");
	demoTable.find(".applyProtocol").val("");
	currentPage.find(".container").append(demoTable);
	
	currentPage.find(".applyButton").unbind("click");
	currentPage.find(".applyButton").click(function() {
					callApplyProductWebService(productItem);
				});
	
	$.mobile.changePage("#" + operatorName + "_service_apply");
}

function callApplyProductWebService(productItem)
{
	var operatorName = window.localStorage.operatorName;
	var currentPage = $("#" + operatorName + "_service_apply");
	var fieldName = window.localStorage.fieldName;
	var username = window.localStorage.username;
	var password = "111111";
	
	var recordNo = productItem.recordNo;
	var productName = productItem.name;
	var productSharingPermissionId = 0;//表示创建新的申请
	var applyName = currentPage.find(".applyName").val();
	var applyPrice = currentPage.find(".applyPrice").val();
	var dateStart = currentPage.find(".applyStartDate").val();
	var dateEnd = currentPage.find(".applyEndDate").val();
	var content = currentPage.find(".applyProtocol").val();
	
	if(fieldName == "travel")
	{
		if(username == "user")
		{
			username = "changxinglvyou";
			password = "cxly@travelhub";
		}
		showLoadingDiv("正在提交申请");
		cordova.exec(applyProductForTravelSuccess, callWebServiceError, 'TravelHubService', 'applyProduct',
			[username, password, productSharingPermissionId, recordNo, dateStart, dateEnd, applyPrice, 10, content]);
		//私人导游许可申请接口
	}
	else if(fieldName == "education")
	{
		//云私塾许可申请接口
		var providerName = productItem.providerName;
		showLoadingDiv("正在提交申请");
		cordova.exec(applyProductForEducationSuccess, callWebServiceError, 'EducationService', 'applyProduct',
			[providerName, recordNo, productName, applyName, applyPrice, dateStart, dateEnd, content]);
	}
	else if(fieldName == "medical")
	{
		if(username =="user")//此处的username是被申请方
			username = "admin";
		else
			username = "user";
		showLoadingDiv("正在提交申请");
		cordova.exec(applyProductForMedicalSuccess, callWebServiceError, 'MedicalService', 'applyProduct',
			[username, recordNo, productName, applyName, applyPrice, dateStart, dateEnd, content]);
	}
	else if(fieldName == "shopping")
	{
		if(username =="user")//此处的username是被申请方
			username = "admin";
		else
			username = "user";
		showLoadingDiv("正在提交申请");
		cordova.exec(applyProductForShoppingSuccess, callWebServiceError, 'ShoppingService', 'applyProduct',
			[username, recordNo, productName, applyName, applyPrice, dateStart, dateEnd, content]);
	}
	else if(fieldName == "media")
	{
		if(username =="user")//此处的username是被申请方
			username = "admin";
		else
			username = "user";
		showLoadingDiv("正在提交申请");
		cordova.exec(applyProductForMediaSuccess, callWebServiceError, 'MediaService', 'applyProduct',
			[username, recordNo, productName, applyName, applyPrice, dateStart, dateEnd, content]);
	}
	else if(fieldName == "tailor")
	{
		if(username =="user")//此处的username是被申请方
			username = "admin";
		else
			username = "user";
		showLoadingDiv("正在提交申请");
		cordova.exec(applyProductForShoppingSuccess, callWebServiceError, 'TailorService', 'applyProduct',
			[username, recordNo, productName, applyName, applyPrice, dateStart, dateEnd, content]);
	}
	else{
		Toast("callApplyProduct参数错误", 3000);
	}
}

function clearSelectedProduct()
{
	window.localStorage.selectProductCodeList = "";
	window.localStorage.selectProductNameAndPriceList = "";
}