var arr_gender = ["男","女"];
var arr_salary = ["高水平","中等水平","低水平"];
var arr_mood = [":-)",":-|",":-("];
var arr_stamina = ["非常好","正常","较差"];
function loadPersonalizeData(){
	refreshData();
	document.location.href = "#basic_travel_data";
}
function refreshData() {
	var show=$("#basic_travel_data div:jqmData(role='content')");
	
	show.find("#travel_data_gender").text(window.localStorage.travel_data_gender);
	show.find("#travel_data_salary").text(window.localStorage.travel_data_salary);
	show.find("#travel_data_mood").text(window.localStorage.travel_data_mood);
	show.find("#travel_data_stamina").text(window.localStorage.travel_data_stamina);
	
	show.find("#travel_data_age").text(window.localStorage.travel_data_age);
	show.find("#travel_data_hobby").text(window.localStorage.travel_data_hobby);
	show.find("#travel_data_history").text(window.localStorage.travel_data_history);
	show.find("#travel_data_health").text(window.localStorage.travel_data_health);	
	show.find("#travel_data_illness").text(window.localStorage.travel_data_illness);
}
function modifyData(){
	$("#travel_gender_input option").each(function(i,e){
	  if($(e).text()==window.localStorage.travel_data_gender){
	    $(e).val("selected",true);
	    return false;
	  }
	});
	$("#travel_salary_input option").each(function(i,e){
	  if($(e).text()==window.localStorage.travel_data_salary){
	    $(e).attr("selected",true);
	    return false;
	  }
	});
	$("#travel_mood_input option").each(function(i,e){
	  if($(e).text()==window.localStorage.travel_data_mood){
	    $(e).attr("selected",true);
	    return false;
	  }
	});
	$("#travel_stamina_input option").each(function(i,e){
	  if($(e).text()==window.localStorage.travel_data_stamina){
	    $(e).attr("selected",true);
	    return false;
	  }
	});
	
	$("#travel_age_input").val(window.localStorage.travel_data_age);
	$("#travel_hobby_input").val(window.localStorage.travel_data_hobby);
	$("#travel_history_input").val(window.localStorage.travel_data_history);
	$("#travel_health_input").val(window.localStorage.travel_data_health);
	$("#travel_illness_input").val(window.localStorage.travel_data_illness);
	document.location.href = "#travel_data_user_input";
}
function saveData(){
	window.localStorage.travel_data_gender = $("#travel_gender_input option:selected").text()
	window.localStorage.travel_data_salary = $("#travel_salary_input option:selected").text()
	window.localStorage.travel_data_mood = $("#travel_mood_input option:selected").text()
	window.localStorage.travel_data_stamina = $("#travel_stamina_input option:selected").text()
	
	window.localStorage.travel_data_age = $("#travel_age_input").val();
	window.localStorage.travel_data_hobby = $("#travel_hobby_input").val();
	window.localStorage.travel_data_history = $("#travel_history_input").val();
	window.localStorage.travel_data_health = $("#travel_health_input").val();
	window.localStorage.travel_data_illness = $("#travel_illness_input").val();
	refreshData();
	document.location.href = "#basic_travel_data";
}
function addComment(productId, comment){
	if(!window.localStorage.travel_product_comments){
		var productComments = [];
		window.localStorage.travel_product_comments = JSON.stringify(productComments);
	}
	storageComments = JSON.parse(window.localStorage.travel_product_comments);
	if(!storageComments[productId] || !(storageComments[productId] instanceof Array)){
		storageComments[productId] = new Array();
	}
	storageComments[productId][storageComments[productId].length] = comment;
	window.localStorage.travel_product_comments = JSON.stringify(storageComments);
	
}
function readComments(productId){
	if(!window.localStorage.travel_product_comments){
		var productComments = [];
		window.localStorage.travel_product_comments = JSON.stringify(productComments);
	}
	commentsResult = JSON.parse(window.localStorage.travel_product_comments)[productId];
	if(!commentsResult || !(commentsResult instanceof Array)){
		commentsResult = new Array();
	}
	return commentsResult;
}
var subjectDict = [
	"I","me"
];
var hobbyPredDict = [
	"like","love","prefer"
];
var moodPredDict = [
	"am","feel","feeling"
];
var healthPredDict = [
	"am","feel","feeling","get","got","have","had"
];
var hobbyObjDict = [
	"swimming","running","climbing","basketball","football","badminton","history"
];
var moodObjDict = [
	[],
	["happy","interesting"],
	["ok"],
	["sad","disappoint"]
];
var healthObjDict = [
	"headache","stomachache","cold","cough"
];
function updateMsg(){
	if(window.localStorage.travel_msg==undefined||window.localStorage.travel_msg==null){
		window.localStorage.travel_msg="";
	}
	if($("#travel_msg_input").val()!=""){
		window.localStorage.travel_msg = $("#travel_msg_input").val();
		updateUserModelByText(window.localStorage.travel_msg);
		alert("更新成功！");
	}
}
function updateUserModelByText(sometext){
	$.ajax(
	{
		url:"http://175.186.105.207:8080/SyntacticRelationExtraction/servlet/ExtractionServlet",
		type:"GET",
		async:true,
		dataType:"json",
		data:{text:sometext},
		success:function(result){
			var newHobby = new Array();
			var newMood = "";
			var newHealth = new Array();
			for(var i = 0; i < result.length; i++){
				//check if it is about user self
				console.log("check subject: "+i);
				var inSubjectDict = false;
				for(var j = 0; j < subjectDict.length; j++){
					if(result[i].subject && result[i].subject.name == subjectDict[j]){
						inSubjectDict = true;
						break;
					}
				}
				if(!inSubjectDict){
					console.log("not concerned sentence");
					continue;
				}
				
				for(var j = 0; j < hobbyPredDict.length; j++){
					console.log("check predicate for hobby: "+result[i].predicate);
					if(result[i].predicate == hobbyPredDict[j] 
						&& result[i].object && result[i].object.name!=null && result[i].object.name!=""){
						//if predictate meet, then check object
						console.log("valid hobby pred");
						for(var k = 0; k < hobbyObjDict.length; k++){
							if(result[i].object.name == hobbyObjDict[k]){
								//if object meet, then add it to user model
								console.log("valid hobby obj");
								newHobby[newHobby.length] = result[i].object.name;
							}
						}
					}
				}
				for(var j = 0; j < moodPredDict.length; j++){
					console.log("check predicate for mood: "+result[i].predicate);
					if(result[i].predicate == moodPredDict[j] 
						&& result[i].object && result[i].object.name!=null && result[i].object.name!=""){
						//if predictate meet, then check object
						console.log("valid mood pred");
						for(var k = 0; k < moodObjDict.length; k++){
							for(var l = 0; l<moodObjDict[k].length; l++){
								if(result[i].object.name == moodObjDict[k][l]){
									//if object meet, then add it to user model
									console.log("valid mood obj");
									newMood = k;
									break;
								}
							}
						}
					}
				}
				for(var j = 0; j < healthPredDict.length; j++){
					console.log("check predicate for health: "+result[i].predicate);
					if(result[i].predicate == healthPredDict[j] 
						&& result[i].object && result[i].object.name!=null && result[i].object.name!=""){
						//if predictate meet, then check object
						console.log("valid health pred");
						for(var k = 0; k < healthObjDict.length; k++){
							if(result[i].object.name == healthObjDict[k]){
								//if object meet, then add it to user model
								console.log("valid health obj");
								newHealth[newHealth.length] = result[i].object.name;
							}
						}
					}
				}
			}
			//update hobby
			if(window.localStorage.travel_data_hobby==undefined||window.localStorage.travel_data_hobby==null){
				window.localStorage.travel_data_hobby="";
			}
			var hobbyArr = window.localStorage.travel_data_hobby
				.replace(/，/g,",")
				.replace(/\s/g,"")
				.split(",")
				.concat(newHobby);
			window.localStorage.travel_data_hobby = removeDuplicate(hobbyArr).toString();
			//update health
			if(window.localStorage.travel_data_health==undefined||window.localStorage.travel_data_health==null){
				window.localStorage.travel_data_health="";
			}
			var healthArr = window.localStorage.travel_data_health
				.replace(/，/g,",")
				.replace(/\s/g,"")
				.split(",")
				.concat(newHealth);
			window.localStorage.travel_data_health = removeDuplicate(healthArr).toString();
			//update mood
			var moodVal = $("#travel_mood_input option[value="+newMood+"]").text()
			if(moodVal!="请选择" && moodVal!=""){
				window.localStorage.travel_data_mood = moodVal;
			}
			//refresh data
			refreshData();
			Toast('数据已更新',3000);
			//alert("update hobby: "+newHobby);
			//alert("update mood: "+newMood);
			//alert("update health: "+newHealth);
		}
	});
}

function removeDuplicate(arr){
	arr.sort();
	var re=[arr[0]];
	for(var i = 1; i < arr.length; i++)
	{
		if(arr[i] !== re[re.length-1])
		{
			re.push(arr[i]);
		}
	}
	var checkedRe = [];
	for(var i = 0; i < re.length; i++){
		if(re[i] != null && re[i] != ""){
			checkedRe.push(re[i]);
		}
	}
	return checkedRe;
}
