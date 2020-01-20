var obj;						//undefined
obj = 1;						//Number
obj = "A";					//String
obj = true;					//Boolean
obj = []						//Array
obj = {}						//Object
obj = function(){}	//Object

var car = {
	name: "Hyundai",
	color: "white",
	model: "Sonata",
	price: 30000000,
	drive: function(obj){
		console.log(this.model + "가 " + obj.speed + "의 속도로 방향은 "+ obj.rotate + "로 달린다.");
	}
};

var car2 = JSON.stringify(car);
var car3 = JSON.parse(car2);
console.log(car, car2, car3);

car.drive({
	speed: 5,
	rotate: 30
});


$.ajax({
	url: "../json/menus.json",
	type: "get",
	dataType: "json",
	success: function(res){
		console.log(res);
	}
});

$.ajax({
	url:'https://api.openweathermap.org/data/2.5/weather',
	dataType: "json",
	type: "get",
	data: {
		appid: '02efdd64bdc14b279bc91d9247db4722',
		units: "metric",
		id: "1835848"
	},
	success: function(res){
		console.log(res);
	}
});

// 02efdd64bdc14b279bc91d9247db4722