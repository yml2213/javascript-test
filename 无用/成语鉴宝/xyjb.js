/*
成语鉴宝  app    cron 10 8,10,12 * * *  cyjb.js

11.8		签到

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 成语鉴宝
export cyjb="cookie @ cookie "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("成语鉴宝");
const ckName = "cyjb";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			// 通知 : 0关闭 1为打开
let envSplitor = ["@", "\n"];
let ck = msg = "";
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
let ck_status = 1;
//---------------------- 自定义变量区域 -----------------------------------




//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {

	console.log("\n------- 领取 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.reward("领取"));
	}
	await Promise.all(taskall);

}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.valid = false;
		this.cookie = str;
	}



	async reward(name) {

		// let b = utils.ts13()
		let b = '1667888999347'

		let a = `prdId=580061&deviceId=b39ff23274020a6a&timestamp=${b}&key=ssed234SdgaIksjn`
		let c = utils.MD5_Encrypt(encodeURIComponent(a))
		console.log(c);

		let options = {
			'method': 'POST',
			'url': `https://service.whaleunique.com/whale-game-antique/game-reward/receiveRedpackage?rd=${b}`,
			'headers': {
				'phead': `{"secretAndroid":"42aCTFhabIR4sVsgzucmhlWEy7Vj7Qj68KCcsReOOPg=","idfa":"","versionCode":18,"versionName":"1.1.2","channel":68,"activityChannel":7559764,"sdk":31,"imsi":"46011","sys":"12-31","dpi":"1080*2206","phone":"M2102J2SC","net":"WIFI","platform":"android","productId":580061,"timeZone":"GMT+08:00","timeZoneId":"Asia/Shanghai","qaid":"e998cb31be347dc0","vendor":"XIAOMI","timestamp":${b},"signature":"${c}","isMarketingChannel":false,"pkgName":"com.deerplay.appraisal"}`,
				'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36',
				'accept': '*/*',
				'origin': 'http://luckygame.whaleunique.com',
				'x-requested-with': 'com.deerplay.appraisal',
				'sec-fetch-site': 'cross-site',
				'sec-fetch-mode': 'cors',
				'sec-fetch-dest': 'empty',
				'referer': 'http://luckygame.whaleunique.com/',
				'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				"curLevel": 76,
				"type": 1
			})

		};
		console.log(options);
		let result = await httpRequest(name, options);

		console.log(result);
		let { score, status } = result.data.point_records[0]



		// if (result.err_no == 0 && status == 0) {
		// 	DoubleLog(`账号 ${this.index}  ${name}: 成功, 获得 ${score} 积分`);
		// } else if (status == 2) {
		// 	DoubleLog(`账号 ${this.index}  ${name}: 已签到`);
		// } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}


	// 第一天
	// {
	// 	"data": {
	// 		"info": {
	// 			"date": 20221108,
	// 			"create_time": 1667876283,
	// 			"continuous_count": 1,
	// 			"sum_count": 0
	// 		},
	// 		"point_records": [
	// 			{
	// 				"app_id": 264482,
	// 				"point_id": "7163469232646062088",
	// 				"user_id": "65124",
	// 				"item_type": 31,
	// 				"op_type": 15,
	// 				"item_id": "20221108",
	// 				"op_id": "1",
	// 				"score": 89,
	// 				"status": 2,
	// 				"create_time": 1667876283,
	// 				"update_time": 1667876283,
	// 				"reason": "论坛每日签到",
	// 				"extra": ""
	// 			}
	// 		]
	// 	},
	// 	"err_no": 0,
	// 	"err_msg": ""
	// }





}

// #region ********************************************************  固定代码  ********************************************************

!(async () => {
	if (!(await checkEnv())) return;
	if (userList.length > 0) {
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done());

///////////////////////////////////////////////////////////////////

async function checkEnv() {
	if (userCookie) {
		let e = envSplitor[0];
		for (let o of envSplitor)
			if (userCookie.indexOf(o) > -1) {
				e = o;
				break;
			}
		for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
		// console.log(n);
		userCount = userList.length;
		// console.log(userList);
	} else {
		console.log("未找到CK");
		return;
	}
	return console.log(`共找到${userCount}个账号`), !0;
}

// =========================================== 不懂不要动 =========================================================
function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }

//#endregion
