/*
$.ajax({
		url: "주소",
		type: "[get], post",
		dataType: "[json], xml, html, txt",
		data: {JS Object},
		success: function(res){
			console.log(res);
		},
		error: function(xhr, status, error){
			console.log(xhr, status, error)
		},
	});
*/


/******** 전역함수 ********/

// https://api.openweathermap.org/data/2.5/weather?appid=02efdd64bdc14b279bc91d9247db4722&id=1835553&units=metric
// https://api.openweathermap.org/data/2.5/forecast?appid=02efdd64bdc14b279bc91d9247db4722&id=1835553&units=metric

var appid = '02efdd64bdc14b279bc91d9247db4722';
var dailyURL = 'https://api.openweathermap.org/data/2.5/weather';
var daysURL = 'https://api.openweathermap.org/data/2.5/forecast';

function err(xhr) {
	console.log(xhr);
}

function cityMaker(res) {
	var html = '';
	for(var i in res.cities) {
		html += '<option value="'+res.cities[i].id+'">'+res.cities[i].name+'</option>';
	}
	$("#city").append(html);
}

/* 도시정보 가져오기 */
function init() {
	$.ajax({
		url: "../json/city.json",
		error: err,
		success: cityMaker
	});
}

function getDaily(id) {
	$.ajax({
		url: dailyURL,
		data: {
			appid: appid,
			id: id,
			units: "metric"	
		},
		success: resDaily,
		error: err
	});
}

function getDays(id) {
	$.ajax({
		url: daysURL,
		data: {
			appid: appid,
			id: id,
			units: "metric"	
		},
		success: resDays,
		error: err
	});
}

function resDaily(res) {
	console.log(res);
}

function resDays(res) {
	console.log(res);
}


/******** 이벤트 ********/

/* 날씨 정보 가져오기 */
$("#city").change(function(){
	var id = $(this).val();
	getDaily(id);
	getDays(id);
});




/******** 프로그램 시작 ********/
init();