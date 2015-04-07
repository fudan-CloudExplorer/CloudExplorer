//自定义Toast弹框 
     function Toast(msg,duration){  
         isToast = true;  
         beginDate = new Date().getTime();  
         duration=isNaN(duration)?2000:duration; // duration是不是一个数字      
         var m = document.createElement('div');  
         if(msg == undefined)
         	msg = "";
         m.innerHTML = msg;  
         m.style.cssText="width:60%; min-width:150px; background:#000; opacity:0.5; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:fixed; top:80%; left:20%; z-index:999999;";  
         document.body.appendChild(m);
         setTimeout(function() {  
             var d = 0.5;  
             m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';  
             m.style.opacity = '0';  
             setTimeout(function() { 
             		document.body.removeChild(m) 
             	}, d * 1000);  
         }, duration);  
     }

/* 应用搜索产品时设置产品类型 */
function setCategoryId(categoryId)
{
	var typeName = window.localStorage.consumerName;
	var fieldName = window.localStorage.fieldName;
	var categoryText = "";
	var pageId = "#" + typeName + "_search_service";
	$(pageId).find(".categoryId").val(categoryId);
	$(pageId).find(".searchTable").css("display","none");
	$(pageId).find(".searchKeyWord").val("");
	$(pageId).find(".searchPrice").val("");
	if(fieldName == "travel")//旅游查询
	{
		if(categoryId == 4)
			categoryText = "景点查询：";
		else if(categoryId == 7)
			categoryText = "交通查询：";
		else if(categoryId == 6)
			categoryText = "住宿查询：";
		else if(categoryId == 2)
			categoryText = "导游查询：";
		else
			categoryText = "";
		if(categoryText != ""){
			$(pageId).find(".searchTable").css("display","");
			$(pageId).find(".searchTable").find(".price").css("display","none");
			$(pageId).find(".searchTable").find(".searchCategoryName").text(categoryText);
			if(categoryText == "住宿查询：" || categoryText == "导游查询：")
			{
				$(pageId).find(".searchTable").find(".price").css("display","");
			}
		}
	}
	else if(fieldName == "education")
	{	
		if(categoryId == 1)
			categoryText = "课件查询：";
		else if(categoryId == 2)
			categoryText = "教师查询：";
		else if(categoryId == 3)
			categoryText = "实验查询：";
		if(categoryText != "")
		{
			$(pageId).find(".searchTable").css("display","");
			$(pageId).find(".searchTable").find(".searchCategoryName").text(categoryText);
		}
	}
	else if(fieldName == "medical")
	{
		if(categoryId == 1)
			categoryText = "检查服务：";
		else if(categoryId == 2)
			categoryText = "诊断服务：";
		else if(categoryId == 3)
			categoryText = "治疗服务：";
		if(categoryText != "")
		{
			$(pageId).find(".searchTable").css("display","");
			$(pageId).find(".searchTable").find(".searchCategoryName").text(categoryText);
			
		}
	}
	else if(fieldName == "media")
	{
		if(categoryId == 1)
			categoryText = "心得体会：";
		else if(categoryId == 2)
			categoryText = "专业文章：";
		else if(categoryId == 3)
			categoryText = "生活杂谈：";
		else if(categoryId == 4)
			categoryText = "其他文章：";
		if(categoryText != "")
		{
			$(pageId).find(".searchTable").css("display","");
			$(pageId).find(".searchTable").find(".searchCategoryName").text(categoryText);
		}
	}
	else if(fieldName == "shopping")
	{
		if(categoryId == 1)
			categoryText = "食品饮料：";
		else if(categoryId == 2)
			categoryText = "家用电器：";
		else if(categoryId == 3)
			categoryText = "衣物首饰：";
		else if(categoryId == 4)
			categoryText = "其他商品：";
		if(categoryText != "")
		{
			$(pageId).find(".searchTable").css("display","");
			$(pageId).find(".searchTable").find(".searchCategoryName").text(categoryText);
		}
	}
	else if(fieldName == "innovation")
	{
		if(categoryId == 1)
			categoryText = "A类创新：";
		else if(categoryId == 2)
			categoryText = "B类创新：";
		else if(categoryId == 3)
			categoryText = "C类创新：";
		else if(categoryId == 4)
			categoryText = "其他创新：";
		if(categoryText != "")
		{
			$(pageId).find(".searchTable").css("display","");
			$(pageId).find(".searchTable").find(".searchCategoryName").text(categoryText);
		}
	}
	else if(fieldName == "tailor")
	{
		if(categoryId == 1)
			categoryText = "工艺设计：";
		else if(categoryId == 2)
			categoryText = "工艺生产：";
		else if(categoryId == 3)
			categoryText = "产品快递：";
		else if(categoryId == 4)
			categoryText = "其他产品：";
		if(categoryText != "")
		{
			$(pageId).find(".searchTable").css("display","");
			$(pageId).find(".searchTable").find(".searchCategoryName").text(categoryText);
		}
	}
}

function startSearchProducts()
{
	var typeName = window.localStorage.consumerName;
	var fieldName = window.localStorage.fieldName;
	var pageId = "#" + typeName + "_search_service";
	var categoryId = $(pageId).find(".categoryId").val();
	if(categoryId == ""){
		categoryId = 4;
	}
	var keyword = $(pageId).find(".searchKeyWord").val();
	
	if(fieldName == "travel")//用于私人导游中游客查询旅游服务
	{
		//487是套票（若改成从可信平台获取数据，则将当前注释部分恢复有效，当前有效代码注释掉）
		/*
		if(categoryId == 4)
			categoryId = 478;
		else if(categoryId == 7)
			categoryId = 486;
		else if(categoryId == 6)
			categoryId = 485;
		else if(categoryId == 2)
			categoryId = 488;
		searchProductsFromTrust("education", categoryId, keyword, "", 1, 10);
		*/
		if(categoryId == 2 || categoryId == 6)
		{
			var price = $(pageId).find(".searchPrice").val();
			searchProducts("","",categoryId,"","",keyword,price,1,10);
		}
		else
			searchProducts("","",categoryId,"","",keyword,"",1,10);
	}
	else if(fieldName == "education")//用于云私塾中学生查询课程服务
	{
		if(categoryId == 1)
			categoryId = 480;
		else if(categoryId == 2)
			categoryId = 498;
		else if(categoryId == 3)
			categoryId = 481;
		searchProductsFromTrust(categoryId, keyword, "", 1, 10);
	}
	else if(fieldName == "medical")//用于彩云天使中病人查询医疗服务
	{
		if(categoryId == 1)
			categoryId = 484;
		else if(categoryId == 2)
			categoryId = 482;
		else if(categoryId == 3)
			categoryId = 483;
		searchProductsFromTrust(categoryId, keyword, "", 1, 10);
	}
	else if(fieldName == "media")//用于私媒体
	{
		if(categoryId == 1)
			categoryId = 491;
		else if(categoryId == 2)
			categoryId = 491;
		else if(categoryId == 3)
			categoryId = 491;
		else if(categoryId == 4)
			categoryId = 491;
		searchProductsFromTrust(categoryId, keyword, "", 1, 10);
	}
	else if(fieldName == "shopping")//用于云购物
	{
		if(categoryId == 1)
			categoryId = 493;
		else if(categoryId == 2)
			categoryId = 493;
		else if(categoryId == 3)
			categoryId = 493;
		else if(categoryId == 4)
			categoryId = 493;	
		searchProductsFromTrust(categoryId, keyword, "", 1, 10);
	}
	else if(fieldName == "tailor")//用于私人订制
	{
		if(categoryId == 1)
			categoryId = 493;
		else if(categoryId == 2)
			categoryId = 493;
		else if(categoryId == 3)
			categoryId = 493;
		else if(categoryId == 4)
			categoryId = 493;
		searchProductsFromTrust(categoryId, keyword, "", 1, 10);
	}
}

function changeConsumerInfo()
{
	$("#travellerName").removeAttr("readonly");
	$("#travellerName").val("");
	$("#travellerMobile").removeAttr("readonly");
	$("#travellerMobile").val("");
}

function getProviderName(fieldName, username)
{
	var applyName = "";
	if(fieldName == "travel")
	{
		if(username == "user")
			applyName = "上海旅游中心";
		else if(username == "admin")
			applyName = "上海莫言信息科技有限公司";
	}
	else if(fieldName == "medical")
	{
		if(username == "user")
			applyName = "在线医疗中心";
		else if(username == "admin")
			applyName = "彩云医疗有限公司";
	}
	else if(fieldName == "education")
	{
		if(username == "user")
			applyName = "上海晨鸟科技有限公司";
		else
			applyName = "在线教育中心";
	}
	else if(fieldName == "media")
	{
		if(username == "user")
			applyName = "彩云媒体";
		else
			applyName = "在线媒体中心";
	}
	else if(fieldName == "shopping")
	{
		if(username == "user")
			applyName = "彩云超市";
		else
			applyName = "在线购物中心";
	}
	else if(fieldName == "tailor")
	{
		if(username == "user")
			applyName = "彩云超市";
		else
			applyName = "在线购物中心";
	}
	else{
		Toast("getProviderName参数错误",2000);
		return "";
	}
	return applyName;
}

function getProviderRecordNo(fieldName, username)
{
	var recordNo;
	if(fieldName == "travel")
	{
		if(username == "user")
			recordNo = "E310115201407243124";
		else if(username == "admin")
			recordNo = "E310114201307224677";
	}
	else if(fieldName == "medical")
	{
		if(username == "user")
			recordNo = "E310115201407176041";
		else if(username == "admin")
			recordNo = "E310115201407244104";
	}
	else if(fieldName == "education")
	{
		if(username == "user")
			recordNo = "E310110201407177812";
		else
			recordNo = "E310110201407245866";
	}
	else if(fieldName == "media")
	{
		if(username == "user")
			recordNo = "E310115201408127288";
		else
			recordNo = "E310115201408121790";
	}
	else if(fieldName == "shopping")
	{
		if(username == "user")
			recordNo = "E310115201408102792";
		else
			recordNo = "E310115201408107718";
	}
	else if(fieldName == "tailor")
	{
		if(username == "user")
			recordNo = "E310115201408102792";
		else
			recordNo = "E310115201408107718";
	}
	else{
		Toast("getProviderRecordNo参数错误",2000);
		return "";
	}
	return recordNo;
}

function setCurrentApp(fieldName)
{
	var username = window.localStorage.username;
	window.localStorage.fieldName = fieldName;
	window.localStorage.myCompanyRecordNo = getProviderRecordNo(fieldName, username);
	window.localStorage.myCompanyName = getProviderName(fieldName, username);
	
	if(fieldName == "travel")
	{
		window.localStorage.consumerName = "customer";
		window.localStorage.providerName = "company";
		window.localStorage.operatorName = "hub";
	}
	else if(fieldName == "medical")
	{
		window.localStorage.consumerName = "patient";
		window.localStorage.providerName = "doctor";
		window.localStorage.operatorName = "agent";
	}
	else if(fieldName == "education")
	{
		window.localStorage.consumerName = "student";
		window.localStorage.providerName = "teacher";
		window.localStorage.operatorName = "school";
	}
	else if(fieldName == "media")//私媒体
	{
		window.localStorage.consumerName = "reader";
		window.localStorage.providerName = "writer";
		window.localStorage.operatorName = "editor";
	}
	else if(fieldName == "shopping")
	{
		window.localStorage.consumerName = "buyer";
		window.localStorage.providerName = "shop";
		window.localStorage.operatorName = "market";
	}
	else if(fieldName == "innovation")
	{
		window.localStorage.consumerName = "visitor";
		window.localStorage.providerName = "innovator";
		window.localStorage.operatorName = "expert";
	}
	else if(fieldName == "tailor")
	{
		window.localStorage.consumerName = "buyer";
		window.localStorage.providerName = "shop";
		window.localStorage.operatorName = "tailor";
	}
	else if(fieldName == "trustCloud")
	{
		var src = "http://www.ecdata.org.cn/srv/mProducts.action";
		window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
		return;
	}
	else if(fieldName == "trustWorker")
	{
		window.localStorage.consumerName = "worker";
		window.localStorage.providerName = "shop";
		window.localStorage.operatorName = "tailor";
	}
	else
		return;
	window.location.href = fieldName + ".html#" + window.localStorage.consumerName + "_search_service";
}

function gotoHome()
{
	window.location.href = "index.html#page_buy";
}

/*
function appendHeaderTag(currentPage, userType, type)//userType表示是三种角色中的哪一个，值为1,2,3;type表示该角色下的哪个标签，用于颜色定位，值为1,2,3
{
	var page = $("#" + currentPage);
	var header;
	var fieldName = window.localStorage.fieldName;
	var typeName;
	if(userType == 1)
	{
		typeName = window.localStorage.consumerName;
	}
	else if(userType == 2)
		typeName = window.localStorage.providerName;
	else if(userType == 3)
		typeName = window.localStorage.operatorName;
	else
	{
		Toast("appendHeaderTag参数错误", 3000);
		return;
	}
	header = $("#tagFor" + fieldName + "").find(".headerFor" + typeName).clone(true);
	header.css("display", "");
	
	var aTag = header.find("li")[type - 1].getElementsByTagName("a")[0];
	aTag.setAttribute("class" , aTag.getAttribute("class") + " ui-btn-active ui-state-persist");
	if(page.find(".headerTag").html() == "")//div中间有空格和换行也会被html()识别出来
		page.find(".headerTag").append(header);
}

function appendFooterTag(currentPage, userType)//1,2,3分别表示三种角色
{
	var page = $("#" + currentPage);
	
	var fieldName = window.localStorage.fieldName;
	var footer;
	footer = $("#tagFor" + fieldName + "").find(".footerFor" + fieldName).clone(true);
	footer.css("display", "");
	
	var aTag = footer.find("li")[userType - 1].getElementsByTagName("a")[0];
	aTag.setAttribute("class" , aTag.getAttribute("class") + " ui-btn-active ui-state-persist");
	if(page.find(".footerTag").html() == "")//div中间有空格和换行也会被html()识别出来
		page.find(".footerTag").append(footer);
}

function appendHeaderAndFooter(currentPage, userType, type)
{
	appendHeaderTag(currentPage, userType, type);
	appendFooterTag(currentPage, userType);
	$.mobile.changePage("#" + currentPage);
}
*/

function clearAllUsedInfo()//清除所有使用信息
{
	window.localStorage.publishedTravelPackageId = "";
	window.localStorage.publishedMedicalPackageId = "";
	window.localStorage.publishedEducationPackageId = "";
	window.localStorage.publishedMediaPackageId = "";
	window.localStorage.publishedShoppingPackageId = "";
	window.localStorage.publishedInnovationPackageId = "";
	window.localStorage.username = "";
	window.localStorage.password = "";
	window.localStorage.selectProductCodeList = "";
	window.localStorage.selectProductNameAndPriceList = "";
	window.localStorage.avatorUrl = "";
	window.localStorage.realname = "";
	window.localStorage.mobile = "";
	window.localStorage.email = "";
	window.localStorage.age = "";
	window.localStorage.gender = "";
	window.localStorage.address = "";
	window.localStorage.degree = "";
	window.localStorage.zongjiao = "";
	window.localStorage.interest = "";
	$.mobile.changePage("#page_login");
}

function userLogin()
{
	var username = $("#account").val().trim();
	var password = $("#passwordinput").val().trim();
	if(username == "" || password == "")
	{
		Toast("用户名和密码不能为空", 2000);
		return;
	}
	
	var oldUsername = window.localStorage.username;
	var oldPassword = window.localStorage.password;

	if(oldUsername != undefined && oldUsername != "" && oldPassword != undefined && oldPassword != "")
	{
		if(username == oldUsername && password == oldPassword)
		{
			$.mobile.changePage("#page_buy");
		}
		else
		{
			Toast("用户名或密码错误", 2000);
			$("#passwordinput").val("");
		}
	}
	else
	{
		window.localStorage.username = username;
		window.localStorage.password = password;
		$.mobile.changePage("#page_buy");
	}
}

function loadAccountInfo()
{
	var username = window.localStorage.username;
	var demoTable = $("#user_info_demo").find(".demo_table").clone(true);
	$("#customer_information").find(".container").html("");
	$("#customer_information").find(".container").append(demoTable);
	$("#customer_information").find(".customer_user_name").val(username);
	$("#customer_information").find(".companyName").val(window.localStorage.myCompanyName);
	$("#customer_information").find(".customer_user_password").val("");
	$("#customer_information").find(".customer_user_password_confrim").val("");
	
	if(window.localStorage.travel_msg!=undefined&&window.localStorage.travel_msg!=null){
		$("#travel_msg_input").val(window.localStorage.travel_msg);
	}
	
	$.mobile.changePage("#customer_information");
}

function refreshPassword()
{
	var newPassword = $("#customer_information").find(".customer_user_password").val();
	var reNewPassword = $("#customer_information").find(".customer_user_password_confrim").val();
	if(newPassword != reNewPassword)
		Toast("两次输入的密码不一致", 2000);
	else
	{
		Toast("密码修改成功", 2000);
		window.localStorage.password = newPassword;
	}
	loadAccountInfo();
}

function findMyPassword()
{
	var username = $("#account").val();
	if(username == undefined || username == "")
		Toast("请先输入用户名", 2000);
	else
	{
		if(username == window.localStorage.username)
			Toast("您的密码是" + window.localStorage.password , 3000);
	}
}

function clearAccountInfo()
{
	window.localStorage.username = "";
	window.localStorage.password = "";
	//Toast("尚未提供注册服务", 2000);
}

function loadSoulUpdateDetail(token)
{
	$("#soul_update_detail").find(".container").html("");
	$("#soul_update_detail").find(".update_soulModel").unbind("click");
	var table = $("#soul_update_ul_demo").find(".demo_table_for_soul_update").clone();
	if(token == "app1")
	{
		$("#soul_update_detail").find(".title").text("电子病历");
		table.find(".name").text("血糖指数偏高");
		table.find(".description").text("实时检测数据显示您餐前血糖超过了标准");
		table.find(".details").text("系统诊断疑似糖尿病，建议您持续检测一周进行观察。");
		table.find(".date").text("2015年1月27日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			var oldString = window.localStorage.shengli;
			if(oldString == undefined)
				oldString = "";
			if(oldString.indexOf("血糖") < 0)
				window.localStorage.shengli += "血糖指数较高#";
			Toast("电子病历更新模型成功", 2000);
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "app2")
	{
		$("#soul_update_detail").find(".title").text("购物历史");
		table.find(".name").text("购买服装");
		table.find(".description").text("购买男士衬衫一件");
		table.find(".details").text("颜色：白色；商家：诺奇旗舰店；价格：128元/件；型号：XL；数量：1件。");
		table.find(".date").text("2014年9月14日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			var oldString = window.localStorage.jingli;
			if(oldString == undefined)
				oldString = "";
			window.localStorage.jingli += "曾经购买过衬衫#";
			Toast("购物记录更新模型成功");
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "app3")
	{
		$("#soul_update_detail").find(".title").text("银行记录");
		table.find(".name").text("刷卡消费");
		table.find(".description").text("pos机消费");
		table.find(".details").text("方式：pos支付；支付方：诺奇旗舰店；金额：128元。");
		table.find(".date").text("2014年9月14日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			Toast("银行记录更新模型成功");
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "net1")
	{
		$("#soul_update_detail").find(".title").text("微博数据");
		table.find(".name").text("发表博文");
		table.find(".description").text("大数据时代云服务的应用");
		table.find(".details").text("描述了在当今大数据时代下，云服务的应用与发展。");
		table.find(".date").text("2014年9月15日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			var oldString = window.localStorage.huanjing;
			if(oldString == undefined)
				oldString = "";
			window.localStorage.huanjing += "大数据，云时代#";
			Toast("微博数据更新模型成功");
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "net2")
	{
		$("#soul_update_detail").find(".title").text("qq签名");
		table.find(".name").text("心情语录");
		table.find(".description").text("下雨天心情不好");
		table.find(".details").text("每次下雨，心情都很郁闷，哪都不想去。");
		table.find(".date").text("2014年9月15日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			Toast("qq签名更新模型成功");
			var oldString = window.localStorage.xingge;
			if(oldString == undefined)
				oldString = "";
			window.localStorage.xingge += "不喜欢阴雨天气#";
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "net3")
	{
		$("#soul_update_detail").find(".title").text("百度贴吧");
		table.find(".name").text("帖子评论");
		table.find(".description").text("对大数据时代云服务的看法");
		table.find(".details").text("强烈支持态度，十分赞同这个观点。");
		table.find(".date").text("2014年9月15日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			Toast("百度贴吧更新模型成功");
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "rel1")
	{
		$("#soul_update_detail").find(".title").text("亲属数据关联");
		table.find(".name").text("直系亲属");
		table.find(".description").text("父子关系");
		table.find(".details").text("该彩云阁用户为阁主的父亲。");
		table.find(".date").text("2014年9月15日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			Toast("亲属数据关联更新模型成功");
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "rel2")
	{
		$("#soul_update_detail").find(".title").text("同类数据关联");
		table.find(".name").text("性格同类");
		table.find(".description").text("90后宅男");
		table.find(".details").text("本处可将90后宅男的通用数据用于更新灵魂模型。");
		table.find(".date").text("2014年9月15日");
		$("#soul_update_detail").find(".update_soulModel").click(function(){
			Toast("同类数据关联更新模型成功");
			navigator.app.backHistory();//更新完成后回退一步
		});
	}
	else if(token == "body1")
	{
		$.mobile.changePage("#realtime_health_data_for_soul_update");
		return;
	}
	
	$("#soul_update_detail").find(".container").append(table);
	$("#soul_update_detail").find(".update_soulModel").button();
	$.mobile.changePage("#soul_update_detail");
} 

var interalForMindWave;
function getMindWave()
{
	if(interalForMindWave != undefined)
		clearInterval(interalForMindWave);
	else
	{
		loadMindwave();
		interalForMindWave = setInterval("loadMindwave()", 3000);
	}
}

function updateSoulWithBodyInfo()
{
	if(interalForMindWave != undefined)
		clearInterval(interalForMindWave);
	Toast("实时生理数据更新模型成功", 2000);
	navigator.app.backHistory();//回退一步
}

function userRegister()
{
	$.mobile.changePage("#page_register");
}

function registerNewUser()
{
	//验证表单参数
	var reg_username = $("#reg_username").val();
	var reg_mobile = $("#reg_mobile").val();
	var reg_password = $("#reg_password").val();
	var reg_password_confirm = $("#reg_password_confirm").val();
	//调用Web服务
	cordova.exec(registerSuccess, registerError, 'TravelHubService', 'registerFromCloudStudio',[reg_mobile,reg_password,reg_username]);
}

function registerSuccess(message) {
	if(message[0].result=="true"){
		Toast("注册成功！请使用新账号登陆");
	} else {
		Toast("该手机号已注册，请直接登陆");
	}
	$("#account").val(message[0].mobile);
	$("#passwordinput").val("");
	clearAllUsedInfo();
	$.mobile.changePage("#page_login");
}
function registerError(message) {
	Toast("注册失败！请稍后再试");
}
