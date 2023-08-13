data = {
	"creditList": {
		"805604": {
			"id": 27206381,
			"credit": 35,
			"class": ""
		},
		"805605": {
			"id": 27206382,
			"credit": 35,
			"class": ""
		},
		"805606": {
			"id": 27206383,
			"credit": 55,
			"class": ""
		},
		"805607": {
			"id": 27206384,
			"credit": 50,
			"class": ""
		}
	},
	"pop": true
}
for(var key in data.creditList){
    console.log(JSON.stringify(data.creditList[key].id));
}