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

function cityMaker(res) {
	var html = '';
	for(var i in res.cities) {
		html += '<option value="'+res.cities[i].id+'">'+res.cities[i].name+'</option>';
	}
	$("#city").append(html);
}

/* 화면전환 */
function stageChg(type) {
	switch(type) {
		case "H":
			$(".header").css("display", "none");
			$(".home-wrap").css("display", "flex");
			$(".daily-wrap").css("display", "none");
			$(".days-wrap").css("display", "none");
			break;
		case "D":
			$(".navi").removeClass("active");
			$(".navi").eq(1).addClass("active");
			$(".header").css("display", "block");
			$(".home-wrap").css("display", "none");
			$(".daily-wrap").css("display", "flex");
			$(".days-wrap").css("display", "none");
			break;
		case "S":
			$(".navi").removeClass("active");
			$(".navi").eq(2).addClass("active");
			$(".header").css("display", "block");
			$(".home-wrap").css("display", "none");
			$(".daily-wrap").css("display", "none");
			$(".days-wrap").css("display", "flex");
			break;
	}
}

/* 도시정보 가져오기 */
function init() {
	$.ajax({
		url: "../json/city.json",
		error: err,
		success: cityMaker
	});
	stageChg('H');
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
	$(".d-city").html(res.name);
	$(".d-time").html(	iso(new Date(res.dt*1000))	);
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
	stageChg('D');
});




/******** 프로그램 시작 ********/
init();

