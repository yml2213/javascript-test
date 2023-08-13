ad_video_infoArr = [{ "id": 1, "integral": 30, "multiple": 1, "completed": 1 }, { "id": 2, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 3, "integral": 70, "multiple": 1, "completed": 1 }, { "id": 4, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 5, "integral": 40, "multiple": 1, "completed": 1 }, { "id": 6, "integral": 30, "multiple": 1, "completed": 1 }, { "id": 7, "integral": 80, "multiple": 1, "completed": 1 }, { "id": 8, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 9, "integral": 50, "multiple": 1, "completed": 1 }, { "id": 10, "integral": 50, "multiple": 2, "completed": 0 }]

// withdrawAmount
a = { "code": 0, "message": "请求成功", "data": { "convertibleIntegral": 490, "exchangeRate": 0.005, "buybackRatio": 0.30, "withdrawAmount": 0.00, "sellRatioList": [{ "id": 0, "name": "新人", "arrivalTime": "72小时内", "buybackRatio": 0.20, "totalConsumption": 0.00, "continuousTotal": 0, "inviteNum": 0, "num": 0, "yield": "低" }, { "id": 1, "name": "普通", "arrivalTime": "72小时内", "buybackRatio": 0.30, "totalConsumption": 50.00, "continuousTotal": 3, "inviteNum": 2, "num": 1, "yield": "低" }, { "id": 2, "name": "白银", "arrivalTime": "48小时内", "buybackRatio": 0.40, "totalConsumption": 100.00, "continuousTotal": 7, "inviteNum": 5, "num": 1, "yield": "中" }, { "id": 3, "name": "黄金", "arrivalTime": "24小时内", "buybackRatio": 0.50, "totalConsumption": 200.00, "continuousTotal": 10, "inviteNum": 10, "num": 2, "yield": "中" }, { "id": 4, "name": "铂金", "arrivalTime": "12小时内", "buybackRatio": 0.65, "totalConsumption": 500.00, "continuousTotal": 20, "inviteNum": 15, "num": 2, "yield": "高" }, { "id": 5, "name": "黑钻", "arrivalTime": "6小时内", "buybackRatio": 0.80, "totalConsumption": 800.00, "continuousTotal": 28, "inviteNum": 20, "num": 2, "yield": "高" }], "sellWithdrawDetailList": [], "myIntegral": 1925 } }

for (const elem of ad_video_infoArr) {
	// console.log(elem.completed);
	if (elem.completed == 0) {
		console.log(`开始看第 ${elem.id} 个视频`);

	} else {
		console.log(`视频 ${elem.id} 已经看完了鸭!`);

	}
}


b = {
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