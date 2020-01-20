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

var d = new Date();
console.log(	d.getFullYear()	);	//년
console.log(	d.getMonth()	);		//월 (0~11)
console.log(	d.getDate()	);			//일
console.log(	d.getHours()	);		//시
console.log(	d.getMinutes()	);	//분
console.log(	d.getSeconds()	);	//초
console.log(	d.getDay()	);			//요일(0~6, 0:일요일)

function iso(d) {
	function zp(n) {
		return n<10 ? "0"+n : n;
	}
	var dt = d.getFullYear()+"-"+zp(d.getMonth()+1)+"-"+zp(d.getDate())+" "+zp(d.getHours())+":"+zp(d.getMinutes())+":"+zp(d.getSeconds());
	return dt;
}
*/





/******** 전역함수 ********/

// https://api.openweathermap.org/data/2.5/weather?appid=02efdd64bdc14b279bc91d9247db4722&id=1835553&units=metric
// https://api.openweathermap.org/data/2.5/forecast?appid=02efdd64bdc14b279bc91d9247db4722&id=1835553&units=metric

var appid = '02efdd64bdc14b279bc91d9247db4722';
var dailyURL = 'https://api.openweathermap.org/data/2.5/weather';
var daysURL = 'https://api.openweathermap.org/data/2.5/forecast';

function iso(d) {
	function zp(n) {
		return n<10 ? "0"+n : n;
	}
	var dt = d.getFullYear()+"-"+zp(d.getMonth()+1)+"-"+zp(d.getDate())+" "+zp(d.getHours())+":"+zp(d.getMinutes())+":"+zp(d.getSeconds());
	return dt;
}

function err(xhr) {
	console.log(xhr);
}

/*********** View ***********/
/* 화면전환 */
function stageChg(type) {
	switch(type) {
		case 0:
			$(".header").css("display", "none");
			$(".home-wrap").css("display", "flex");
			$(".daily-wrap").css("display", "none");
			$(".days-wrap").css("display", "none");
			// $("#city").find("option").eq(0).attr("selected", "selected");
			$("#city").find("option").eq(0).prop("selected", true);
			break;
		case 1:
			$(".navi").removeClass("active");
			$(".navi").eq(1).addClass("active");
			$(".header").css("display", "block");
			$(".home-wrap").css("display", "none");
			$(".daily-wrap").css("display", "flex");
			$(".days-wrap").css("display", "none");
			break;
		case 2:
			$(".navi").removeClass("active");
			$(".navi").eq(2).addClass("active");
			$(".header").css("display", "block");
			$(".home-wrap").css("display", "none");
			$(".daily-wrap").css("display", "none");
			$(".days-wrap").css("display", "flex");
			break;
	}
}


/*********** Controller ***********/
/* 도시정보 가져오기 */
function init() {
	navigator.geolocation.getCurrentPosition(getPosition);
	$.ajax({
		url: "../json/city.json",
		error: err,
		success: cityMaker
	});
	stageChg(0);
}

function cityMaker(res) {
	var html = '';
	for(var i in res.cities) {
		html += '<option value="'+res.cities[i].id+'">'+res.cities[i].name+'</option>';
	}
	$("#city").append(html);
}

function getPosition(pos) {
	if(pos) {
		var lat = pos.coords.latitude;
		var lon = pos.coords.longitude;
		getDaily(null, lat, lon);
		getDays(null, lat, lon);
		stageChg(1);
	}
}

/* 날씨 정보 가져오기 */
$("#city").change(function(){
	var id = $(this).val();
	getDaily(id);
	getDays(id);
	stageChg(1);
});

$(".navi").click(function(){
	var n = $(this).index();
	stageChg(n);
});

$("#bt-geo").click(function(){
	navigator.geolocation.getCurrentPosition(getPosition);
});

/*********** Model(Data) ***********/
function getDaily(id, lat, lon) {
	var data = {
		appid: appid,
		units: "metric"
	};
	if(id) data.id = id;
	else {
		data.lat = lat;
		data.lon = lon;
	}
	$.ajax({
		url: dailyURL,
		data: data,
		success: resDaily,
		error: err
	});
}

function getDays(id, lat, lon) {
	var data = {
		appid: appid,
		units: "metric"
	};
	if(id) data.id = id;
	else {
		data.lat = lat;
		data.lon = lon;
	}
	$.ajax({
		url: daysURL,
		data: data,
		success: resDays,
		error: err
	});
}

function resDaily(res) {
	console.log(res);
	$(".d-city").html(res.name);
	$(".d-time").html(	iso(new Date(res.dt*1000))	);
	var src = 'http://openweathermap.org/img/wn/'+res.weather[0].icon+'@2x.png';
	$(".d-icon").find("img").attr("src", src);
	$(".d-main").html(res.weather[0].main);
	$(".d-desc").html(res.weather[0].description);
	$(".d-temp").html(res.main.temp + ' ℃');
	$(".d-feel").html(res.main.feels_like + ' ℃');
	$(".d-hum").html(res.main.humidity + "%");
}

function resDays(res) {
	console.log(res);
}





/******** 프로그램 시작 ********/
init();

