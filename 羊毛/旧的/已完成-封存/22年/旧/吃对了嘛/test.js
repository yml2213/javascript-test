a = {
	"msg": "success",
	"code": 0,
	"data": {
		"baseData": {
			"sign": {
				"reward": 1,
				"mustCount": 31,
				"todayCount": 0,
				"desc": "每日签到奖励增加5积分,最高35个积分"
			},
			"share": {
				"reward": 5,
				"mustCount": 2,
				"todayCount": 0,
				"desc": "每日转发2次奖励5积分"
			},
			"comment": {
				"reward": 5,
				"mustCount": 2,
				"todayCount": 0,
				"desc": "每日评论2次奖励5积分"
			},
			"video": {
				"reward": 5,
				"mustCount": 2,
				"todayCount": 0,
				"desc": "每日观看2次视频奖励5积分"
			}
		}
	}
}

let myDate = new Date();
	let day = myDate.getDay();
console.log(day);
	

bb={"msg":"缓存过期,请重新登录","code":101}