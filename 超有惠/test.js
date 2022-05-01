ad_video_infoArr = [{ "id": 1, "integral": 30, "multiple": 1, "completed": 1 }, { "id": 2, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 3, "integral": 70, "multiple": 1, "completed": 1 }, { "id": 4, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 5, "integral": 40, "multiple": 1, "completed": 1 }, { "id": 6, "integral": 30, "multiple": 1, "completed": 1 }, { "id": 7, "integral": 80, "multiple": 1, "completed": 1 }, { "id": 8, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 9, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 10, "integral": 50, "multiple": 2, "completed": 0 }]

for (const elem of ad_video_infoArr) {
	// console.log(elem.completed);
	if (elem.completed == 0) {
		console.log(`开始看第 ${elem.id} 个视频`);

	} else {
		console.log(`视频 ${elem.id} 已经看完了鸭!`);

	}
}


b={
	"code": 0,
	"message": "请求成功",
	"data": {
		"convertibleIntegral": 234,
		"exchangeRate": 0.005,
		"exchangeRateIncrease": 100,
		"cycleTime": "04.30 - 05.06",
		"signInList": [
			{
				"id": 1,
				"day": "已签到",
				"completed": "SIGN",
				"integral": 50
			},
			{
				"id": 2,
				"day": "已签到",
				"completed": "SIGN",
				"integral": 50
			},
			{
				"id": 3,
				"day": "明天",
				"completed": "LOCK",
				"integral": 50
			},
			{
				"id": 4,
				"day": "第4天",
				"completed": "LOCK",
				"integral": 50
			},
			{
				"id": 5,
				"day": "第5天",
				"completed": "LOCK",
				"integral": 50
			},
			{
				"id": 6,
				"day": "第6天",
				"completed": "LOCK",
				"integral": 50
			},
			{
				"id": 7,
				"day": "第7天",
				"completed": "LOCK",
				"integral": 50
			}
		],
		"todayState": "SIGN",
		"todayIndex": 1,
		"pointContent": "明日可再领取50积分哦",
		"pointButton": "提醒我来领",
		"myIntegral": 1106
	}
}