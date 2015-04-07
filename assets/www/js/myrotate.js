var angle=0, timer;
function rotate(){
   angle++;
   if(angle > 360){
      angle -= 360;
      clearInterval(timer);
      setTimeout(doRotate, 3000);
   }
   var obj = document.getElementById("routateImage");
   if(navigator.userAgent.indexOf("MSIE") == -1)
   {               
   		obj.style.cssText = "-moz-transform:rotate(" + angle + "deg);-webkit-transform:rotate(" + angle + "deg);transform:rotate(" + angle + "deg);";
   }
   else
   { 
    	var r = Math.PI/180*angle, M11 = Math.cos(r), M12 = Math.sin(r);          
    	obj.style.cssText = "filter:progid:DXImageTransform.Microsoft.Matrix(M11=" + M11 + ",M12=" + (-M12) + ",M21=" + M12 + ",M22=" + M11 + ",SizingMethod='auto expand');";
        obj.style.left = obj.style.top = -Math.round((Math.abs(M11*378) + Math.abs(M12*378)-378)/2) + "px";
   }
}
function doRotate(){
   timer = setInterval(rotate,50);
}
