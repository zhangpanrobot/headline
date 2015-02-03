function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return document.querySelectorAll(selector);
}

var currentTime; //当前时间
var listArray = []; //当前list, 当数组长度超过一定时, 只保留后一段相应长度
var currentLabel = 'nba'; //当前标签
var selectedLabels = []; //已选标签
var toSelectLables = []; //待选标签
var baseUrl = 'http://10.134.24.229/discover_agent?cmd=getlist&phone=1&b=nba&start=0&count=10';

var config = {
	currentTime: '',
	listArray: [],
	currentLabel: 'nba',
	selectedLabels: [],
	toSelectLables: [],
	baseUrl: 'http://10.134.24.229/discover_agent?cmd=getlist&phone=1&count=20&start='
};

//dom
var section = $('section');

function sendRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			currentTime = this.getResponseHeader('Date');
			callback(xhr.responseText);
		} else if (xhr.readyState === 4 && xhr.status !== 200) {
			callback({
				"fail": true,
				"data": xhr.responseText
			});
		}
	}
	xhr.onerror = function() {
		callback({
			"fail": true,
			"data": xhr.responseText
		});
	};
	xhr.open('GET', url, true);
	xhr.send();
}

//列表
function renderList(obj) {
		if (obj.length) {
			var ul = document.createElement('ul'),
				tempStr = '';
			ul.className = 'article';
			for (var i = obj.length - 1; i >= 0; i--) {
				var item = obj[i];
				var img = item.images;
				var tempImage = !!img;
				tempStr += '<li><a href=content.html?q=' + item.url + '&next=' + (obj[i - 1] ? obj[i - 1].url : '') + '&prev=' + (obj[i + 1] ? obj[i + 1].url : '') + '><div class="thumb">' + (tempImage ? ('<img src="' + img[0].name + '" alt="' + item.title + '">') : '') + '</div><h2 class="' + (tempImage ? '' : 'long-line') + '">' + item.title + '</h2></a></li>';
			}
			ul.innerHTML = tempStr;
			section.appendChild(ul);
		}
	}
	//内容
function renderArticle(obj) {

	}
	//上拉推荐
function newRecommend() {
	sendRequest();
}

/**下拉更新
 *param 当前加载到第几个List
 **/
function moreList() {
	// sendRequest(config.baseUrl + config.listArray.length*10 + '&b=' + config.currentLabel, function(data) {
	// 	if(typeof data.app_cmd.cmd.user_recomm_info.url_infos.length == "number") {
	// 		renderList(data.app_cmd.cmd.user_recomm_info);
	// 	}
	// });
	renderList(dataJSON.app_cmd[0].cmd[0].user_recomm_info[0].url_infos);
}

function init() {
	if (!~location.href.indexOf('content.html')) {
		moreList();
	} else {
		renderArticle();
	}
}

init();
/**更新默认列表(成员及顺序)
 *
 **/
function labelChange() {

}