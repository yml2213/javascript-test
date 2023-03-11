/*
vr助手  app    cron 10 8,10,12 * * *  jzt.js

11.8		签到

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# vr助手
export vrzs="cookie @ cookie "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("vr助手");
const ckName = "vrzs";
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

	console.log("\n------- 签到 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.signin("签到"));
	}
	await Promise.all(taskall);

}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.valid = false;
		this.cookie = str;
	}



	async signin(name) {
		let options = {
			method: "post",
			url: `https://bbs.picovr.com/ttarch/api/growth/v1/checkin/create?app_id=264482`,
			headers: {
				'Content-Type': 'application/json',
				'Cookie': this.cookie
			},
			body: ''
		};
		// console.log(options);
		let result = await httpRequest(name, options);

		console.log(result);
		let { score, status } = result.data.point_records[0]



		if (result.err_no == 0 && status == 0) {
			DoubleLog(`账号 ${this.index}  ${name}: 成功, 获得 ${score} 积分`);
		} else if (status == 2) {
			DoubleLog(`账号 ${this.index}  ${name}: 已签到`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
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
