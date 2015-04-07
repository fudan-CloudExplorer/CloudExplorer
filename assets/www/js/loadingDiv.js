var loading_div;  //用于显示正在加载
function showLoadingDiv(loadingString)
{
	if(loadingString == undefined || loadingString == "")
		loadingString = "正在努力加载";
	loading_div = document.createElement('div'); 
	loading_div.innerHTML = '<img src="assets/img/loading.gif" onclick="hideLoadingDiv()"></img><br>' + loadingString;  
    loading_div.style.cssText="background:#000; opacity:0.6; color:#fff; text-align:center; border-radius:5px; position:fixed; top:45%; left:35%; z-index:999999;";  

    document.body.appendChild(loading_div);  
    ShowMark();
}

function hideLoadingDiv()
{
	if(loading_div != undefined && loading_div != "")
	{
		HideMark();
		document.body.removeChild(loading_div);
		loading_div = "";
	}
}
//显示蒙灰层  
function ShowMark() {  
    var xp_mark = document.getElementById("xp_mark");  
    if (xp_mark != null) {  
        //设置DIV  
        xp_mark.style.left = 0 + "px";  
        xp_mark.style.top = 0 + "px";  
        xp_mark.style.position = "absolute";  
        xp_mark.style.backgroundColor = "#fff";  
        xp_mark.style.zIndex = "1";  
        if (document.all) {  
            xp_mark.style.filter = "alpha(opacity=50)";  
            var Ie_ver = navigator["appVersion"].substr(22, 1);  
            if (Ie_ver == 6 || Ie_ver == 5) { hideSelectBoxes(); }  
        }  
        else { xp_mark.style.opacity = "0.6"; }  
        xp_mark.style.width = "100%";  
        xp_mark.style.height = "100%";  
        xp_mark.style.display = "block";  
    }  
    else {  
        //页面添加div explainDiv,注意必须是紧跟body 内的第一个元素.否则IE6不正常.  
        $("body").prepend("<div id='xp_mark' style='display:none;'></div>");  
        ShowMark(); //继续回调自己  
    }  
}  
  
//隐藏蒙灰层  
function HideMark() {  
    var xp_mark = document.getElementById("xp_mark");  
    xp_mark.style.display = "none";  
    var Ie_ver = navigator["appVersion"].substr(22, 1);  
    if (Ie_ver == 6 || Ie_ver == 5) { showSelectBoxes(); }  
}  


