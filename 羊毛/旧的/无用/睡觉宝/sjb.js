/*
睡觉宝  app    cron 10 8,10,12 * * *  jzt.js

11.7		日常任务

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 睡觉宝
export sjb="ua @ ua "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("睡觉宝");
const ckName = "sjb";
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

	console.log("\n------- 任务列表 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.task_list("任务列表"));
	}
	await Promise.all(taskall);

}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.valid = false;
		this.ua = this.get_ua();
	}

	// 任务列表
	async task_list(name) {
		let options = {
			method: "post",
			url: `https://mapi.shuijiaobao.cn/task/newList`,
			headers: {
				"ua": this.ua,
			},
			form: {}
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.ok == 1) {

			let tasks = result.data.day_list;
			// console.log(tasks);
			for (const task of tasks) {
				let { type, power_coin, title, curNum, totalNum } = task;
				let num = totalNum - curNum
				switch (type) {
					case 155: for (let index = 0; index < num; index++) await this.watch_video(title);  // 看视频
						break;
					// case 153: await this.watch_video('看视频')
					// 	break;
					// case 152: await this.watch_video('看视频')
					// 	break;
					default:
						break;
				}
			}

			// DoubleLog(`账号 ${this.index}  ${name}:  ${result.msg}`);
			// this.token = result.data.token;
			// await this.sign("签到"), await this.total("余额");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	async sign(name) {
		let options = {
			method: "post",
			url: `https://api.coincheckusq.xyz//sign`,
			headers: {
				"Host": "api.coincheckusq.xyz",
				'authorization': `Bearer ${this.token}`
			},
			body: `integral=0`
		};
		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号 ${this.index}  ${name}: ${result.data}`);
		} else if (result.code == 1) {
			DoubleLog(`账号 ${this.index}  ${name}: ${result.msg}`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}








	async watch_video(name) {
		let options = {
			method: "post",
			url: `https://mapi.shuijiaobao.cn/task/dayReward`,
			headers: {
				"ua": this.ua,
				'Host': 'mapi.shuijiaobao.cn',
				'User-Agent': 'okhttp/3.10.0'
			},
			form: {
				'timeStamp': '1667829048',
				'sign': '8b74c51ff892be4674bc7c138ceb755e',
				'type': '155'
			}
		};
		console.log(options);
		let result = await httpRequest(name, options);

		console.log(result);
		if (result.ok == 1) {
			DoubleLog(`账号 ${this.index}  ${name}: 本次获得 ${result.data.user_info.add_gold_coin} 金币, 共有 ${result.data.user_info.gold_coin} 金币==${result.data.user_info.gold_coin / 100} 元`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}


	async get_ua() {
		// let ts10 = utils.ts10()
		let ts10='1667830228'
		let ts = ts10 + '000';
		let b = `9183504BmeNjXs6vLWpT8A${ts}`
		let c = utils.MD5_Encrypt(b)
		let a = `a|12|2.0.5|ql_sleep|c0a2b2d0a23d5f3eunknown|1080|2206|0|918350|${ts}|${c}|4c7ad2acf2ad3f24d2f70fd4902fbcd8|Xiaomi`

		console.log(c);
		console.log(a);
		return a
	}

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
