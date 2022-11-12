var request = require('request');
var options = {
	'method': 'GET',
	'url': 'https://van.mama.cn/welfare/v6/welfare/task/taskListV51?=',
	'headers': {
		'Cookie': 'xkey=cd245d517e505036a010a41c2fcdf12d; user_id=106543772; app_passport_login_sid=84ev9r79mfjvrh69h3aq7ahcl7; pt_rel=2; pt_mode=2; pt_source=1; pt_version=12.10.1; pt_bb_birthday=2022-11-07; pt_prepare_pt_date=; pt_open_mmid=fd4196854db380b47caf9eb6ab396f2ea5; Hm_lvt_eb0574442ce2ba3b60f4105fa7df1e3c=1667835941; Hm_lvt_f2babe867b10ece0ff53079ad6c04981=1667835941; PHPSESSID=0a8e3adc13afe0022032643c60188be5; app_init_data=%7B%22app%22%3A%22pt%22%2C%22client%22%3A%22pt%22%2C%22pt_rel%22%3A%22%22%2C%22device%22%3A%22%22%7D; PPSID=84ev9r79mfjvrh69h3aq7ahcl7; Hm_lpvt_eb0574442ce2ba3b60f4105fa7df1e3c=1667836067; Hm_lpvt_f2babe867b10ece0ff53079ad6c04981=1667836067',
		'x-requested-with': 'cn.mama.pregnant',
		'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
	}
};
request(options, function (error, response) {
	if (error) throw new Error(error);
	console.log(response.body);
});