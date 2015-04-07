
/**  
 * 添加  
 * @param {Object} object  
 */  
function addToFamilyList(object) {
	for(var i = 0; i < familyList.length; i ++)
	{
		if(object.id == familyList[i].id)
		{
			Toast("添加失败");
			return -1;
		}
	}
	familyList[familyList.length] = object;
	return 1;
}  
  
/**   
 * 移除此列表中指定位置上的元素。   
 * @param index 指定位置   
 * @return 此位置的元素   
 */  
function removeFromFamilyListByIndex(index) {  
	var object = this.familyList[index];  
	this.familyList.splice(index, 1);  
	return object;  
}
  
/**   
 * 移除此列表中指定元素。   
 * @param object 指定元素   
 * @return 此位置的元素   
 */  
function removeFromFamilyList(object) {  
	var i = 0;  
	for (; i < familyList.length; i++) {  
		if (familyList[i] === object) {  
			break;  
		}  
	}  
	if (i >= familyList.length) {  
		return null;  
	} else {  
		return removeFromFamilyListByIndex(i);  
	}  
}  
  
/**   
 * 获得列表中指定元素。   
 * @param object 指定元素   
 * @return 此位置的元素   
 */  
function getPersonByIndex(index) {
	return familyList[index];
}    
  
/**   
 * 移除此列表中的所有元素。   
 */    
function removeAllFromFamilyList() {    
	familyList.splice(0, familyList.length);    
}  
  
/**   
 * 返回此列表中的元素数。   
 * @return 元素数量   
 */    
function sizeOfFamilyList () {    
	return this.familyList.length;    
}

/**   
 *  如果列表不包含元素，则返回 true。   
 * @return true or false   
 */    
function isFamilyListEmpty() {    
	return familyList.length == 0;    
}

function getPersonByName(realname)
{
	for(var i = 0; i < familyList.length; i ++)
	{
		if(getPersonByIndex(i).name == realname)
			return getPersonByIndex(i);
	}
	return undefined;
}

function Person(id, level, order, parent_ID, name, image){
	this.id = id;//id
	this.level = level;//所处的层次（代）
	this.order = order;//该代排行第几
	this.parent_ID = parent_ID;//父亲的id
	this.name = name;//名字
	this.image = image;//图片
}

function getMaxPersonId()
{
	if(familyList == null || familyList == undefined)
		return 0;
	else
		return familyList.length - 1;
}

function getMaxLevel()
{
	if(familyList == null || familyList == undefined || familyList.length == 0)
		return 0;
	var level = 1;
	
	for(var i = 0; i < familyList.length; i++)
	{
		if(parseInt(familyList[i].level) > level)
			level = parseInt(familyList[i].level);
	}
	return level;
}

function getPreLevelPersons(level)
{	
	var prePresons = new Array();
	if(familyList == null || familyList == undefined || familyList.length == 0 || level == undefined || level < 2)
		return prePresons;
	for(var i = 0; i < familyList.length; i++)
	{
		if(familyList[i].level == (level - 1))
			prePresons[prePresons.length] = familyList[i];
	}
	return prePresons;
}

function getMaxOrderByParentId(parentId)
{
	var order = 0;
	if(familyList == null || familyList == undefined || familyList.length == 0 || level == undefined || level < 2)
		return order;
	for(var i = 0; i < familyList.length; i++)
	{
		var member = familyList[i];
		if(member.parent_ID == parentId)
		{
			if(member.order > order)
				order = member.order;
		}
	}
	return order;
}

function updatePersonById(id, properties, values)
{
	for(var i = 0; i < familyList.length; i++)
	{
		var person = familyList[i];
		if(person.id == id)
		{
			for(var j = 0; j < properties.length; j ++)
			{
				var property = properties[j];
				var value = values[j];
				if(property == "" || value == "")
					continue;
				if(property == "name")
					person.name = value;
				else if(property == "image")
					person.image = value;
				familyList[i] = person;
				continue;
			}
		}
	}
}

var familyList = null;
var imageFolder = "assets/img/";
function initFamily()
{
	if(familyList != null && familyList != undefined && familyList.length > 0)
	{//表示已存在，不用继续生成familyList
		return;
	}
	familyList = new Array();
	addToFamilyList(new Person(0, 1, 1, -1, "李渊", imageFolder + "person.jpg"));
	addToFamilyList(new Person(1, 2, 1, 0, '李建成', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(2, 2, 2, 0, '李世民', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(3, 2, 3, 0, '李元吉', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(4, 2, 4, 0, '李元霸', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(5, 3, 1, 1, '李承宗', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(6, 3, 2, 1, '李承道', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(7, 3, 3, 1, '李承德', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(8, 3, 4, 1, '李承训', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(9, 3, 5, 1, '李承明', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(10, 3, 6, 1, '李承义', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(11, 3, 1, 2, '李承乾', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(12, 3, 2, 2, '李宽', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(13, 3, 3, 2, '李恪', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(14, 3, 4, 2, '李泰', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(15, 3, 5, 2, '李祐', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(16, 3, 6, 2, '李愔', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(17, 3, 7, 2, '李恽', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(18, 3, 8, 2, '李贞', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(19, 3, 9, 2, '李治', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(20, 3, 10, 2, '李慎', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(21, 3, 11, 2, '李嚣', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(22, 3, 12, 2, '李简', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(23, 3, 13, 2, '李福', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(24, 3, 14, 2, '李明', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(25, 3, 1, 3, '李承业', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(26, 3, 2, 3, '李承鸾', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(27, 3, 3, 3, '李承奖', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(28, 3, 4, 3, '李承裕', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(29, 3, 5, 3, '李承度', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(30, 4, 1, 19, '李忠', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(31, 4, 2, 19, '李孝', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(32, 4, 3, 19, '李上金', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(33, 4, 4, 19, '李素节', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(34, 4, 5, 19, '李弘', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(35, 4, 6, 19, '李贤', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(36, 4, 7, 19, '李显', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(37, 4, 8, 12, '李旦', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(38, 5, 1, 36, '李重润', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(39, 5, 2, 36, '李重福', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(40, 5, 3, 36, '李重福', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(41, 5, 4, 36, '李重俊', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(42, 5, 5, 36, '李重茂', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(43, 5, 1, 37, '李成器', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(44, 5, 2, 37, '李成义', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(45, 5, 3, 37, '李隆基', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(46, 5, 4, 37, '李隆范', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(47, 5, 5, 37, '李隆业', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(48, 5, 6, 37, '李隆悌', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(49, 6, 1, 45, '李琮', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(50, 6, 2, 45, '李瑛', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(51, 6, 3, 45, '李亨', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(52, 6, 4, 45, '李琰', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(53, 6, 5, 45, '李瑶', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(54, 6, 6, 45, '李琬', imageFolder + 'person.jpg'));
	addToFamilyList(new Person(55, 6, 7, 45, '李琚', imageFolder + 'person.jpg'));
}

function create_level(current) {
	var newLevel = $("#page_family_tree .amodel").clone(true);
	$(newLevel).css("display", "block");
	$(newLevel).attr("class", "level level" + (parseInt(current.level)));

	var id = current.id;
	var older_ID = 0;
	var younger_ID = 0;
	for (i = id - 1; i > 0; i--) {
		if (getPersonByIndex(i).parent_ID == current.parent_ID) {
			older_ID = i;
			break;
		}
	}
	
	for (i = parseInt(id) + 1; i < sizeOfFamilyList(); i++) {
		if (getPersonByIndex(i).parent_ID == current.parent_ID) {
			
			younger_ID = i;
			
			break;
		}
	}
	
	var level = 0;
	var total = 0;
	for (i = 0; i < sizeOfFamilyList(); i++) {
		if (getPersonByIndex(i).parent_ID == current.parent_ID) {
			level = getPersonByIndex(i).level;
			total++;
		}
	}
	
	newLevel.children(".desc").children().first().html("第 " + level + " 代");
	newLevel.children(".desc").children().last().html("共 " + total + " 人");
	
	newLevel.children(".level_box").children().first().css("visibility", "visible");
	newLevel.children(".level_box").children().eq(1).css("visibility", "visible");
	newLevel.children(".level_box").children().last().css("visibility", "visible");
	newLevel.children(".change.left").css("visibility", "visible");
	newLevel.children(".change.right").css("visibility", "visible");

	newLevel.children(".level_box").children().eq(1).attr("class", "big box");
	newLevel.children(".level_box").children().eq(1).children(".line").css("height", "25%");
	newLevel.children(".level_box").children().last().attr("class", "small_right small box");
	newLevel.children(".level_box").children().last().children(".line").css("height", "65%");
	newLevel.children(".level_box").children().last().children(".line").css("width", "168%");
	newLevel.children(".level_box").children().first().attr("class", "small_left small box");
	newLevel.children(".level_box").children().first().children(".line").css("height", "65%");
	newLevel.children(".level_box").children().first().children(".line").css("width", "168%");
	
	newLevel.children(".level_box").children().eq(1).children(".normal_name").find('span').html("<a href='#'>" + current.name + "</a>");
	newLevel.children(".level_box").children().eq(1).children(".normal_name").children('span.index_box').first().html(current.id);
	newLevel.children(".level_box").children().eq(1).children(".normal_img").children('img').attr("src", current.image);
	if (older_ID > 0) {
		var older = getPersonByIndex(older_ID);
		
		newLevel.children(".level_box").children().first().children(".normal_name").children('span').first().html(older.name);
		newLevel.children(".level_box").children().first().children(".normal_name").children('span.index_box').first().html(older.id);
		newLevel.children(".level_box").children().first().children(".normal_img").children('img').attr("src", older.image);
	}
	else {
		newLevel.children(".level_box").children().first().css("visibility", "hidden");
		newLevel.children(".change.left").css("visibility", "hidden");
	}
	if (younger_ID > 0) {
		var younger = getPersonByIndex(younger_ID);
		
		newLevel.children(".level_box").children().last().children(".normal_name").children('span').first().html(younger.name);
		newLevel.children(".level_box").children().last().children(".normal_name").children('span.index_box').first().html(younger.id);
		newLevel.children(".level_box").children().last().children(".normal_img").children('img').attr("src", younger.image);
	}
	else {
		newLevel.children(".level_box").children().last().css("visibility", "hidden");
		newLevel.children(".change.right").css("visibility", "hidden");
	}
	return newLevel;
}

function create_leaf_level(cur) {
	var leafLevel = $("#page_family_tree .amodel").clone(true);
	$(leafLevel).css("display", "block");
	$(leafLevel).attr("class", "level level" + (parseInt(cur.level) + 1));
	var temp = 0;
	var childlist = new Array();
	for (i = 0; i < sizeOfFamilyList(); i++) {
		if (getPersonByIndex(i).parent_ID == cur.id) {
			childlist[temp] = i;
			temp++;
			if (temp >= 3) {
				break;
			}
		}
	}
	
	$('#page_family_tree .level' + cur.level).children(".level_box").children().eq(1).find(".upper_middle_line").css("display", "none");
	
	var level = 0;
	var total = 0;
	for (i = 0; i < sizeOfFamilyList(); i++) {
		if (getPersonByIndex(i).parent_ID == cur.id) {
			level = getPersonByIndex(i).level;
			total++;
		}
	}
	if(level == 0)
		level = parseInt(cur.level) + 1;
	leafLevel.children(".desc").children().first().html("第 " + level + " 代");
	leafLevel.children(".desc").children().last().html("共 " + total + " 人");

	leafLevel.children(".change.left").css("visibility", "visible");
	leafLevel.children(".change.right").css("visibility", "visible");
	
	if (childlist.length == 0) {
		for (i = 0; i < 3; i++) {
			leafLevel.children(".level_box").children().eq(i).css("visibility", "hidden");
		}
		leafLevel.children(".change.left").css("visibility", "hidden");
		leafLevel.children(".change.right").css("visibility", "hidden");
	}
	
	else if (childlist.length == 1) {
		leafLevel.children(".level_box").children().eq(0).attr("class", "normal box");
		leafLevel.children(".level_box").children().eq(2).attr("class", "normal box");
		leafLevel.children(".level_box").children().eq(0).css("visibility", "hidden");
		leafLevel.children(".level_box").children().eq(2).css("visibility", "hidden");
		leafLevel.children(".level_box").children().eq(1).css("visibility", "visible");
		leafLevel.children(".level_box").children().eq(1).attr("class", "normal box");
		leafLevel.children(".level_box").children().eq(1).find('span').html(getPersonByIndex(childlist[0]).name);
		leafLevel.children(".level_box").children().eq(1).find('span.index_box').html(getPersonByIndex(childlist[0]).id);
		leafLevel.children(".level_box").children().eq(1).find('img').attr("src", getPersonByIndex(childlist[0]).image);
		leafLevel.children(".change.left").css("visibility", "hidden");
		leafLevel.children(".change.right").css("visibility", "hidden");
	}
	
	else if (childlist.length == 2) {
		$('#page_family_tree .level' + cur.level).children(".level_box").children().eq(1).find(".upper_middle_line").css("display", "block");
		leafLevel.children(".level_box").children().eq(1).attr("class", "normal box");
		leafLevel.children(".level_box").children().eq(1).css("visibility", "hidden");
		leafLevel.children(".level_box").children().eq(0).css("visibility", "visible");
		leafLevel.children(".level_box").children().eq(0).attr("class", "normal box");
		leafLevel.children(".level_box").children().eq(0).find('span').html(getPersonByIndex(childlist[0]).name);
		leafLevel.children(".level_box").children().eq(0).find('span.index_box').html(getPersonByIndex(childlist[0]).id);
		leafLevel.children(".level_box").children().eq(0).find('img').attr("src", getPersonByIndex(childlist[0]).image);
		leafLevel.children(".level_box").children().eq(2).css("visibility", "visible");
		leafLevel.children(".level_box").children().eq(2).attr("class", "normal box");
		leafLevel.children(".level_box").children().eq(2).find('span').html(getPersonByIndex(childlist[1]).name);
		leafLevel.children(".level_box").children().eq(2).find('span.index_box').html(getPersonByIndex(childlist[1]).id);
		leafLevel.children(".level_box").children().eq(2).find('img').attr("src", getPersonByIndex(childlist[1]).image);
	}
	
	else if (childlist.length == 3) {
		for (i = 0; i < 3; i++) {
			leafLevel.children(".level_box").children().eq(i).css("visibility", "visible");
			leafLevel.children(".level_box").children().eq(i).attr("class", "normal box");
			leafLevel.children(".level_box").children().eq(i).find('span').html(getPersonByIndex(childlist[i]).name);
			leafLevel.children(".level_box").children().eq(i).find('span.index_box').html(getPersonByIndex(childlist[i]).id);
			leafLevel.children(".level_box").children().eq(i).find('img').attr("src", getPersonByIndex(childlist[i]).image);
		}
	}
	else{
		
	}
	
	return leafLevel;
}

$(document).on("click", '.box',  function() {
	var id = $(this).children('div').last().children('span.index_box').html();
	if (id == 0) {
		return;
	}
	var cur = getPersonByIndex(id);
	var older_ID = 0;
	var younger_ID = 0;
	for (i = id - 1; i > 0; i--) {
		if (getPersonByIndex(i).parent_ID == cur.parent_ID) {
			older_ID = i;
			break;
		}
	}
	
	for (i = parseInt(id) + 1; i < sizeOfFamilyList(); i++) {
		if (getPersonByIndex(i).parent_ID == cur.parent_ID) {
			
			younger_ID = i;
			
			break;
		}
	}
	
	$(this).parent().children('div').first().css("visibility", "visible");
	$(this).parent().children('div').eq(1).css("visibility", "visible");
	$(this).parent().children('div').last().css("visibility", "visible");
	$(this).parent().parent().children(".change.left").css("visibility", "visible");
	$(this).parent().parent().children(".change.right").css("visibility", "visible");
	
	$(this).parent().children('div').eq(1).attr("class", "big box");
	$(this).parent().children('div').eq(1).children(".line").css("height", "25%");
	$(this).parent().children('div').last().attr("class", "small_right small box");
	$(this).parent().children('div').last().children(".line").css("height", "65%");
	$(this).parent().children('div').last().children(".line").css("width", "168%");
	$(this).parent().children('div').first().attr("class", "small_left small box");
	$(this).parent().children('div').first().children(".line").css("height", "65%");
	$(this).parent().children('div').first().children(".line").css("width", "168%");
	$(this).parent().children('div').eq(1).children(".normal_name").find('span').html("<a href='#'>" + cur.name + "</a>");
	$(this).parent().children('div').eq(1).children(".normal_name").children('span.index_box').first().html(cur.id);
	$(this).parent().children('div').eq(1).children(".normal_img").children('img').attr("src", cur.image);
	if (older_ID > 0) {
		var older = getPersonByIndex(older_ID);
		
		$(this).parent().children('div').first().children(".normal_name").children('span').first().html(older.name);
		$(this).parent().children('div').first().children(".normal_name").children('span.index_box').first().html(older.id);
		$(this).parent().children('div').first().children(".normal_img").children('img').attr("src", older.image);
	}
	else {
		$(this).parent().children('div').first().css("visibility", "hidden");
		$(this).parent().parent().children(".change.left").css("visibility", "hidden");
	}
	if (younger_ID > 0) {
		var younger = getPersonByIndex(younger_ID);
		
		$(this).parent().children('div').last().children(".normal_name").children('span').first().html(younger.name);
		$(this).parent().children('div').last().children(".normal_name").children('span.index_box').first().html(younger.id);
		$(this).parent().children('div').last().children(".normal_img").children('img').attr("src", younger.image);
	}
	else {
		$(this).parent().children('div').last().css("visibility", "hidden");
		$(this).parent().parent().children(".change.right").css("visibility", "hidden");
	}
	
	
	var num = $('#page_family_tree .main').children().length;
	for (i = parseInt(cur.level) + 1 ; i <= num; i++) {
		
		$('#page_family_tree .level' + i).remove();
	}
	
	var newleafLevel = create_leaf_level(cur);
	$('#page_family_tree .main').append(newleafLevel);
	
	$.scrollTo('#page_family_tree .level' + cur.level, 800);

});

$(document).on("click", '.change',  function() {
	var id;
	if ($(this).hasClass('left')) {
		id = $(this).parent().children('.level_box').children().first().find('span.index_box').html();
	}
	
	else if ($(this).hasClass('right')) {
		id = $(this).parent().children('.level_box').children().last().find('span.index_box').html();
	}
	if (id == 0) {
		return;
	}
	var cur = getPersonByIndex(id);
	var older_ID = 0;
	var younger_ID = 0;
	for (i = id - 1; i > 0; i--) {
		if (getPersonByIndex(i).parent_ID == cur.parent_ID) {
			older_ID = i;
			break;
		}
	}
	
	for (i = parseInt(id) + 1; i < sizeOfFamilyList(); i++) {
		if (getPersonByIndex(i).parent_ID == cur.parent_ID) {
			
			younger_ID = i;
			
			break;
		}
	}
	
	if ($(this).parent().children('.level_box').children().eq(1).hasClass('big')) {
		$(this).parent().children('.level_box').children('div').first().css("visibility", "visible");
		$(this).parent().children('.level_box').children('div').eq(1).css("visibility", "visible");
		$(this).parent().children('.level_box').children('div').last().css("visibility", "visible");
		$(this).parent().children(".change.left").css("visibility", "visible");
		$(this).parent().children(".change.right").css("visibility", "visible");
		
		$(this).parent().children('.level_box').children('div').eq(1).attr("class", "big box");
		$(this).parent().children('.level_box').children('div').eq(1).children(".line").css("height", "25%");
		$(this).parent().children('.level_box').children('div').last().attr("class", "small_right small box");
		$(this).parent().children('.level_box').children('div').last().children(".line").css("height", "65%");
		$(this).parent().children('.level_box').children('div').last().children(".line").css("width", "168%");
		$(this).parent().children('.level_box').children('div').first().attr("class", "small_left small box");
		$(this).parent().children('.level_box').children('div').first().children(".line").css("height", "65%");
		$(this).parent().children('.level_box').children('div').first().children(".line").css("width", "168%");
		$(this).parent().children('.level_box').children('div').eq(1).children(".normal_name").find('span').html("<a href='#'>" + cur.name + "</a>");
		$(this).parent().children('.level_box').children('div').eq(1).children(".normal_name").children('span.index_box').first().html(cur.id);
		$(this).parent().children('.level_box').children('div').eq(1).children(".normal_img").children('img').attr("src", cur.image);
		if (older_ID > 0) {
			var older = getPersonByIndex(older_ID);
			
			$(this).parent().children('.level_box').children('div').first().children(".normal_name").children('span').first().html(older.name);
			$(this).parent().children('.level_box').children('div').first().children(".normal_name").children('span.index_box').first().html(older.id);
			$(this).parent().children('.level_box').children('div').first().children(".normal_img").children('img').attr("src", older.image);
		}
		else {
			$(this).parent().children('.level_box').children('div').first().css("visibility", "hidden");
			$(this).css("visibility", "hidden");
		}
		if (younger_ID > 0) {
			var younger = getPersonByIndex(younger_ID);
			
			$(this).parent().children('.level_box').children('div').last().children(".normal_name").children('span').first().html(younger.name);
			$(this).parent().children('.level_box').children('div').last().children(".normal_name").children('span.index_box').first().html(younger.id);
			$(this).parent().children('.level_box').children('div').last().children(".normal_img").children('img').attr("src", younger.image);
		}
		else {
			$(this).parent().children('.level_box').children('div').last().css("visibility", "hidden");
			$(this).css("visibility", "hidden");
		}
		
		
		var num = $('#page_family_tree .main').children().length;
		for (i = parseInt(cur.level) + 1 ; i <= num; i++) {
			
			$('#page_family_tree .level' + i).remove();
		}
		
		var newleafLevel = create_leaf_level(cur);
		$('#page_family_tree .main').append(newleafLevel);
		
		$.scrollTo('#page_family_tree .level' + cur.level, 800);
	}
	
	else {
		$(this).parent().children('.level_box').children('div').first().css("visibility", "visible");
		$(this).parent().children('.level_box').children('div').eq(1).css("visibility", "visible");
		$(this).parent().children('.level_box').children('div').last().css("visibility", "visible");
		$(this).parent().children(".change.left").css("visibility", "visible");
		$(this).parent().children(".change.right").css("visibility", "visible");
		
		$(this).parent().children('.level_box').children('div').eq(1).children(".normal_name").find('span').html(cur.name);
		$(this).parent().children('.level_box').children('div').eq(1).children(".normal_name").children('span.index_box').first().html(cur.id);
		$(this).parent().children('.level_box').children('div').eq(1).children(".normal_img").children('img').attr("src", cur.image);
		if (older_ID > 0) {
			var older = getPersonByIndex(older_ID);
			
			$(this).parent().children('.level_box').children('div').first().children(".normal_name").children('span').first().html(older.name);
			$(this).parent().children('.level_box').children('div').first().children(".normal_name").children('span.index_box').first().html(older.id);
			$(this).parent().children('.level_box').children('div').first().children(".normal_img").children('img').attr("src", older.image);
		}
		else {
			$(this).parent().children('.level_box').children('div').first().css("visibility", "hidden");
			$(this).css("visibility", "hidden");		
		}
		if (younger_ID > 0) {
			var younger = getPersonByIndex(younger_ID);
			
			$(this).parent().children('.level_box').children('div').last().children(".normal_name").children('span').first().html(younger.name);
			$(this).parent().children('.level_box').children('div').last().children(".normal_name").children('span.index_box').first().html(younger.id);
			$(this).parent().children('.level_box').children('div').last().children(".normal_img").children('img').attr("src", younger.image);
		}
		else {
			$(this).parent().children('.level_box').children('div').last().css("visibility", "hidden");
			$(this).css("visibility", "hidden");
		}
	}

});
var currentPerson = undefined;
$(document).on("click", 'span a', function(event) {
	var id = $(this).parent().parent().children('span.index_box').html();
	var person = getPersonByIndex(id);
	currentPerson = person;
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
	return false;
	//event.stopPropagation();
});

function refreshPersonModelInfo(person)
{
	$('#page_amodel_detail .person_info .person_info_name .name').html(person.name);
	$('#page_amodel_detail .person_info .person_info_name .level').html(person.level + " 代，第 " + person.order + " 子");
	$('#page_amodel_detail .person_info .person_info_image .image').attr("src", person.image);
}

function setPhotoSuccess(message)
{
	hideLoadingDiv();
	Toast("头像设置成功", 2000);
	var properties = new Array();
	properties[0] = "image";
	var values = new Array();
	values[0] = message;
	updatePersonById(currentPerson.id, properties, values);
	currentPerson = getPersonByIndex(currentPerson.id);
	refreshPersonModelInfo(currentPerson);
}