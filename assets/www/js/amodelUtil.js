/* 本文件用于处理灵魂模型 */
function handleAnmiaModelError(message)
{
	Toast("操作灵魂模型失败！",2000);
}

function insertConceptDemo()
{
	var concepts = new Array("生理","知识","经历","性格","信念", "环境");
	for(var i = 1; i < 7; i ++)
	{
		insertConcept("text",concepts[i-1],0);
	}
}

function insertConcept(dtype, name, parentConceptId)
{
	cordova.exec(insertConceptSuccess, handleAnmiaModelError, 'AnimaModelService', 'insertConcept',[dtype, name, parentConceptId]);
}

function insertConceptSuccess(message)
{
	if(message == "ok")
		Toast("加入概念成功!",2000);
}

function getConceptById(conceptId)
{
	cordova.exec(getConceptByIdSuccess, handleAnmiaModelError, 'AnimaModelService', 'getConceptById',[conceptId]);
}

function getConceptByIdSuccess(message)
{
	alert(message);
}

function getConceptsByParentId(parentId)
{
	cordova.exec(getConceptsByParentIdSuccess, handleAnmiaModelError, 'AnimaModelService', 'getConceptsByParentId',[parentId]);
}

function getConceptsByParentIdSuccess(message)
{
	if(message == "" || message.length == 0)
	{
		Toast("尚无子概念", 2000);
		return;
	}
	for(var i = 0; i < message.length; i++)
	{
		var concept = message[i];
		alert(concept.name + "---" + concept.parentConcept_id + "---" + concept.id);
	}
}

var stack = [];//栈用于控制返回按钮
function getRelatedConcepts(conceptName)
{
	if(!stack.hasOwnProperty(conceptName))
		stack.push(conceptName);
	var message = "[{'conceptName':'middleConcept1','relation':'relation1'},{'conceptName':'middleConcept2','relation':'relation2'}," +
			"{'conceptName':'middleConcept3','relation':'relation3'}]";
		if(conceptName.indexOf("middle") >= 0)
			message = "[{'conceptName':'lowConcept1','relation':'relation1'},{'conceptName':'lowConcept2','relation':'relation2'}," +
			"{'conceptName':'lowConcept3','relation':'relation3'}]";
		var jsonObject = eval("(" + message + ")");	
		if(jsonObject.length == 0)
		{
			Toast("数据加载失败，请稍后再试!",2000);
			$.mobile.changePage("#page_soul_view");
			return;
		}
		$("#page_concept_display").find(".page_concept_name").text(conceptName);
		var tr = $("#page_concept_display").find(".demo_table").find(".tr_demo");
		$("#page_concept_display").find(".tbody").html("");
		for(var i = 0; i < jsonObject.length; i++)
			{
				(function(arg) {
				var service_item = arg;
				var item = tr.clone(true);
				item.find(".openLink").text(service_item.conceptName);
				item.find(".relation").text(service_item.relation);
				
				item.find(".openLink").click(function() {
					getRelatedConcepts(service_item.conceptName);
				});
			
				$("#page_concept_display").find(".tbody").append(item);
				})(jsonObject[i]);
			}
			$("#page_concept_display").find(".back").unbind("click");
			$("#page_concept_display").find(".back").click(function() {
					var s = stack.pop();
					if(stack.length == 0 || s == undefined)
					{
						$.mobile.changePage("#page_soul_view");
						return;
					}
					else
						getRelatedConcepts(stack.pop());
				});
		//$.mobile.changePage("select.html", "slidedown", true, true);
		$.mobile.changePage("#page_concept_display");
}

//以下内容用于灵魂模型展示的演示
function initSixCyble()
{
	window.localStorage.zhishi = "精通四书五经#精通道德经#精通儒家思想#";
	window.localStorage.shengli = "身高188#体重75公斤#身体强健，擅习武#";
	window.localStorage.xingge = "帝王之术#善于用人#";
	window.localStorage.jingli = "雁门关之战#晋阳起兵#南征北战#玄武门之变#";
	window.localStorage.xinnian = "道家思想#";
	window.localStorage.huanjing = "隋唐英雄#贞观之治#";
}

initSixCyble();//用于演示，演示完需删除
function displayAmodelCyble(cybleName)
{
	if(window.localStorage.zhishi == undefined)
		initSixCyble();
	var contents;
	var conceptName = cybleName + "维度";
	if(cybleName == "知识")
	{
		contents = window.localStorage.zhishi;
	}
	else if(cybleName == "生理")
	{
		contents = window.localStorage.shengli;
	}
	else if(cybleName == "性格")
	{
		contents = window.localStorage.xingge;
	}
	else if(cybleName == "经历")
	{
		contents = window.localStorage.jingli;
	}
	else if(cybleName == "信念")
	{
		contents = window.localStorage.xinnian;
	}
	else if(cybleName == "环境")
	{
		contents = window.localStorage.huanjing;
	}
	$("#page_amodel_cyble_display").find(".page_concept_name").text(conceptName);
	if(contents == undefined || contents == null || contents == "")
	{
		Toast("暂无该纬度信息", 2000);
		return;
	}
	var contentList = contents.split("#");
	$("#page_amodel_cyble_display .container").html("");
	var innerHtml = "";
	for(var i = 0; i < contentList.length; i++)
	{
		if(contentList[i] == "")
			continue;
		innerHtml += "<li><span>" + (i + 1) + "." + contentList[i] + "</span></li>";
	}
	$("#page_amodel_cyble_display .container").html(innerHtml);
	$("#page_amodel_cyble_display").page();//没有这句会报错，动态渲染问题
	$("#page_amodel_cyble_display .container").listview("refresh");
	$.mobile.changePage("#page_amodel_cyble_display");
}

//用于演示的代码结束

function scanCode()
{
	window.plugins.barcodeScanner.scan(  
        function(result) {
        /*
        $.each(result,function(key,value){
        	alert(key + "=" + value);
    	});
        alert("Scanned Code: " + result.text   
                + ". Format: " + result.format  
                + ". Cancelled: " + result.cancelled);
        */
        if(result.cancelled)
        {
        	Toast("取消扫码", 1500);
        	return;
        }
        if(result.text == "")
        {
        	Toast("二维码内容为空", 1500);
        	return;
        }
        if(result.text.indexOf("http") >= 0)
        	openScanCode(result.text);
        else
        {
        	$("#soul_update_detail").find(".container").html(result.text);
        	$("#soul_update_detail").find(".update_soulModel").click(function(){
				Toast("模型更新成功", 2000);
				navigator.app.backHistory();//更新完成后回退一步
			});
			$("#soul_update_detail").find(".title").html("扫码更新模型");
			$("#soul_update_detail").find(".update_soulModel").button();
			$.mobile.changePage("#soul_update_detail");
        }
    }, function(error) {  
        Toast("Scan failed: " + error);  
    });
}

function openScanCode(url)
{
	window.plugins.childBrowser.showWebPage(url, { showLocationBar: true });
}

function encodeText(message) 
{
    window.plugins.barcodeScanner.encode(
            BarcodeScanner.Encode.TEXT_TYPE,
            message,
            function(success) {
                Toast("Encode success: " + success);
            }, function(fail) {
                Toast("Encoding failed: " + fail);
            });
}

function jumpToAmodelPage()
{
	var username = window.localStorage.username;
	window.localStorage.fieldName = "amodel";
	window.location.href = window.localStorage.fieldName + ".html#page_amodel_operation";
}

function openFamilyTree()
{
	initFamily();
	var realname = window.localStorage.realname;
	if(realname == undefined || realname == "")
	{
		Toast("请先设置真实姓名");
		
		return;
	}
	else
	{
		var cur = getPersonByName(realname);
		if(cur == undefined)
		{
			Toast("尚无家族信息");
			removeAllFromFamilyList();
			openAddPersonToFamilyPage();//新增家族成员
			return;
		}
		$('#page_family_tree .main').html($('#page_family_tree .mainModel .topLevel').html());
		var top = getPersonByIndex(0);
		$('#page_family_tree .main .level1_name span').html("<a href='#'>" + top.name + "</a>");
		$('#page_family_tree .main .level1_name span.index_box').html(top.id);
		$('#page_family_tree .main .level1_img img').attr("src", top.image);
					
		var childchain = new Array();
		var person = cur;
		while (person.parent_ID != -1) {
			childchain[childchain.length] = person;
			person = getPersonByIndex(person.parent_ID);
		}
					
		if (childchain.length > 0) {
			childchain.reverse();
		}
					
		for (j = 0; j < childchain.length; j++) {
			var newLevel = create_level(childchain[j]);
			$('#page_family_tree .main').append(newLevel);
		}
					
		var leafLevel = create_leaf_level(childchain[childchain.length - 1]);
		$('#page_family_tree .main').append(leafLevel);
		$.mobile.changePage("#page_family_tree");
	}
}

function openMyAmodel()
{
	var realname = window.localStorage.realname;
	if(realname == undefined || realname == "")
	{
		Toast("请先设置姓名");
		return;
	}
	else
	{
		var person = getPersonByName(realname);
		if(person == undefined)
		{
			Toast("请检查族谱姓名");
			return;
		}
		refreshPersonModelInfo(person);
		$('#page_amodel_detail #setPicPopup .takePic').unbind("click");
		$('#page_amodel_detail #setPicPopup .getFromPhone').unbind("click");
		$('#page_amodel_detail #setPicPopup .takePic').click(function(){
			takePic(1);
		});
		$('#page_amodel_detail #setPicPopup .getFromPhone').click(function(){
			getPicFromPhone(1);
		});
		$.mobile.changePage("#page_amodel_detail");
	}
}

function openAddPersonToFamilyPage()
{
	$("#page_add_family_member .person_image").val("assets/img/person.jpg");
	$("#page_add_family_member .realName").val("");
	$("#page_add_family_member .family_father_tr").css("display", "");
	$("#page_add_family_member .family_order_tr").css("display", "");
	$("#page_add_family_member .family_father").html("");
	$("#page_add_family_member .family_order").html("");
	$("#page_add_family_member .family_level").html("");
	if(getMaxLevel() == 0)
	{
		$("#page_add_family_member .family_father_tr").css("display", "none");
		$("#page_add_family_member .family_level").append("<option value='1'>第1代</option>");
		$("#page_add_family_member .family_order_tr").css("display", "none");
	}
	else
	{
		var optionHtml = "<option value='0'>请选择辈分</option>";
		for(var i = 1; i <= getMaxLevel(); i++)
		{
			optionHtml += "<option value=' " + (i + 1) + "'>第"+ (i + 1) + "代</option>";
		}
		
		$("#page_add_family_member .family_level").html(optionHtml);
		$("#page_add_family_member .family_father").html("<option value='0'>请选择父亲名讳</option>");
	}
	$("#page_add_family_member img").attr("src", "assets/img/person.jpg");
	$.mobile.changePage("#page_add_family_member");
}

function setFamilyFather(level)
{
	var prePersons = getPreLevelPersons(level);
	if(prePersons.length == 0)
	{
		$("#page_add_family_member .family_father_tr").css("display", "none");
		return;
	}
	var optionHtml = "<option value='0'>请选择父亲名讳</option>";
	for(var i = 0; i < prePersons.length; i++)
	{
		var person = prePersons[i];
		optionHtml += "<option value='" + person.id + "'>"+ person.name + "</option>";
	}
	$("#page_add_family_member .family_father").html(optionHtml);
	$.mobile.changePage("#page_add_family_member");
}

function exportAmodel()
{
	Toast("已保存到手机", 2000);
}

function printAmodel()
{
	Toast("成功发送打印指令", 2000);
}

function addToFamilyTree()
{
	var image = $("#page_add_family_member .person_image").val();
	var name = $("#page_add_family_member .realName").val();
	var parentId = $("#page_add_family_member .family_father option:selected").val();
	var level = $("#page_add_family_member .family_level option:selected").val();
	var order = $("#page_add_family_member .family_order").val();
	
	var id = getMaxPersonId() + 1;
	var addedPerson = new Person(id, level, order, parentId, name, image);
	if(addedPerson != null && addedPerson != undefined)
	{
		addToFamilyList(addedPerson);
		openFamilyTree();
	}
}

function setPhotoInAddPersonSuccess(message)
{
	hideLoadingDiv();
	$("#page_add_family_member img").attr("src", message);
	$("#page_add_family_member .person_image").val(message);
}