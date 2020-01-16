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


/* 전역함수 */
function err(xhr) {
	console.log(xhr);
}

function cityMaker(res) {
	var html = '';
	for(var i in res.cities) {
		html += '<option value="'+res.cities[i].id+'">'+res.cities[i].name+'</option>';
	}
	$("#city").html(html);
}

/* 프로그램 시작 */
init();

/* 도시정보 가져오기 */
function init() {
	$.ajax({
		url: "../json/city.json",
		error: err,
		success: cityMaker
	});
}