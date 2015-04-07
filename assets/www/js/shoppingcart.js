/* 私人导游应用中行程单操作，使用window.localStorage.itinerary（私人导游采用集散网接口获取数据，故处理上稍有不同） */
function addToItinerary(arr,quantity,productUseDate)
{
	var storage = window.localStorage;//html5的自带本地存储，用起来和网页端的cookie类似
	var itinerary = storage.itinerary;
	if(itinerary == undefined)
		itinerary = "";
	
	var products = itinerary.split("#");
	var newItinerary = "";
	var added = false;
	 for (i = 0; i < products.length; i++) {
        if (products[i] == "") {
            continue;
        }
        
        //该项内容为可购买产品，格式为：realID|name|price|quantity|useDate|priceDimId|priceDimName|partnerProductId|instanceId|productImage#
        var product = products[i].split("|");
        var pid = parseInt(product[0]);
        var name = product[1];
        var price = parseInt(product[2]);
        var q = parseInt(product[3]);
        var useDate = product[4];
        var priceDimId = product[5];
        var priceDimName = product[6];
        var partnerProductId = product[7];
        var instanceId = product[8];
        var productImage = product[9];

        //如果该产品已经在行程单中，则直接增加数量，否则直接略过
        if (pid == arr[5] && name == arr[0] && priceDimId == arr[6] && useDate == productUseDate && !added) {//pid为realId
            added = true;
            var sum = parseInt(q) + parseInt(quantity);
            if (sum < 1) {
                sum = 1;
            }
            newItinerary += pid + "|" + name + "|" + price + "|" + sum + "|" + productUseDate + "|" + priceDimId + "|" + priceDimName + "|"
            + partnerProductId + "|" + instanceId + "|" + productImage + "#";
        } else {
            newItinerary += products[i] + "#";
        }
	 }
    if (added) {
        storage.itinerary = newItinerary;
    } else {
    	var currInstanceId = 0;
    	if(arr[8] == "LOCAL")
		{
			if(arr[9] == "HOTEL")
			{ 
				currInstanceId = arr[11];
			}
			else
			{
				var localValidDateAndInstanceId = arr[11].split("_");
				for(var j = 0; j < localValidDateAndInstanceId.length; j ++)
				{
					var localDateAndInstanceIdItem = localValidDateAndInstanceId[j].split("|");
					if(localDateAndInstanceIdItem[0] == productUseDate)
						currInstanceId = localDateAndInstanceIdItem[2];
					else
						continue;
				}
			}
		}
        storage.itinerary = itinerary + arr[5] + "|" + arr[0] + "|" + arr[1] + "|" + quantity + "|" + productUseDate + "|" + arr[6] + "|"
        + arr[7] + "|" + arr[10] + "|" + currInstanceId + "|" + arr[4] + "#";
    }
    //openItinerary();//加入行程单后立即打开行程单
    Toast("加入成功，在更多操作中查看", 2000)
    $.mobile.changePage("#page_travel_service_list_for_search");//加入行程单后返回至产品列表
}

function refreshItinerary(productId, priceDimId, productName, quantity, useDate)
{
	var storage = window.localStorage;
	var itinerary = storage.itinerary;
	var products = itinerary.split("#");
	var newItinerary = "";
	var totalMoney = 0;
	 for (i = 0; i < products.length; i++) {
        if (products[i] == "") {
            continue;
        }
        var product = products[i].split("|");
        var pid = parseInt(product[0]);
        var name = product[1];
        var price = parseInt(product[2]);
        var q = parseInt(product[3]);
        var productUseDate = product[4];
        var priceDId = product[5];
        var priceDimName = product[6];
		var partnerProductId = product[7];
		var instanceId = product[8];
		var productImage = product[9];
        
        if (name == productName && pid == productId && priceDId == priceDimId && productUseDate == useDate) {
            newItinerary += pid + "|" + name + "|" + price + "|" + quantity + "|" + productUseDate + "|" + priceDId + "|" + priceDimName + "|"
            	+ partnerProductId + "|" + instanceId + "|" + productImage + "#";
            totalMoney += parseInt(price) * parseInt(quantity);
        } else {
            newItinerary += products[i] + "#";
            totalMoney += parseInt(price) * parseInt(q);
        }
	 }
	 storage.itinerary = newItinerary;
	 $("#customer_my_itinerary").find(".container").find(".totalMoney").html(totalMoney);
}

function removeFromItinerary(productInfo) {
	var productId = parseInt(productInfo.split(",")[0]);
	var priceDimId = productInfo.split(",")[1];
	var useDate = productInfo.split(",")[2];
    if (productId < 0) {
        return;
    }
    var storage = window.localStorage;
    var itinerary = storage.itinerary;
    if (itinerary == undefined) {
        itinerary = "";
    }
    var products = itinerary.split("#");
    var i = 0;
    var newItinerary = "";
    var removed = false;
    for (i = 0; i < products.length; i++) {
        if (products[i] == "") {
            continue;
        }
        var product = products[i].split("|");
        var pid = parseInt(product[0]);
        var productUseDate = product[4];//删除时可以考虑加上使用时间
        var priceDid = product[5];
        
        if (pid == productId && priceDid == priceDimId && productUseDate == useDate && !removed) {
            removed = true;
        } else {
            newItinerary += products[i] + "#";
        }
    }
    storage.itinerary = newItinerary;
    openItinerary();
}

function clearItinerary()
{
	window.localStorage.itinerary = "";
	openItinerary();
}

Date.prototype.format = function(format)
{
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) 
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("("+ k +")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr(("" + o[k]).length));
	return format;
}

//行程单中今天之前的项目都移除
function deleteInvalidItem()
{
	var itinerary = window.localStorage.itinerary;
	if(itinerary == undefined || itinerary == "")
		return;
	else
	{
		var products = itinerary.split("#");
		var newItinerary = "";
		var today = new Date().format('yyyy-MM-dd');
		
		for (i = 0; i < products.length; i++) {
        	if (products[i] == "") {
            	continue;
       	 	}
        	if (products[i].split("|")[4] < today) {
           	 	continue;
        	} else {
            	newItinerary += products[i] + "#";
        	}
    	}
    	window.localStorage.itinerary = newItinerary;
	}
}

function openItinerary()//打开行程单
{
	deleteInvalidItem();
	var itinerary = window.localStorage.itinerary;
	var container = $("#customer_my_itinerary").find(".container");
	container.find(".contentDiv").empty();
	//alert(itinerary);
	if(itinerary == undefined || itinerary == "")
	{
		container.find(".tipDiv").css("display","");
		container.find(".contentDiv").css("display","none");
		container.find(".submitOrder").css("display","none");
		container.find(".totalSpan").css("display","none");
		$.mobile.changePage("#customer_my_itinerary");
	}
	else{
		var totalMoney = 0;
		var products = itinerary.split("#");
		var dateArray = new Array();
		for (i = 0; i < products.length - 1; i++) {
			if(products[i] != ""){
        		var product = products[i].split("|");
        		if(dateArray.indexOf(product[4]) == -1)//保证同一天只被加入一次
        			dateArray.push(product[4]);
        	}
        }
        if(dateArray.length > 1)
        	dateArray.sort();//排序所有行程单中的产品使用日期
        if(dateArray.length > 0)
        {
        	container.find(".tipDiv").css("display","none");
			container.find(".contentDiv").css("display","");
        }
        for(var j = 0; j < dateArray.length; j ++)
        {
        	var currentDate = dateArray[j];
        	
        	var divDemo = $("#itinerary_divDemo").find(".divDemo").clone();
        	divDemo.find(".useDate").text(currentDate);
        	
        	for (i = 0; i < products.length - 1; i++) {
				if(products[i] != ""){
					var product = products[i].split("|");
					if(product[4] != currentDate)
						continue;
					var tableDemo = $("#itinerary_tableDemo").find(".tableDemo").clone(true);
					tableDemo.find(".productNumberAdd").attr("title",product[0] + "," + product[5] + "," + product[4]);//循环append时设置click事件，其传入的参数为最后一个值，需要先将id存储起来
					tableDemo.find(".productNumberMinus").attr("title",product[0] + "," + product[5] + "," + product[4]);
					tableDemo.find(".deleteItem").attr("title",product[0] + "," + product[5] + "," + product[4]);
					tableDemo.find(".productNumber").attr("title",product[0] + "," + product[5] + "," + product[4]);
					tableDemo.attr("class", tableDemo.attr("class") + " itemDiv" + product[0] + "_" + product[4]);
					
					tableDemo.find(".pic").attr("src", product[9]);
					if(product[1].length > 12)
						tableDemo.find(".productName").text(product[1].substring(0, 10) + "...");
					else
						tableDemo.find(".productName").text(product[1]);
					if(product[6].length > 10)
						tableDemo.find(".ticketName").text(product[6].substring(0, 8) + "...");
					else
						tableDemo.find(".ticketName").text(product[6]);
					tableDemo.find(".productPrice").text(product[2]);
					tableDemo.find(".quantity").val(product[3]);
					tableDemo.find(".productNumber").val(product[3]);
					totalMoney += parseInt(product[2]) * parseInt(product[3]);
					
					tableDemo.find(".productNumberMinus").click(function() {
						productNumberMinusInItinerary($(this).attr("title"));
					});
					tableDemo.find(".productNumberAdd").click(function() {
						productNumberAddInItinerary($(this).attr("title"));
					});
					tableDemo.find(".productNumber").change(function() {
						numberChangeInItinerary($(this).attr("title"));
					});
					tableDemo.find(".deleteItem").click(function() {
						removeFromItinerary($(this).attr("title"));
					});
					
					tableDemo.find(".productNumberMinus").button();
					tableDemo.find(".productNumberAdd").button();
					tableDemo.find(".deleteItem").button();
					tableDemo.trigger('create');//渲染div
					
					divDemo.find(".tableContainer").append(tableDemo);
				}
				container.find(".contentDiv").append(divDemo);
			}
        }
      
		container.find(".contentDiv").trigger('create');
    	container.find(".submitOrder").css("display","");
    	container.find(".totalSpan").css("display","");
    	container.find(".totalMoney").html(totalMoney);
    	
		$.mobile.changePage("#customer_my_itinerary");
	}
}

function productNumberMinusInItinerary(productInfo)
{
	var productId = productInfo.split(",")[0];
	var useDate = productInfo.split(",")[2];
	var item = $("#customer_my_itinerary").find(".itemDiv" + productId + "_" + useDate);
	var productNumber = item.find(".productNumber").val();
	if(parseInt(productNumber) > 1){
		item.find(".productNumber").val(parseInt(productNumber) - 1);
		numberChangeInItinerary(productInfo);
	}
	else{
		Toast("商品数量最少为1!",1000);
		return;
	}
}

function productNumberAddInItinerary(productInfo)
{
	var productId = productInfo.split(",")[0];
	var useDate = productInfo.split(",")[2];
	var item = $("#customer_my_itinerary").find(".itemDiv" + productId + "_" + useDate);
	var productNumber = item.find(".productNumber").val();
	item.find(".productNumber").val(parseInt(productNumber) + 1);
	numberChangeInItinerary(productInfo);
}

function numberChangeInItinerary(productInfo)
{
	var productId = productInfo.split(",")[0];
	var priceDimId = productInfo.split(",")[1];
	var useDate = productInfo.split(",")[2];
	var item = $("#customer_my_itinerary").find(".itemDiv" + productId + "_" + useDate);
	var productNumber = item.find(".productNumber").val();
	var price = item.find(".productPrice").text();
	item.find(".quantity").text(productNumber);
	var productName = item.find(".productName").text();
	refreshItinerary(productId,priceDimId, productName, productNumber, useDate);
}