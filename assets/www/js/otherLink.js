
function openBaiduBaike(keyword) {
       var src = "http://baike.baidu.com/search/word?pic=1&sug=1&enc=utf-8&word=" + encodeURI(keyword);
       window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
    }

function openChenNiaoTest(tag){
	var src="http://192.168.191.1:8083/238_15/";
	if(tag==2)
		src="http://192.168.191.1:8082/239_15/";
	if(tag==3)
		src="http://192.168.191.1:808/236_15/"
	window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
}

function openTourTrust(keyword) {//查询该产品相关的列表信息
	
	var src = "http://tour.ecdata.org.cn/srv/productListPage.jsp?simpleQueryText=" + encodeURI(keyword);
	window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
    }
 
function openCompanyTrust(keyword) {//查询主体信息（企业）
	var src = "http://tour.ecdata.org.cn/showTrustworthiness?comName=" + encodeURI(keyword);
	window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
    }
    
function openProductTrust(keyword) {//查询客体信息（产品）
	var src = "http://tour.ecdata.org.cn/showReputation?productName=" + encodeURI(keyword);
	window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
    }
    
function openProductTrustById(templateId,draftId)//打开手机版产品可信信息查询页面
{
	if(draftId == 622)
		draftId = 8343;
	var src = "http://www.ecdata.org.cn/srv/mobile/mProduct.jsp?id=" + draftId;
	window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
}

function openCompanyTrustByNo(recordNo)//打开手机版企业可信信息查询页面
{
	var src = "http://www.ecdata.org.cn/srv/viewCompany.action?recordNo=" + recordNo;
	window.plugins.childBrowser.showWebPage(src, { showLocationBar: true });
}